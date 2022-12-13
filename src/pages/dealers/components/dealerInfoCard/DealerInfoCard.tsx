import React, { useEffect } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setItems } from 'src/redux/slices/dealerSlice'
import { AppDispatch } from 'src/redux/store'
import { useGetDealerByIdQuery, useGetDealersQuery } from 'src/services/DealerServices'

const DealerInfoCard = () => {

    const { dealerId } = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const { data, isFetching, isLoading } = useGetDealersQuery(
        {
            "limit": 10,
            "searchValue": "",
            "params": [
                "dealerName",
                "dealerCode",
                "mobile"
            ],
            "page": 1,
            "filterBy": [
                {
                    "fieldName": "",
                    "value": []
                }
            ],
            "dateFilter": {
                "start_date": "",
                "end_date": "",
                "dateFilterKey": ""
            },
            "orderBy": "createdAt",
            "orderByValue": -1,
            "isPaginationRequired": true

        }
    )

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setItems(data || []))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching])

    const { data: dealerData } = useGetDealerByIdQuery(dealerId)

    return (
        <div className='flex flex-col  gap-2 items-center py-[10px] px-2 h-full w-full' >
            <div className='w-full flex justify-end h-[10px] ' >
                <span
                    className={`px-2 py-3 rounded-full text-[12px] inline-flex gap-2 items-center ${dealerData?.is_active ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'} `}
                >
                    <GoPrimitiveDot className=' text-[17px] ' />
                    {dealerData?.is_active ? 'Active' : 'Inactive'}
                </span>
            </div>
            <div className='h-[40px] w-[40px] flex justify-center items-center font-bold bg-primary-main text-white text-sm  rounded-full' >
                {dealerData?.dealerName[0]}
            </div>
            <div className='flex flex-col justify-center items-center h-[70px]' >
                <div className='border bg-slate-100 text-slate-400  px-2  rounded-full text-[13px]' > DEALER </div>
                <div className='text-md text-slate-700' > {dealerData?.dealerName} </div>
                <div className='text-[13px] text-slate-500' > {dealerData?.mobile} </div>
            </div>
        </div>
    )
}

export default DealerInfoCard
