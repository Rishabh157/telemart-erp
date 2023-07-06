/// ==============================================
// Filename:FormField.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type TextFieldType = {
    name: string
    label: string
    placeholder: string
    type?: 'text'
    optionAccessKey?: never
    offset?: number
}

export type NumberFieldType = {
    name: string
    label: string
    placeholder: string
    type?: 'number'
    optionAccessKey?: never
    offset?: number
}

export type PasswordFieldType = {
    name: string
    label: string
    placeholder: string
    type?: 'password'
    optionAccessKey?: never
    offset?: number
}

export type SelectFieldType<OptionAccessKey> = {
    name: string
    label: string
    placeholder: string
    type?: 'select'
    optionAccessKey: OptionAccessKey
    offset?: number
}

export type FilePickerFieldType = {
    name: string
    label: string
    placeholder: string
    type?: 'file-picker'
    optionAccessKey?: never
    offset?: number
}
export type SwitchButton = {
    name: string
    label: string
    placeholder: string
    type?: 'switch-button'
    optionAccessKey?: never
    offset?: number
}

export type Checkbox = {
    name: string
    label: string
    // checked?: boolean
    type?: 'checkbox'
    value?: string
    placeholder?: string
    optionAccessKey?: never
    offset?: number
}

export type Field<OptionAccessKey> =
    | TextFieldType
    | PasswordFieldType
    | SelectFieldType<OptionAccessKey>
    | FilePickerFieldType
    | NumberFieldType
    | SwitchButton
    | Checkbox

export type SelectOption = {
    label: string
    value: string | number
}
