import { CircularProgress } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
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
        <div className="w-full h-full">
            <div className="border-[1px] border-slate-400 rounded p-2 h-full">
                <div className="text-start flex justify-between">
                    {/* Heading */}
                    <ATMPageHeading> ZM </ATMPageHeading>
                    {/* Date Filter */}
                    <div className="flex gap-2  items-center">
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
                                        ? new Date(dateFilter.start_date)
                                        : undefined
                                }
                            />
                        </div>
                        {dateFilter?.start_date || dateFilter?.end_date ? (
                            <div>
                                <button
                                    type="button"
                                    className={`rounded bg-primary-main text-white text-sm py-[0.40rem] px-2`}
                                    onClick={() => {
                                        setDateFilter({
                                            start_date: null,
                                            end_date: null,
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
                        label={'Orders'}
                        verticalLabel={'Quantity'}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
