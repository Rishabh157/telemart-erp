/// ==============================================
// Filename:StepAddCompanyDetails.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddVendorWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- types --|
type DropdownOptions = {
    companyTypeOptions: SelectOption[]
    ownershipTypeOptions: SelectOption[]
}

type FieldType = Field<'companyTypeOptions' | 'ownershipTypeOptions'>

type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
    formFields: FieldType[]
}

const StepAddComapnyDetails = ({
    formikProps,
    dropdownOptions,
    formFields,
}: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="py-6 px-7">
            <div className="grid grid-cols-4 gap-4 gap-y-5">
                {formFields?.map((field: FieldType, index: number) => {
                    const { type = 'text', name, label, placeholder } = field

                    switch (type) {
                        case 'text':
                            return (
                                <ATMTextField
                                    key={index}
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
                                />
                            )

                        case 'select':
                            return (
                                <div className="mt-0">
                                    <ATMSelect
                                        key={index}
                                        name={name}
                                        value={values[name]}
                                        onChange={(e) => {
                                            handleSetFieldValue(
                                                name,
                                                e.target.value
                                            )
                                        }}
                                        size="small"
                                        label={label}
                                        options={
                                            dropdownOptions[
                                                field.optionAccessKey ||
                                                    'companyTypeOptions'
                                            ]
                                        }
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
}

export default StepAddComapnyDetails
