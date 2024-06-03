// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

// |-- Redux --|
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllCourierPreferenceQuery } from 'src/services/CourierPreferenceService'
import { getCourierRtoRequestStatusOptions } from 'src/utils/constants/customeTypes'
import { FormInitialValues } from './AddCourierReturnWrapper'
import { handleValidNumber } from 'src/utils/methods/numberMethods'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>

    apiStatus: boolean
}

const AddCourierReturn = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const { id: warehouseId } = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const { options: courierOptions } = useCustomOptions({
        useEndPointHook: useGetAllCourierPreferenceQuery(''),
        keyName: 'courierName',
        value: 'courierName',
    })

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Courier Return',
            path: `/warehouse/view/${warehouseId}/inward-inventories/courier-return`,
        },
        {
            label: 'Add Courier Return',
        },
    ]

    return (
        <div className=" h-[calc(100vh-200px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div>
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            Courier Return
                        </div>

                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
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
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            <ATMSelectSearchable
                              required
                              name="shippingProvider"
                                label="Shipping Provider"
                                value={values?.shippingProvider}
                                componentClass="mt-0"
                                options={courierOptions}
                                onChange={(e) =>
                                    handleSetFieldValue('shippingProvider', e)
                                }
                            />

                            <ATMSelectSearchable
                              required
                              name="requestStatus"
                                label="Request Status"
                                value={values?.requestStatus}
                                componentClass="mt-0"
                                options={getCourierRtoRequestStatusOptions()}
                                onChange={(e) =>
                                    handleSetFieldValue('requestStatus', e)
                                }
                            />

                            <ATMTextField
                              required
                              name="orderNumber"
                                value={values?.orderNumber}
                                label="Order Number"
                                placeholder="Enter order number"
                                className="rounded"
                                extraClassField="m-0"
                                onChange={(e) => {
                                    handleValidNumber(e) &&
                                        handleSetFieldValue(
                                            'orderNumber',
                                            e.target.value
                                        )
                                }}
                            />

                            <ATMTextArea
                                label="Comment"
                              required
                                name="comment"
                                placeholder="Enter Remark"
                                value={values?.comment}
                                minRows={4}
                                className="rounded mt-0"
                                labelClass="text-slate-700 text-sm font-medium"
                                onChange={(e) => {
                                    handleSetFieldValue('comment', e)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourierReturn
