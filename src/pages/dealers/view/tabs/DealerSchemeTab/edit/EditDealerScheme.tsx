import React, { useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { UpdateDealerSchemeInitialValues } from 'src/models/DealerScheme.model'

type Props = {
    formikProps: FormikProps<UpdateDealerSchemeInitialValues>
    schemeOptions: any
    apiStatus: boolean,
    pinCodeOptions: SelectOption[]
}

const EditDealerScheme = ({ formikProps, schemeOptions, apiStatus, pinCodeOptions }: Props) => {
    const [allOptions, setAllOtions] = useState([])
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        if (flag && schemeOptions?.length) {
            setFlag(false)
            setAllOtions(schemeOptions)
        }
    }, [flag, schemeOptions])

    const { values, setFieldValue } = formikProps

    return (
        <div className="h-[calc(100%-55px)]">
            <div className=" flex flex-col gap-2  ">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat p-4">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Edit Scheme </div>

                        {/* BUTTON - Edit Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()} //handleSubmit
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${true ? 'disabled:opacity-25' : ''
                                    }`}
                            >
                                Edit Scheme
                            </button>
                        </div>
                    </div>
                    <div
                        className="grid grid-cols-12 gap-10 items-end "
                    >
                        {/* Product Name */}
                        <div className="col-span-3">
                            <ATMSelect
                                name={'schemeId'}
                                value={
                                    values?.schemeId || ""
                                }
                                onChange={(
                                    e
                                ) =>
                                    setFieldValue(
                                        'schemeId',
                                        e
                                            .target
                                            .value
                                    )
                                }
                                options={
                                    allOptions
                                }
                                label="Scheme"
                            />
                        </div>

                        {/* pincodes */}
                        <div className="col-span-9">
                            <ATMSelectSearchable
                                name={'pincodes'}
                                value={
                                    values?.pincodes || []
                                }
                                onChange={(
                                    value
                                ) =>
                                    setFieldValue(
                                        'pincodes', value
                                    )
                                }
                                options={
                                    pinCodeOptions
                                }
                                label="Pincode"
                                isMulti={true}
                                selectClass={" mt-2 max-h-11 select-margin"}
                            />
                        </div>

                    </div>

                </div>

            </div>
        </div >
    )
}

export default EditDealerScheme
