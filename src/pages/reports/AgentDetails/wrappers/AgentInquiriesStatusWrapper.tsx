import { useState } from 'react'
import moment from 'moment'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { useGetAgentInquiriesStatusReportsQuery } from 'src/services/ReportsService'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { useGetAllAgentsByCallCenterQuery } from 'src/services/UserServices'
import ATMTable, { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'

const AgentInquiriesStatusWrapper = () => {

    const [filters, setFilters] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
        callCenterId: '',
        agentId: null
    })

    const { userData } = useGetLocalStorage()

    const { items, isFetching } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetAgentInquiriesStatusReportsQuery({
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
        }, { skip: !(filters.callCenterId && filters.start_date && filters.end_date), }),
    })

    // get call centers
    const { options: callCenterOptions } = useCustomOptions({
        useEndPointHook: useGetAllCallCenterMasterQuery(userData?.companyId, {
            skip: !userData?.companyId,
        }),
        keyName: 'callCenterName',
        value: '_id',
    })

    // get agents by call center id
    const { options: agentsOptions } = useCustomOptions({
        useEndPointHook: useGetAllAgentsByCallCenterQuery(filters?.callCenterId, {
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
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
        },
        {
            field: 'userName',
            headerName: 'User',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row) => {
                return <span>{row?.userName}</span>
            },
        },
        {
            field: 'INQUIRY',
            headerName: 'Inquiry',
            flex: 'flex-[1_1_0%]',
            align: 'end',
            extraClasses: 'text-xs min-w-[150px]',
        },
    ]

    return (
        <div className="border border-slate-400 rounded p-2 h-full flex flex-col">

            <div className="flex gap-2 items-center justify-end z-50">
                <ATMSelectSearchable
                    name=""
                    componentClass="m-0"
                    value={filters?.callCenterId}
                    onChange={(newValue) => setFilters({
                        ...filters,
                        callCenterId: newValue
                    })}
                    options={callCenterOptions}
                    selectLabel="Select Call Center"
                    label=""
                />

                <ATMSelectSearchable
                    isDisabled={filters?.callCenterId ? false : true}
                    name=""
                    componentClass="m-0"
                    value={filters?.agentId}
                    onChange={(newValue) => setFilters({
                        ...filters,
                        agentId: newValue ? newValue : null
                    })}
                    options={agentsOptions}
                    selectLabel="Select Agent"
                    label=""
                />

                <ATMDatePicker
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
                <div className="h-full mt-4">
                    <div className="overflow-auto grow">
                        <ATMTable
                            extraClasses=""
                            columns={columns}
                            rows={items?.result || []}
                            isLoading={isFetching}
                        />
                        {items?.totalInquiryCount ? (
                            <div className="flex items-center justify-between border-t border-slate-300 mt-4 bg-slate-50 p-4 rounded shadow">
                                <span className="text-base font-semibold text-gray-700">
                                    Total Inquiries:
                                </span>
                                <span className="text-base font-bold text-gray-700">
                                    {items?.totalInquiryCount}
                                </span>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentInquiriesStatusWrapper
