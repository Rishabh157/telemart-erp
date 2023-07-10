/// ==============================================
// Filename:StepEditAddress.tsx
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

// |-- Redux --|
import { RootState } from 'src/redux/store'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'

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

type FieldType = Field<
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

const StepAddAddress = ({
    formikProps,
    formFields,
    dropdownOptions,
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
        <div className="">
            {formFields?.map((formField, index) => {
                const { sectionName, fields } = formField
                return (
                    <div
                        key={index}
                        className={`py-9 px-7 ${
                            index !== formFields.length - 1 && 'border-b'
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

                                    case 'select':
                                        return (
                                            <div key={name} className="-mt-2">
                                                <ATMSelectSearchable
                                                    label={label}
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
                                                    onChange={(e) => {
                                                        handleSetFieldValue(
                                                            name,
                                                            e
                                                        )
                                                        if (
                                                            name ===
                                                            'regd_address.country'
                                                        ) {
                                                            handleSetFieldValue(
                                                                'regd_address.district',
                                                                ''
                                                            )
                                                            handleSetFieldValue(
                                                                'regd_address.state',
                                                                ''
                                                            )
                                                            handleSetFieldValue(
                                                                'regd_address.pincode',
                                                                ''
                                                            )
                                                        }
                                                        if (
                                                            name ===
                                                            'billing_address.country'
                                                        ) {
                                                            handleSetFieldValue(
                                                                'billing_address.district',
                                                                ''
                                                            )
                                                            handleSetFieldValue(
                                                                'billing_address.state',
                                                                ''
                                                            )
                                                            handleSetFieldValue(
                                                                'billing_address.pincode',
                                                                ''
                                                            )
                                                        }
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
                                    case 'checkbox':
                                        return (
                                            <ATMCheckbox
                                                key={name}
                                                name={name}
                                                label={label}
                                                checked={Boolean(values[name])}
                                                onChange={(e) => {
                                                    dispatch(
                                                        setFormSubmitting(false)
                                                    )

                                                    handleSetFieldValue(name, e)
                                                    console.log(values)
                                                    if (e) {
                                                        const {
                                                            address,
                                                            country,
                                                            district,
                                                            phone,
                                                            pincode,
                                                            state,
                                                        } = values.regd_address
                                                        handleSetFieldValue(
                                                            'billing_address.phone',
                                                            phone
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.address',
                                                            address
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.country',
                                                            country
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.district',
                                                            district
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.pincode',
                                                            pincode
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.state',
                                                            state
                                                        )
                                                    } else {
                                                        handleSetFieldValue(
                                                            'billing_address.address',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.country',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.district',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.phone',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.pincode',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billing_address.state',
                                                            ''
                                                        )
                                                    }
                                                }}
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

export default StepAddAddress
