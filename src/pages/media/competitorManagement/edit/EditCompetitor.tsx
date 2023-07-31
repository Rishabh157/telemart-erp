/// ==============================================
// Filename:EditCompitor.tsx
// Type: Edit Component
// Last Updated: JULY 03, 2023
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
import { FormInitialValues } from './EditCompetitorWrapper'
import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import { useFileUploaderMutation } from 'src/services/media/SlotDefinitionServices'
// |-- MUI --|
import { CircularProgress } from '@mui/material'
import { FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelOptions: SelectOption[] | []
        languageOptions: SelectOption[]
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

    const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)
    const [fileUploader] = useFileUploaderMutation()

    const productCategoryOption = [
        {
            label: 'Herbal',
            value: 'HERBAL',
        },
        {
            label: 'Education',
            value: 'EDUCATION',
        },
        {
            label: 'Spiritual',
            value: 'SPIRITUAL',
        },
        {
            label: 'Other',
            value: 'OTHER',
        },
    ]
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
                                name="productCategory"
                                required
                                value={values.productCategory}
                                label="Product Category"
                                // placeholder="Product Category"
                                options={productCategoryOption}
                                onChange={(e) =>
                                    handleSetFieldValue('productCategory', e)
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
                            <ATMSelectSearchable
                                name="languageId"
                                required
                                // isMulti={true}
                                value={values.languageId}
                                onChange={(value) =>
                                    handleSetFieldValue('languageId', value)
                                }
                                options={dropdownOptions.languageOptions}
                                label="Language"
                            />
                            <ATMTextField
                                name="schemePrice"
                                type={'text'}
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

                            <ATMTextField
                                name="ytLink"
                                value={values.ytLink}
                                label="Youtube Link"
                                placeholder="Youtube Link"
                                onChange={(e) => {
                                    handleSetFieldValue(
                                        'ytLink',
                                        e.target.value
                                    )
                                }}
                            />
                        </div>
                        <FieldArray name="image">
                            {({ push, remove }) => (
                                <div className="">
                                    {values.image?.map((img, ind) => {
                                        return (
                                            <div
                                                key={ind}
                                                className={`flex flex-col gap-2 py-6 px-7 ${
                                                    ind !==
                                                        values.image.length -
                                                            1 && 'border-b'
                                                }  border-slate-300 `}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="text-primary-main text-lg pb-2 font-medium ">
                                                        image #{ind + 1}
                                                    </div>
                                                    {/* Delete Button */}
                                                    {values.image?.length >
                                                        1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                remove(ind)
                                                            }
                                                            className="p-1 bg-red-500 text-white rounded"
                                                        >
                                                            <MdDeleteOutline className="text-2xl" />
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-4 gap-4 gap-y-5 my-3">
                                                    <div className="mt-4">
                                                        <ATMFilePickerWrapper
                                                            name={`image[${ind}]`}
                                                            label="Image"
                                                            placeholder="Image"
                                                            onSelect={(
                                                                newFile
                                                            ) => {
                                                                const formData =
                                                                    new FormData()
                                                                formData.append(
                                                                    'fileType',
                                                                    'IMAGE'
                                                                )
                                                                formData.append(
                                                                    'category',
                                                                    'COMPITITOR'
                                                                )
                                                                formData.append(
                                                                    'fileUrl',
                                                                    newFile ||
                                                                        ''
                                                                )
                                                                setImageApiStatus(
                                                                    true
                                                                )
                                                                fileUploader(
                                                                    formData
                                                                ).then(
                                                                    (res) => {
                                                                        if (
                                                                            'data' in
                                                                            res
                                                                        ) {
                                                                            setImageApiStatus(
                                                                                false
                                                                            )
                                                                            setFieldValue(
                                                                                `image[${ind}]`,
                                                                                res
                                                                                    ?.data
                                                                                    ?.data
                                                                                    ?.fileUrl
                                                                            )
                                                                        }
                                                                        setImageApiStatus(
                                                                            false
                                                                        )
                                                                    }
                                                                )
                                                            }}
                                                            selectedFile={
                                                                values.image[
                                                                    ind
                                                                ]
                                                            }
                                                            disabled={false}
                                                        />
                                                        {imageApiStatus ? (
                                                            <div className=" mt-3 flex justify-center  items-center w-full h-full">
                                                                <CircularProgress />
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* BUTTON- Edit More Script */}
                                    <div className="flex justify-end p-5">
                                        <button
                                            type="button"
                                            onClick={() => push('')}
                                            className="bg-primary-main px-3 py-1 text-white rounded"
                                        >
                                            <HiPlus />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCompetitor
