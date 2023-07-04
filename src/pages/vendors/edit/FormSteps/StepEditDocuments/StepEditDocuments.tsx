/// ==============================================
// Filename:StepEditDocuments.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditVendorWrapper'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'


// |-- Types --|
type FieldType = Field<''>

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
    const dispatch = useDispatch()
    const handleSetFieldValue = (
        name: string,
        value: string | boolean | File
    ) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="">
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
                                                isSubmitting={isSubmitting}
                                            />
                                        )

                                    case 'file-picker':
                                        return (
                                            <ATMFilePickerWrapper
                                                name={name}
                                                key={name}
                                                label={label}
                                                placeholder={placeholder}
                                                onSelect={(newFile) =>
                                                    handleSetFieldValue(
                                                        name,
                                                        newFile
                                                    )
                                                }
                                                selectedFile={values[name]}
                                            />
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
