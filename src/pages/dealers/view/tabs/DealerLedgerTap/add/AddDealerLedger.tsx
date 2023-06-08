import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './AddDealerLedgerTabWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'


type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddDealerLedger = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    return (
        <div className="h-[calc(100%-55px)]">
            <div className="p-4 flex flex-col gap-2  ">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Add </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()} //handleSubmit
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow  py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            <ATMTextField
                                name="noteType"
                                required
                                value={values.noteType}
                                label="Note Type"
                                placeholder="Note Type"
                                onChange={(e) =>
                                    setFieldValue(
                                        'noteType',
                                        e.target.value
                                    )
                                }
                            /> 
                            <ATMTextField
                                name="price"
                                required
                                value={values.price}
                                label="Price"
                                placeholder="Price"
                                onChange={(e) =>{
                                    const inputValue =e.target.value
                                    if (!isNaN( Number(inputValue))) {
                                        setFieldValue(
                                            'price',
                                            e.target.value
                                        )
                                }}}

                            />
                            <div>
                                <ATMTextArea
                                    name={'remark'}
                                    value={values.remark}
                                    onChange={(newValue) => {
                                        setFieldValue('remark', newValue)
                                    }}
                                    label="Remark"
                                    placeholder="Remark"
                                    className="shadow bg-white rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDealerLedger
