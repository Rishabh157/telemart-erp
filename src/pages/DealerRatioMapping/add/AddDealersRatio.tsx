/// ==============================================
// Filename:AddDealersRatio.tsx
// Type: Add Component
// Last Updated: JULY 10, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import { FormInitialValues } from './AddDealersRatioWapper'
// import  {
//     BreadcrumbType,
// } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddDealersRatio = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            Dealer using same Pincode
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-2 pb-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* FirstName */}
                            <ATMTextField
                                name="DealerName"
                                value={values.dealerName}
                                label="Dealer Name"
                                placeholder="Dealer Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'dealerName',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMTextField
                                name="ratio"
                                value={values.ratio}
                                label="Ratio"
                                placeholder="Ratio"
                                onChange={(e) =>
                                    handleSetFieldValue('ratio', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="priority"
                                value={values.priority}
                                label="Priority"
                                placeholder="Priority"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'priority',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDealersRatio
