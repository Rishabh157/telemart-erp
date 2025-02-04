/// ==============================================
// Filename:ATMSelectSearchable.tsx
// Type: Select Component
// Last Updated: JUNE 29, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import Select from 'react-select'
import { ErrorMessage } from 'formik'
import { twMerge } from 'tailwind-merge'
import {
    getLabelFont,
    getLabelTextTransform,
    textTransform,
} from 'src/utils/formUtils/getInputHeight'

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
    size?: 'small' | 'medium' | 'xs' | 'xxs'
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
    labelDirection?: 'horizontal' | 'vertical'
    classDirection?: string
    labelSpan?: string
    inputSpan?: string
    componentClass?: string
    labelSize?: 'small' | 'medium' | 'large' | 'xs' | 'xxs'
    isMenuOpen?: boolean
    maxMenuHeight?: number
    isValueWithLable?: boolean
    menuPosition?: 'fixed' | 'absolute'
    isHidden?: boolean
    isClearable?: boolean
    minHeight?: string
    fontSizePlaceHolder?: string
    fontSizeOptionsClass?: string
    textTransform?: textTransform
    restOptions?: boolean
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
    textTransform = 'firstLetterCapitalonly',
    labelClass = 'text-sm font-medium',
    isAllSelect = false,
    isLoading = false,
    selectClass = 'mt-0 ',
    isDisabled = false,
    labelDirection = 'vertical',
    classDirection = 'grid grid-cols-3',
    labelSpan = 'col-span-1',
    inputSpan = 'col-span-2',
    componentClass = 'mt-5',
    labelSize = 'small',
    isMenuOpen = undefined,
    isValueWithLable = false,
    maxMenuHeight = 180,
    menuPosition = 'fixed',
    isHidden = false,
    isClearable = true,
    minHeight = '36px',
    fontSizePlaceHolder = '13px',
    fontSizeOptionsClass = '16px',
    restOptions = false,
}: Props) => {
    const selectStyles = {
        control: (provided: any) => ({
            ...provided,
            borderRadius: 4,
            borderColor: 'border-slate-400  ',
            borderWidth: 0,
            boxShadow: 'none',
            minHeight:
                size === 'xxs'
                    ? ''
                    : size === 'xs'
                        ? '28px'
                        : size === 'small'
                            ? '35px'
                            : '',

            // height:
            //     size === 'xxs'
            //         ? '10px'
            //         : size === 'xs'
            //         ? '28px'
            //         : size === 'small'
            //         ? '35px'
            //         : '',
            maxHeight: '67px',
            display: 'flex',
            alignItems: 'center',
            // overflow: isMulti ? 'scroll' : 'unset',
        }),

        valueContainer: (provided: any) => ({
            ...provided,

            paddingBottom: size === 'xxs' ? '0px' : '0px',
            paddingTop: size === 'xxs' ? '2px' : '7px',
            alignItems: 'start',
            minHeight: minHeight,
            maxHeight: '67px',
            overflow: isMulti ? 'scroll' : 'unset',
            fontSize: fontSizePlaceHolder,
        }),
        indicator: (provided: any) => ({
            ...provided,
            padding: '2px',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            padding: '0px',
        }),
        input: (provided: any) => ({
            ...provided,
            textColor: 'rgb(51 65 85,0)',
            paddingLeft: '4px',
            paddingTop: '-5px',
            margin: '0px',
        }),

        indicatorSeparator: (provided: any) => ({
            ...provided,
            padding: '1px',
            display: 'none',
        }),
        option: (provided: any) => ({
            ...provided,
            padding: '6px 12px',
            fontSize: fontSizeOptionsClass, // Adjust the font size here
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
            // onChange(values.length ? values : [])
            if (isValueWithLable) {
                onChange(selectedOption.length ? selectedOption : [])
            } else {
                onChange(values.length ? values : [])
            }
        } else {
            if (isValueWithLable) {
                if (restOptions) {

                    let resOptionsSelected = options?.find((ele) => ele?.value === selectedOption?.value)
                    onChange(resOptionsSelected?.value ? resOptionsSelected : '')
                } else {

                    onChange(selectedOption?.value ? selectedOption : '')
                }
            } else {
                onChange(selectedOption?.value ? selectedOption?.value : '')
            }
        }
    }

    const handleValue = () => {
        if (isMulti) {
            let selectedValues: SelectOption[] = []
            let FindSelectedValue: string[] = [...(value as string[])]

            if (isValueWithLable) {
                return FindSelectedValue
            }

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
            return selectOptions?.find((option) => option.value === value) || ''
        }
    }
    return (
        <div className={`${componentClass} relative`} hidden={isHidden}>
            <div
                className={`${labelDirection === 'horizontal'
                    ? `  gap-2 w-full  ${classDirection}`
                    : ' '
                    }`}
            >
                <div
                    className={`flex gap-1 mb-1 ${labelDirection === 'horizontal'
                        ? ` ${labelSpan} w-full h-full flex items-center ` : ' '}`}
                >
                    {label && (
                        <label
                            className={twMerge(
                                `text-slate-700 ${getLabelFont(labelSize)}`,
                                `${labelClass}`
                            )}
                        >
                            {getLabelTextTransform(label, textTransform)}
                            {required && (
                                <span className="text-red-500"> * </span>
                            )}
                        </label>
                    )}
                </div>
                <Select
                    menuIsOpen={isMenuOpen}
                    maxMenuHeight={isMenuOpen ? 110 : maxMenuHeight}
                    className={twMerge(
                        `border rounded border-slate-400  ${labelDirection === 'horizontal'
                            ? `${inputSpan}`
                            : ''
                        }`,
                        `${selectClass}`
                    )}
                    name={name}
                    defaultValue={selectOptions?.find(
                        (option) => option.value === defaultValue
                    )}
                    value={handleValue() || ''}
                    onChange={(selectedOption) =>
                        handleOnChange(selectedOption)
                    }
                    options={selectOptions}
                    isSearchable={isSearchable}
                    styles={selectStyles}
                    isMulti={isMulti}
                    isDisabled={isDisabled}
                    isClearable={isClearable}
                    isLoading={isLoading}
                    isOptionDisabled={(options: any) => options.value === ''}
                    placeholder={getLabelTextTransform(
                        selectLabel,
                        textTransform
                    )}
                    autoFocus={false}
                // menuPosition={menuPosition}
                // onInputChange={(valueOp) => handleOnInputChange(valueOp)}
                />
            </div>
            { }
            {name && isSubmitting && (
                <ErrorMessage name={name}>
                    {(errMsg) => (
                        <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
                            <span>{errMsg}</span>
                        </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMSelectSearchable
