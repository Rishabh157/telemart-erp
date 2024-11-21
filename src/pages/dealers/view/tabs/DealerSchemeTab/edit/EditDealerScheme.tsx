// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { UpdateDealerSchemeInitialValues } from 'src/models/DealerScheme.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<UpdateDealerSchemeInitialValues>
    schemeOptions: any
    apiStatus: boolean
    pinCodeOptions: SelectOption[]
}

const EditDealerScheme = ({
    formikProps,
    schemeOptions,
    apiStatus,
    pinCodeOptions,
}: Props) => {
    const [allOptions, setAllOtions] = useState([])
    const [flag, setFlag] = useState(true)
    const { values, setFieldValue } = formikProps

    useEffect(() => {
        if (flag && schemeOptions?.length) {
            setFlag(false)
            setAllOtions(schemeOptions)
        }
    }, [flag, schemeOptions])


    return (
        <div>
            <div className=" flex flex-col gap-2">
                <div className="h-[calc(100vh-195px)] grow max-h-full bg-white border bg-1 rounded shadow bg-form-bg bg-cover bg-no-repeat p-4">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Edit Scheme </div>
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
                    <div className="grid grid-cols-12 gap-x-4 pb-4">
                        <div className="col-span-3">
                            <div className='mt-3'>
                                <ATMSelectSearchable
                                    isAllSelect
                                    name='schemeId'
                                    label="Scheme"
                                    value={values?.schemeId}
                                    options={allOptions || []}
                                    selectClass='mt-2 select-margin' // max-h-11
                                    onChange={(value) => setFieldValue('schemeId', value)}
                                />
                            </div>
                        </div>

                        <div className="col-span-9">
                            <ATMSelectSearchable
                                isAllSelect
                                name='pincodes'
                                value={values?.pincodes || []}
                                options={pinCodeOptions}
                                label="Pincode"
                                isMulti={true}
                                selectClass='mt-2 ' // max-h-11
                                onChange={(value) => setFieldValue('pincodes', value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDealerScheme
