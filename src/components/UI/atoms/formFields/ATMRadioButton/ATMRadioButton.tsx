import React from 'react'

export type Props = {
    name: string
    options: any[]
    label?: string
    value: string | string[] | number
    onSelect: (newValue: any) => void
    required?: boolean
    onChange?: (e: any) => void
}

const ATMRadioButton = ({
    value,
    onSelect,
    required = false,
    name,
    options,
    label,
    onChange,
}: Props) => {
    const handleSelect = (option: any) => {
        const newValue = option === value ? '' : option
        onSelect(newValue)
    }

    return (
        <div>
            {label ? (
                <label className="text-slate-700 mb-1 block">
                    {' '}
                    {label}{' '}
                    {required && <span className="text-red-400"> * </span>}{' '}
                </label>
            ) : null}

            <div className="flex mt-4 -ml-6">
                {options.map((option, index) => (
                    <div key={index} className={`${index === 0 ? '' : 'ml-4'}`}>
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={option === value}
                            onChange={() => handleSelect(option)}
                        />
                        <label className="ml-2">{option}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ATMRadioButton
