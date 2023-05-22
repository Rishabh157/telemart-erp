import React from 'react'
import Select from 'react-select'
import { ErrorMessage } from 'formik'
import { SelectOption } from 'src/models/FormField/FormField.model'

type Props = {
    options: SelectOption[]
    value: string
    onChange: (value: any) => void
    label?: string
    required?: boolean
    size?: 'small' | 'medium'
    name: string
    isSearchable?: boolean
    selectLabel?: string
    defaultValue?: string
    isMulti?: boolean
}

const ATMSelectSearchable = ({
    options,
    label = '',
    required = false,
    value,
    selectLabel = `Select`,
    onChange,
    size = 'small',
    isSearchable = true,
    defaultValue = '',
    name,
    isMulti = false,
}: Props) => {
    const selectStyles = {
        control: (provided: any) => ({
            ...provided,
            borderRadius: 4,
            borderColor: 'border-slate-400  ',
            borderWidth: 0,
            boxShadow: 'none',
        }),
    }
    // const selectOptions2 = [
    //     {
    //         value: '',
    //         label: `${selectLabel}`,
    //     },
    // ]
    let selectOptions = options?.map((option) => ({
        value: option.value,
        label: option.label,
    }))
    // selectOptions = [...selectOptions2, ...selectOptions]
    const handleOnChange = (selectedOption: any) => {
        if (isMulti) {
            onChange(selectedOption?.values ? selectedOption?.values : [])
        } else {
            onChange(selectedOption?.value ? selectedOption?.value : '')
        }
    }
    // const handleOnInputChange = (valueOp:string) => {
    //     let inputValue = selectOptions?.find((option) => option.value === valueOp)
    //     if (!inputValue) {
    //         console.log("herer",valueOp)
    //         onChange('')
    //     } else {
    //         onChange(valueOp)
    //     }
    // }

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
                defaultValue={selectOptions?.find(
                    (option) => option.value === defaultValue
                )}
                value={selectOptions?.find((option) => option.value === value)}
                onChange={(selectedOption) => handleOnChange(selectedOption)}
                options={selectOptions}
                isSearchable={isSearchable}
                styles={selectStyles}
                isMulti={isMulti}
                isClearable
                isOptionDisabled={(options) => options.value === ''}
                placeholder={`${selectLabel}`}

                // onInputChange={(valueOp) => handleOnInputChange(valueOp)}
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
