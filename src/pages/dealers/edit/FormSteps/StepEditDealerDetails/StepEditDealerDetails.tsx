import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditDealerWrapper'
import { DropdownOptions, FieldType } from './StepEditDealerDetailsWrapper'
import {useSelector} from 'react-redux';
import { RootState } from 'src/redux/store'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
    formFields: FieldType[]
}

const StepEditDealerDetails = ({
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
                                <div key={name} className="relative mt-4">
                                    <InputLabel className="mb-2">
                                        {' '}
                                        {label}{' '}
                                    </InputLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            name={name}
                                            value={values[name]}
                                            onChange={(e) => {
                                                setFieldValue(
                                                    name,
                                                    e.target.value
                                                )
                                            }}
                                            size="small"
                                            className="shadow"
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <span className="text-slate-400">
                                                    Select {label}
                                                </span>
                                            </MenuItem>
                                            {dropdownOptions[
                                                field.optionAccessKey ||
                                                    'dealerCategoryOptions'
                                            ]?.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {' '}
                                                    {option.label}{' '}
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
}

export default StepEditDealerDetails
