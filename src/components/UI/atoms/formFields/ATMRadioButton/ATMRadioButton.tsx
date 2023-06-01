import { ErrorMessage } from 'formik'
import React from 'react'
import { SelectOption } from 'src/models/FormField/FormField.model'

export type Props = {
    name: string
    options: SelectOption[]
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

            <div className="flex mt-1 w-full py-2 pr-2 ">
                {options.map((option: SelectOption, index) => (
                    <div
                        onChange={() => {
                            onChange(option.value as string)
                        }}
                        key={index}
                        className={`${
                            index === 0 ? '' : 'ml-2 '
                        } lg:flex ms:flex   xl:flex sm:text-sm  lg:text-lg text-base  `}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={value}
                            checked={option.value === value}
                        />
                        <label
                            onClick={() => {
                                onChange(option.value as string)
                            }}
                            className="ml-1 Class
                            Properties
                            xs:text-xs sm:text-sm  lg:text-base md:text-sm "
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
