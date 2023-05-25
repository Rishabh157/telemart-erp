import { ErrorMessage } from 'formik'
import React from 'react'

export type Props = {
    name: string
    options: string[]
    label?: string
    value: string | string[] | number
    required?: boolean
    onChange: (e: string) => void
    isSubmitting?: boolean
}

const ATMRadioButton = ({
    value,
    required = false,
    name,
    options,
    label,
    onChange,
    isSubmitting = true,
}: Props) => {
    return (
        <div className="relative mt-4">
            {label && (
                <label className="text-slate-700 font-medium">
                    {label}
                    {required && <span className="text-red-500"> * </span>}
                </label>
            )}

            <div className="flex mt-2 gap-4 p-2">
                {options.map((option, index) => (
                    <div
                        onChange={() => {
                            onChange(option)
                        }}
                        key={index}
                        className={`${index === 0 ? '' : 'ml-4'}`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={option === value}
                        />
                        <label
                            onClick={() => {
                                onChange(option)
                            }}
                            className="ml-2"
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            {name && isSubmitting && (
                <ErrorMessage name={name}>
                    {(errMsg) => (
                        <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500 py-1 mb-1">
                            {errMsg}
                        </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMRadioButton
