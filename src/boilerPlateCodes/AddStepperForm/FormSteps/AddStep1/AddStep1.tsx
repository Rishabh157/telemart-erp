// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddStepperFormWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { FieldType } from './AddStep1Wrapper'

// |-- Types --|
type DropdownOptions = {
    companyTypeOptions: SelectOption[]
    ownershipTypeOptions: SelectOption[]
}

type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
    formFields: FieldType[]
}

const AddStep1 = ({ formikProps, dropdownOptions, formFields }: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps

    return (
        <div className="py-6 px-7">
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
                                />
                            )

                        case 'select':
                            return (
                                <ATMSelect
                                    name={name}
                                    value={values[name]}
                                    onChange={(e) => {
                                        setFieldValue(name, e.target.value)
                                    }}
                                    size="small"
                                    label={label}
                                    options={
                                        dropdownOptions[
                                            // field.optionAccessKey ||
                                            'companyTypeOptions'
                                        ]
                                    }
                                />
                            )

                        default:
                            return null
                    }
                })}
            </div>
        </div>
    )
}

export default AddStep1
