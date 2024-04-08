import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { setDateFilter } from 'src/redux/slices/DashboardSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { showTheDashboardGraphToDeparment } from 'src/utils/constants/customeTypes'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// import ATMTable, {
//     columnTypes,
// } from 'src/components/UI/atoms/ATMTable/ATMTable'

type Props = {
    columns: columnTypes[]
    rows: any
    columns2: columnTypes[]
    rows2: any
    dataPoints: { y: number; label: string }[]
}

const Dashboard = ({ columns, rows, columns2, rows2, dataPoints }: Props) => {
    const { dateFilter } = useSelector((state: RootState) => state.dashboard)
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useGetLocalStorage() || null

    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 bg-white h-[calc(100vh-55px)] ">
                <ATMPageHeading> Dashboard </ATMPageHeading>

                {/* <div className="grid grid-rows-2"> */}
                <div className="grid grid-cols-2 gap-1">
                    {showTheDashboardGraphToDeparment(
                        userData?.userDepartment
                    ) && (
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
                            {/* Bar Graph */}
                            <BarGraph
                                dataPoints={dataPoints}
                                label={'Order Inquiry & Complaints'}
                                verticalLabel={'Quantity'}
                            />
                        </div>
                    )}
                    {/* <div className="grow overflow-auto ">
                            <ATMTable
                                // size={'text-xs'}
                                columns={columns}
                                rows={rows}
                                // isCheckbox={true}
                                // selectedRows={selectedRows}
                                // onRowSelect={(selectedRows) =>
                                //     setSelectedRows(selectedRows)
                                // }
                                extraClasses="h-full overflow-auto text-xs"
                            />
                        </div> */}
                    {/* </div> */}
                    {/* <div className="-mt-20">
                        <ATMTable
                            columns={columns2}
                            rows={rows2}
                            // isCheckbox={true}
                            // selectedRows={selectedRows}
                            // onRowSelect={(selectedRows) =>
                            //     setSelectedRows(selectedRows)
                            // }
                            extraClasses=" "
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
