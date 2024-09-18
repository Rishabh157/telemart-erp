// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddCompanyWrapper'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { CircularProgress } from '@mui/material'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const StepAddCompanyDetails = ({ formikProps }: Props) => {
    const { values, setFieldValue } = formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    const [imageApiStatus, setImageApiStatus] = React.useState<boolean>(false)
    const [uploadFile] = useAddFileUrlMutation()

    const handleFileUpload = async (file: File, setFieldValue: any) => {
        let fileUrl = ''
        let formData = new FormData()

        setImageApiStatus(true)
        formData.append(
            'type',
            file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT'
        )
        formData.append('bucketName', 'SAPTEL_CRM')
        formData.append('file', file || '', file?.name)

        try {
            // call the file manager api
            const res = await uploadFile(formData)
            if ('data' in res) {
                setImageApiStatus(false)
                fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path
                setFieldValue('companyLogo', fileUrl)
                return fileUrl
            }
        } catch (error) {
            console.error('Error uploading file:', error)
            // Handle error here if needed
        }
    }
    return (
        <div className="py-9 px-7">
            <div className="grid grid-cols-3 gap-4 gap-y-5">
                {/* Company Name */}
                <ATMTextField
                    required
                    name="companyName"
                    value={values.companyName}
                    onChange={(e) => {
                        handleSetFieldValue('companyName', e.target.value)
                    }}
                    label="Company Name"
                    placeholder="Company Name"
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* Website URL */}
                <ATMTextField
                    required
                    name="websiteUrl"
                    value={values.websiteUrl}
                    onChange={(e) => {
                        handleSetFieldValue('websiteUrl', e.target.value)
                    }}
                    label="Website URL"
                    placeholder="Website URL"
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* GST NO. */}
                <ATMTextField
                    required
                    name="gstNo"
                    value={values.gstNo}
                    onChange={(e) => {
                        handleSetFieldValue('gstNo', e.target.value)
                    }}
                    label="GST NO."
                    placeholder="GST NO."
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* Phone No. */}
                <ATMTextField
                    required
                    name="phoneNo"
                    value={values.phoneNo}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            handleSetFieldValue('phoneNo', inputValue)
                        }
                    }}
                    label="Phone No."
                    placeholder="Phone No."
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                <ATMTextField
                    name="panNumber"
                    value={values.panNumber}
                    onChange={(e) => {
                        handleSetFieldValue('panNumber', e.target.value)
                    }}
                    label="PAN"
                    placeholder="PAN Number"
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                <div className="mt-2">
                    <ATMTextArea
                        required
                        name="address"
                        value={values.address}
                        label="Address"
                        minRows={4}
                        className="rounded mt-0"
                        labelClass="text-slate-700 text-sm font-medium mb-1"
                        placeholder="Address"
                        onChange={(newValue) =>
                            setFieldValue('address', newValue)
                        }
                    />
                </div>
                </div>
                <div className="grid grid-cols-3 gap-4 gap-y-5">
                <div className="w-ful mt-5">
                    <ATMFilePickerWrapper
                        name="companyLogo"
                        label="Logo"
                        placeholder={'Select File'}
                        selectedFile={values.companyLogo}
                        onSelect={(newFile: any) => {
                            handleFileUpload(newFile, setFieldValue)
                        }}
                        // isSubmitting={false}
                    />
                    {imageApiStatus ? (
                        <div className="mt-3">
                            <CircularProgress size={18} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default StepAddCompanyDetails
