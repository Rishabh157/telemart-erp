/// ==============================================
// Filename:AddCompitor.tsx
// Type: Add Component
// Last Updated: JULY 10, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

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
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import { CircularProgress } from '@mui/material'
import { useFileUploaderMutation } from 'src/services/media/SlotDefinitionServices'

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
    const [imageApiStatus, setImageApiStatus] = useState(false)
    // const [videoApiStatus, setVideoApiStatus] = useState(false)

    const [fileUploader] = useFileUploaderMutation()

    dropdownOptions = {
        ...dropdownOptions,
    }
    const { values, setFieldValue } = formikProps
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

                            <div className="mt-3">
                                <ATMDatePicker
                                    name={`date`}
                                    required
                                    value={values.date}
                                    label="Date"
                                    onChange={(newValue) => {
                                        handleSetFieldValue('date', newValue)
                                    }}
                                />
                            </div>

                            <div className="mt-1">
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
                            <div className="mt-1">
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

                            <div className="mt-6">
                                <ATMFilePickerWrapper
                                    name="video"
                                    label="Video"
                                    placeholder="video"
                                    onSelect={(newFile) => {
                                        const formData = new FormData()
                                        formData.append('fileType', 'VIDEO')
                                        formData.append(
                                            'category',
                                            'competitor'
                                        )
                                        formData.append(
                                            'fileUrl',
                                            newFile || ''
                                        )
                                        setImageApiStatus(true)
                                        fileUploader(formData).then((res) => {
                                            if ('data' in res) {
                                                setImageApiStatus(false)
                                                setFieldValue(
                                                    'video',
                                                    res?.data?.data?.fileUrl
                                                )
                                            }
                                            setImageApiStatus(false)
                                        })
                                    }}
                                    selectedFile={values.video}
                                    disabled={false}
                                />
                                {imageApiStatus ? (
                                    <div className="mt-2 flex justify-center items-center">
                                        <CircularProgress />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCompetitor
