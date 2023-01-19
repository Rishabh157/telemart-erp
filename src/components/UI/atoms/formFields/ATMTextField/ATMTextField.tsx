import { ErrorMessage } from 'formik';
import React from 'react'
import { getInputHeight } from 'src/utils/formUtils/getInputHeight';

export type ATMTextFieldPropTypes = {
    name: string;
    value: string | string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    size?: 'small' | 'medium' | 'large';

} & Omit<React.ComponentProps<'input'> , "size"> 

const ATMTextField = ({
    name,
    value,
    className,
    onChange,
    label,
    required,
    size='small',
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
                className={`${getInputHeight(size)} w-full px-2 text-slate-700 border border-slate-400 outline-blue-400  ${label && 'mt-1'}  ${className}`}
                {...rest}
                type='textarea'

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
