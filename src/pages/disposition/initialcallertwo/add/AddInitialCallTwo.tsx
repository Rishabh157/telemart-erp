import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddInitialCallTwoWrapper'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        initicalCallOneOptions: SelectOption[]
    }
}

const AddInitialCallTwo = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Initial Call',
            path: '/dispositions/initialCall-two',
        },
        {
            label: 'Add',
        },
    ]

    return (
        <>
            <div className="">
                <div className="p-4 flex flex-col gap-2  ">
                    {/* Breadcrumbs */}
                    <div className="">
                        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                    </div>

                    {/* Page Heading */}
                    <div className="pt-1">
                        <ATMPageHeading> Add </ATMPageHeading>
                    </div>

                    <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                        <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                            {/* Form Heading */}
                            <div className="text-xl font-medium"> Details </div>

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
                                    Submit
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="grow py-8 px-3 ">
                            <div className="grid grid-cols-3 gap-4">
                                {/* languageName */}
                                <ATMSelectSearchable
                                    options={
                                        dropdownOptions.initicalCallOneOptions
                                    }
                                    name="initialCallOneId"
                                    value={values.initialCallOneId}
                                    label="Initial Call One"
                                    onChange={(e) =>
                                        setFieldValue('initialCallOneId', e)
                                    }
                                />
                                <ATMTextField
                                    name="initialCallName"
                                    value={values.initialCallName}
                                    placeholder="Name"
                                    label="Initial Call  Name"
                                    onChange={(e) =>
                                        setFieldValue(
                                            'initialCallName',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddInitialCallTwo
