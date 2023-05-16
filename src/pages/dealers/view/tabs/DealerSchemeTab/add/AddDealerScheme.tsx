import React, { useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './DealerSchemeTabWrapper'
import ATMTransferList from 'src/components/UI/atoms/ATMTransferList/ATMTransferList'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    schemeOptions: any
    apiStatus: boolean
}

const AddDealerScheme = ({ formikProps, schemeOptions, apiStatus }: Props) => {
    const [allOptions, setAllOtions] = useState([])
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        if (flag && schemeOptions?.length) {
            setFlag(false)
            setAllOtions(schemeOptions)
        }
    }, [flag, schemeOptions])
    const { values, setFieldValue } = formikProps
    const options: { label: string; value: string }[] = allOptions
    const transferListProps = {
        name: 'schemes',
        options,
        right: values.schemes,
        setRight: (newValue: { label: string; value: string }[]) =>
            setFieldValue('schemes', newValue),
        leftSideTitle: 'All Schemes',
        rightSideTitle: 'Schemes to add',
    }

    return (
        <div className="h-[calc(100%-55px)]">
            <div className="p-4 flex flex-col gap-2  ">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Add Scheme </div>

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
                                Add Scheme
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow  py-8 px-3 ">
                        <div className="h-[300px] mt-8">
                            {options ? (
                                <ATMTransferList {...transferListProps} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDealerScheme
