/// ==============================================
// Filename:ATMSwitchButton.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { ErrorMessage } from 'formik'
import { getLabelTextTransform, textTransform } from 'src/utils/formUtils/getInputHeight'

// |-- Types --|
type Props = {
    label?: string
    required?: boolean
    name: string
    value: boolean
    onChange: (value: boolean) => void
    disabled?: boolean
    hidden?: boolean
    title1?: string
    title2?: string
    textTransform?: textTransform
}

const ATMSwitchButton = ({
    label,
    name,
    required = false,
    value,
    onChange,
    disabled,
    title1 = 'Yes',
    title2 = 'No',
    hidden = false,
    textTransform = 'firstLetterCapitalonly'
}: Props) => {
    return (
        <div hidden={hidden} className="relative mt-4 ml-1">
            {label && (
                <label className="text-slate-700 font-medium text-xs">
                        {getLabelTextTransform(label, textTransform)}
                    {required && <span className="text-red-500"> * </span>}{' '}
                </label>
            )}

            <div className={`${label} h-[40px] flex items-center`}>
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(!value)}
                    className="flex justify-between min-w-[150px]  rounded bg-slate-200 shadow"
                >
                    <div
                        className={`${
                            value
                                ? 'bg-primary-main text-white rounded shadow-lg'
                                : 'rounded-r'
                        } flex-1 py-1 h-full transition-all duration-500`}
                    >
                        {title1}
                    </div>
                    <div
                        className={`${
                            !value
                                ? ' bg-primary-main text-white rounded shadow-lg'
                                : 'rounded-r'
                        } flex-1 py-1 h-full transition-all duration-500`}
                    >
                        {title2}
                    </div>
                </button>
            </div>

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

export default ATMSwitchButton
