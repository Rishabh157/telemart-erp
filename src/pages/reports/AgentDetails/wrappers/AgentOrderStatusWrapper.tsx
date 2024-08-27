import { CircularProgress } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { useGetAgentOrderStatusReportsQuery } from 'src/services/ReportsService'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { useGetAllAgentsQuery } from 'src/services/UserServices'

const AgentOrderStatusWrapper = () => {

    const [filters, setFilters] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
        callCenterId: '',
        agentId: ''
    })

    const { userData } = useGetLocalStorage()

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
        }, {
            skip: !(
                filters.callCenterId &&
                filters.agentId &&
                filters.start_date &&
                filters.end_date
            ),
        }),
    })

    const getData = (items: any) => {
        return [
            { y: items?.allOrders || 0, label: 'All' },
            { y: items?.freshOrders || 0, label: 'Fresh' },
            { y: items?.holdOrders || 0, label: 'Hold' },
            { y: items?.inquiryOrders || 0, label: 'Inquiry' },
            { y: items?.prepaidOrders || 0, label: 'Prepaid' },
            { y: items?.deliveredOrders || 0, label: 'Delivered' },
            { y: items?.pscOrders || 0, label: 'PSC' },
            { y: items?.unaOrders || 0, label: 'UNA' },
            { y: items?.urgentOrders || 0, label: 'Urgent' },
            { y: items?.rtoOrders || 0, label: 'RTO' },
            { y: items?.reattemptOrders || 0, label: 'Reattempt' },
            { y: items?.intransitOrders || 0, label: 'Intransit' },
            { y: items?.ndrOrders || 0, label: 'NDR' },
            { y: items?.pndOrders || 0, label: 'PND' },
            {
                y: items?.nonActionOrders || 0,
                label: 'Non-Action',
            },
            {
                y: items?.doorCancelledOrders || 0,
                label: 'Door Cancelled',
            },
            {
                y: items?.deliveryOutOfNetworkOrders,
                label: 'Delivery Out Of Network',
            },
        ]
    }

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
        useEndPointHook: useGetAllAgentsQuery(filters?.callCenterId, {
            skip: !filters?.callCenterId,
        }),
        keyName: 'userName',
        value: '_id',
    })

    return (
        <div className="border border-slate-400 rounded p-2 h-full flex flex-col">
            <div className="flex gap-2 items-center justify-end">

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
                        agentId: newValue
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
            <div className="relative flex-1 h-0">
                {isFetching && (
                    <div className="absolute inset-0 flex justify-center items-center z-10 bg-slate-100 opacity-50">
                        <CircularProgress />
                    </div>
                )}
                <div className="h-full ">
                    <BarGraph
                        dataPoints={getData(items)}
                        label={'Orders'}
                        verticalLabel={'Quantity'}
                    />
                </div>
            </div>
        </div>
    )
}

export default AgentOrderStatusWrapper
