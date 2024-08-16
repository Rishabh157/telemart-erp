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

    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] = useState({
        isFilterOpen: false,
        isMenifest: false,
    })
    const [isRedirect, setIsRedirect] = useState<boolean>(false)
    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, isTableLoading, searchValue } =
        outwardCustomerState

    const { options: courierAwbOptions } = useCustomOptions({
        useEndPointHook: useGetAwbCouriersQuery(''),
        keyName: 'courierName',
        value: '_id',
    })

    const headers = [
        { label: 'Order Number', key: 'orderNumber' },
        { label: 'Consignee Name', key: 'orderNumber' },
        { label: 'Price', key: 'orderNumber' },
        { label: 'City', key: 'orderNumber' },
        { label: 'Tehsil', key: 'orderNumber' },
        { label: 'District', key: 'orderNumber' },
        { label: 'State', key: 'orderNumber' },
        { label: 'Address', key: 'orderNumber' },
        { label: 'Pincode', key: 'orderNumber' },
        { label: 'Contact Number', key: 'orderNumber' },
        { label: 'Weight(kg.)', key: 'orderNumber' },
        { label: 'COD Amount (To be collection)', key: 'orderNumber' },
        { label: 'Order Date', key: 'orderNumber' },
        { label: 'Product to be shipped', key: 'orderNumber' },
        { label: 'Payment Mode', key: 'orderNumber' },
        { label: 'Package Amount', key: 'orderNumber' },
        { label: 'Call Center Name', key: 'orderNumber' },
        { label: 'Shipping Client', key: 'orderNumber' },
        { label: 'Seller Name', key: 'orderNumber' },
        { label: 'Seller Address', key: 'orderNumber' },
        { label: 'Seller CST No', key: 'orderNumber' },
        { label: 'Seller TIN', key: 'orderNumber' },
        { label: 'AWB', key: 'orderNumber' },
        { label: 'Invoice No', key: 'orderNumber' },
        { label: 'Invoice Date', key: 'orderNumber' },
        { label: 'Length', key: 'orderNumber' },
        { label: 'Breadth', key: 'orderNumber' },
        { label: 'Height', key: 'orderNumber' },
        { label: 'Return Address', key: 'orderNumber' },
        { label: 'Return Pincode', key: 'orderNumber' },
        { label: 'Return Pincode', key: 'orderNumber' },
        { label: 'Prod / SKU Code', key: 'orderNumber' },
        { label: 'Pieces', key: 'orderNumber' },
        { label: 'Area Customer Code', key: 'orderNumber' },
        { label: 'Remarks', key: 'orderNumber' },
    ]

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
                    rowCount={rows.length}
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
                                        isLoading={exportListingInfo.isLoading}
                                        headers={headers}
                                        fileName="other-courier"
                                        onClick={handleExport}
                                        btnName="Download CSV"
                                        btnType='DOWNLOAD'
                                        loadingText="..."
                                    />
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
                        rowCount={rows.length}
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
