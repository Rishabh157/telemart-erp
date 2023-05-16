import { Avatar } from '@mui/material'
import React from 'react'
import { IconType } from 'react-icons'
import { GoPrimitiveDot } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useChangeDealerStatusMutation } from 'src/services/DealerServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

type Props = {
    dealerData: any
    actionIcons?: {
        icon: IconType
        onClick: () => void
        label: string
    }[]
}
const DealerInfoCard = ({ dealerData, actionIcons }: Props) => {
    const [changeDealerStatus] = useChangeDealerStatusMutation()
    const { selectedItem }: any = useSelector(
        (state: RootState) => state.dealer
    )
    const changeStatus = () => {
        showConfirmationDialog({
            title: 'Activate Dealer',
            text: 'Do you want to Activate Dealer ?',
            showCancelButton: true,
            next: (res: any) => {
                return res.isConfirmed ? DealerStatus() : false
            },
        })
    }

    const DealerStatus = () => {
        changeDealerStatus(selectedItem?._id).then((res) => {
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
                    {' '}
                    Dealer{' '}
                </span>
                <span
                    className={`rounded-full px-3 py-[2px] text-[10px] font-medium flex items-center gap-1 ${
                        selectedItem?.isActive
                            ? 'bg-green-100 text-green-500'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {' '}
                    <GoPrimitiveDot className="text-lg" />{' '}
                    {selectedItem?.isActive ? 'Active' : 'Deactive'}{' '}
                </span>
            </div>

            <div className="text-center text-slate-500">
                {/* Dealer Name */}
                <div className="text-[15px]">{selectedItem?.firstName}</div>

                {/* Mobile */}
                <div className="text-center text-slate-400 text-[13px]">
                    {selectedItem?.contactInformation[0].mobileNumber}
                </div>
            </div>

            {/* Action Icon */}
            <div
                className={`flex gap-4 border-b justify-center items-center pt-1 pb-3`}
            >
                {/* {actionIcons?.map((icon, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                icon.onClick();
              }}
              className="text-lg text-slate-500 cursor-pointer flex justify-center flex-col"
            >
              <div className="flex justify-center">
                <icon.icon />
              </div>
              <div className="text-[11px]"> {icon.label} </div>
            </div>
          );
        })} */}
                <span
                    onClick={changeStatus}
                    className={`rounded-full px-3 py-[2px] text-[10px] font-medium flex items-center gap-1 cursor-pointer ${
                        !selectedItem?.isActive
                            ? 'bg-green-100 text-green-500'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {selectedItem?.isActive ? 'Deactivate ' : 'Activate '}
                    Dealer{' '}
                </span>
            </div>
        </div>
    )
}

export default DealerInfoCard
