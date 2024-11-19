import moment from 'moment'
import { useState } from 'react'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { useGetAgentWiseEnquiryQuery } from 'src/services/ReportsService'
import ATMTable, { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { OrderListResponse } from 'src/models'
import { ATMOrderStatus, ATMDateTimeDisplay, ATMPincodeDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'

const AgentWiseEnquiryWrapper = () => {

    const [filters, setFilters] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
    })

    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const dispatch = useDispatch<AppDispatch>()

    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        listingPaginationState

    const { items } = useGetCustomListingData<any>({
        useEndPointHook: useGetAgentWiseEnquiryQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            page: page,
            params: ['mobileNo'],
            orderBy: 'createdAt',
            isPaginationRequired: true,
            dateFilter: {
                startDate: filters.start_date
                    ? moment(filters?.start_date).format('YYYY-MM-DD')
                    : '',
                endDate: filters.end_date
                    ? moment(filters?.end_date).format('YYYY-MM-DD')
                    : filters.end_date
                        ? moment().format('YYYY-MM-DD')
                        : '',
            },
        },
            { skip: !(filters.start_date || filters.end_date), }
        ),
    })

    // order column
    const columns: columnTypes[] = [
        {
            field: 'inquiryNumber',
            headerName: 'Inquiry No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'text-xs',
        },
        {
            field: 'mobileNo',
            headerName: 'Mobile No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
        },
        {
            field: 'agentName',
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'text-xs',
            renderCell: (row: OrderListResponse) => <ATMOrderStatus status={row?.status} />,
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'text-xs',
        },
        {
            field: 'shcemeQuantity',
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'text-xs',
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'text-xs',
        },
        {
            field: 'createdAt',
            headerName: 'Created Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
            renderCell: (row: OrderListResponse) => <ATMDateTimeDisplay createdAt={row?.createdAt} />
        },
        {
            field: 'dispositionLevelTwo',
            headerName: 'Disposition (One/Two)',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
            renderCell: (row: OrderListResponse) => (
                <div>
                    <div className="text-xs text-slate-700 font-medium">
                        {row?.dispositionLevelTwoLabel || '-'}
                    </div>
                    <div className="text-xs text-primary-main font-medium">
                        {row?.dispositionLevelThreeLabel}
                    </div>
                </div>
            ),
        },
        {
            field: 'pincodeLabel',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: OrderListResponse) => <ATMPincodeDisplay pincode={row?.pincodeLabel} />,
        },
        {
            field: 'channelName',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
        },
        {
            field: 'callCenterLabel',
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'text-xs',
        },
    ]

    return (
        <div className="border border-slate-400 rounded p-2 h-full w-full flex flex-col">

            <div className="flex gap-2 items-center justify-end z-50">
                <ATMDatePicker
                    name=""
                    value={filters.start_date}
                    onChange={(value) => {
                        const endDate = moment(value)
                            .add(1, 'months')
                            .endOf('day')
                        const threeMonthsLater = moment()
                            .add(1, 'months')
                            .endOf('day')

                        // Check if the selected start date is less than 3 months from the current date
                        if (moment(value).isBefore(threeMonthsLater)) {
                            // If yes, set the end date to 3 months from the selected start date
                            setFilters({
                                ...filters,
                                start_date: value,
                                end_date: endDate.isBefore(threeMonthsLater)
                                    ? endDate
                                    : threeMonthsLater,
                            })
                        } else {
                            // Otherwise, keep the end date unchanged
                            setFilters({
                                ...filters,
                                start_date: value,
                            })
                        }
                    }}
                    label=""
                    dateTimeFormat="DD/MM/YYYY"
                />

                <ATMDatePicker
                    name=""
                    value={filters.end_date}
                    onChange={(value) => {
                        setFilters({
                            ...filters,
                            end_date: value,
                        })
                    }}
                    label=""
                    dateTimeFormat="DD/MM/YYYY"
                    minDate={filters.start_date}
                    maxDate={moment(filters.start_date)
                        .add(1, 'months')
                        .endOf('day')}
                />

                {(filters.start_date || filters.end_date) && (
                    <button
                        type="button"
                        className="rounded bg-primary-main text-white text-sm py-1 px-2"
                        onClick={() => {
                            setFilters({
                                start_date: moment(new Date()).format(
                                    'YYYY-MM-DD'
                                ),
                                end_date: moment(new Date()).format(
                                    'YYYY-MM-DD'
                                ),
                            })
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    searchValue={searchValue}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={items}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

                {/* Table */}
                <div className="overflow-auto grow">
                    <ATMTable
                        columns={columns}
                        rows={items}
                        // extraClasses="h-full overflow-auto"
                        extraClasses="h-full"
                        isLoading={isTableLoading}
                    />
                </div>

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={items}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default AgentWiseEnquiryWrapper
