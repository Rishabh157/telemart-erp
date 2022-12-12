import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

type Props = {
    name: string;
    extraClasses?: string;
    label?: string;
    inputProps?: {
        extraClasses?: string;
    },
    iconProps?: {
        extraClasses?: string;
    }
} & React.ComponentProps<'input'>

const ATMPassword = ({
    name,
    extraClasses = '',
    label,
    inputProps,
    iconProps,
    ...rest
}: Props) => {

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isFocussed, setIsFocussed] = useState(false);

    return (
        <div>
            {
                label ?
                    <label className='text-slate-700 block mb-1' > {label}  {rest.required && <span className='text-red-400' > * </span>} </label>
                    :
                    null
            }

            <div className={twMerge(`flex items-center border border-slate-400 px-2 rounded h-[35px] ${extraClasses} ${isFocussed && 'border-2 border-primary-main'}`)} >
                <input
                    name={name}
                    type={isShowPassword ? 'text' : 'password'}
                    className={twMerge(`border-0 outline-0 rounded h-full w-full ${inputProps?.extraClasses}`)}
                    onFocus={() => setIsFocussed(true)}
                    onBlur={() => setIsFocussed(false)}
                    {...rest}
                />

                <div onClick={() => setIsShowPassword(prev => !prev)} className={twMerge(`text-xl text-slate-500 cursor-pointer ${iconProps?.extraClasses}`)} >
                    {
                        isShowPassword ?
                            <AiFillEyeInvisible />
                            :
                            <AiFillEye />
                    }

                </div>
            </div >


        </div>
    )
}

export default ATMPassword
