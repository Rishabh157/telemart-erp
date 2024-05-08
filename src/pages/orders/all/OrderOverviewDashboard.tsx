import { CircularProgress } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetOrderDashboardDataQuery } from 'src/services/OrderService'

const OrderOverviewDashboard = () => {
    const [dateFilter, setDateFilter] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
    })

    const { items, isFetching } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetOrderDashboardDataQuery({
            dateFilter: {
                startDate: dateFilter.start_date
                    ? moment(dateFilter?.start_date).format('YYYY-MM-DD')
                    : '',
                endDate: dateFilter.end_date
                    ? moment(dateFilter?.end_date).format('YYYY-MM-DD')
                    : dateFilter.end_date
                    ? moment().format('YYYY-MM-DD')
                    : '',
            },
        }),
    })

    const getData = (items: any) => {
        return [
            { y: items?.allOrders, label: 'All' },
            { y: items?.freshOrders, label: 'Fresh' },
            { y: items?.holdOrders, label: 'Hold' },
            { y: items?.inquiryOrders, label: 'Inquiry' },
            { y: items?.prepaidOrders, label: 'Prepaid' },
            { y: items?.deliveredOrders, label: 'Delivered' },
            { y: items?.pscOrders, label: 'PSC' },
            { y: items?.unaOrders, label: 'UNA' },
            { y: items?.urgentOrders, label: 'Urgent' },
            { y: items?.rtoOrders, label: 'RTO' },
            { y: items?.reattemptOrders, label: 'Reattempt' },
            { y: items?.intransitOrders, label: 'Intransit' },
            { y: items?.ndrOrders, label: 'NDR' },
            { y: items?.pndOrders, label: 'PND' },
            {
                y: items?.nonActionOrders,
                label: 'Non-Action',
            },
            {
                y: items?.doorCancelledOrders,
                label: 'Door Cancelled',
            },
            {
                y: items?.deliveryOutOfNetworkOrders,
                label: 'Delivery Out Of Network',
            },
        ]
    }

    return (
        <div className="border border-slate-400 rounded p-2 h-full flex flex-col">
            <div className="flex gap-2 items-center justify-end">
                <ATMDatePicker
                    name=""
                    value={dateFilter.start_date}
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
                            setDateFilter({
                                ...dateFilter,
                                start_date: value,
                                end_date: endDate.isBefore(threeMonthsLater)
                                    ? endDate
                                    : threeMonthsLater,
                            })
                        } else {
                            // Otherwise, keep the end date unchanged
                            setDateFilter({
                                ...dateFilter,
                                start_date: value,
                            })
                        }
                    }}
                    label=""
                    dateTimeFormat="DD/MM/YYYY"
                />

                <ATMDatePicker
                    name=""
                    value={dateFilter.end_date}
                    onChange={(value) => {
                        setDateFilter({
                            ...dateFilter,
                            end_date: value,
                        })
                    }}
                    label=""
                    dateTimeFormat="DD/MM/YYYY"
                    minDate={dateFilter.start_date}
                    maxDate={moment(dateFilter.start_date)
                        .add(3, 'months')
                        .endOf('day')}
                />

                {(dateFilter.start_date || dateFilter.end_date) && (
                    <button
                        type="button"
                        className="rounded bg-primary-main text-white text-sm py-1 px-2"
                        onClick={() => {
                            setDateFilter({
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

export default OrderOverviewDashboard
