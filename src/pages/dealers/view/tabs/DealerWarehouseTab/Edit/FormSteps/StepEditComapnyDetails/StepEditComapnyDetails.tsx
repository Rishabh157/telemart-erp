/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StepEditCompanyDetails.tsx
// Type: View-Tab Component
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
import { FormInitialValues } from '../../EditDealerWarehouseWrapper'
import { DropdownOptions, FieldType } from './StepEditCompanyDetailsWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- External DependenciesrEDUX --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
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
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="py-9 px-7">
            <div className="grid grid-cols-3 gap-4 gap-y-5">
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

                        case 'select':
                            return (
                                <ATMSelectSearchable
                                    selectLabel={label}
                                    label={label}
                                    name={name}
                                    value={
                                        name.includes('.')
                                            ? values[name.split('.')[0]][
                                                  name.split('.')[1]
                                              ]
                                            : values[name]
                                    }
                                    onChange={(e: any) => {
                                        handleSetFieldValue(name, e)
                                    }}
                                    options={
                                        dropdownOptions[
                                            field.optionAccessKey ||
                                                'countryOptions'
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

export default StepEditComapnyDetails
