/// ==============================================
// Filename:StepAddDealerDetails.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddDealerWrapper'
import { DropdownOptions, FieldType } from './StepAddDealerDetailsWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'


// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
    formFields: FieldType[]
}

const StepAddDealerDetails = ({
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
                                <div key={name}>
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
                                </div>
                            )
                        case 'number':
                            return (
                                <div key={name}>
                                    <ATMTextField
                                        key={name}
                                        name={name}
                                        value={values[name]}
                                        onChange={(e) => {
                                            const inputValue = e.target.value
                                            if (!isNaN(Number(inputValue))) {
                                                handleSetFieldValue(
                                                    name,
                                                    e.target.value
                                                )
                                            }
                                            // handleSetFieldValue(name, e.target.value)
                                        }}
                                        label={label}
                                        placeholder={placeholder}
                                        className="shadow bg-white rounded"
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            )
                        case 'switch-button':
                            return (
                                <div key={name}>
                                    <ATMSwitchButton
                                        name={name}
                                        value={values[name]}
                                        label={label}
                                        onChange={(value: any) => {
                                            handleSetFieldValue(name, value)
                                        }}
                                    />
                                </div>
                            )

                        case 'password':
                            return (
                                <div key={name}>
                                    <ATMTextField
                                        type="password"
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
                                </div>
                            )

                        case 'select':
                            return (
                                <div key={name} className="-mt-2">
                                    <ATMSelectSearchable
                                        label={label}
                                        selectLabel={`Select ${label}`}
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
                                                    'dealerCategoryOptions'
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

export default StepAddDealerDetails
