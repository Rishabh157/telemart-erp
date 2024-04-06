import React from 'react'
import BarGraph from 'src/components/UI/atoms/ATMBarGraph/ATMBarGraph'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
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
    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 bg-white h-[calc(100vh-55px)] ">
                <ATMPageHeading> Dashboard </ATMPageHeading>
                <div className="grid grid-rows-2">
                    <div className="grid grid-cols-2 gap-1 h-[calc(100%-550px)]">
                        <div>
                            <div className=" text-center">
                                <ATMPageHeading>
                                    {' '}
                                    Order Statistics{' '}
                                </ATMPageHeading>
                            </div>
                            <BarGraph
                                dataPoints={dataPoints}
                                label={'Order '}
                                verticalLabel={'Quantity'}
                            />
                        </div>
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
                    </div>
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
