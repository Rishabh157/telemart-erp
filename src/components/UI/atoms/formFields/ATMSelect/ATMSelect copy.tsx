import React, { ChangeEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { MdArrowDropDown } from 'react-icons/md'
import { BiSearchAlt2 } from 'react-icons/bi';
import { ClickAwayListener } from '@mui/material';

type Props = {
    value: string;
    onSelect: (newValue: any) => void;
    options: any[],
    renderOption?: (option: any) => string | React.ReactNode,
    renderValue?: (option: any) => string | React.ReactNode
    label?: string;
    required?: boolean;
    placeholder?: string;
    extraClasses?: string;
    noOptionText?: string;
    isSearchBox?: false;
    searchValue?: string;
    onSearchChange?: (e: ChangeEvent<HTMLInputElement>, newValue: string) => void;
    isOptionEqualToValue?: (option: any, value: any) => boolean
}

const ATMSelect = ({
    value,
    onSelect,
    required = false,
    isSearchBox,
    searchValue,
    onSearchChange,
    label,
    noOptionText = "No Option",
    extraClasses = '',
    options,
    placeholder,
    renderOption,
    renderValue,
    isOptionEqualToValue,
}: Props
) => {

    const [toggleOpenSelect, setToggleOpenSelect] = useState(false);

    return (
        <div>
            {
                label ?
                    <label className='text-slate-700 mb-1 block ' > {label}  {required && <span className='text-red-400' > * </span>} </label>
                    :
                    null
            }

            <div className='relative'>
                <button onClick={() => { setToggleOpenSelect(prev => !prev) }} className={twMerge(`w-full h-[35px] px-2 border text-slate-600 rounded flex items-center bg-white`)} >
                    {
                        renderValue ? renderValue(options.find((option) => isOptionEqualToValue && isOptionEqualToValue(option, value))) : value
                    }
                    <span className='absolute right-2' >
                        <MdArrowDropDown className='text-2xl text-slate-600' />
                    </span>
                </button>

                {
                    toggleOpenSelect &&
                    <div className='shadow absolute w-full  text-slate-600 pt-1 rounded bg-white ' >
                        <ul>
                            {
                                options.map((option) => {
                                    return (
                                        <li onClick={() => { onSelect(option); setToggleOpenSelect(false) }} className={twMerge(`py-1 px-2 cursor-pointer hover:bg-slate-100 ${value === option && "bg-slate-100"}`)} >
                                            {
                                                renderOption ? renderOption(option) : option
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                }

            </div>
        </div >
    )
}

export default ATMSelect
