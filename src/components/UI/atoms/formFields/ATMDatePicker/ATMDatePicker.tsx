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
import { getInputHeight, Size } from 'src/utils/formUtils/getInputHeight'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

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
    dateTimeFormat = 'MM/DD/YYYY',
    minDate,
}: Props) => {
    return (
        <div className="relative">
            {label && (
                <label className={`text-slate-700 ${labelClass}`}>
                    {' '}
                    {label}{' '}
                    {required && <span className="text-red-500"> * </span>}{' '}
                </label>
            )}

            <div
                className={`${label && 'mt-2'} ${getInputHeight(
                    size
                )} flex items-center `}
            >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        disabled={disabled}
                        inputFormat={dateTimeFormat}
                        value={value}
                        onChange={onChange}
                        minDate={minDate}
                        showDaysOutsideCurrentMonth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                fullWidth
                                className="bg-white"
                                style={{ height: size === 'xs' ? '30px' : '' }}
                                // InputProps={{
                                //     style: {

                                //         // height: size === 'xs' ? '30px' : '',
                                //         borderColor: 'rgb(51 65 85)',
                                //         // borderWidth: '0.5px',
                                //     },
                                // }}
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
                            {' '}
                            {errMsg}{' '}
                        </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMDatePicker
