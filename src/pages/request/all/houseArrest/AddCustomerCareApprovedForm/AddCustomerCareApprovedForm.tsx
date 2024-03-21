// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import { FormInitialValues } from './AddCustomerCareApprovedFormWrapper'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { handleValidNumber } from 'src/utils/methods/numberMethods'
import { useGetOldOrderDetailsByOrderNumberQuery } from 'src/services/OrderService'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    newOrderDetails: any
    apiStatus: boolean
}

type OldOrderDetailsType = {
    orderNumber: string
    mobileNo: string
    autoFillingShippingAddress: string
    customerName: string
}

const AddCustomerCareApprovedForm = ({
    formikProps,
    newOrderDetails,
    apiStatus,
}: Props) => {
    const [oldOrderDetails, setoldOrderDetails] = useState<OldOrderDetailsType>(
        {
            orderNumber: '',
            mobileNo: '',
            autoFillingShippingAddress: '',
            customerName: '',
        }
    )
    const dispatch = useDispatch()
    const { values, setFieldValue } = formikProps
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const { isLoading, isFetching, data } =
        useGetOldOrderDetailsByOrderNumberQuery(values.oldOrderNumber, {
            skip: !values.oldOrderNumber,
        })

    useEffect(() => {
        if (!isLoading && !isFetching) {
            setoldOrderDetails({
                orderNumber: data?.data?.orderNumber,
                customerName: data?.data?.customerName,
                mobileNo: data?.data?.mobileNo,
                autoFillingShippingAddress:
                    data?.data?.autoFillingShippingAddress,
            })
        }
    }, [isLoading, isFetching, data])

    return (
        <div className="h-[calc(50vh-20px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat pb-4">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">Add Details</div>

                        <button
                            type="button"
                            disabled={apiStatus}
                            onClick={() => {
                                setFieldValue('accountApproval', true)
                                formikProps.handleSubmit()
                            }}
                            className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                true ? 'disabled:opacity-25' : ''
                            }`}
                        >
                            Submit
                        </button>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-2 gap-4">
                            <ATMTextField
                                required
                                name="settledAmount"
                                value={values?.settledAmount}
                                label="Settled Amount"
                                placeholder="Enter settled amount"
                                className="mt-0 rounded"
                                onChange={(e) => {
                                    handleValidNumber(e) &&
                                        handleSetFieldValue(
                                            'settledAmount',
                                            e.target.value
                                        )
                                }}
                            />

                            <ATMTextField
                                name="oldOrderNumber"
                                value={values?.oldOrderNumber || ''}
                                label="Old Order Number"
                                placeholder="Enter old order number"
                                className="mt-0 rounded"
                                onChange={(e) => {
                                    handleValidNumber(e) &&
                                        handleSetFieldValue(
                                            'oldOrderNumber',
                                            e.target.value
                                        )
                                }}
                            />

                            <div className="-mt-3">
                                <ATMTextArea
                                    required
                                    minRows={4}
                                    name="ccRemark"
                                    value={values?.ccRemark}
                                    labelClass="text-sm text-slate-700 font-medium -mb-3"
                                    className="rounded"
                                    label="Customer Care Remark "
                                    placeholder="Enter customer care remark"
                                    onChange={(newValue) =>
                                        setFieldValue('ccRemark', newValue)
                                    }
                                />
                            </div>
                        </div>

                        {/* Table  */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border">
                                <thead>
                                    <tr className="bg-gray-200 border">
                                        <th className="px-4 py-2 border font-bold w-4/12">
                                            Order Details
                                        </th>
                                        <th className="px-4 py-2 border font-bold w-4/12">
                                            New Order Details
                                        </th>
                                        <th className="px-4 py-2 border font-bold w-4/12">
                                            Old Order Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border">
                                        <td className="px-4 py-2 border">
                                            Order Number
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {newOrderDetails?.orderNumber}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {oldOrderDetails?.orderNumber ||
                                                '-'}
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="px-4 py-2 border">
                                            Customer Name
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {newOrderDetails?.customerName}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {oldOrderDetails?.customerName ||
                                                '-'}
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="px-4 py-2 border">
                                            Customer Number
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {newOrderDetails?.mobileNo}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {oldOrderDetails?.mobileNo || '-'}
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="px-4 py-2 border">
                                            Address
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {
                                                newOrderDetails?.autoFillingShippingAddress
                                            }
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {oldOrderDetails?.autoFillingShippingAddress ||
                                                '-'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCustomerCareApprovedForm
