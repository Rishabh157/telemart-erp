import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './AddDispositionThreeWrappper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        DispotionOneOptions: SelectOption[]
        DispositionTwoOptions: SelectOption[]
        priorityOptions: SelectOption[]
        smsTypeOptions: SelectOption[]
        emailTypeOptions: SelectOption[]
        applicableCriteriaOptions: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Disposition-Three',
        path: '/dispositions/disposition-three',
    },
    {
        label: 'Add ',
    },
]

const AddDispositionThree = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps

    dropdownOptions = {
        ...dropdownOptions,
    }

    return (
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
                        <div className="text-xl font-medium">Details</div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    formikProps.handleSubmit()
                                }}
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
                            {/* FirstName */}
                            <ATMTextField
                                name="dispositionName"
                                value={values.dispositionName}
                                label="Disposition Name"
                                required
                                placeholder="Disposition Name"
                                onChange={(e) => {
                                    setFieldValue(
                                        'dispositionName',
                                        e.target.value
                                    )
                                }}
                            />
                            <ATMSelectSearchable
                                name="dispositionOneId"
                                value={values.dispositionOneId}
                                onChange={(e) =>
                                    setFieldValue('dispositionOneId', e)
                                }
                                options={dropdownOptions.DispotionOneOptions}
                                label="Disposition One"
                            />

                            <div className="">
                                <ATMSelectSearchable
                                    name="dispositionTwoId"
                                    required
                                    value={values.dispositionTwoId}
                                    onChange={(e) =>
                                        setFieldValue('dispositionTwoId', e)
                                    }
                                    options={
                                        dropdownOptions.DispositionTwoOptions
                                    }
                                    label="Disposition Two"
                                />
                            </div>

                            <ATMSelectSearchable
                                name="smsType"
                                required
                                value={values.smsType}
                                onChange={(e) => setFieldValue('smsType', e)}
                                options={dropdownOptions.smsTypeOptions}
                                label="SMS Type"
                            />

                            <ATMSelectSearchable
                                name="emailType"
                                required
                                value={values.emailType}
                                onChange={(e) => setFieldValue('emailType', e)}
                                options={dropdownOptions.emailTypeOptions}
                                label="Email Type"
                            />

                            <ATMSelectSearchable
                                name="priority"
                                required
                                value={values.priority}
                                onChange={(e) => setFieldValue('priority', e)}
                                options={dropdownOptions.priorityOptions}
                                label="Priority"
                            />

                            <ATMSelectSearchable
                                name="applicableCriteria"
                                required
                                isMulti={true}
                                value={values.applicableCriteria}
                                onChange={(e) =>
                                    setFieldValue('applicableCriteria', e)
                                }
                                options={
                                    dropdownOptions.applicableCriteriaOptions
                                }
                                label="Applicable Criteria"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDispositionThree
