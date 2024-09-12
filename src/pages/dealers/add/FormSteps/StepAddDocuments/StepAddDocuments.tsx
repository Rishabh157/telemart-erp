// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FieldArray, FormikProps } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

// |-- Internal Dependencies --|
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddDealerWrapper'
import { FieldType } from './StepAddDocumentsWrapper'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: { sectionName: string; fields: FieldType[] }[]
}

const StepAddDocuments = ({ formikProps, formFields }: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)
    const [loaderState, setLoaderState] = useState<string>('')
    const [uploadFile] = useAddFileUrlMutation()

    const getTheValueByNameKey = (name: string) => {
        switch (name) {
            case 'document.gstCertificate':
                return values?.document?.gstCertificate
            case 'document.adharCard':
                return values?.document?.adharCard
            default:
                return ''
        }
    }

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
                    <div
                        key={index}
                        className={`py-9 px-7 border-b border-slate-400`}
                    >
                        <div className="pb-2 text-lg font-medium text-primary-main ">
                            {sectionName}
                        </div>

                        <div className="grid grid-cols-2 gap-4 gap-y-4">
                            {fields?.map((field: FieldType, index: number) => {
                                const {
                                    type = 'text',
                                    name,
                                    label,
                                    placeholder,
                                    // required,
                                } = field
                                switch (type) {
                                    case 'text':
                                        return (
                                            <React.Fragment key={name || index}>
                                                <ATMTextField
                                                    // required={required}
                                                    name={name}
                                                    value={
                                                        name.includes('.')
                                                            ? values[
                                                                  name.split(
                                                                      '.'
                                                                  )[0]
                                                              ][
                                                                  name.split(
                                                                      '.'
                                                                  )[1]
                                                              ]
                                                            : values[name]
                                                    }
                                                    onChange={(e) => {
                                                        const typedValue =
                                                            e.target.value
                                                        const inputValue =
                                                            typedValue.replace(
                                                                /\D/g,
                                                                ''
                                                            ) // Remove non-digit characters

                                                        let formattedValue = ''
                                                        for (
                                                            let i = 0;
                                                            i <
                                                            inputValue.length;
                                                            i++
                                                        ) {
                                                            if (
                                                                i > 0 &&
                                                                i % 4 === 0
                                                            ) {
                                                                formattedValue +=
                                                                    '-'
                                                            }
                                                            formattedValue +=
                                                                inputValue.charAt(
                                                                    i
                                                                )
                                                        }

                                                        if (
                                                            name ===
                                                            'document.adharCardNumber'
                                                        ) {
                                                            if (
                                                                name ===
                                                                    'document.adharCardNumber' &&
                                                                formattedValue.length <=
                                                                    14
                                                            ) {
                                                                setFieldValue(
                                                                    name,
                                                                    formattedValue
                                                                )
                                                            }
                                                        } else {
                                                            setFieldValue(
                                                                name,
                                                                e.target.value
                                                            )
                                                        }
                                                    }}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    className="bg-white rounded shadow"
                                                    extraClassField="mt-3"
                                                    isSubmitting={isSubmitting}
                                                />
                                            </React.Fragment>
                                        )

                                    case 'file-picker':
                                        return (
                                            <div
                                                className="mt-3"
                                                key={name || index}
                                            >
                                                <ATMFilePickerWrapper
                                                    // required={required}
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    selectedFile={getTheValueByNameKey(
                                                        name
                                                    )}
                                                    onSelect={(newFile) => {
                                                        handleFileUpload(
                                                            newFile,
                                                            name
                                                        )
                                                    }}
                                                    isSubmitting={isSubmitting}
                                                />
                                                {loaderState === name &&
                                                imageApiStatus ? (
                                                    <div className="mt-3">
                                                        <CircularProgress
                                                            size={18}
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
            <FieldArray name="otherDocument">
                {({ push, remove }) => {
                    return (
                        <>
                            {values.otherDocument?.map(
                                (
                                    otherDocument: any,
                                    otherDocumentIndex: number
                                ) => {
                                    return (
                                        <div
                                            key={otherDocumentIndex}
                                            className={`py-9 px-7 border-b border-slate-400`}
                                        >
                                            <div className="flex items-center justify-between pb-2 text-lg font-medium text-primary-main ">
                                                Other Documents #
                                                {otherDocumentIndex + 1}
                                                {/* Delete Button */}
                                                {values.otherDocument?.length >
                                                    1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            remove(
                                                                otherDocumentIndex
                                                            )
                                                        }
                                                        className="p-1 text-white bg-red-500 rounded"
                                                    >
                                                        <MdDeleteOutline className="text-2xl" />
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 gap-y-5">
                                                <ATMTextField
                                                    name={`otherDocument[${otherDocumentIndex}].documentName`}
                                                    value={
                                                        otherDocument.documentName
                                                    }
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            `otherDocument[${otherDocumentIndex}].documentName`,
                                                            e.target.value
                                                        )
                                                    }}
                                                    label={'Document Name'}
                                                    placeholder={
                                                        'Document Name'
                                                    }
                                                    isSubmitting={isSubmitting}
                                                    className="bg-white rounded shadow"
                                                />

                                                <ATMTextField
                                                    name={`otherDocument[${otherDocumentIndex}].documentFile`}
                                                    label={'Document File'}
                                                    placeholder={
                                                        'Document File'
                                                    }
                                                    value={
                                                        otherDocument.documentFile
                                                    }
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            `otherDocument[${otherDocumentIndex}].documentFile`,
                                                            e.target.value
                                                        )
                                                    }
                                                    isSubmitting={isSubmitting}
                                                    className="mt-0 bg-white rounded shadow"
                                                    // selectedFile={otherDocument.documentFile}
                                                />

                                                <div></div>
                                            </div>
                                        </div>
                                    )
                                }
                            )}

                            <div className="flex px-6 justify-self-start py-9">
                                <button
                                    type="button"
                                    onClick={() =>
                                        push({
                                            documentName: '',
                                            documentFile: '',
                                        })
                                    }
                                    className="flex items-center px-2 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded-full "
                                >
                                    <HiPlus size="20" /> Add More
                                </button>
                            </div>
                        </>
                    )
                }}
            </FieldArray>
        </div>
    )
}

export default StepAddDocuments
