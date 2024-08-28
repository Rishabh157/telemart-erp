import { CircularProgress } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetAgentOrderStatusReportsQuery } from 'src/services/ReportsService'
import { useGetAllAgentsQuery } from 'src/services/UserServices'
import ATMTable, { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useGetSchemeQuery } from 'src/services/SchemeService'

const AgentWiseComplaintWrapper = () => {

    const [filters, setFilters] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
        callCenterId: '',
        agentId: ''
    })

    const { items, isFetching } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetAgentOrderStatusReportsQuery({
            callCenterId: filters?.callCenterId,
            agentId: filters?.agentId,
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
        }, { skip: !(filters.callCenterId && filters.agentId && filters.start_date && filters.end_date), }),
    })

    // Hooks
    const { options: schemeOptions } = useCustomOptions({
        useEndPointHook: useGetSchemeQuery(''),
        keyName: 'schemeName',
        value: '_id',
    })

    const { options: agentsOptions } = useCustomOptions({
        useEndPointHook: useGetAllAgentsQuery(filters?.callCenterId, {
            skip: !filters?.callCenterId,
        }),
        keyName: 'userName',
        value: '_id',
    })

    // order column
    const columns: columnTypes[] = [
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            // name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_INQUIRY_NUMBER,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'FRESH',
            headerName: 'Fresh',
            flex: 'flex-[1_1_0%]',
            // name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_INQUIRY_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'PREPAID',
            headerName: 'Prepaid',
            flex: 'flex-[1_1_0%]',
            // name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_INQUIRY_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'DELIVERED',
            headerName: 'Delivered',
            flex: 'flex-[1_1_0%]',
            // name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_INQUIRY_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'HOLD',
            headerName: 'Hold',
            flex: 'flex-[1_1_0%]',
            // name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_INQUIRY_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'URGENT',
            headerName: 'Urgent',
            flex: 'flex-[1_1_0%]',
            // name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_INQUIRY_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'INQUIRY',
            headerName: 'Inquiry',
            flex: 'flex-[1_1_0%]',
            // name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_INQUIRY_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'INTRANSIT',
            headerName: 'IN-Transit',
            flex: 'flex-[1_1_0%]',
            // name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_INQUIRY_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
        },
    ]

    return (
        <div className="border border-slate-400 rounded p-2 h-full flex flex-col">
            <div className="flex gap-2 items-center justify-end z-50">
                <ATMSelectSearchable
                    isDisabled={true}
                    name=""
                    componentClass="m-0"
                    value={filters?.callCenterId}
                    onChange={(newValue) => setFilters({
                        ...filters,
                        callCenterId: newValue
                    })}
                    options={schemeOptions}
                    selectLabel="Select Scheme"
                    label=""
                />

                <ATMSelectSearchable
                    isDisabled={true}
                    // isDisabled={filters?.callCenterId ? false : true}
                    name=""
                    componentClass="m-0"
                    value={filters?.agentId}
                    onChange={(newValue) => setFilters({
                        ...filters,
                        agentId: newValue
                    })}
                    options={agentsOptions}
                    selectLabel="Select Agent"
                    label=""
                />

                <ATMDatePicker
                    disabled
                    name=""
                    value={filters.start_date}
                    onChange={(value) => {
                        const endDate = moment(value)
                            .add(3, 'months')
                            .endOf('day')
                        const threeMonthsLater = moment()
                            .add(3, 'months')
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
                    disabled
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
                        .add(3, 'months')
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

            <div className="relative flex-1 h-0 z-10">
                {isFetching && (
                    <div className="absolute inset-0 flex justify-center items-center z-10 bg-slate-100 opacity-50">
                        <CircularProgress />
                    </div>
                )}
                <div className="h-full mt-4">
                    {/* Table */}
                    <div className="overflow-auto grow">
                        <ATMTable
                            extraClasses=""
                            columns={columns}
                            rows={items || []}
                            isLoading={isFetching}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentWiseComplaintWrapper
