// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { Chip, Stack } from '@mui/material'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
// |-- Redux --|
import ATMExportButton from 'src/components/UI/atoms/ATMExportButton/ATMExportButton'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import WebLeadsListingFilterWrapper from './WebLeadsListingFilter/WebLeadsListingFilterWrapper'
import { WebLeadsFormInitialValuesFilterWithLabel } from './WebLeadsListingWrapper'
import { useGetAllWebLeadsMutation } from 'src/services/websites/WebLeadsServices'
import moment from 'moment'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setFilter: React.Dispatch<
        React.SetStateAction<WebLeadsFormInitialValuesFilterWithLabel>
    >
    filter: WebLeadsFormInitialValuesFilterWithLabel
}

const WebLeadsListing = ({ columns, rows, filter, setFilter }: Props) => {
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const WebsiteState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const headers = [
        { label: 'Address', key: 'address' },
        { label: 'Address1', key: 'address1' },
        { label: 'City', key: 'city' },
        { label: 'Country', key: 'country' },
        { label: 'CreatedAt', key: 'createdAt' },
        { label: 'Email', key: 'email' },
        { label: 'Idtag', key: 'idtag' },

        { label: 'Landmark', key: 'landmark' },
        { label: 'LeadStatus', key: 'leadStatus' },
        { label: 'Mode', key: 'mode' },
        { label: 'Name', key: 'name' },
        { label: 'OrderId', key: 'order_id' },
        { label: 'PaymenyMode', key: 'paymeny_mode' },
        { label: 'Phone', key: 'phone' },
        { label: 'Price', key: 'price' },
        { label: 'ProductName', key: 'product_name' },
        { label: 'Quantity', key: 'quantity' },
        { label: 'Remark', key: 'remark' },
        { label: 'Sdate', key: 'sdate' },
        { label: 'State', key: 'state' },
        { label: 'Status', key: 'status' },
        { label: 'UpdatedAt', key: 'updatedAt' },
        { label: 'Url', key: 'url' },
        { label: 'ZipCode', key: 'zip_code' },
    ]

    const [exportListing, exportListingInfo] = useGetAllWebLeadsMutation()
    const [exportData, setExportData] = useState<any>([])
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        WebsiteState
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Web Leads',
            path: '/all-websites/web-leads',
        },
        {
            label: 'Web Leads',
        },
    ]

    const handleReset = () => {
        setFilter((prev: any) => ({
            ...prev,
            status: { fieldName: '', label: '', value: '' },
            product_name: { fieldName: '', label: '', value: '' },
            startDate: {
                fieldName: '',
                label: '',
                value: '',
            },
            endDate: { fieldName: '', label: '', value: '' },
        }))
    }

    const handleExport = (done: () => void) => {
        exportListing({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['phone', 'email', 'product_name', 'leadStatus'],
            page: page,
            filterBy: [
                {
                    fieldName: 'leadStatus',
                    value: ['PENDING'],
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
                    setExportData(res?.data?.data)
                    setTimeout(() => {
                        done()
                    }, 500)
                }
            })
            .catch()
    }

    const filterShow = (filter: WebLeadsFormInitialValuesFilterWithLabel) => {
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
    const formatDates = (data: any) => {
        return data.map((item: any) => ({
            ...item,
            createdAt: moment(item?.createdAt).format('DD MMM YYYY'),
            updatedAt: moment(item?.updatedAt).format('DD MMM YYYY'),
        }))
    }

    return (
        <div className="px-4 h-full overflow-auto pt-3 ">
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Web Leads </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-85px)] rounded bg-white ">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    searchValue={searchValue}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    isFilter
                    onFilterClick={() => {
                        setIsOpenFilterFormDialog(true)
                    }}
                    isFilterRemover
                    onFilterRemoverClick={handleReset}
                    filterShow={filterShow(filter)}
                    children={
                        <ATMExportButton
                            data={formatDates(exportData)}
                            isLoading={exportListingInfo.isLoading}
                            headers={headers}
                            fileName="webLeads"
                            onClick={handleExport}
                            btnName="Download CSV"
                            loadingText="..."
                        />
                    }
                />

                {isOpenFilterFormDialog && (
                    <WebLeadsListingFilterWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                        setFilter={setFilter}
                        filter={filter}
                    />
                )}

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="h-full overflow-auto"
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

export default WebLeadsListing
