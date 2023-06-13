import { ErrorMessage } from 'formik'
import React from 'react'
// import { BsInfoCircle } from 'react-icons/bs'
import MouseOverPopover from 'src/components/utilsComponent/MouseOverPopover'
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
    disabled?: boolean
    isInfo?: boolean
    InfoChildren?: React.ReactNode
    InfoTitle?: string
} & Omit<React.ComponentProps<'input'>, 'size'>

const ATMTextField = ({
    name,
    value,
    onChange,
    label,
    className = `shadow bg-white rounded ${label && 'mt-2'}`,
    required,
    onBlur,
    size = 'small',
    isSubmitting = true,
    extraClassField = '',
    disabled = false,
    isInfo = false,
    InfoChildren = null,
    InfoTitle = 'Info',
    labelClass = 'font-medium',
    ...rest
}: ATMTextFieldPropTypes) => {
    return (
        <div className={`relative mt-4 ${extraClassField}`}>
            <div className="flex gap-1">
                {label && (
                    <label className={`text-slate-700 ${labelClass}`}>
                        {label}{' '}
                        {required && <span className="text-red-500"> * </span>}{' '}
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
                name={name}
                value={value}
                disabled={disabled}
                onChange={(e) => {
                    onChange(e)
                }}
                className={`${getInputHeight(
                    size
                )} w-full px-2 text-slate-700 border ${
                    disabled ? 'bg-blue-100' : ''
                } border-slate-400 outline-blue-400  ${className}`}
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
