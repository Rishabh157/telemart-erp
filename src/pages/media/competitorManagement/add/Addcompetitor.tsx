import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddCompetitorWrapper'
import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelOptions: SelectOption[]
    }
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Competitor',
        path: '/media/competitor',
    },
    {
        label: 'Add ',
    },
]

const AddCompetitor = ({ formikProps, apiStatus, dropdownOptions }: Props) => {
    dropdownOptions = {
        ...dropdownOptions,
    }
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
                    <ATMPageHeading> Add </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details</div>

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
                    <div className="grow py-2 pb-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Field1 */}

                            {/* Field 3 */}
                            <ATMTextField
                                name="competitorName"
                                value={values.competitorName}
                                label="Competitor Name"
                                placeholder="Competitor Name"
                                onChange={(e) =>
                                    setFieldValue(
                                        'competitorName',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMTextField
                                name="companyName"
                                value={values.companyName}
                                label="Company Name"
                                placeholder="Company Name"
                                onChange={(e) =>
                                    setFieldValue('companyName', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="productName"
                                value={values.productName}
                                label="Product Name"
                                placeholder="Product Name"
                                onChange={(e) =>
                                    setFieldValue('productName', e.target.value)
                                }
                            />
                            <ATMSelectSearchable
                                name="channelNameId"
                                value={values.channelNameId}
                                onChange={(e) =>
                                    setFieldValue('channelNameId', e)
                                }
                                options={dropdownOptions.channelOptions}
                                label="Channel Name"
                            />
                            <ATMTextField
                                name="schemePrice"
                                type={'text'}
                                value={values.schemePrice}
                                label="Scheme Price"
                                placeholder="Scheme Price"
                                onChange={(e) =>
                                    setFieldValue('schemePrice', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="websiteLink"
                                value={values.websiteLink}
                                label="Website Link"
                                placeholder="Website Link"
                                onChange={(e) =>
                                    setFieldValue('websiteLink', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="youtubeLink"
                                value={values.youtubeLink}
                                label="Youtube Link"
                                placeholder="Youtube Link"
                                onChange={(e) =>
                                    setFieldValue('youtubeLink', e.target.value)
                                }
                            />

                            <ATMTextField
                                name="whatsappNumber"
                                value={values.whatsappNumber}
                                label="Whatsapp Number"
                                placeholder="Whatsapp Number"
                                onChange={(e) =>
                                    setFieldValue(
                                        'whatsappNumber',
                                        e.target.value
                                    )
                                }
                            />

                            <div className="mt-2">
                                <ATMTimePicker
                                    name={`startTime`}
                                    value={values.startTime}
                                    label="Start Time"
                                    onChange={(newValue) => {
                                        setFieldValue('startTime', newValue)
                                    }}
                                />
                            </div>
                            <div className="mt-2">
                                <ATMTimePicker
                                    name={`endTime`}
                                    value={values.endTime}
                                    label="End Time"
                                    onChange={(newValue) => {
                                        setFieldValue('endTime', newValue)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCompetitor
