/// ==============================================
// Filename:ATMRadioButton.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { ErrorMessage } from 'formik'

// |-- Internal Dependencies --|
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Types --|
export type Props = {
    name: string
    options: SelectOption[]
    label?: string
    value: string | string[] | number
    required?: boolean
    className?: string
    onChange: (e: string) => void
    isSubmitting?: boolean
}

const ATMRadioButton = ({
    value,
    required = false,
    name,
    options,
    label,
    className = 'mt-2',
    onChange,
    isSubmitting = true,
}: Props) => {
    return (
        <div className="relative mt-4  w-full">
            {label && (
                <label className="text-slate-700 text-sm font-semibold">
                    {label}
                    {required && <span className="text-red-500"> * </span>}
                </label>
            )}

            <div
                className={`flex ${className} w-full py-2 pr-2 grid grid-cols-2 gap-1`}
            >
                {options.map((option: SelectOption, index) => (
                    <div
                        onChange={() => {
                            onChange(option.value as string)
                        }}
                        key={index}
                        className={`${
                            index === 0 ? '' : ''
                        } lg:flex ms:flex  xl:flex sm:text-sm lg:text-lg text-base  `}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={value}
                            checked={option.value === value}
                            onChange={() => {}}
                        />
                        <label
                            onClick={() => {
                                onChange(option.value as string)
                            }}
                            className="ml-1 xs:text-xs sm:text-sm  lg:text-base md:text-sm "
                        >
                            {option.label}
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
