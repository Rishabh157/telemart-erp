import React from 'react'
import { FieldArray, FormikProps } from 'formik'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddDealerWrapper'
import { FieldType } from './StepAddDocumentsWrapper'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

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
                                                    value={values[name]}
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
                                                    className="shadow bg-white rounded"
                                                    isSubmitting={isSubmitting}
                                                />
                                                {offset &&
                                                    Array(offset)
                                                        .fill(null)
                                                        .map(() => <div></div>)}
                                            </>
                                        )

                                    case 'file-picker':
                                        return (
                                            <div className="mt-2">
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
                                                    className="shadow bg-white rounded mt-0"
                                                    // selectedFile={otherDocument.documentFile}
                                                />

                                                <div></div>
                                            </div>
                                        </div>
                                    )
                                }
                            )}

                            <div className="flex justify-self-start px-6 py-9">
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

export default StepAddDocuments
