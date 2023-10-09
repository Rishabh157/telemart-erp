/// ==============================================
// Filename:StepAddDocuments.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress } from '@mui/material'

// |-- Internal Dependencies --|
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddVendorWrapper'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { useFileUploaderMutation } from 'src/services/media/SlotDefinitionServices'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type FieldType = Field<''>

type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: { sectionName: string; fields: FieldType[] }[]
}

const StepAddDocuments = ({ formikProps, formFields }: Props) => {
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
            {formFields?.map((formField, index) => {
                const { sectionName, fields } = formField
                return (
                    <div key={index} className={`py-9 px-7`}>
                        <div className="text-primary-main text-lg pb-2 font-medium ">
                            {sectionName}
                        </div>

                        <div className="grid grid-cols-2 gap-4 gap-y-5">
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
                                                    setFieldValue(
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
                                            <div className="mt-3">
                                                <ATMFilePickerWrapper
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    onSelect={(newFile) => {
                                                        setLoaderState(name)
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
                                                            newFile || ''
                                                        )
                                                        setImageApiStatus(true)
                                                        fileUploader(
                                                            formData
                                                        ).then((res: any) => {
                                                            if ('data' in res) {
                                                                setImageApiStatus(
                                                                    false
                                                                )
                                                                handleSetFieldValue(
                                                                    name,
                                                                    res?.data
                                                                        ?.data
                                                                        ?.fileUrl
                                                                )
                                                            }
                                                            setImageApiStatus(
                                                                false
                                                            )
                                                        })
                                                    }}
                                                    selectedFile={values[name]}
                                                />
                                                {loaderState === name &&
                                                imageApiStatus ? (
                                                    <div className="mt-3 text-center">
                                                        <CircularProgress
                                                            size={21}
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
        </div>
    )
}

export default StepAddDocuments
