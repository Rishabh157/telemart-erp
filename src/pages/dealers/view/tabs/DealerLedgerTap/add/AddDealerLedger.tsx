import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './AddDealerLedgerTabWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { SelectOption } from 'src/models/FormField/FormField.model'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        noteTypeOptions: SelectOption[]
    }
}

const AddDealerLedger = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
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
                            <ATMSelectSearchable
                                name="noteType"
                                value={values.noteType}
                                selectLabel="Note Type"
                                onChange={(value) =>
                                    setFieldValue('noteType', value)
                                }
                                options={dropdownOptions.noteTypeOptions}
                                label="Note Type"
                            />

                            <ATMTextField
                                name="price"
                                required
                                value={values.price}
                                label="Price"
                                placeholder="Price"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setFieldValue('price', e.target.value)
                                    }
                                }}
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
