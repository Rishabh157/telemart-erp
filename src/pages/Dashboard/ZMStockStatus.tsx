import { CircularProgress } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetZMDealerStockStatusQuery } from 'src/services/DashboardServices'

const ZMStockStatus = () => {
    const [dateFilter, setDateFilter] = useState<any>({
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
    })

    const { items, isFetching } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetZMDealerStockStatusQuery({
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

    const columns: columnTypes[] = [
        {
            field: 'dealerCode',
            headerName: 'Dealer Code',  
            flex: 'flex-[1.5_1.5_0%]',
        },
        {
            field: 'stockAvailable',
            headerName: 'Stock Available',
            flex: 'flex-[1.5_1.5_0%]',
        },
        {
            field: 'intransiteStock',
            headerName: 'In Transit Stock',
            flex: 'flex-[1.5_1.5_0%]',
        },
        {
            field: 'rtoStock',
            headerName: 'RTO Stock',
            flex: 'flex-[1.5_1.5_0%]',
        },
    ]

    return (
        <div className=" w-full">
            <div className="border-[1px] border-slate-400 rounded p-2">
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
                    <div className="grow overflow-auto  ">
                        <ATMTable
                            isLoading={isFetching}
                            columns={columns || []}
                            rows={items || []}
                            extraClasses="max-h-full overflow-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ZMStockStatus
