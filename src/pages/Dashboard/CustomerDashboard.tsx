import { useEffect, useState } from 'react'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { setDateFilter } from 'src/redux/slices/DashboardSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAgentDataQuery } from 'src/services/DashboardServices'

type AgentOrdersData = {
    label: string
    y: number
}
const CustomerDashboard = () => {
    const { dateFilter } = useSelector((state: RootState) => state.dashboard)

    const [agentOrdersData, setAgentOrdersData] = useState<AgentOrdersData[]>(
        []
    )
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, isFetching, data } = useGetAgentDataQuery<any>({
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
    })

    useEffect(() => {
        if (!isLoading && !isFetching) {
            const dataPoints: AgentOrdersData[] = [
                { y: data?.noOfOrdersCalls, label: 'Orders' },
                { y: data?.noOfInquiryCalls, label: 'Inquiries' },
                {
                    y: data?.numberOfComplaintCalls,
                    label: 'Total Complaints',
                },
                {
                    y: data?.numberOfProductReplacementCase,
                    label: 'House Arrest',
                },
                {
                    y: data?.numberOfProductReplacementCase,
                    label: 'Product Replacement',
                },
                { y: data?.numberOfMoneyBackCase, label: 'Money Back' },
            ]

            setAgentOrdersData(dataPoints)
        }
    }, [isLoading, isFetching, data])

    return (
        <div className="grid grid-cols-2 gap-1">
            
                <div className="border-[1px] border-slate-400 rounded p-2">
                    <div className="text-start flex justify-between">
                        {/* Heading */}
                        <ATMPageHeading> Agent </ATMPageHeading>
                        {/* Date Filter */}
                        <div className="flex gap-2  items-center">
                            <div className="min-w-[150px] max-w-[150px]">
                                <ATMDatePicker
                                    name=""
                                    value={dateFilter.start_date}
                                    onChange={(value) => {
                                        dispatch(
                                            setDateFilter({
                                                ...dateFilter,
                                                start_date: value,
                                            })
                                        )
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
                                        dispatch(
                                            setDateFilter({
                                                ...dateFilter,
                                                end_date: value,
                                            })
                                        )
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
                                            dispatch(
                                                setDateFilter({
                                                    start_date: null,
                                                    end_date: null,
                                                })
                                            )
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <BarGraph
                        dataPoints={agentOrdersData}
                        label={'Order Inquiry & Complaints'}
                        verticalLabel={'Quantity'}
                    />
                </div>
        </div>
    )
}

export default CustomerDashboard
