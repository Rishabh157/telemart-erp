import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddDispositionComplaintWrapper'
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
        smstypeOptions: SelectOption[]
        emailTypeOptions: SelectOption[]
        priorityOptions: SelectOption[]
    }
}

const AddDispositionComplaint = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Disposition-Comaplaint',
            path: '/dispositions/disposition-complaint',
        },
        {
            label: 'Add Disposition-complaint',
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
                                <ATMTextField
                                    name="dispositionName"
                                    value={values.dispositionName}
                                    label="Disposition Name"
                                    placeholder="Name"
                                    onChange={(e) =>
                                        setFieldValue(
                                            'dispositionName',
                                            e.target.value
                                        )
                                    }
                                />
                                <ATMSelectSearchable
                                    options={dropdownOptions.emailTypeOptions}
                                    name="emailType"
                                    value={values.emailType}
                                    label="Email Type"
                                    onChange={(e) =>
                                        setFieldValue('emailType', e)
                                    }
                                />
                                <ATMSelectSearchable
                                    options={dropdownOptions.smstypeOptions}
                                    name="smsType"
                                    value={values.smsType}
                                    label="SMS Type "
                                    onChange={(e) =>
                                        setFieldValue('smsType', e)
                                    }
                                />
                                <ATMSelectSearchable
                                    options={dropdownOptions.priorityOptions}
                                    name="priority"
                                    value={values.priority}
                                    label="Priority"
                                    onChange={(e) =>
                                        setFieldValue('priority', e)
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

export default AddDispositionComplaint
