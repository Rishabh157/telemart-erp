import { useState } from 'react'
import moment from 'moment'
import { CiEdit } from 'react-icons/ci'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import EditCustomerComplaintDetailsWrapper from '../CustomerComplaintDetails/EditCustomerComplaintDetailsWrapper'
import { FaEye } from 'react-icons/fa'
import 'rsuite/dist/rsuite-no-reset.min.css'
import SingleComplaintListingLogsWrapper from './SingleComplaintLogs/SingleComplaintListingLogsWrapper'

type Props = {
    rows?: any[]
}

const isDisableEdit = [
    'MONEYBACK',
    'PRODUCTREPLACEMENT',
    'DELIVERYBOYHOUSEARRESTCASE',
]

const ComplaintListing = ({ rows }: Props) => {
    const [selectedComplaintId, setSelectedComplaintId] = useState<string>('')
    const [isOpenCustomerComplaitDetailModel, setIsOpenCustomerComplaitDetailModel] = useState<boolean>(false)
    const [isFlowDialogShow, setIsFlowDialogShow] = useState<boolean>(false)

    return (
        <div className="mt-1 w-full">
            {/* Edit Complaint Form */}
            <DialogLogBox
                isOpen={isOpenCustomerComplaitDetailModel}
                handleClose={() => {
                    setIsOpenCustomerComplaitDetailModel(false)
                    setSelectedComplaintId('')
                }}
                component={
                    <EditCustomerComplaintDetailsWrapper
                        complaintId={selectedComplaintId}
                        handleClose={() => {
                            setIsOpenCustomerComplaitDetailModel(false)
                            setSelectedComplaintId('')
                        }}
                    />
                }
            />

            {/* Closed Complaint Flow */}
            <DialogLogBox
                isOpen={isFlowDialogShow}
                handleClose={() => {
                    setIsFlowDialogShow(false)
                    // setSelectedFlowItem([])
                }}
                component={
                    <div className="py-4 px-4">
                        <SingleComplaintListingLogsWrapper
                            complaintId={selectedComplaintId}
                        />
                    </div>
                }
            />

            <table className="border border-gray-400 w-full">
                <thead>
                    <tr className="bg-#cdddf2">
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Action
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            No.
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Date
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Order No.
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Call Type
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Issue Category (IC1:IC2:IC3)
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Status (Return Type)
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Stage
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Last Remark
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Last Updated By
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Last Updated Date
                        </th>
                        <th className="border border-gray-400 py-1 px-2 bg-[#295F98] text-xs font-bold text-center text-white">
                            Total Calls
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows?.map((ele, ind) => {
                        return (
                            <tr className="bg-#cdddf2" key={ind}>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    {ele?.status !== 'CLOSED' &&
                                        !isDisableEdit?.includes(
                                            ele?.icOneLabel
                                        ) ? (
                                        <div className="flex justify-center items-center">
                                            <CiEdit
                                                onClick={() => {
                                                    setSelectedComplaintId(
                                                        ele?._id
                                                    )
                                                    setIsOpenCustomerComplaitDetailModel(
                                                        true
                                                    )
                                                }}
                                                className="cursor-pointer"
                                                size={18}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center">
                                            <FaEye
                                                className="cursor-pointer"
                                                size={18}
                                                onClick={() => {
                                                    setIsFlowDialogShow(true)
                                                    setSelectedComplaintId(ele?._id)
                                                }}
                                            />
                                        </div>
                                    )}
                                </td>

                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    {ele?.complaintNumber}
                                </td>

                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    <div className="flex flex-col">
                                        <span>
                                            {moment(ele?.createdAt).format(
                                                'DD-MM-YYYY'
                                            )}
                                        </span>
                                        <span>
                                            {' '}
                                            {moment(ele?.createdAt).format(
                                                'hh:mm:ss A'
                                            )}
                                        </span>
                                    </div>
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    {ele?.orderNumber}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    {ele?.callType}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    {ele?.initialCallOneLabel}
                                    {':'}
                                    <br />
                                    {ele?.initialCallTwoLabel}
                                    {':'}
                                    <br />
                                    {ele?.initialCallThreeLabel}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    {ele?.status}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    -
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    {ele?.remark}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    -
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    {moment(ele?.updatedAt).format(
                                        'DD-MM-YYYY'
                                    )}
                                    {moment(ele?.updatedAt).format(
                                        'hh:mm:ss A'
                                    )}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-xs text-center text-slate-600 font-bold">
                                    -
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ComplaintListing
