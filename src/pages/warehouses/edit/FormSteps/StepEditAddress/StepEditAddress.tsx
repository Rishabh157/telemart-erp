import { FormControl, MenuItem, Select } from '@mui/material'
import { FormikProps } from 'formik'
import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditWarehouseWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

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
                                            <div
                                                key={name}
                                                className="relative mt-8"
                                            >
                                                <FormControl fullWidth>
                                                    <Select
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
                                                            setFieldValue(
                                                                name,
                                                                e.target.value
                                                            )
                                                            if (
                                                                name ===
                                                                'regd_address.country'
                                                            ) {
                                                                formikProps.setFieldValue(
                                                                    'regd_address.district',
                                                                    ''
                                                                )
                                                                formikProps.setFieldValue(
                                                                    'regd_address.state',
                                                                    ''
                                                                )
                                                                formikProps.setFieldValue(
                                                                    'regd_address.pincode',
                                                                    ''
                                                                )
                                                            }
                                                            if (
                                                                name ===
                                                                'billing_address.country'
                                                            ) {
                                                                formikProps.setFieldValue(
                                                                    'billing_address.district',
                                                                    ''
                                                                )
                                                                formikProps.setFieldValue(
                                                                    'billing_address.state',
                                                                    ''
                                                                )
                                                                formikProps.setFieldValue(
                                                                    'billing_address.pincode',
                                                                    ''
                                                                )
                                                            }
                                                        }}
                                                        size="small"
                                                        className="shadow mt-2"
                                                        displayEmpty
                                                    >
                                                        {dropdownOptions[
                                                            field.optionAccessKey ||
                                                                'counrtyOptions'
                                                        ]?.map((option) => (
                                                            <MenuItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {' '}
                                                                {
                                                                    option.label
                                                                }{' '}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
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
