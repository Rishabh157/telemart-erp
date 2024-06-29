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
import { FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
// import { CircularProgress } from '@mui/material'
import { getProductCategoryOptions } from 'src/utils/constants/customeTypes'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        languageOptions: SelectOption[]
        channelNameOptions: SelectOption[] | []
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
    const { values, setFieldValue } = formikProps

    // Upload File Mutation
    const [uploadFile] = useAddFileUrlMutation()

    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const handleFileUpload = (file: File, name: string) => {
        let formData = new FormData()

        // setImageApiStatus(true)
        formData.append(
            'type',
            file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT'
        )
        formData.append('bucketName', 'SAPTEL_CRM')
        formData.append('file', file || '', file?.name)

        // call the file manager api
        uploadFile(formData).then((res: any) => {
            if ('data' in res) {
                // setImageApiStatus(false)
                let fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path
                setFieldValue(name, fileUrl)
                // setImageApiStatus(false)
            }
        })
    }

    return (
        <div >
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div >
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
                                name="productCategory"
                                required
                                value={values.productCategory}
                                label="Product Category"
                                // placeholder="Product Category"
                                options={getProductCategoryOptions()}
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
                                options={dropdownOptions.channelNameOptions}
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

                            <div className="mt-5">
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

                        <FieldArray name="images">
                            {({ push, remove }) => {
                                return (
                                    <div className="mt-8">
                                        <div className="grid grid-cols-3 gap-4">
                                            {values?.images?.map(
                                                (item, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex gap-3 "
                                                        >
                                                            <div className="w-full">
                                                                <ATMFilePickerWrapper
                                                                    required={
                                                                        true
                                                                    }
                                                                    name={`images[${index}].image`}
                                                                    label=""
                                                                    placeholder={
                                                                        'Select image'
                                                                    }
                                                                    selectedFile={
                                                                        item?.image
                                                                    }
                                                                    onSelect={(
                                                                        newFile: any
                                                                    ) => {
                                                                        handleFileUpload(
                                                                            newFile,
                                                                            `images[${index}].image`
                                                                        )
                                                                    }}
                                                                    // isSubmitting={false}
                                                                />
                                                                {/* {imageApiStatus ? (
                                                                    <div className="mt-3">
                                                                        <CircularProgress
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </div>
                                                                ) : null} */}
                                                            </div>

                                                            {/* BUTTON - Delete */}
                                                            {values.images
                                                                ?.length &&
                                                                values.images
                                                                    ?.length >
                                                                    1 && (
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                remove(
                                                                                    index
                                                                                )
                                                                            }}
                                                                            className="p-2 bg-red-500 text-white rounded"
                                                                        >
                                                                            <MdDeleteOutline />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>

                                        {/* BUTTON - Add More Product */}
                                        <div className="flex justify-self-start py-9">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        image: '',
                                                    })
                                                }
                                                className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center"
                                            >
                                                <HiPlus size="20" /> Add More
                                            </button>
                                        </div>
                                    </div>
                                )
                            }}
                        </FieldArray>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCompetitor
