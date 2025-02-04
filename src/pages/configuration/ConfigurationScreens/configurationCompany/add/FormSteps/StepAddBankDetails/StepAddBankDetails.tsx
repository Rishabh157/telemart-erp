// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FieldArray, FormikProps } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddCompanyWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type FieldType = Field<'accountTypeOptions'>

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
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps

    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div>
            <FieldArray name="bankDetails">
                {({ push, remove }) => {
                    return (
                        <div>
                            {values?.bankDetails?.map(
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
                                                            className={`py-9 px-7`}
                                                        >
                                                            <div className="text-primary-main text-lg pb-2 font-medium flex justify-between items-center">
                                                                {sectionName} #
                                                                {bankInformationIndex +
                                                                    1}
                                                                {/* Delete Button */}
                                                                {values
                                                                    .bankDetails
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
                                                                                        textTransform={name === 'ifscNumber' ? 'uppercase' : 'capitalize'}
                                                                                        key={name}
                                                                                        name={`bankDetails[${bankInformationIndex}].${name}`}
                                                                                        value={
                                                                                            bankInformation[
                                                                                            name
                                                                                            ]
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            if (name === 'accountNumber') {
                                                                                                const newValue = e?.target?.value
                                                                                                if (!isNaN(Number(newValue))
                                                                                                ) {
                                                                                                    handleSetFieldValue(
                                                                                                        `bankDetails[${bankInformationIndex}].${name}`,
                                                                                                        newValue
                                                                                                    )

                                                                                                }
                                                                                            } else {

                                                                                                if (name === 'ifscNumber') {
                                                                                                    const regex = /^[A-Z0-9]+$/;
                                                                                                    const value = e.target.value;
                                                                                                    // Allow empty values or valid IFSC formats
                                                                                                    if (!value || regex.test(value)) {
                                                                                                        handleSetFieldValue(`bankDetails[${bankInformationIndex}].${name}`, value);
                                                                                                    }
                                                                                                } else {
                                                                                                    handleSetFieldValue(`bankDetails[${bankInformationIndex}].${name}`, e.target.value)
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                        label={label}
                                                                                        placeholder={
                                                                                            placeholder
                                                                                        }
                                                                                        className="shadow bg-white rounded"
                                                                                        extraClassField="mt-3"
                                                                                        isSubmitting={
                                                                                            isSubmitting
                                                                                        }
                                                                                    />
                                                                                )

                                                                            case 'select':
                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            name
                                                                                        }
                                                                                    >

                                                                                        <ATMSelect
                                                                                            // required
                                                                                            name={`bankDetails[${bankInformationIndex}].${name}`}
                                                                                            value={
                                                                                                bankInformation[
                                                                                                name
                                                                                                ]
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                handleSetFieldValue(
                                                                                                    `bankDetails[${bankInformationIndex}].${name}`,
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
                                                                                    <ATMFilePickerWrapper
                                                                                        name={`bankDetails[${bankInformationIndex}].${name}`}
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
                                                                                            handleSetFieldValue(
                                                                                                `bankDetails[${bankInformationIndex}].${name}`,
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

                            {/*BUTTON - Add New */}
                            <div className="flex justify-self-start p-5">
                                <button
                                    type="button"
                                    onClick={() =>
                                        push({
                                            bankName: '',
                                            branchName: '',
                                            accountHolderName: '',
                                            accountNumber: '',
                                            ifscNumber: '',
                                            accountType: '',
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
