// |-- External Dependencies --|
import { Avatar } from '@mui/material'
import { IconType } from 'react-icons'

// |-- Internal Dependencies --|
import {
    useChangeDealerStatusMutation,
    useGetDealerByIdQuery,
} from 'src/services/DealerServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

// |-- Redux --|
import { isAuthorized } from 'src/utils/authorization'
import { useParams } from 'react-router-dom'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
type Props = {
    dealerData: any
    actionIcons?: {
        icon: IconType
        onClick: () => void
        label: string
    }[]
    selectedItem?: any
}
const DealerInfoCard = ({ dealerData, actionIcons }: Props) => {
    const [changeDealerStatus] = useChangeDealerStatusMutation()
    const params = useParams()
    const Id = params.dealerId
    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetDealerByIdQuery(Id),
    })

    const changeStatus = () => {
        showConfirmationDialog({
            title: selectedItem?.isActive
                ? 'Deactivate Dealer'
                : 'Activate Dealer',
            text: selectedItem?.isActive
                ? 'Do you want to Deactivate Dealer ?'
                : 'Do you want to Activate Dealer ?',
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
            <div className="flex mx-1 justify-center"
                title={selectedItem?.firmName}
            >
                <h2 className='truncate w-full text-center'>
                    {selectedItem?.firmName}
                </h2>
            </div>

            {/* Chips */}
            <div className="flex gap-2 justify-center">
                <span className="rounded-full px-3 py-[2px] bg-slate-100 text-[10px]">
                    Dealer
                </span>
                <span className={`rounded-full px-3 py-[2px] text-[10px] font-medium flex items-center gap-1 ${selectedItem?.isActive
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

            <div className="text-black px-4 space-y-3 mt-4">
                {/* Dealer Name */}
                <div className="flex items-center">
                    <h2 className="text-[14px] font-bold w-2/3">Name</h2>
                    <h2 className="text-[14px] font-bold mr-[6px] text-center">:</h2>
                    <p className="text-[12px] font-bold w-2/3 truncate"
                        title={selectedItem?.firstName?.concat(' ', selectedItem?.lastName)}
                    >
                        {selectedItem?.firstName?.concat(' ', selectedItem?.lastName) || "N/A"}
                    </p>
                </div>

                {/* Dealer Code */}
                <div className="flex items-center">
                    <h2 className="text-[14px] font-bold w-2/3">Dealer Code</h2>
                    <h2 className="text-[14px] font-bold mr-[6px] text-center">:</h2>
                    <p className="text-[12px] font-bold w-2/3 truncate"
                        title={selectedItem?.dealerCode}
                    >
                        {selectedItem?.dealerCode || "N/A"}
                    </p>
                </div>

                {/* Mobile No. */}
                <div className="flex items-center">
                    <h2 className="text-[14px] font-bold w-2/3">Mobile No.</h2>
                    <h2 className="text-[14px] font-bold mr-[6px] text-center">:</h2>
                    <p className="text-[12px] font-bold w-2/3 truncate"
                        title={selectedItem?.registrationAddress?.phone}
                    >
                        {selectedItem?.registrationAddress?.phone || "N/A"}
                    </p>
                </div>

                {/* Zonal Manager */}
                <div className="flex items-center">
                    <h2 className="text-[14px] font-bold w-2/3">Zo. Manager</h2>
                    <h2 className="text-[14px] font-bold mr-[6px] text-center">:</h2>
                    <p className="text-[12px] font-bold w-2/3 truncate"
                        title={selectedItem?.zonalManagerLabel}
                    >
                        {selectedItem?.zonalManagerLabel || "N/A"}
                    </p>
                </div>

                {/* Zonal Executive */}
                <div className="flex items-center">
                    <h2 className="text-[14px] font-bold w-2/3">Zo. Executive</h2>
                    <h2 className="text-[14px] font-bold mr-[6px] text-center">:</h2>
                    <p className="text-[12px] font-bold w-2/3 truncate"
                        title={selectedItem?.zonalExecutiveLabel}
                    >
                        {selectedItem?.zonalExecutiveLabel || "N/A"}
                    </p>
                </div>
            </div>

            {/* Action Icon */}
            <div className={`flex gap-4 border-b justify-center items-center pt-1 pb-3`}>
                <span
                    onClick={() =>
                        isAuthorized(
                            UserModuleNameTypes.ACTION_DEALER_ACTIVATE_DEACTIVATE
                        ) && changeStatus()
                    }
                    className={`rounded-full px-3 py-[2px] text-[10px] font-medium flex items-center gap-1 cursor-pointer ${!selectedItem?.isActive
                        ? 'bg-green-100 text-green-500'
                        : 'bg-red-100 text-red-700'
                        }`}
                >
                    {selectedItem?.isActive ? 'Deactivate ' : 'Activate '}
                    Dealer
                </span>
            </div>
        </div>
    )
}

export default DealerInfoCard
