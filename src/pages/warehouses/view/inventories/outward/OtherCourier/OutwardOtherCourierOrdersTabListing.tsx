// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { Chip, Stack } from '@mui/material'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { courierCompanyEnum } from 'src/utils/constants/enums'
import { useGetOrderForExportMutation } from 'src/services/OrderService'

import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useGetAwbCouriersQuery } from 'src/services/CourierMasterService'
import OutwardOtherOrderFilterFormWrapper, {
    FormInitialValuesFilterWithLabel,
} from './Filters/OutwardOtherOrderFilterFormWrapper'
import ATMExportButton from 'src/components/UI/atoms/ATMExportButton/ATMExportButton'
import moment from 'moment'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { showToast } from 'src/utils'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setFilter: React.Dispatch<
        React.SetStateAction<FormInitialValuesFilterWithLabel>
    >
    filter: FormInitialValuesFilterWithLabel
    selectedCourier: string
    onSelectCourier: (newValue: string) => void
}

const OutwardOtherCourierOrdersTabListing = ({
    columns,
    rows,
    setFilter,
    filter,
    selectedCourier,
    onSelectCourier,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { id: warehouseId } = useParams()
    const { userData } = useGetLocalStorage()

    const [exportData, setExportData] = useState<any>([])
    console.log('exportData: ', exportData)

    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] = useState({
        isFilterOpen: false,
        isMenifest: false,
    })
    const [isRedirect, setIsRedirect] = useState<boolean>(false)
    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, totalItems, isTableLoading, searchValue } = outwardCustomerState

    const { options: courierAwbOptions } = useCustomOptions({
        useEndPointHook: useGetAwbCouriersQuery(''),
        keyName: 'courierName',
        value: '_id',
    })

    const headers = [
        { label: 'Order Number', key: 'orderNumber' },
        { label: 'Consignee Name', key: 'customerName' },
        { label: 'Price', key: 'price' },
        { label: 'City', key: 'districtLabel' },
        { label: 'Tehsil', key: 'tehsilLabel' },
        { label: 'District', key: 'districtLabel' },
        { label: 'State', key: 'stateLabel' },
        // { label: 'Address', key: 'address' },
        { label: 'Pincode', key: 'pincodeLabel' },
        { label: 'Contact Number', key: 'mobileNo' },
        { label: 'Weight(kg.)', key: 'shcemeQuantity' },
        { label: 'COD Amount (To be collection)', key: 'totalAmount' },
        { label: 'Order Date', key: 'orderMappedDate' },
        { label: 'Product to be shipped', key: 'schemeProducts[0].productGroupName' },
        { label: 'Payment Mode', key: 'paymentMode' },
        { label: 'Package Amount', key: 'price' },
        { label: 'Call Center Name', key: 'callCenterLabel' },
        { label: 'Shipping Client', key: 'orderAssignedToCourier' },
        // { label: 'Seller Name', key: 'companyAddress' }, // Assuming "Seller Name" is not directly available; using companyAddress as an approximation.
        // { label: 'Seller Address', key: 'companyAddress' },
        { label: 'Seller CST No', key: 'hsnCode' }, // Assuming CST No maps to hsnCode.
        { label: 'Seller TIN', key: 'hsnCode' }, // Reused as no clear mapping exists.
        { label: 'AWB', key: 'awbNumber' },
        { label: 'Invoice No', key: 'orderInvoice' },
        { label: 'Invoice Date', key: 'orderInvoiceDate' },
        { label: 'Length', key: 'length' }, // No corresponding data provided.
        { label: 'Breadth', key: 'breadth' }, // No corresponding data provided.
        { label: 'Height', key: 'height' }, // No corresponding data provided.
        { label: 'Return Address', key: 'pincodeLabel' },
        { label: 'Return Pincode', key: 'pincodeLabel' }, // Reused as secondary pincode.
        { label: 'Prod / SKU Code', key: 'hsnCode' }, // Assuming SKU Code maps to hsnCode.
        { label: 'Quantity', key: 'shcemeQuantity' },
        { label: 'Area Customer Code', key: 'areaLabel' },
        { label: 'Remarks', key: 'remark' }
    ];


    const handleReset = () => {
        setFilter((prev) => ({
            ...prev,
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
            startTime: { fieldName: '', value: '', label: '' },
            endTime: { fieldName: '', value: '', label: '' },
            orderStatus: { fieldName: '', value: '', label: '' },
            productGroup: { fieldName: '', value: '', label: '' },
        }))
    }

    const filterShow = (filter: FormInitialValuesFilterWithLabel) => {
        return (
            <span className="capitalize">
                <Stack direction="row" spacing={1}>
                    {Object.entries(filter).map(([key, value], index) => {
                        return value.value ? (
                            <Chip
                                key={index}
                                label={`${value.fieldName}: ${value.label}`}
                                color="primary"
                                variant="outlined"
                                size="small"
                            />
                        ) : null
                    })}
                </Stack>
            </span>
        )
    }

    const isFilterApplied = (isMenifest: boolean, isRedirect: boolean) => {
        let keys: string = ''
        for (keys in filter) {
            if (
                filter[keys as keyof typeof filter].value !== '' &&
                isMenifest === true &&
                isRedirect === true
            )
                return true
        }
        return false
    }

    useEffect(() => {
        return () => {
            setIsOpenFilterFormDialog({
                isFilterOpen: false,
                isMenifest: false,
            })
            setIsRedirect(false)
        }
    }, [])

    const formatDates = (data: any) => {
        return data.map((item: any) => ({
            ...item,
            createdAt: moment(item?.createdAt).format('DD MMM YYYY'),
            updatedAt: moment(item?.updatedAt).format('DD MMM YYYY'),
        }))
    }

    const [exportListing, exportListingInfo] = useGetOrderForExportMutation()

    // export the data
    const handleExport = (done: () => void) => {
        exportListing({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['didNo', 'mobileNo'],
            page: page,
            filterBy: [
                {
                    fieldName: 'orderAssignedToCourier',
                    value: selectedCourier,
                },
                { fieldName: 'companyId', value: userData?.companyId },
                { fieldName: 'assignWarehouseId', value: warehouseId },
                {
                    fieldName: 'orderStatus',
                    value: filter?.orderStatus?.value,
                },
                {
                    fieldName: 'schemeProducts.productGroupId',
                    value: filter?.productGroup?.value,
                },
                {
                    fieldName: 'awbNumber',
                    value: 'NA',
                },
            ],
            dateFilter: {
                startDate: filter.startDate.value,
                endDate: filter.endDate.value,
            },
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: false,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data !== null || !res?.data?.data?.length) {
                        setExportData(res?.data?.data)
                        setTimeout(() => {
                            done()
                        }, 500)
                    }
                } else {
                    showToast('error', 'No data to export')
                }
            })
            .catch()
    }

    return (
        <div className="h-[calc(100vh-350px)] bg-white">
            <div className="border flex flex-col h-[calc(100%)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    isDisableSearch={true}
                    isChilderFirst={true}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    searchValue={searchValue}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    isFilter
                    onFilterClick={() => {
                        setIsOpenFilterFormDialog((prev) => ({
                            ...prev,
                            isFilterOpen: true,
                        }))
                        setIsRedirect(false)
                    }}
                    isFilterRemover
                    onFilterRemoverClick={handleReset}
                    filterShow={filterShow(filter)}
                    children={
                        <>
                            <div className="flex gap-x-4">
                                <ATMSelectSearchable
                                    name=""
                                    label=""
                                    value={selectedCourier}
                                    componentClass=""
                                    selectLabel="Select Courier"
                                    isLoading={false}
                                    options={courierAwbOptions?.filter(ele => ele.label !== 'GPO')?.map((ele) => ({
                                        label: ele?.label?.replaceAll('_', ' '),
                                        value: ele?.label,
                                    }))}
                                    onChange={(e) => onSelectCourier(e)}
                                />

                                <div className="mt-1">
                                    <ATMExportButton
                                        data={formatDates(exportData)}
                                        // data={rows}
                                        isLoading={exportListingInfo.isLoading}
                                        headers={headers}
                                        fileName="other-courier"
                                        onClick={handleExport}
                                        btnName="Download CSV"
                                        btnType='DOWNLOAD'
                                        loadingText="..."
                                    />
                                </div>

                                <div className="mt-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // formikProps.handleSubmit()
                                            navigate('/configurations/awb-master')
                                        }}
                                        className={`mr-2 bg-primary-main rounded py-2 px-2 text-white text-xs border hover:bg-blue-800 cursor-pointer border-primary-main`}
                                    >
                                        Redirect AWB
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                />

                {/* Filter Form */}
                <OutwardOtherOrderFilterFormWrapper
                    open={isOpenFilterFormDialog}
                    filter={filter}
                    setFilter={setFilter}
                    onClose={() => {
                        setIsOpenFilterFormDialog((prev) => ({
                            ...prev,
                            isFilterOpen: false,
                        }))
                        if (
                            isFilterApplied(
                                isOpenFilterFormDialog.isMenifest,
                                isRedirect
                            )
                        ) {
                            navigate('/menifest-invoice-orders', {
                                state: {
                                    filter,
                                    warehouseId,
                                    providerName: courierCompanyEnum.shipyaari,
                                },
                            })
                        }
                    }}
                />

                {/* Table */}
                <div className="grow overflow-auto">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="max-h-[calc(100%-10px)] overflow-auto z-0"
                        isLoading={isTableLoading}
                    />
                </div>

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default OutwardOtherCourierOrdersTabListing
