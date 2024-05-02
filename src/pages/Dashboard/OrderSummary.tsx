import { CircularProgress } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetOrderSummayQuery } from 'src/services/DashboardServices'

const OrderSummary = () => {
    const [dateFilter, setDateFilter] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
    })

    const { items, isFetching } = useGetDataByIdCustomQuery({
        useEndPointHook: useGetOrderSummayQuery({
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
            { y: items?.newOrder || 0, label: 'New Orders' },
            { y: items?.assignedOrder || 0, label: 'Assigned Orders' },
            { y: items?.deliveredOrder || 0, label: 'Delivered Orders' },
            { y: items?.inTransitOrder || 0, label: 'In Transit Orders' },
            { y: items?.reAtteptOrder || 0, label: 'Reattempt Orders' },
            { y: items?.holdOrder || 0, label: 'Hold Orders' },
            { y: items?.urgentOrder || 0, label: 'Urgent Orders' },
            { y: items?.pndOrder || 0, label: 'PND Orders' },
            { y: items?.unaOrder || 0, label: 'UNA Orders' },
            {
                y: items?.deliveryOutOfNetwork || 0,
                label: 'Delivery Out of Network',
            },
            { y: items?.ndrOrder || 0, label: 'NDR Orders' },
            { y: items?.pscOrder || 0, label: 'PSC Orders' },
        ]
    }

    return (
        <div className="border border-slate-400 rounded p-2 h-full flex flex-col">
            <div className="flex gap-2 items-center justify-end">
                <ATMDatePicker
                    name=""
                    minDate={moment().subtract(3, 'months').startOf('day')}
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
                            ? new Date(dateFilter.start_date)
                            : undefined
                    }
                />

                {(dateFilter.start_date || dateFilter.end_date) && (
                    <button
                        type="button"
                        className="rounded bg-primary-main text-white text-sm py-1 px-2"
                        onClick={() => {
                            setDateFilter({
                                start_date: null,
                                end_date: null,
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
                <div className="h-full">
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

export default OrderSummary
