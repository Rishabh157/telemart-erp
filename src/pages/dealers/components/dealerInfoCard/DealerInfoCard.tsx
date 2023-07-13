/// ==============================================
// Filename:FilterDialog.tsx
// Type: Card Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Avatar } from '@mui/material'
import { IconType } from 'react-icons'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { useChangeDealerStatusMutation } from 'src/services/DealerServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
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
                    Dealer
                </span>
                <span
                    className={`rounded-full px-3 py-[2px] text-[10px] font-medium flex items-center gap-1 ${
                        selectedItem?.isActive
                            ? 'bg-green-100 text-green-500'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {selectedItem?.isActive ? (
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    ) : (
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                    {selectedItem?.isActive ? 'Active' : 'Deactive'}{' '}
                </span>
            </div>

            <div className="  text-slate-500  ">
                {/* Dealer Name */}
                <div className=" text-black text-[13px] grid grid-flow-col justify-stretch  px-4  ">
                    <h2> Name </h2> <h2>: </h2>
                    <p className="font-bold text-start">
                        {selectedItem?.firstName}
                    </p>
                </div>

                {/* Mobile */}
                <div className=" text-black text-[13px] grid grid-flow-col justify-stretch  px-4  ">
                    <h2> Mobile No. </h2> <h2>: </h2>
                    <p className="font-bold text-start">
                        {selectedItem?.contactInformation[0].mobileNumber}
                    </p>
                </div>
                <div className=" text-black text-[13px] grid grid-flow-col justify-stretch  px-4  ">
                    <h2> Zo. Manager </h2> <h2>: </h2>
                    <p className="font-bold text-start">
                        {selectedItem?.zonalManagerName}
                    </p>
                </div>
                <div className=" text-black text-[13px] grid grid-flow-col justify-stretch  px-4 ">
                    <h2>Zo. Executive. </h2> <h2>: </h2>
                    <p className="font-bold text-start">
                        {selectedItem?.zonalDistribution}
                    </p>
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
