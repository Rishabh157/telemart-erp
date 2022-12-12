import { ErrorMessage } from 'formik';
import React from 'react'

export type ATMTextFieldPropTypes = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
} & React.ComponentProps<'input'>

const ATMTextField = ({
    name,
    value,
    className,
    onChange,
    label,
    required,
    ...rest
}: ATMTextFieldPropTypes
) => {
    return (
        <div className='relative' >
            {
                label &&
                <label className='text-slate-500' > {label} {required && <span className='text-red-500'> * </span>} </label>
            }
            <input
                name={name}
                value={value}
                onChange={(e) => { onChange(e) }}
                className={`h-[40px] w-full p-1 text-slate-700 border border-slate-400 outline-blue-400 rounded ${label && 'mt-1'}  ${className}`}
                {...rest}

            />
            {
                name &&
                <ErrorMessage name={name} >
                    {
                        (errMsg) => (
                            <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500"> {errMsg} </p>
                        )
                    }
                </ErrorMessage>
            }


        </div>
    )
}

export default ATMTextField
