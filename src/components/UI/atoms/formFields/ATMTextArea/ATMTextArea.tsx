/// ==============================================
// Filename:ATMTextArea.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'
import { twMerge } from 'tailwind-merge'

// |-- External Dependencies --|
import { ErrorMessage } from 'formik'

// |-- Types --|
type Props = {
    label?: string
    required?: boolean
    value: string
    onChange: (value: string) => void
    className?: string
    placeholder?: string
    minRows?: number
    name?: string
    isSubmitting?: boolean
    labelClass?: string
    readOnly?: boolean
    isDisable?: boolean
}

const ATMTextArea = ({
    label,
    required = false,
    value,
    onChange,
    className = 'mt-2',
    placeholder,
    minRows = 2,
    labelClass = ' font-medium',
    name = '',
    readOnly = false,
    isSubmitting = true,
    isDisable = false,
}: Props) => {
    return (
        <div className="mt-3">
            {label && (
                <label className={`text-slate-700 ${labelClass}`}>
                    {label.charAt(0).toUpperCase() +
                        label.slice(1).toLowerCase()}
                    {required && <span className="text-red-500"> * </span>}
                </label>
            )}
            <textarea
                disabled={isDisable}
                readOnly={readOnly}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={minRows}
                className={twMerge(
                    `w-full p-2 bg-white text-slate-700 border border-slate-400 outline-blue-400  ${
                        label && 'mt-2'
                    }`,
                    `${className}`
                )}
                placeholder={placeholder}
            />

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

export default ATMTextArea
