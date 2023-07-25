/// ==============================================
// Filename:StepEditAddress.tsx
// Type: View-Tab Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditDealerWarehouseWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import { useFileUploaderMutation } from 'src/services/media/SlotDefinitionServices'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type DropdownOptions = {
    counrtyOptions: SelectOption[]
    stateOptions: SelectOption[]
    districtOptions: SelectOption[]
    pincodeOptions: SelectOption[]
    billingCounrtyOptions: SelectOption[]
    billingStateOptions: SelectOption[]
    billingDistrictOptions: SelectOption[]
    billingPincodeOptions: SelectOption[]
}
export type FieldType = Field<
    | 'counrtyOptions'
    | 'stateOptions'
    | 'districtOptions'
    | 'pincodeOptions'
    | 'billingCounrtyOptions'
    | 'billingStateOptions'
    | 'billingDistrictOptions'
    | 'billingPincodeOptions'
>
type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: {
        sectionName: string
        fields: FieldType[]
    }[]
    dropdownOptions: DropdownOptions
}

const StepEditAddress = ({
    formikProps,
    formFields,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const [imageApiStatus, setImageApiStatus] = useState(false)
    const [fileUploader] = useFileUploaderMutation()
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
                    <div
                        key={index}
                        className={`py-9 px-7 ${
                            index !== formFields?.length - 1 && 'border-b'
                        }  border-slate-300`}
                    >
                        <div className="text-primary-main text-lg pb-2 font-medium">
                            {sectionName}
                        </div>

                        <div className="grid grid-cols-4 gap-4 gap-y-5">
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
                                                maxLength={
                                                    name ===
                                                        'regd_address.phone' ||
                                                    name ===
                                                        'billing_address.phone'
                                                        ? 10
                                                        : 100
                                                }
                                                key={name}
                                                name={name}
                                                value={
                                                    name.includes('.')
                                                        ? values[
                                                              name.split('.')[0]
                                                          ][name.split('.')[1]]
                                                        : values[name]
                                                }
                                                onChange={(e) => {
                                                    if (
                                                        name ===
                                                            'regd_address.phone' ||
                                                        name ===
                                                            'billing_address.phone'
                                                    ) {
                                                        const inputValue =
                                                            e.target.value
                                                        if (
                                                            !isNaN(
                                                                Number(
                                                                    inputValue
                                                                )
                                                            )
                                                        ) {
                                                            handleSetFieldValue(
                                                                name,
                                                                String(
                                                                    inputValue
                                                                )
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
                                                isSubmitting={isSubmitting}
                                            />
                                        )
                                    case 'file-picker':
                                        return (
                                            <div className="mt-4">
                                                <ATMFilePickerWrapper
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    onSelect={(newFile) => {
                                                        const formData =
                                                            new FormData()
                                                        formData.append(
                                                            'fileType',
                                                            'IMAGE'
                                                        )
                                                        formData.append(
                                                            'category',
                                                            'WAREHOUSEGSTCERTIFICATE'
                                                        )
                                                        formData.append(
                                                            'fileUrl',
                                                            newFile || ''
                                                        )
                                                        setImageApiStatus(true)
                                                        fileUploader(
                                                            formData
                                                        ).then((res) => {
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
                                                    selectedFile={
                                                        values.gstCertificate
                                                    }
                                                    disabled={false}
                                                />
                                                {imageApiStatus ? (
                                                    <div className=" mt-3 flex justify-center  items-center w-full h-full">
                                                        <CircularProgress />
                                                    </div>
                                                ) : null}
                                            </div>
                                        )

                                    case 'select':
                                        return (
                                            <div className="-mt-2">
                                                <ATMSelectSearchable
                                                    label={label}
                                                    selectLabel={label}
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
                                                    onChange={(e: any) => {
                                                        handleSetFieldValue(
                                                            name,
                                                            e
                                                        )
                                                    }}
                                                    options={
                                                        dropdownOptions[
                                                            field.optionAccessKey ||
                                                                'counrtyOptions'
                                                        ]
                                                    }
                                                    isSubmitting={isSubmitting}
                                                />
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

export default StepEditAddress
