/// ==============================================
// Filename:ATMTextField.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { ErrorMessage } from 'formik'
// import { BsInfoCircle } from 'react-icons/bs'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

// |-- Internal Dependencies --|
import MouseOverPopover from 'src/components/utilsComponent/MouseOverPopover'
import {
    getInputHeight,
    getLabelFont,
} from 'src/utils/formUtils/getInputHeight'

// |-- Types --|
export type ATMTextFieldPropTypes = {
    name: string
    value: string | string[] | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    autoFocus?: boolean
    label?: string
    size?: 'small' | 'medium' | 'large' | 'xs'
    isSubmitting?: boolean
    onBlur?: ((e: any) => void) & React.FocusEventHandler<HTMLInputElement>
    extraClassField?: string
    labelClass?: string
    disabled?: boolean
    isInfo?: boolean
    InfoChildren?: React.ReactNode
    InfoTitle?: string
    isPassWordVisible?: boolean
    labelDirection?: 'horizontal' | 'vertical'
    classDirection?: string
    labelSize?: 'small' | 'medium' | 'large' | 'xs'
} & Omit<React.ComponentProps<'input'>, 'size'>

const ATMTextField = ({
    name,
    value,
    onChange,
    label,
    className = `shadow bg-white rounded ${label && 'mt-2'} `,
    required,
    onBlur,
    autoFocus = false,
    onInput,
    size = 'small',
    type = 'text',
    isSubmitting = true,
    extraClassField = 'w-full',
    disabled = false,
    isInfo = false,
    InfoChildren = null,
    InfoTitle = 'Info',
    labelClass = 'font-medium mb-1',
    labelDirection = 'vertical',
    classDirection = 'grid grid-cols-12',
    labelSize = 'small',
    ...rest
}: ATMTextFieldPropTypes) => {
    const [visibility, setVisibility] = useState(type)
    function preventSlash(event: any) {
        var key = event.keyCode || event.which
        if (key === 47) {
            // 47 is the key code for "/"
            event.preventDefault()
        }
    }
    return (
        <div className={twMerge('relative mt-3', `${extraClassField}`)}>
            <div
                className={`  ${
                    labelDirection === 'horizontal'
                        ? `  gap-2 w-full  ${classDirection}`
                        : ' '
                }`}
            >
                <div
                    className={`flex gap-1 ${
                        labelDirection === 'horizontal'
                            ? `  col-span-4 w-full h-full flex items-center `
                            : ' '
                    }`}
                >
                    {label && (
                        <label
                            className={`text-slate-700 ${getLabelFont(
                                labelSize
                            )} ${labelClass}`}
                        >
                            {label}{' '}
                            {required && (
                                <span className="text-red-500"> * </span>
                            )}{' '}
                        </label>
                    )}
                    {isInfo && (
                        <MouseOverPopover
                            title={InfoTitle}
                            children={InfoChildren}
                        />
                    )}
                </div>

                <input
                    autoFocus={autoFocus}
                    name={name}
                    type={visibility}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => {
                        preventSlash(e)
                        onChange(e)
                    }}
                    className={`${getInputHeight(
                        size
                    )}  w-full px-2 text-slate-700 border ${
                        disabled ? 'bg-blue-100' : ''
                    } border-slate-400 outline-blue-400   ${
                        labelDirection === 'horizontal' ? 'col-span-8' : ''
                    } ${className}`}
                    {...rest}
                    onBlur={onBlur}
                />
            </div>
            {type === 'password' ? (
                <div className="absolute top-[26px] right-2 mt-4">
                    {visibility === 'text' ? (
                        <AiFillEye
                            size={18}
                            onClick={(e) => {
                                e.stopPropagation()
                                setVisibility('password')
                            }}
                        />
                    ) : (
                        <AiFillEyeInvisible
                            size={18}
                            onClick={(e) => {
                                e.stopPropagation()
                                setVisibility('text')
                            }}
                        />
                    )}
                </div>
            ) : null}
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

export default ATMTextField
