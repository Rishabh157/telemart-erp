import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    text: string
    isLoading?: boolean
    type?: string
} & ComponentProps<'button'>

const CallerButton = ({
    text,
    className,
    isLoading = false,
    type = 'button',
    disabled,
    ...rest
}: Props) => {
    return (
        <>
            <button
                type={type}
                disabled={isLoading}
                className={twMerge(
                    `border w-full bg-[#15616E] text-white rounded p-2  h-[42px] flex gap-2 justify-center items-center ${className} ${
                        disabled || isLoading ? 'opacity-[.60]' : ''
                    }`
                )}
                {...rest}
            >
                {text}
            </button>
        </>
    )
}

export default CallerButton
