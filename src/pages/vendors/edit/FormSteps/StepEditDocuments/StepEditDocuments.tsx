// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

// |-- Internal Dependencies --|
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditVendorWrapper'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'

// |-- Types --|
type FieldType = Field<''>

type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: { sectionName: string; fields: FieldType[] }[]
}

const StepEditDocuments = ({ formikProps, formFields }: Props) => {
    const [loaderState, setLoaderState] = useState<string>('')
    const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)

    const [uploadFile] = useAddFileUrlMutation()

    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (
        name: string,
        value: string | boolean | File
    ) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    // File Upload
    const handleFileUpload = (file: File, name: string) => {
        let formData = new FormData()
        setLoaderState(name)
        setImageApiStatus(true)
        formData.append(
            'type',
            file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT'
        )
        formData.append('bucketName', 'SAPTEL_CRM')
        formData.append('file', file || '', file?.name)

        // call the file manager api
        uploadFile(formData).then((res: any) => {
            if ('data' in res) {
                setImageApiStatus(false)
                let fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path
                setFieldValue(name, fileUrl)
                setLoaderState('')
                setImageApiStatus(false)
            }
        })
    }

    return (
        <div >
            {formFields?.map((formField, index) => {
                const { sectionName, fields } = formField
                return (
                    <div key={index} className={`py-9 px-7`}>
                        <div className="text-primary-main text-lg pb-2 font-medium ">
                            {sectionName}
                        </div>

                        <div className="grid grid-cols-3 gap-4 gap-y-5">
                            {fields?.map((field: FieldType) => {
                                const {
                                    type = 'text',
                                    name,
                                    label,
                                    placeholder,
                                } = field

                                switch (type) {
                                    case 'text':
                                        return (
                                            <ATMTextField
                                                key={name}
                                                name={name}
                                                value={values[name]}
                                                onChange={(e) => {
                                                    handleSetFieldValue(
                                                        name,
                                                        e.target.value
                                                    )
                                                }}
                                                label={label}
                                                placeholder={placeholder}
                                                className="shadow bg-white rounded"
                                                extraClassField="mt-3"
                                                isSubmitting={isSubmitting}
                                            />
                                        )

                                    case 'file-picker':
                                        return (
                                            <div className="mt-3" key={name}>
                                                <ATMFilePickerWrapper
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    onSelect={(newFile) => {
                                                        handleFileUpload(
                                                            newFile,
                                                            name
                                                        )
                                                    }}
                                                    selectedFile={values[name]}
                                                />
                                                {loaderState === name &&
                                                imageApiStatus ? (
                                                    <div className="mt-3 text-center">
                                                        <CircularProgress
                                                            size={21}
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>
                                        )

                                    default:
                                        return null
                                }
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default StepEditDocuments
