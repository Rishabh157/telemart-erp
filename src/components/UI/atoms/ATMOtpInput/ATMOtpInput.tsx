/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:ATMOtpInput.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- Internal Dependencies --|
import TextInput from './TextInput'

interface OtpInputType {
    values?: string | number | any
    setValues?: React.Dispatch<React.SetStateAction<any[]>>
    length: number
    onChange: (text: string) => void
}
const ATMOtpInput = ({
    values,
    setValues = () => {},
    length = 6,
    onChange,
}: OtpInputType) => {
    // const [values, setValues] = useState(new Array(length).fill(''))

    const [focusArray, setFocusArray] = useState<boolean[]>([
        true,
        ...new Array<boolean>(length - 1).fill(false),
    ])

    const [isMounted, setIsMounted] = useState(false)
    const handleChange = (index: number, value: string) => {
        if (!isNaN(parseInt(value)) && value !== ' ' && value !== '') {
            if (index === length - 1) {
                setFocusArray([...new Array(index + 1).fill(false)])
            } else {
                setFocusArray([...new Array(index + 1).fill(false), true])
            }
            if (value.length) {
                const tempValues = [...values]
                tempValues[index] = value.trim().substring(value.length - 1)
                setValues(tempValues)
            }
        }
    }

    const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        const clipBoardText = await navigator.clipboard.readText()
        setValues([
            ...clipBoardText.substring(0, length).split(''),
            ...new Array(Math.max(0, length - clipBoardText.length)).fill(''),
        ])
        setFocusArray([...new Array(clipBoardText.length - 1), true])
    }

    const handleBackSpace = (index: number) => {
        if (index > 0) {
            setValues([
                ...values.slice(0, index),
                '',
                ...values.slice(index + 1),
            ])
            setFocusArray([...new Array(index - 1).fill(false), true])
        }
        if (index === 0) {
            setValues([
                ...values.slice(0, index),
                '',
                ...values.slice(index + 1),
            ])
        }
    }

    useEffect(() => {
        if (isMounted) {
            onChange(values.join(''))
        } else {
            setIsMounted(true)
        }
    }, [])

    // useEffect(() => {
    //     setValues(new Array(length).fill(''))
    // }, [length])

    return (
        <div className="flex flex-row">
            {values?.map((data: any, index: any) => {
                return (
                    <div
                        onPaste={(e) => handlePaste(e)}
                        key={index}
                        className="mr-4 w-12"
                        onKeyDown={(e) => {
                            if (e.key === 'Backspace' || e.key === 'Delete') {
                                handleBackSpace(index)
                            }
                        }}
                    >
                        <TextInput
                            isFocused={focusArray[index]}
                            isNumber={false}
                            autoFocus={index === 0}
                            placeholder="-"
                            value={data}
                            extraInputClass={
                                'text-center disable-arrow border-[1px] border-slate-500 p-1'
                            }
                            onChangeFunc={(event) => {
                                handleChange(index, event.target.value)
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default ATMOtpInput
