/// ==============================================
// Filename:ATMSelect.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormControl, MenuItem, Select } from '@mui/material'
import { ErrorMessage } from 'formik'
import {
    getLabelTextTransform,
    textTransform,
} from 'src/utils/formUtils/getInputHeight'

// |-- Types --|
type Props = {
    options: any[]
    isDisabled?: boolean
    value: any
    onChange: (value: any) => void
    label?: string
    required?: boolean
    size?: 'small' | 'medium'
    name: string
    isSubmitting?: boolean
    textTransform?: textTransform
}

const ATMSelect = ({
    options,
    label = '',
    required = false,
    isDisabled = false,
    value,
    onChange,
    size = 'small',
    textTransform = 'firstLetterCapitalonly',
    name,
    isSubmitting = true,
}: Props) => {
    return (
        <>
            <div className="relative mt-3">
                {label && (
                    <label className="text-sm font-medium capitalize text-slate-700 ">
                        {getLabelTextTransform(label, textTransform)}
                        {required && <span className="text-red-500"> * </span>}
                    </label>
                )}
                <FormControl fullWidth>
                    <Select
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled={isDisabled}
                        size={size}
                        className="shadow "
                        displayEmpty
                    >
                        <MenuItem value="">
                            <span className=" text-slate-400">
                                Select{` `}
                                {getLabelTextTransform(
                                    label,
                                    textTransform
                                )?.toLocaleLowerCase()}
                            </span>
                        </MenuItem>
                        {options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option?.label.charAt(0).toUpperCase() +
                                    option?.label.slice(1).toLowerCase()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {name && isSubmitting && (
                    <ErrorMessage name={name}>
                        {(errMsg) => (
                            <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
                                <span>
                                    {errMsg.charAt(0).toUpperCase() +
                                        errMsg.slice(1).toLowerCase()}
                                </span>
                            </p>
                        )}
                    </ErrorMessage>
                )}
            </div>
        </>
    )
}
export default ATMSelect
