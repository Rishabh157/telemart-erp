// |-- Built-in Dependencies --|
import React from 'react'

// |-- Types --|
type Props = {}

const activitiesList = Array(1).fill(null)

const DealerActivityTab = (props: Props) => {
    return (
        <div className="p-2 ">
            <div className="flex flex-col gap-4 ">
                {activitiesList?.map((activity, index) => (
                    <div
                        key={index}
                        className="flex gap-2 shadow rounded border px-3 py-2"
                    >
                        {/* <div className="flex flex-col w-[130px]">
                            <div className="text-slate-500 text-sm">
                                {' '}
                                09:09 PM{' '}
                            </div>
                            <div className="text-[13px]"> 03 Feb 2023 </div>
                        </div> */}

                        <div className='text-center'>
                            Comming Soon
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DealerActivityTab
