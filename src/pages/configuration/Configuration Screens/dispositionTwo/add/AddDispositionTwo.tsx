import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddDispositionTwoWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { SelectOption } from 'src/models/FormField/FormField.model'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        dispositiononeoption: SelectOption[]
    }
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Disposition Two',
        path: '/configurations/disposition-Two',
    },
    {
        label: 'Add Disposition',
    },
]

const AddDispositionTwo = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <div className="h-[calc(100%-55px)]">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Disposition Two </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            {' '}
                            Disposition Two details{' '}
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
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
                            {/* Field1 */}
                            <ATMSelect
                                name="dispositionOneId"
                                value={values.dispositionOneId}
                                onChange={(e) => {
                                    setFieldValue(
                                        'dispositionOneId',
                                        e.target.value
                                    )
                                }}
                                options={dropdownOptions.dispositiononeoption}
                                label="Disposition One Name"
                            />

                            <ATMTextField
                                name="dispositionName"
                                value={values.dispositionName}
                                label="Disposition Name"
                                placeholder="Disposition Name"
                                onChange={(e) =>
                                    setFieldValue(
                                        'dispositionName',
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

export default AddDispositionTwo
