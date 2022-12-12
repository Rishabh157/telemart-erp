import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go'

type Props = {
    vendorData: any
}

const VendorInfoCard = ({
    vendorData
}: Props
) => {


    return (
        <div className='flex flex-col  gap-2 items-center py-[10px] px-2 h-full w-full' >
            <div className='w-full flex justify-end h-[10px] ' >
                <span
                    className={`px-2 py-3 rounded-full text-[12px] inline-flex gap-2 items-center ${vendorData?.is_active ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'} `}
                >
                    <GoPrimitiveDot className=' text-[17px] ' />
                    {vendorData?.is_active ? 'Active' : 'Inactive'}
                </span>
            </div>
            <div className='h-[40px] w-[40px] flex justify-center items-center font-bold bg-primary-main text-white text-sm  rounded-full' >
                {vendorData?.vendorName[0]}
            </div>
            <div className='flex flex-col justify-center items-center h-[70px]' >
                <div className='border bg-slate-100 text-slate-400  px-2  rounded-full text-[13px]' > VENDOR </div>
                <div className='text-md text-slate-700' > {vendorData?.vendorName} </div>
                <div className='text-[13px] text-slate-500' > {vendorData?.mobile} </div>
            </div>
        </div>
    )
}

export default VendorInfoCard
