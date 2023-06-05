import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditVendorWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

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
    return (
        <div className="py-9 px-7">
            <div className="grid grid-cols-4 gap-4 gap-y-5">
                {formFields?.map((field: FieldType) => {
                    const { type = 'text', name, label, placeholder } = field

                    switch (type) {
                        case 'text':
                            return (
                                <ATMTextField
                                    key={name}
                                    name={name}
                                    value={values[name]}
                                    onChange={(e) => {
                                        setFieldValue(name, e.target.value)
                                    }}
                                    label={label}
                                    placeholder={placeholder}
                                    className="shadow bg-white rounded"
                                    isSubmitting={isSubmitting}
                                />
                            )

                        case 'select':
                            return (
                                <div className="-mt-2">
                                <ATMSelect
                                    key={name}
                                    name={name}
                                    value={values[name]}
                                    onChange={(e) => {
                                        setFieldValue(name, e.target.value)
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
