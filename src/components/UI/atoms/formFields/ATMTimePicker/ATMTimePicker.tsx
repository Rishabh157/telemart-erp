/// ==============================================
// Filename:ATMTimePicker.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { ErrorMessage } from 'formik'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { getInputHeight, getLabelTextTransform, Size, textTransform } from 'src/utils/formUtils/getInputHeight'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { TextField } from '@mui/material'

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
    error?: boolean
    textTransform?: textTransform
}

const ATMTimePicker = ({
    label,
    name,
    required = false,
    value,
    onChange,
    size = 'small',
    disabled = false,
    isSubmitting = true,
    textTransform = 'firstLetterCapitalonly',
    error,
}: Props) => {
    return (
        <div className="relative mt-4">
            {label && (
                <label className="text-slate-700 font-medium">
                    {getLabelTextTransform(label, textTransform)}
                    {required && <span className="text-red-500"> * </span>}{' '}
                </label>
            )}

            <div
                className={`${label && 'mt-1'} ${getInputHeight(
                    size
                )} flex items-center`}
            >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                        value={value}
                        inputFormat="HH:mm:ss"
                        disabled={disabled}
                        onChange={onChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                fullWidth
                                className="bg-white"
                                error={value === '' ? false : undefined}
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

export default ATMTimePicker
