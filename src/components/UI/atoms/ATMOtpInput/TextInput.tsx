/// ==============================================
// Filename:TextInput.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
// import { colors } from "../../utils/constants";
const colors = {
    Red: '#EE1818',
    Blue: '#4D4AE2',
    Gray: '#61697D',
    Green: '#5CCB4E',
    placeholderColor: '#A5A9B5',
}
interface TextInputPropType {
    onChangeFunc: (e: React.ChangeEvent<any>) => void
    value: string
    placeholder?: string
    isRequired?: boolean
    errorMsg?: string
    isPassword?: boolean
    name?: string
    label?: string
    isError?: boolean
    autoFocus?: boolean
    maxLenght?: number | undefined
    isFocused?: boolean
    onFocus?: (e: React.FocusEvent<any>) => void
    onBlur?: (
        e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
    ) => void
    isTextArea?: boolean
    onKeyUp?: (
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
    extraInputClass?: string
    onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
    disabled?: boolean
    showCounter?: boolean
    counterMessage?: string
    isNumber?: boolean
}
const TextInput = ({
    onChangeFunc,
    value = '',
    label = '',
    placeholder = '',
    isRequired = false,
    errorMsg = '',
    isPassword = false,
    name = '',
    isError = false,
    autoFocus = false,
    isFocused = false,
    maxLenght,
    onFocus = () => {},
    isTextArea = false,
    onBlur = () => {},
    onKeyUp = () => {},
    extraInputClass = '',
    onClick = () => {},
    disabled = false,
    showCounter = false,
    counterMessage = '',
    isNumber = false,
}: TextInputPropType) => {
    const styles = `input::placeholder {
    color: ${colors.placeholderColor};
}`
    return (
        <>
            <style>{styles}</style>
            <label className="text-sm text-gray-700 block w-full max-w-full">
                {label}
                {isRequired ? <span className="text-red-500">*</span> : null}
            </label>
            <div className="block w-full max-w-full">
                {isTextArea ? (
                    <textarea
                        name={name}
                        ref={(textInput) =>
                            isFocused ? textInput?.focus() : null
                        }
                        autoFocus={autoFocus}
                        className={
                            'text-base block w-full rounded-md border-gray-300 focus:border-docsigna-purple placeholder-gray-400 ' +
                            extraInputClass
                        }
                        placeholder={placeholder}
                        onChange={onChangeFunc}
                        value={value}
                        maxLength={maxLenght}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                        disabled={disabled}
                    />
                ) : (
                    <input
                        name={name}
                        ref={(textInput) => {
                            isFocused && textInput?.focus()
                        }}
                        autoFocus={autoFocus}
                        type={
                            isPassword
                                ? 'password'
                                : isNumber
                                ? 'number'
                                : 'text'
                        }
                        className={
                            'text-base block w-full rounded-md border-gray-300 focus:border-docsigna-purple ' +
                            extraInputClass
                        }
                        placeholder={placeholder}
                        onChange={onChangeFunc}
                        value={value}
                        maxLength={maxLenght}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onClick={(e) => onClick(e)}
                        onKeyUp={onKeyUp}
                        disabled={disabled}
                    />
                )}
                {showCounter ? (
                    <p className="block text-sm text-gray-500 text-right">{`${value.length} / ${counterMessage}`}</p>
                ) : null}
                {isError ? (
                    <p style={{ color: colors.Red }}>{errorMsg}</p>
                ) : (
                    <p></p>
                )}
            </div>
        </>
    )
}

export default TextInput
