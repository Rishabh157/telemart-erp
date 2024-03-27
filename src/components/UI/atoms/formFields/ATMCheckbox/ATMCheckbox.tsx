/// ==============================================
// Filename:ATMCheckbox.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { ErrorMessage } from 'formik'
import { twMerge } from 'tailwind-merge'
import { getLabelTextTransform, textTransform } from 'src/utils/formUtils/getInputHeight'

// |-- Types --|
type Props = {
    name?: string
    checked: boolean
    onChange: (checked: boolean, value: string) => void
    value?: string
    label?: string
    disabled?: boolean
    required?: boolean
    extraClasses?: string
    inputClasses?: string
    labelClasses?: string 
    textTransform?: textTransform
}

const ATMCheckbox = ({
    name,
    checked,
    onChange,
    value,
    label,
    disabled = false,
    required = false,
    extraClasses = '',
    inputClasses = '',
    textTransform = 'firstLetterCapitalonly',
    labelClasses = '',
}: Props) => {
    return (
        <div className={twMerge(`relative mt-8 ${extraClasses}`)}>
            <label className="inline-flex items-center">
                <input
                    type="checkbox"
                    checked={checked}
                    value={value}
                    onChange={(e) => onChange(e.target.checked, e.target.value)}
                    className={twMerge(`w-5 h-5 rounded ${inputClasses}`)}
                    disabled={disabled}
                />
                {label && (
                    <span
                        className={twMerge(
                            `ml-2  ${
                                disabled ? 'text-slate-300' : 'text-slate-600'
                            }`,
                            `${labelClasses}`
                        )}
                    >
                        {/* {label} */}
                          {getLabelTextTransform(label, textTransform)}
                          {required && <span className="text-red-500"> * </span>}{' '}
                    </span>
                )}
            </label>

            {name && (
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

export default ATMCheckbox
