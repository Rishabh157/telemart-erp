/// ==============================================
// Filename:StepAddAddress.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddVendorWrapper'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import { setFormSubmitting } from 'src/redux/slices/authSlice'

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
    const dispatch = useDispatch()
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps

    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

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
                                                            setFieldValue(
                                                                name,
                                                                String(
                                                                    inputValue
                                                                )
                                                            )
                                                        }
                                                    } else {
                                                        setFieldValue(
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
                                                    selectLabel={`Select ${label}`}
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
                                                        setFieldValue(name, e)
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

                                                    setFieldValue(name, e)
                                                   
                                                    if (e) {
                                                        const {
                                                            address,
                                                            country,
                                                            district,
                                                            phone,
                                                            pincode,
                                                            state,
                                                        } = values.regd_address
                                                        setFieldValue(
                                                            'billing_address.phone',
                                                            phone
                                                        )
                                                        setFieldValue(
                                                            'billing_address.address',
                                                            address
                                                        )
                                                        setFieldValue(
                                                            'billing_address.country',
                                                            country
                                                        )
                                                        setFieldValue(
                                                            'billing_address.district',
                                                            district
                                                        )
                                                        setFieldValue(
                                                            'billing_address.pincode',
                                                            pincode
                                                        )
                                                        setFieldValue(
                                                            'billing_address.state',
                                                            state
                                                        )
                                                    } else {
                                                        setFieldValue(
                                                            'billing_address.address',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billing_address.country',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billing_address.district',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billing_address.phone',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billing_address.pincode',
                                                            ''
                                                        )
                                                        setFieldValue(
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
