/// ==============================================
// Filename:AddCompitor.tsx
// Type: Add Component
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
import { FormInitialValues } from './AddCompetitorWrapper'
import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

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
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    console.log('formik values', values)
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
                                required
                                value={values.competitorName}
                                label="Artist Name"
                                placeholder="Artist Name"
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
                                type={'text'}
                                required
                                value={values.schemePrice}
                                label="Price/MRP"
                                placeholder="Scheme Price"
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
                                name="websiteLink"
                                value={values.websiteLink}
                                required
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
                                value={values.youtubeLink}
                                required
                                label="Youtube Link"
                                placeholder="Youtube Link"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'youtubeLink',
                                        e.target.value
                                    )
                                }
                            />

                            <ATMTextField
                                name="mobileNumber"
                                value={values.mobileNumber}
                                required
                                label="Mobile Number"
                                placeholder="Mobile Number"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'mobileNumber',
                                            e.target.value
                                        )
                                    }
                                }}
                            />

                            <ATMTextField
                                name="whatsappNumber"
                                value={values.whatsappNumber}
                                required
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

                            <div className="mt-3">
                                <ATMDatePicker
                                    name={`date`}
                                    required
                                    value={values.date}
                                    label="Date"
                                    onChange={(newValue) => {
                                        console.log('date', newValue)
                                        handleSetFieldValue('date', newValue)
                                    }}
                                />
                            </div>

                            <div className="mt-2">
                                <ATMTimePicker
                                    name={`startTime`}
                                    required
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
                                    name={`endTime`}
                                    required
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

export default AddCompetitor
