
// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Avatar } from '@mui/material'
import { IconType } from 'react-icons'
import { useDeactivateVendorMutation } from 'src/services/VendorServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    vendorData: any
    actionIcons?: {
        icon: IconType
        onClick: () => void
        label: string
    }[]
}

const VendorInfoCard = ({ vendorData, actionIcons }: Props) => {
    const { selectedItem }: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const [changeVendorStatus] = useDeactivateVendorMutation()

    const handleVendorStatus = () => {
        changeVendorStatus(selectedItem?._id).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Status change successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }
    const changeStatus = () => {
        showConfirmationDialog({
            title: selectedItem?.isActive
                ? 'Deactivate Vendor'
                : 'Activate Vendor',
            text: selectedItem?.isActive
                ? 'Do you want to Deactivate Vendor ?'
                : 'Do you want to Activate Vendor ?',
            showCancelButton: true,
            next: (res: any) => {
                return res.isConfirmed ? handleVendorStatus() : false
            },
        })
    }
    return (
        <div className="py-2 flex flex-col gap-1">
            {/* Image */}
            <div className="flex justify-center">
                <Avatar src="" alt="" />
            </div>

            {/* Firm Name */}
            <div className="flex justify-center">{selectedItem?.firmName}</div>

            {/* Chips */}
            <div className="flex gap-2 justify-center">
                <span className="rounded-full px-3 py-[2px] bg-slate-100 text-[10px]">
                    Vendor
                </span>
                <span
                    className={`rounded-full px-3 py-[2px] text-[10px] font-medium flex items-center gap-1 ${
                        selectedItem?.isActive
                            ? 'bg-green-100 text-green-500'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {' '}
                    {selectedItem?.isActive ? (
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    ) : (
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                    {selectedItem?.isActive ? 'Active' : 'Deactive'}{' '}
                </span>
            </div>

            <div className="text-center text-slate-500">
                {/* Vendor Name */}
                <div className="text-[15px]"> {selectedItem?.vendorName}</div>

                {/* Mobile */}
                <div className="text-center text-slate-400 text-[13px]">
                    {selectedItem?.mobile}
                </div>
            </div>

            {/* Action Icon */}
            <div className="border-b pt-1 pb-2">
                <div className="flex gap-4 justify-center items-center ">
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
                                <div className="text-[11px]">
                                    {' '}
                                    {icon.label}{' '}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-center">
                    <span
                        onClick={changeStatus}
                        className={`rounded-full px-3 py-[2px] text-[10px] font-medium flex items-center gap-1 cursor-pointer ${
                            !selectedItem?.isActive
                                ? 'bg-green-100 text-green-500'
                                : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {selectedItem?.isActive ? 'Deactivate ' : 'Activate '}
                        Vendor{' '}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VendorInfoCard
