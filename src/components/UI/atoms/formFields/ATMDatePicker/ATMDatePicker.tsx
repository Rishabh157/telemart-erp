/// ==============================================
// Filename:ATMDatePicker.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { ErrorMessage } from 'formik'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { TextField } from '@mui/material'
import {
    getInputHeight,
    getLabelTextTransform,
    Size,
    textTransform,
} from 'src/utils/formUtils/getInputHeight'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { twMerge } from 'tailwind-merge'

// |-- Types --|
type Props = {
    label?: string
    required?: boolean
    name: string
    value: any
    onChange: (value: any) => void
    size?: Size
    disabled?: boolean
    isSubmitting?: boolean
    dateTimeFormat?: string
    labelClass?: string
    minDate?: any | null
    inputSize?: string
    textTransform?: textTransform
    placeholder?: string
    className?: string
    maxDate?: any | null
}

const ATMDatePicker = ({
    label,
    name,
    required = false,
    value,
    onChange,
    size = 'small',
    disabled = false,
    isSubmitting = true,
    labelClass = 'font-medium text-sm',
    dateTimeFormat = 'DD/MM/YYYY',
    minDate,
    textTransform = 'firstLetterCapitalonly',
    inputSize = '16px',
    placeholder,
    className,
    maxDate,
}: Props) => {
    return (
        <div className="relative">
            {label && (
                <label className={`text-slate-700 ${labelClass}`}>
                    {getLabelTextTransform(label, textTransform)}
                    {required && <span className="text-red-500"> * </span>}{' '}
                </label>
            )}

            <div
                className={twMerge(
                    `${getInputHeight(size)} flex items-center `,
                    `${className}`
                )}
            >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        disabled={disabled}
                        inputFormat={dateTimeFormat}
                        value={value ? value : null}
                        onChange={onChange}
                        minDate={minDate}
                        maxDate={maxDate}
                        showDaysOutsideCurrentMonth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                placeholder={placeholder}
                                fullWidth
                                className="bg-white"
                                inputProps={{
                                    style: {
                                        height: inputSize, // Adjust the height as needed
                                        // Add any other necessary input styles here
                                    },
                                    value: params?.inputProps?.value,
                                    //    / Preserve the value
                                    onChange: params?.inputProps?.onChange, // Preserve the onChange event
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </div>

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
    )
}

export default ATMDatePicker
