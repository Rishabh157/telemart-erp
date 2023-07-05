import React from 'react'
import { ErrorMessage } from 'formik'

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
    readOnly? : boolean 
}

const ATMTextArea = ({
    label,
    required = false,
    value,
    onChange,
    className,
    placeholder,
    minRows = 2,
    labelClass = ' font-medium',
    name = '',
    readOnly= false,
    isSubmitting = true,
}: Props) => {
    return (
        <div className=" mt-4">
            {label && (
                <label className={`text-slate-700 ${labelClass}`}>
                    {label}{' '}
                    {required && <span className="text-red-500"> * </span>}
                </label>
            )}
            <textarea
                readOnly={readOnly}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={minRows}
                className={`w-full p-2 bg-white text-slate-700 border border-slate-400 outline-blue-400  ${
                    label && 'mt-2'
                }  ${className}`}
                placeholder={placeholder}
            />

            {name && isSubmitting && (
                <ErrorMessage name={name}>
                    {(errMsg) => (
                        <p className="font-poppins text-[14px] text-start mt-0 text-red-500">
                            {errMsg}
                        </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMTextArea
