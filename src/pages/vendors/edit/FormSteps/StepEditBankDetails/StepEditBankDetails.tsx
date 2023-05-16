import React from 'react'
import { FieldArray, FormikProps } from 'formik'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditVendorWrapper'
import { MdDeleteOutline } from 'react-icons/md'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { HiPlus } from 'react-icons/hi'

type FieldType = Field<'accountTypeOptions'>

type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: { sectionName: string; fields: FieldType[] }[]
    dropdownOptions: { accountTypeOptions: SelectOption[] }
}

const StepEditBankDetails = ({
    formikProps,
    formFields,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps

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
                                                                                    />
                                                                                )

                                                                            case 'select':
                                                                                return (
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
                                                                                    />
                                                                                )

                                                                            case 'file-picker':
                                                                                return (
                                                                                    <ATMFilePickerWrapper
                                                                                        name={`bank_informations[${bankInformationIndex}].${name}`}
                                                                                        key={
                                                                                            name
                                                                                        }
                                                                                        label={
                                                                                            label
                                                                                        }
                                                                                        placeholder={
                                                                                            placeholder
                                                                                        }
                                                                                        onSelect={(
                                                                                            newFile
                                                                                        ) =>
                                                                                            setFieldValue(
                                                                                                `bank_informations[${bankInformationIndex}].${name}`,
                                                                                                newFile
                                                                                            )
                                                                                        }
                                                                                        selectedFile={
                                                                                            bankInformation[
                                                                                                name
                                                                                            ]
                                                                                        }
                                                                                    />
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

                            {/*BUTTON - Edit New */}
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
                                    <HiPlus size="20" />
                                </button>
                            </div>
                        </div>
                    )
                }}
            </FieldArray>
        </div>
    )
}

export default StepEditBankDetails
