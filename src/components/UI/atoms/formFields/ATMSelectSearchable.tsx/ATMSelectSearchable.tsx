/// ==============================================
// Filename:ATMSelectSearchable.tsx
// Type: Select Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import Select from 'react-select'
import { ErrorMessage } from 'formik'
import { twMerge } from 'tailwind-merge'

export type SelectOption = {
    label: string
    value: string | number | string[]
}

type Props = {
    options: SelectOption[]
    value?: string[] | string
    onChange: (value: any) => void
    label?: string
    required?: boolean
    isSubmitting?: boolean
    size?: 'small' | 'medium' | 'xs'
    name: string
    isSearchable?: boolean
    selectLabel?: string
    defaultValue?: string
    isMulti?: boolean
    isAllSelect?: boolean
    isLoading?: boolean
    labelClass?: string
    selectClass?: string
    isDisabled?: boolean
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
    isSubmitting = true,
    labelClass = ' font-medium',
    isAllSelect = false,
    isLoading = false,
    selectClass = 'mt-0 ',
    isDisabled = false,
}: Props) => {
    const selectStyles = {
        control: (provided: any) => ({
            ...provided,
            borderRadius: 4,
            borderColor: 'border-slate-400  ',
            borderWidth: 0,
            boxShadow: 'none',
            minHeight: 'unset',
            height: size === 'xs' ? '28px' : '',
            display: 'flex',
            alignItems: 'center',
            paddingTop: size === 'xs' ? '1px' : '2px',
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            paddingLeft: '4px',
            paddingTop: '0px',
            alignItems: 'start',
            overflow: 'scroll',
            maxHeight: '36px',
        }),
        indicator: (provided: any) => ({
            ...provided,
            padding: '0px',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            padding: '0px',
        }),
        input: (provided: any) => ({
            ...provided,

            textColor: 'rgb(51 65 85,0)',
            paddingLeft: '4px',
            paddingTop: '-4px',
        }),

        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: 'none',
        }),
        menu: (provided: any) => ({
            ...provided,
            // backgroundColor:'black',
            // textColorl:'white',
            // borderColor: 'border-slate-400  ',
        }),
    }

    let selectOptions = options?.map((option) => ({
        value: option.value,
        label: option.label,
    }))
    if (isMulti && isAllSelect) {
        const selectOptions2 = [
            {
                value: 'all-select',
                label: `All Select`,
            },
        ]
        selectOptions = [...selectOptions2, ...selectOptions]
    }
    const handleOnChange = (selectedOption: any) => {
        if (isMulti) {
            if (isAllSelect) {
                const allValues = selectedOption?.find(
                    (multiValue: any) => multiValue.value === 'all-select'
                )
                if (allValues?.value) {
                    const valuesAll = options.map((option) => option.value)
                    onChange(valuesAll)
                    return
                }
            }
            const values = selectedOption.map((multiValue: any) => {
                return multiValue.value
            })
            onChange(values.length ? values : [])
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
    const handleValue = () => {
        if (isMulti) {
            let selectedValues: SelectOption[] = []
            let FindSelectedValue: string[] = [...(value as string[])]
            FindSelectedValue?.map((selecttedValue: string) => {
                const singleValueFind =
                    selectOptions?.filter(
                        (option) => option.value === selecttedValue
                    ) || []
                selectedValues = [...selectedValues, ...singleValueFind]
                return selectedValues
            })
            return selectedValues
        } else {
            return selectOptions?.find((option) => option.value === value)
        }
    }
    return (
        <div className="relative mt-6 bg-slate-50">
            {label && (
                <label className={`text-slate-700  ${labelClass}`}>
                    {label}
                    {required && <span className="text-red-500"> * </span>}
                </label>
            )}

            <Select
                className={twMerge(
                    `border rounded border-slate-400 `,
                    `${selectClass}`
                )}
                name={name}
                defaultValue={selectOptions?.find(
                    (option) => option.value === defaultValue
                )}
                value={handleValue()}
                onChange={(selectedOption) => handleOnChange(selectedOption)}
                options={selectOptions}
                isSearchable={isSearchable}
                styles={selectStyles}
                isMulti={isMulti}
                isDisabled={isDisabled}
                isClearable
                isLoading={isLoading}
                isOptionDisabled={(options) => (options.value as string) === ''}
                placeholder={`${selectLabel}`}
                // onInputChange={(valueOp) => handleOnInputChange(valueOp)}
            />

            {name && isSubmitting && (
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
