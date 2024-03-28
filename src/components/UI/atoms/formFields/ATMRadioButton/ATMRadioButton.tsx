/// ==============================================
// Filename:ATMRadioButton.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'
import { twMerge } from 'tailwind-merge'
// |-- External Dependencies --|
import { ErrorMessage } from 'formik'

// |-- Internal Dependencies --|
import { SelectOption } from 'src/models/FormField/FormField.model'
import { getLabelTextTransform, textTransform } from 'src/utils/formUtils/getInputHeight'

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
    labelCalassName?: string
    textTransform?: textTransform
}

const ATMRadioButton = ({
    value,
    required = false,
    name,
    options,
    label,
    className = 'mt-2',
    onChange,
    textTransform = 'firstLetterCapitalonly',
    isSubmitting = true,
    labelCalassName,
}: Props) => {
    return (
        <div className="relative mt-4  w-full">
            {label && (
                <label
                    className={twMerge(
                        'text-slate-700 text-sm font-semibold',
                        `${labelCalassName}`
                    )}
                >
                  {getLabelTextTransform(label, textTransform)}
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
                            className={`ml-1 ${
                                !labelCalassName
                                    ? 'xs:text-xs sm:text-sm lg:text-base md:text-sm'
                                    : 'text-xs'
                            }`}
                        >
                              {option.label.charAt(0).toUpperCase() + option.label.slice(1).toLowerCase()}
                            
                        </label>
                    </div>
                ))}
            </div>
            {name && isSubmitting && (
                <ErrorMessage name={name}>
                    {(errMsg) => (
                               <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
                        <span >
                            {errMsg.charAt(0).toUpperCase() + errMsg.slice(1).toLowerCase()}
                        </span>
                    </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMRadioButton
