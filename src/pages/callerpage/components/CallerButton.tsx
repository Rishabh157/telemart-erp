import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import CircularProgress from '@mui/material/CircularProgress'

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

    onClick,
    ...rest
}: Props) => {
    return (
        <>
            <button
                onClick={onClick}
                type={'button'}
                disabled={disabled}
                className={twMerge(
                    `border w-full bg-[#15616E] text-white rounded px-2 py-1 text-sm flex gap-2 justify-center items-center ${className} ${
                        disabled || isLoading ? 'opacity-[.60]' : ''
                    }`
                )}
                {...rest}
            >
                {text}
                {isLoading && (
                    <CircularProgress size={14} sx={{ color: '#ffffff' }} />
                )}
            </button>
        </>
    )
}

export default CallerButton
