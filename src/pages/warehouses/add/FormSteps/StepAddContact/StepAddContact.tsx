import React from 'react'
import { FieldArray, FormikProps } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddWarehouseWrapper'
import { FieldType } from './StepAddContactWrapper'
import { HiPlus } from 'react-icons/hi'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: { sectionName: string; fields: FieldType[] }[]
}

const StepAddContact = ({ formikProps, formFields }: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps

    return (
        <div className="">
            <FieldArray name="contact_informations">
                {({ push, remove }) => {
                    return (
                        <div className="">
                            {values?.contact_informations?.map(
                                (
                                    contactInformation: any,
                                    contactInformationIndex: number
                                ) => {
                                    return (
                                        <div
                                            key={contactInformationIndex}
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
                                                                {contactInformationIndex +
                                                                    1}
                                                                {/* Delete Button */}
                                                                {values
                                                                    .contact_informations
                                                                    ?.length >
                                                                    1 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            remove(
                                                                                contactInformationIndex
                                                                            )
                                                                        }
                                                                        className="p-1 bg-red-500 text-white rounded"
                                                                    >
                                                                        <MdDeleteOutline className="text-2xl" />
                                                                    </button>
                                                                )}
                                                            </div>

                                                            <div className="grid grid-cols-4 gap-4 gap-y-5">
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
                                                                                        name={`contact_informations[${contactInformationIndex}].${name}`}
                                                                                        value={
                                                                                            contactInformation[
                                                                                                name
                                                                                            ]
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            if (
                                                                                                name ===
                                                                                                    'mobileNumber' ||
                                                                                                name ===
                                                                                                    'landLine'
                                                                                            ) {
                                                                                                const input =
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                if (
                                                                                                    !isNaN(
                                                                                                        Number(
                                                                                                            input
                                                                                                        )
                                                                                                    )
                                                                                                ) {
                                                                                                    setFieldValue(
                                                                                                        `contact_informations[${contactInformationIndex}].${name}`,
                                                                                                        e
                                                                                                            .target
                                                                                                            .value
                                                                                                    )
                                                                                                }
                                                                                            } else {
                                                                                                setFieldValue(
                                                                                                    `contact_informations[${contactInformationIndex}].${name}`,
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            }
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

                            <div className="flex justify-self-start p-5">
                                <button
                                    type="button"
                                    onClick={() =>
                                        push({
                                            name: '',
                                            department: '',
                                            designation: '',
                                            email: '',
                                            mobile_number: '',
                                            landline: '',
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

export default StepAddContact
