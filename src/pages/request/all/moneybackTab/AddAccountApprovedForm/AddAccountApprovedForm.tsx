// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
// import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddAccountApprovedFormWrapper'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { handleValidNumber } from 'src/utils/methods/numberMethods'
import { NumberToWordsConverter } from 'src/utils/numberToEnglishWord'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddAccountApprovedForm = ({ formikProps, apiStatus }: Props) => {
    const dispatch = useDispatch()
    const { values, setFieldValue } = formikProps
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="h-[calc(50vh-20px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat pb-4">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            Add Account Information
                        </div>

                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    setFieldValue('accountApproval', false)
                                    formikProps.handleSubmit()
                                }}
                                className={`bg-red-500 rounded py-1 px-5 text-white border border-red-500 mr-3 ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Rejected
                            </button>
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
                                    handleValidNumber(e) &&
                                        handleSetFieldValue(
                                            'amountInWords',
                                            e.target.value
                                                ? NumberToWordsConverter.convert(
                                                      parseInt(e.target.value)
                                                  )
                                                : ''
                                        )
                                }}
                            />

                            <ATMTextField
                                readOnly
                                disabled
                                required
                                name="amountInWords"
                                value={values?.amountInWords}
                                label="Enter Amount In Words"
                                placeholder="Enter amount in words"
                                className="mt-0 rounded"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'amountInWords',
                                        e.target.value
                                    )
                                }
                            />

                            <div className="-mt-3">
                                <ATMTextArea
                                    required
                                    minRows={4}
                                    name="accountRemark"
                                    value={values?.accountRemark}
                                    labelClass="text-sm text-slate-700 font-medium -mb-3"
                                    className="rounded"
                                    label="Account Remark "
                                    placeholder="Enter account remark"
                                    onChange={(newValue) =>
                                        setFieldValue('accountRemark', newValue)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAccountApprovedForm
