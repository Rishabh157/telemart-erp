import { Avatar } from '@mui/material'
import React from 'react'
import { IconType } from 'react-icons'

type Props = {
    vendorData: any
    actionIcons?: {
        icon: IconType
        onClick: () => void
        label: string
    }[]
}

const VendorInfoCard = ({ vendorData, actionIcons }: Props) => {
    return (
        <div className="py-2 flex flex-col gap-1">
            {/* Image */}
            <div className="flex justify-center">
                <Avatar src="" alt="" />
            </div>

            {/* Firm Name */}
            <div className="flex justify-center">{vendorData.firmName}</div>

            {/* Chips */}
            <div className="flex gap-2 justify-center">
                <span className="rounded-full px-3 py-[2px] bg-slate-100 text-[10px]">
                    {' '}
                    Vendor{' '}
                </span>
                <span
                    className={`rounded-full px-3 py-[2px] text-[10px] font-medium flex items-center gap-1 ${
                        vendorData.isActive
                            ? 'bg-green-100 text-green-500'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {' '}
                    {vendorData.isActive ? (
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    ) : (
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                    {vendorData.isActive ? 'Active' : 'Deactive'}{' '}
                </span>
            </div>

            <div className="text-center text-slate-500">
                {/* Vendor Name */}
                <div className="text-[15px]"> {vendorData.vendorName}</div>

                {/* Mobile */}
                <div className="text-center text-slate-400 text-[13px]">
                    {vendorData.mobile}
                </div>
            </div>

            {/* Action Icon */}
            <div className="flex gap-4 border-b justify-center items-center pt-1">
                {actionIcons?.map((icon, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                icon.onClick()
                            }}
                            className="text-lg text-slate-500 cursor-pointer flex justify-center flex-col"
                        >
                            <div className="flex justify-center">
                                <icon.icon />
                            </div>
                            <div className="text-[11px]"> {icon.label} </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default VendorInfoCard
