/// ==============================================
// Filename:ATMHTMLEditor.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import ATMFileUploader from './ATMFileUploader'
import { ErrorMessage } from 'formik'

// |-- Internal Dependencies --|
import { Size } from 'src/utils/formUtils/getInputHeight'

// |-- Types --|
type Props = {
    size?: Size
    label?: string
    required?: boolean
    placeholder?: string
    onSelect: (file: File) => void
    selectedFile: any
    isSubmitting?: boolean
    name: string
    accept?: string
    disabled?: boolean
    isVideo?: boolean
}

const ATMFilePickerWrapper = ({
    name,
    size = 'small',
    label = '',
    required = false,
    placeholder = '',
    onSelect,
    selectedFile,
    isSubmitting = true,
    accept = 'image/*, video/*',
    disabled,
    isVideo = false,
}: Props) => {
    return (
        <div className="relative">
            <ATMFileUploader
                size={size}
                label={label}
                required={required}
                placeholder={placeholder}
                onSelect={onSelect}
                selectedFile={selectedFile}
                accept={accept}
                disabled={disabled}
                isVideo={isVideo}
            />

            {name && isSubmitting && (
                <ErrorMessage name={name}>
                    {(errMsg) => (
                        <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
                        <span style={{ textTransform: 'capitalize' }}>
                            {errMsg}
                        </span>
                    </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMFilePickerWrapper
