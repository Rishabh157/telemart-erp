import React from 'react'
import { ErrorMessage } from 'formik'

type Props = {
    name?: string
    value: string | string[]
    onChange: (value: string | string[]) => void
    options: { label: string; value: string }[]
    label: string
    required: boolean
    allowMultipleSelection?: boolean
}

const ATMRadioButtonGroup = ({
    name,
    label,
    required,
    value,
    onChange,
    options,
    allowMultipleSelection = false,
}: Props) => {
    const getSeletedValue = (selectedValue: string, isSelected: boolean) => {
        if (allowMultipleSelection) {
            if (isSelected) {
                return Array.isArray(value)
                    ? value.filter((ele) => ele !== selectedValue)
                    : ''
            } else {
                return Array.isArray(value) ? [...value, selectedValue] : ''
            }
        } else {
            return isSelected ? '' : selectedValue
        }
    }
    return (
        <div className="relative">
            {label && (
                <label className="text-slate-700 font-medium">
                    {' '}
                    {label}{' '}
                    {required && <span className="text-red-500"> * </span>}{' '}
                </label>
            )}

            <div className={`flex gap-2 ${label && 'mt-2'}`}>
                {options?.map((item, index) => {
                    const isSelected = allowMultipleSelection
                        ? value?.includes(item.value)
                        : item.value === value
                    return (
                        <div
                            onClick={() => {
                                onChange(
                                    getSeletedValue(item.value, isSelected)
                                )
                            }}
                            key={index}
                            className={`border border-slate-400 rounded-lg cursor-pointer transition-all duration-500 px-2 py-[1.5px] text-[14px] ${
                                isSelected ? 'bg-primary-main text-white' : ''
                            }`}
                        >
                            {item.label}
                        </div>
                    )
                })}
            </div>
            {name && (
                <ErrorMessage name={name}>
                    {(errMsg) => (
                        <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
                            {errMsg}
                        </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMRadioButtonGroup
