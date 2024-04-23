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
import { FormInitialValues } from '../../AddVendorWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'

type FieldType = Field<'accountTypeOptions'>

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: { sectionName: string; fields: FieldType[] }[]
    dropdownOptions: { accountTypeOptions: SelectOption[] }
}

const StepAddBankDetails = ({
    formikProps,
    formFields,
    dropdownOptions,
}: Props) => {
    const [loaderState, setLoaderState] = useState<string>('')
    const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)

    const [uploadFile] = useAddFileUrlMutation()

    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

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
        <div>
            <FieldArray name="bank_informations">
                {({ push, remove }) => {
                    return (
                        <div className="">
                            {values?.bank_informations?.map(
                                (
                                    bankInformation: any,
                                    bankInformationIndex: number
                                ) => {
                                    return (
                                        <div
                                            key={bankInformationIndex}
                                            className={`border-b border-slate-300`}
                                        >
                                            {formFields?.map(
                                                (formField, index) => {
                                                    const {
                                                        sectionName,
                                                        fields,
                                                    } = formField

                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`py-6 px-7`}
                                                        >
                                                            <div className="flex items-center justify-between pb-2 text-lg font-medium text-primary-main">
                                                                {sectionName} #
                                                                {bankInformationIndex +
                                                                    1}
                                                                {/* Delete Button */}
                                                                {values
                                                                    .bank_informations
                                                                    ?.length >
                                                                    1 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            remove(
                                                                                bankInformationIndex
                                                                            )
                                                                        }
                                                                        className="p-1 text-white bg-red-500 rounded"
                                                                    >
                                                                        <MdDeleteOutline className="text-2xl" />
                                                                    </button>
                                                                )}
                                                            </div>

                                                            <div className="grid grid-cols-3 gap-4 gap-y-5">
                                                                {fields?.map(
                                                                    (
                                                                        field: FieldType
                                                                    ) => {
                                                                        const {
                                                                            type = 'text',
                                                                            name,
                                                                            label,
                                                                            placeholder,
                                                                            required,
                                                                        } = field

                                                                        switch (
                                                                            type
                                                                        ) {
                                                                            case 'text':
                                                                                return (
                                                                                    <ATMTextField
                                                                                        required={
                                                                                            required
                                                                                        }
                                                                                        key={
                                                                                            name
                                                                                        }
                                                                                        name={`bank_informations[${bankInformationIndex}].${name}`}
                                                                                        value={
                                                                                            bankInformation[
                                                                                                name
                                                                                            ]
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            setFieldValue(
                                                                                                `bank_informations[${bankInformationIndex}].${name}`,
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        }}
                                                                                        label={
                                                                                            label
                                                                                        }
                                                                                        placeholder={
                                                                                            placeholder
                                                                                        }
                                                                                        className="bg-white rounded shadow"
                                                                                        isSubmitting={
                                                                                            isSubmitting
                                                                                        }
                                                                                    />
                                                                                )

                                                                            case 'select':
                                                                                return (
                                                                                    <div
                                                                                        className="mt-2"
                                                                                        key={
                                                                                            name
                                                                                        }
                                                                                    >
                                                                                        <ATMSelect
                                                                                            required={
                                                                                                required
                                                                                            }
                                                                                            name={`bank_informations[${bankInformationIndex}].${name}`}
                                                                                            value={
                                                                                                bankInformation[
                                                                                                    name
                                                                                                ]
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                setFieldValue(
                                                                                                    `bank_informations[${bankInformationIndex}].${name}`,
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            }}
                                                                                            options={
                                                                                                dropdownOptions[
                                                                                                    field.optionAccessKey ||
                                                                                                        'accountTypeOptions'
                                                                                                ]
                                                                                            }
                                                                                            label={
                                                                                                label
                                                                                            }
                                                                                            isSubmitting={
                                                                                                isSubmitting
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                )

                                                                            case 'file-picker':
                                                                                return (
                                                                                    <div>
                                                                                        <ATMFilePickerWrapper
                                                                                            key={
                                                                                                name
                                                                                            }
                                                                                            name={`bank_informations[${bankInformationIndex}].${name}`}
                                                                                            label={
                                                                                                label
                                                                                            }
                                                                                            placeholder={
                                                                                                placeholder
                                                                                            }
                                                                                            onSelect={(
                                                                                                newFile
                                                                                            ) => {
                                                                                                handleFileUpload(
                                                                                                    newFile,
                                                                                                    `bank_informations[${bankInformationIndex}].${name}`
                                                                                                )
                                                                                            }}
                                                                                            selectedFile={
                                                                                                bankInformation[
                                                                                                    name
                                                                                                ]
                                                                                            }
                                                                                        />
                                                                                        {loaderState ===
                                                                                            name &&
                                                                                        imageApiStatus ? (
                                                                                            <div className="mt-3 text-center">
                                                                                                <CircularProgress
                                                                                                    size={
                                                                                                        21
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                        ) : null}
                                                                                    </div>
                                                                                )

                                                                            default:
                                                                                return null
                                                                        }
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    )
                                }
                            )}

                            {/*BUTTON - Add New */}
                            <div className="flex p-5 justify-self-start">
                                <button
                                    type="button"
                                    onClick={() =>
                                        push({
                                            bank_name: '',
                                            branch: '',
                                            account_holder_name: '',
                                            account_number: '',
                                            ifsc_no: '',
                                            account_type: '',
                                            cancelled_cheque: '',
                                        })
                                    }
                                    className="flex items-center px-2 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded-full "
                                >
                                    <HiPlus size="20" /> Add More
                                </button>
                            </div>
                        </div>
                    )
                }}
            </FieldArray>
        </div>
    )
}

export default StepAddBankDetails
