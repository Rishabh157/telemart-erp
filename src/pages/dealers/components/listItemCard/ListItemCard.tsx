import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ListItemCard = ({
    item,
}: { item: any }) => {

    const navigate = useNavigate()
    const { dealerId } = useParams()

    useEffect(() => {
        document.getElementById(dealerId || "")?.scrollIntoView({ behavior: 'smooth' })
    }, [dealerId])

    return (
        <div
            id={item._id}
            onClick={() => { navigate(`/dealers/${item._id}/orders`) }}
            key={item._id}
            className='flex gap-4 border-b items-center  px-3 py-1 cursor-pointer' >
            <div>
                <div className={`h-[37px] w-[37px] flex justify-center items-center rounded text-white transition-all duration-[500ms] ${dealerId === item._id ? 'bg-primary-main' : "bg-slate-300 "} `} > {item.dealerName[0].toUpperCase()} </div>
            </div>

            <div className='flex flex-col gap-1 ' >

                <div className={`text-md transition-all duration-[500ms] ${dealerId === item._id ? 'text-primary-main' : 'text-slate-700'} `} >
                    {item.dealerName}

                </div>
                <div className={`text-sm transition-all duration-[500ms] ${dealerId === item._id ? 'text-primary-main' : 'text-slate-500'}`}>
                    {item.mobile}

                </div>
            </div>
        </div>
    )
}

export default ListItemCard
