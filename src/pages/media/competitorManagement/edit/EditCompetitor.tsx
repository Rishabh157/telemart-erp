/// ==============================================
// Filename:EditCompitor.tsx
// Type: Edit Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditCompetitorWrapper'
import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelOptions: SelectOption[] | []
    }
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Competitors',
        path: '/media/competitor',
    },
    {
        label: 'Edit',
    },
]

const EditCompetitor = ({ formikProps, apiStatus, dropdownOptions }: Props) => {
    const { values, setFieldValue } = formikProps

    dropdownOptions = {
        ...dropdownOptions,
    }
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
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
                    <ATMPageHeading> Edit </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details</div>

                        {/* BUTTON - Edit Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Update
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
                                required
                                value={values.competitorName}
                                label="Competitor Name"
                                placeholder="Competitor Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'competitorName',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMTextField
                                name="companyName"
                                required
                                value={values.companyName}
                                label="Company Name"
                                placeholder="Company Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'companyName',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMTextField
                                name="productName"
                                required
                                value={values.productName}
                                label="Product Name"
                                placeholder="Product Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'productName',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMSelectSearchable
                                name="channelNameId"
                                required
                                value={values.channelNameId}
                                onChange={(e) =>
                                    handleSetFieldValue('channelNameId', e)
                                }
                                options={dropdownOptions.channelOptions}
                                label="Channel Name"
                            />
                            <ATMTextField
                                name="schemePrice"
                                required
                                value={values.schemePrice}
                                label="schemePrice"
                                placeholder="schemePrice"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'schemePrice',
                                            e.target.value
                                        )
                                    }
                                }}
                            />
                            <ATMTextField
                                name="whatsappNumber"
                                required
                                value={values.whatsappNumber}
                                label="Whatsapp Number"
                                placeholder="Whatsapp Number"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'whatsappNumber',
                                            e.target.value
                                        )
                                    }
                                }}
                            />
                            <ATMTextField
                                name="websiteLink"
                                required
                                value={values.websiteLink}
                                label="Website Link"
                                placeholder="Website Link"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'websiteLink',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMTextField
                                name="youtubeLink"
                                required
                                value={values.youtubeLink}
                                label="Youtube Link"
                                placeholder="Youtube Link"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'youtubeLink',
                                        e.target.value
                                    )
                                }
                            />

                            <div className="mt-2">
                                <ATMTimePicker
                                    required
                                    name={`startTime`}
                                    value={values.startTime}
                                    label="Start Time"
                                    onChange={(newValue) => {
                                        handleSetFieldValue(
                                            'startTime',
                                            newValue
                                        )
                                    }}
                                />
                            </div>
                            <div className="mt-2">
                                <ATMTimePicker
                                    required
                                    name={`endTime`}
                                    value={values.endTime}
                                    label="End Time"
                                    onChange={(newValue) => {
                                        handleSetFieldValue('endTime', newValue)
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

export default EditCompetitor
