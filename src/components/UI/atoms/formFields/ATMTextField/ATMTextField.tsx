import { ErrorMessage } from 'formik'
import React from 'react'
import { getInputHeight } from 'src/utils/formUtils/getInputHeight'

export type ATMTextFieldPropTypes = {
    name: string
    value: string | string[] | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    size?: 'small' | 'medium' | 'large' | 'xs'
    isSubmitting?: boolean
    onBlur?: ((e: any) => void) & React.FocusEventHandler<HTMLInputElement>
    extraClassField?: string
    labelClass?: string
} & Omit<React.ComponentProps<'input'>, 'size'>

const ATMTextField = ({
    name,
    value,
    className = 'shadow bg-white rounded',
    onChange,
    label,
    required,
    onBlur,
    size = 'small',
    isSubmitting = true,
    extraClassField = '',
    labelClass = ' font-medium',
    ...rest
}: ATMTextFieldPropTypes) => {
    return (
        <div className={`relative mt-4 ${extraClassField}`}>
            {label && (
                <label className={`text-slate-700 ${labelClass}`}>
                  
                    {label}{' '}
                    {required && <span className="text-red-500"> * </span>}{' '}
                </label>
            )}
            <input
                name={name}
                value={value}
                onChange={(e) => {
                    onChange(e)
                }}
                className={`${getInputHeight(
                    size
                )} w-full px-2 text-slate-700 border border-slate-400 outline-blue-400  ${
                    label && 'mt-2'
                }  ${className}`}
                {...rest}
                onBlur={onBlur}
            />
            {name && isSubmitting && (
                <ErrorMessage name={name}>
                    {(errMsg) => (
                        <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500 py-1 mb-1">
                            {' '}
                            {errMsg}{' '}
                        </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMTextField
