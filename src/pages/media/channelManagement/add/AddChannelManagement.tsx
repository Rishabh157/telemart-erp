import { FormikProps } from 'formik'
import React from 'react'
import { FormInitialValues } from './AddChannelManagementWrapper'
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
        didDataOption: SelectOption[]
        schemeDataOption: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Channel Management',
        path: '/media/channel-management',
    },
    {
        label: 'Add Channel',
    },
]

const AddChannelManagement = ({
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
                    <ATMPageHeading> Add New Channel </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            Channel Details
                        </div>

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
                            <ATMSelect
                                name="didNumber"
                                value={values.didNumber}
                                onChange={(e) =>
                                    setFieldValue('didNumber', e.target.value)
                                }
                                options={dropdownOptions.didDataOption}
                                label="Did number"
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
                                name="channelGroupId"
                                value={values.channelGroupId}
                                onChange={(e) =>
                                    setFieldValue(
                                        'channelGroupId',
                                        e.target.value
                                    )
                                }
                                options={dropdownOptions.channelGroupOptions}
                                label="Channel Group"
                            />
                            <ATMTextField
                                name="channelName"
                                value={values.channelName}
                                label="Channel Name"
                                placeholder="Channel Name"
                                onChange={(e) =>
                                    setFieldValue('channelName', e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddChannelManagement
