import React from 'react'
import { FormControl, MenuItem, Select } from '@mui/material'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditDealerWrapper'
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

type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: {
        sectionName: string
        fields: FieldType[]
    }[]
    dropdownOptions: DropdownOptions
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
                                                    setFieldValue(
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
                                            <div
                                                key={name}
                                                className="relative mt-4"
                                            >
                                                <label className=" text-slate-700 font-medium">
                                                    {' '}
                                                    {label}{' '}
                                                </label>
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
                                                        }}
                                                        size="small"
                                                        className="shadow mt-2"
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="">
                                                            <span className="text-slate-400">
                                                                Select {label}
                                                            </span>
                                                        </MenuItem>
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
