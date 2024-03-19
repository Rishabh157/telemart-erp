/// ==============================================
// Filename:StepEditCompanyDeatils.tsx
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
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditVendorWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- ITypes --|
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

const StepEditComapnyDetails = ({
    formikProps,
    dropdownOptions,
    formFields,
}: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="py-9 px-7">
            <div className="grid grid-cols-4 gap-4 gap-y-5">
                {formFields?.map((field: FieldType) => {
                    const {
                        type = 'text',
                        name,
                        label,
                        placeholder,
                        required,
                    } = field
                    switch (type) {
                        case 'text':
                            return (
                                <React.Fragment key={name}>
                                    <ATMTextField
                                        required={required}
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
                                        className="bg-white rounded shadow"
                                        isSubmitting={isSubmitting}
                                    />
                                </React.Fragment>
                            )

                        case 'select':
                            return (
                                <div className="mt-0" key={name}>
                                    <ATMSelect
                                        name={name}
                                        required={required}
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
}

export default StepEditComapnyDetails
