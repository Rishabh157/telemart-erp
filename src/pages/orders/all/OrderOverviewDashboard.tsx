import React, { useState } from 'react'
import moment from 'moment'
import { CircularProgress } from '@mui/material'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { useGetOrderDashboardDataQuery } from 'src/services/OrderService'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

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
        <div className="w-full h-full">
            <div className="p-2 h-full">
                <div className="text-start">
                    {/* Heading */}
                    <div className="w-1/2 p-2 border-[1px] border-slate-400 rounded">
                        {/* Date Filter */}
                        <div className="flex justify-between">
                            <ATMPageHeading> </ATMPageHeading>
                            <div className="flex gap-2 items-center">
                                <div className="min-w-[150px] max-w-[150px]">
                                    <ATMDatePicker
                                        name=""
                                        value={dateFilter.start_date}
                                        onChange={(value) => {
                                            setDateFilter({
                                                ...dateFilter,
                                                start_date: value,
                                            })
                                        }}
                                        label=""
                                        dateTimeFormat="DD/MM/YYYY"
                                    />
                                </div>

                                <div className="min-w-[150px] max-w-[150px]">
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
                                        minDate={
                                            dateFilter.start_date
                                                ? new Date(
                                                      dateFilter.start_date
                                                  )
                                                : undefined
                                        }
                                    />
                                </div>
                                {dateFilter?.start_date ||
                                dateFilter?.end_date ? (
                                    <div>
                                        <button
                                            type="button"
                                            className={`rounded bg-primary-main text-white text-sm py-[0.40rem] px-2`}
                                            onClick={() => {
                                                setDateFilter({
                                                    start_date: moment(
                                                        new Date()
                                                    ).format('YYYY-MM-DD'),
                                                    end_date: moment(
                                                        new Date()
                                                    ).format('YYYY-MM-DD'),
                                                })
                                            }}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="relative">
                            {isFetching && (
                                <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                                    <CircularProgress />
                                </div>
                            )}
                            <BarGraph
                                dataPoints={getData(items)}
                                label="Orders"
                                verticalLabel="Quantity"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderOverviewDashboard
