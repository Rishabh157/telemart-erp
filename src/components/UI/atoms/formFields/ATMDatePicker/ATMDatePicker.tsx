import React from 'react'
import { ErrorMessage } from 'formik'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { TextField } from '@mui/material'
import { getInputHeight, Size } from 'src/utils/formUtils/getInputHeight'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

type Props = {
    label?: string
    required?: boolean
    name: string
    value: any
    onChange: (value: any) => void
    size?: Size
    disabled?: boolean
    isSubmitting?: boolean
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
}: Props) => {
    return (
        <div className="relative">
            {label && (
                <label className="text-slate-700 font-medium">
                    {' '}
                    {label}{' '}
                    {required && <span className="text-red-500"> * </span>}{' '}
                </label>
            )}

            <div
                className={`${label && 'mt-2'} ${getInputHeight(
                    size
                )} flex items-center`}
            >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        disabled={disabled}
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                fullWidth
                                className="bg-white"
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
