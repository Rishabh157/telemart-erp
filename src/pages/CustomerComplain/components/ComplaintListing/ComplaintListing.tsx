import React from 'react'
import moment from 'moment'
import { CiEdit } from 'react-icons/ci'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import EditCustomerComplaintDetailsWrapper from '../CustomerComplaintDetails/EditCustomerComplaintDetailsWrapper'

type Props = {
    rows?: any[]
}

const ComplaintListing = ({ rows }: Props) => {
    const [selectedComplaintId, setSelectedComplaintId] =
        React.useState<string>('')
    const [
        isOpenCustomerComplaitDetailModel,
        setIsOpenCustomerComplaitDetailModel,
    ] = React.useState<boolean>(false)

    console.log('rows', rows)

    return (
        <div className="mt-1 w-full">
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
            <table className="border border-gray-400 w-full">
                <thead>
                    <tr className="bg-#cdddf2">
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Action
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            No.
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Date
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Order No.
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Call Type
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Issue Category (IC1:IC2:IC3)
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Status (Return Type)
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Stage
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Last Remark
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Last Updated By
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Last Updated Date
                        </th>
                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                            Total Calls
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows?.map((ele, ind) => {
                        return (
                            <tr className="bg-#cdddf2" key={ind}>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    {ele?.status !== 'CLOSED' && (
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
                                    )}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    {ele?.orderNumber}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
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
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    {ele?.orderNumber}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    {ele?.callType}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    {ele?.initialCallOneLabel}
                                    {':'}
                                    <br />
                                    {ele?.initialCallTwoLabel}
                                    {':'}
                                    <br />
                                    {ele?.initialCallThreeLabel}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    {ele?.status}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    -
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    {ele?.remark}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    -
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                    {moment(ele?.updatedAt).format(
                                        'DD-MM-YYYY'
                                    )}
                                    {moment(ele?.updatedAt).format(
                                        'hh:mm:ss A'
                                    )}
                                </td>
                                <td className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
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
