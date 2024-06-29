// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddOrderCancelRequestWrapper'
import { getCancelOrderReasonTypeOptions } from 'src/utils/constants/customeTypes'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { handleValidNumber } from 'src/utils/methods/numberMethods'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Order Cancel Request',
        path: '/order-cancel-request',
    },
    {
        label: 'Add',
    },
]

const AddOrderCancelRequest = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="h-[calc(100vh-55px)] overflow-auto">
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add Order Cancel Request </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                disabled={apiStatus}
                                type="button"
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-3 pt-2 grow pb-9 ">
                        <div className="grid grid-cols-4 gap-4">
                            {/* Order Number */}
                            <ATMTextField
                                required
                                name="orderNumber"
                                value={values.orderNumber}
                                label="Order Number"
                                placeholder="Sub Category Code"
                                className="mt-0 rounded"
                                onChange={(e) => {
                                    handleValidNumber(e) &&
                                        handleSetFieldValue(
                                            'orderNumber',
                                            e.target.value
                                        )
                                }}
                            />

                            <ATMSelectSearchable
                                required
                                name="cancelReason"
                                value={values.cancelReason}
                                onChange={(e) => {
                                    handleSetFieldValue('cancelReason', e)
                                }}
                                options={getCancelOrderReasonTypeOptions()}
                                label="Reason"
                            />

                            <ATMTextArea
                                required
                                minRows={4}
                                placeholder="Enter remark"
                                name="remark"
                                value={values.remark}
                                label="Remark"
                                className="rounded"
                                onChange={(newValue) =>
                                    handleSetFieldValue('remark', newValue)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOrderCancelRequest
