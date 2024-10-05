// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FieldArray, FormikProps } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

// |-- Internal Dependencies --|
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditDealerWrapper'
import { FieldType } from './StepEditDocumentsWrapper'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: { sectionName: string; fields: FieldType[] }[]
}

const StepEditDocuments = ({ formikProps, formFields }: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    const [uploadFile] = useAddFileUrlMutation()

    const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)
    const [loaderState, setLoaderState] = useState<string>('')

    const dispatch = useDispatch()

    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const getTheValueByNameKey = (name: string) => {
        switch (name) {
            case 'document.gstCertificate':
                return values?.document?.gstCertificate
            case 'document.adharCard':
                return values?.document?.adharCard
            case 'document.panCard':
                return values?.document?.panCard
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
        uploadFile(formData)
            .then((res: any) => {
                if ('data' in res) {
                    setImageApiStatus(false)
                    let fileUrl =
                        BASE_URL_FILE_PICKER + '/' + res?.data?.file_path

                    handleSetFieldValue(name, fileUrl)
                    setLoaderState('')
                    setImageApiStatus(false)
                } else {
                    setLoaderState('')
                    setImageApiStatus(false)
                }
            })
            .catch((err) => {
                setLoaderState('')
                setImageApiStatus(false)
                console.error(err)
            })
    }

    return (
        <div >
            {formFields?.map((formField: any, index: number) => {

                const { sectionName, fields } = formField

                return (
                    <div
                        key={index}
                        className={`py-9 px-7 border-b border-slate-400`}
                    >
                        <div className="text-primary-main text-lg pb-2 font-medium ">
                            {sectionName}
                        </div>

                        <div className="grid grid-cols-2 gap-4 gap-y-4">
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
                                            <React.Fragment key={name}>
                                                <ATMTextField
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
                                                                handleSetFieldValue(
                                                                    name,
                                                                    formattedValue
                                                                )
                                                            }
                                                        } else {
                                                            handleSetFieldValue(
                                                                name,
                                                                e.target.value
                                                            )
                                                        }
                                                    }}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    className="shadow bg-white rounded"
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
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    selectedFile={getTheValueByNameKey(name)}
                                                    // disabled={}
                                                    onSelect={(newFile) => {
                                                        handleFileUpload(
                                                            newFile,
                                                            name
                                                        )
                                                    }}
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
                                            <div className="text-primary-main text-lg pb-2 font-medium flex justify-between items-center ">
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
                                                            className="p-1 bg-red-500 text-white rounded"
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
                                                        handleSetFieldValue(
                                                            `otherDocument[${otherDocumentIndex}].documentName`,
                                                            e.target.value
                                                        )
                                                    }}
                                                    label={'Document Name'}
                                                    placeholder={
                                                        'Document Name'
                                                    }
                                                    className="shadow bg-white rounded"
                                                    isSubmitting={isSubmitting}
                                                />


                                                <div className="mt-5">
                                                    <ATMFilePickerWrapper
                                                        name={`otherDocument[${otherDocumentIndex}].documentFile`}
                                                        label='Document File'
                                                        placeholder='Document File'
                                                        selectedFile={otherDocument?.documentFile}
                                                        onSelect={(newFile) => {
                                                            handleFileUpload(
                                                                newFile,
                                                                `otherDocument[${otherDocumentIndex}].documentFile`,
                                                            )
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            )}

                            <div className="flex justify-self-start px-6 py-6">
                                <button
                                    type="button"
                                    onClick={() =>
                                        push({
                                            documentName: '',
                                            documentFile: '',
                                        })
                                    }
                                    className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
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

export default StepEditDocuments
