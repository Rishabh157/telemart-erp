/// ==============================================
// Filename:StepAddBankDetails.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FieldArray, FormikProps } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress } from '@mui/material'

// |-- Internal Dependencies --|
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddVendorWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { useFileUploaderMutation } from 'src/services/media/SlotDefinitionServices'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

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

    const [fileUploader] = useFileUploaderMutation()

    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="">
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
                                                            <div className="text-primary-main text-lg pb-2 font-medium flex justify-between items-center">
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
                                                                        className="p-1 bg-red-500 text-white rounded"
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
                                                                        } = field

                                                                        switch (
                                                                            type
                                                                        ) {
                                                                            case 'text':
                                                                                return (
                                                                                    <ATMTextField
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
                                                                                        className="shadow bg-white rounded"
                                                                                        isSubmitting={
                                                                                            isSubmitting
                                                                                        }
                                                                                    />
                                                                                )

                                                                            case 'select':
                                                                                return (
                                                                                    <div
                                                                                        className="-mt-[0.15rem]"
                                                                                        key={
                                                                                            name
                                                                                        }
                                                                                    >
                                                                                        <ATMSelect
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
                                                                                                setLoaderState(
                                                                                                    name
                                                                                                )
                                                                                                const formData =
                                                                                                    new FormData()
                                                                                                formData.append(
                                                                                                    'fileType',
                                                                                                    'IMAGE'
                                                                                                )
                                                                                                formData.append(
                                                                                                    'category',
                                                                                                    'Dealer'
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
                                                                                                    (
                                                                                                        res: any
                                                                                                    ) => {
                                                                                                        if (
                                                                                                            'data' in
                                                                                                            res
                                                                                                        ) {
                                                                                                            setImageApiStatus(
                                                                                                                false
                                                                                                            )
                                                                                                            handleSetFieldValue(
                                                                                                                `bank_informations[${bankInformationIndex}].${name}`,
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

                                                                                                // setFieldValue(
                                                                                                //     `bank_informations[${bankInformationIndex}].${name}`,
                                                                                                //     newFile
                                                                                                // )
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
                            <div className="flex justify-self-start p-5">
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
                                    className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
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
