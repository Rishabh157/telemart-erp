import { FormikProps } from 'formik'
import React from 'react'
import { FormInitialValues } from './AddTapeManagementWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { SelectOption } from 'src/models/FormField/FormField.model'
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelGroupOptions: SelectOption[]
        schemeDataOption: SelectOption[]
        languageOptions: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Tape Management',
        path: '/media/tape',
    },
    {
        label: 'Add Tape',
    },
]

const AddTapeManagement = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps
    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Tape </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">Tape Details</div>

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
                            {/* FirstName */}
                            <ATMTextField
                                name="tapeName"
                                value={values.tapeName}
                                label="Tape Name"
                                placeholder="Tape Name"
                                onChange={(e) =>
                                    setFieldValue('tapeName', e.target.value)
                                }
                            />

                            <ATMTextField
                                name="tapeType"
                                value={values.tapeType}
                                label="Tape Type"
                                placeholder="Tape Type"
                                onChange={(e) =>
                                    setFieldValue('tapeType', e.target.value)
                                }
                            />
                            <ATMSelect
                                name="scheme"
                                value={values.scheme}
                                onChange={(e) =>
                                    setFieldValue('scheme', e.target.value)
                                }
                                options={dropdownOptions.schemeDataOption}
                                label="scheme"
                            />
                            <ATMSelect
                                name="channelGroup"
                                value={values.channelGroup}
                                onChange={(e) =>
                                    setFieldValue(
                                        'channelGroup',
                                        e.target.value
                                    )
                                }
                                options={dropdownOptions.channelGroupOptions}
                                label="Channel Group"
                            />
                            <ATMSelect
                                name="language"
                                value={values.language}
                                onChange={(e) =>
                                    setFieldValue('language', e.target.value)
                                }
                                options={dropdownOptions.languageOptions}
                                label="Language"
                            />
                            <ATMTextField
                                name="remarks"
                                value={values.remarks}
                                label="Remarks"
                                placeholder="Remarks"
                                onChange={(e) =>
                                    setFieldValue('remarks', e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTapeManagement
