/// ==============================================
// Filename:ATMPassword.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { ErrorMessage } from 'formik'
import { twMerge } from 'tailwind-merge'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

// |-- Internal Dependencies --|
import { getInputHeight, getLabelTextTransform, textTransform } from 'src/utils/formUtils/getInputHeight'

// |-- Types --|
type Props = {
    name: string
    extraClasses?: string
    label?: string
    textTransform?: textTransform
    inputProps?: {
        extraClasses?: string
    }
    iconProps?: {
        extraClasses?: string
    }
    size?: 'small' | 'medium' | 'large'
} & Omit<React.ComponentProps<'input'>, 'size'>

const ATMPassword = ({
    name,
    extraClasses = '',
    label,
    inputProps,
    iconProps,
    textTransform = 'firstLetterCapitalonly',
    size = 'small',
    ...rest
}: Props) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isFocussed, setIsFocussed] = useState(false)

    return (
        <div className="relative">
            {label ? (
                <label className="text-slate-700 block mb-1">
                      {getLabelTextTransform(label, textTransform)}
                    {rest.required && <span className="text-red-400"> * </span>}{' '}
                </label>
            ) : null}

            <div
                className={twMerge(
                    `${getInputHeight(
                        size
                    )} flex items-center border border-slate-400 px-2 rounded ${extraClasses} ${
                        isFocussed && 'border-2 border-primary-main'
                    }`
                )}
            >
                <input
                    name={name}
                    type={isShowPassword ? 'text' : 'password'}
                    className={twMerge(
                        `border-0 outline-0 rounded h-full w-full ${inputProps?.extraClasses}`
                    )}
                    onFocus={() => setIsFocussed(true)}
                    onBlur={() => setIsFocussed(false)}
                    {...rest}
                />

                <div
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    className={twMerge(
                        `text-xl text-slate-500 cursor-pointer  ${iconProps?.extraClasses}`
                    )}
                >
                    {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
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

export default ATMPassword
