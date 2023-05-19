import React from 'react'
import { FieldArray, FormikProps } from 'formik'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditDealerWrapper'
import { FieldType } from './StepEditDocumentsWrapper'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: { sectionName: string; fields: FieldType[] }[]
}

const StepEditDocuments = ({ formikProps, formFields }: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps

    return (
        <div className="">
            {formFields?.map((formField, index) => {
                const { sectionName, fields } = formField
                return (
                    <div
                        key={index}
                        className={`py-9 px-7 border-b border-slate-400`}
                    >
                        <div className="text-primary-main text-lg pb-2 font-medium ">
                            {sectionName}
                        </div>

                        <div className="grid grid-cols-3 gap-4 gap-y-4">
                            {fields?.map((field: FieldType) => {
                                const {
                                    type = 'text',
                                    name,
                                    label,
                                    placeholder,
                                    offset,
                                } = field
                                switch (type) {
                                    case 'text':
                                        return (
                                            <>
                                                <ATMTextField
                                                    key={name}
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
                                                        const inputValue =
                                                            e.target.value
                                                        if (
                                                            name ===
                                                            'document.adharCardNumber'
                                                        ) {
                                                            //alert(inputValue.length)
                                                            if (
                                                                inputValue.length ===
                                                                    4 ||
                                                                inputValue.length ===
                                                                    9 ||
                                                                inputValue.length ===
                                                                    14
                                                            ) {
                                                                //alert(inputValue.length)
                                                                e.target.value =
                                                                    inputValue +
                                                                    '-'
                                                                setFieldValue(
                                                                    name,
                                                                    e.target
                                                                        .value
                                                                )
                                                            } else if (
                                                                inputValue.length >
                                                                19
                                                            ) {
                                                                e.target.value =
                                                                    inputValue.substring(
                                                                        0,
                                                                        19
                                                                    )
                                                                setFieldValue(
                                                                    name,
                                                                    e.target
                                                                        .value
                                                                )
                                                            } else {
                                                                setFieldValue(
                                                                    name,
                                                                    e.target
                                                                        .value
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
                                                    className="shadow bg-white rounded"
                                                />
                                                {offset &&
                                                    Array(offset)
                                                        .fill(null)
                                                        .map(() => <div></div>)}
                                            </>
                                        )

                                    case 'file-picker':
                                        return (
                                            <>
                                                <ATMFilePickerWrapper
                                                    name={name}
                                                    key={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    onSelect={(newFile) =>
                                                        setFieldValue(
                                                            name,
                                                            newFile
                                                        )
                                                    }
                                                    selectedFile={values[name]}
                                                />

                                                {offset &&
                                                    Array(offset)
                                                        .fill(null)
                                                        .map(() => <div></div>)}
                                            </>
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
                                                        setFieldValue(
                                                            `otherDocument[${otherDocumentIndex}].documentName`,
                                                            e.target.value
                                                        )
                                                    }}
                                                    label={'Document Name'}
                                                    placeholder={
                                                        'Document Name'
                                                    }
                                                    className="shadow bg-white rounded"
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
                                                    // selectedFile={otherDocument.documentFile}
                                                />

                                                <div></div>
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
                                    <HiPlus size="20" />
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
