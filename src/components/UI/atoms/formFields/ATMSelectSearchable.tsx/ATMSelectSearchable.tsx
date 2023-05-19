import React from 'react'
import Select from 'react-select'
import { ErrorMessage } from 'formik'

type Props = {
    options: any[]
    value: any
    onChange: (value: any) => void
    label?: string
    required?: boolean
    size?: 'small' | 'medium'
    name: string
    isSearchable?: boolean
}

const ATMSelectSearchable = ({
    options,
    label,
    required = false,
    value,
    onChange,
    size = 'small',
    isSearchable = true,
    name,
}: Props) => {
    const selectStyles = {
        control: (provided: any) => ({
            ...provided,
            borderRadius: 4,
            borderColor: 'border-slate-400  ',
            borderWidth: 0,
            boxShadow: 'none',
            // padding:1
        }),
    }

    const selectOptions = options.map((option) => ({
        value: option.value,
        label: option.label,
    }))

    return (
        <div className="relative mt-4">
            {label && (
                <label className="text-slate-700 font-medium">
                    {label}
                    {required && <span className="text-red-500"> * </span>}
                </label>
            )}

            <Select
                className="mt-2 border rounded border-slate-400  "
                name={name}
                value={selectOptions.find((option) => option.value === value)}
                onChange={(selectedOption) => onChange(selectedOption?.value)}
                options={selectOptions}
                isSearchable={isSearchable}
                styles={selectStyles}
            />

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

export default ATMSelectSearchable
