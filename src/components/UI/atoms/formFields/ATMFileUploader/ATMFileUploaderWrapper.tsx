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
import {
    Size,
    getLabelTextTransform,
    textTransform,
} from 'src/utils/formUtils/getInputHeight'

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
    isMultiple?: boolean
    textTransform?: textTransform
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
    isMultiple = false,
    accept = 'image/*, video/*',
    disabled,
    textTransform = 'firstLetterCapitalonly',
    isVideo = false,
}: Props) => {
    return (
        <div className="relative">
            <ATMFileUploader
                size={size}
                label={getLabelTextTransform(label, textTransform)}
                required={required}
                placeholder={getLabelTextTransform(placeholder, textTransform)}
                onSelect={onSelect}
                selectedFile={selectedFile}
                accept={accept}
                disabled={disabled}
                isVideo={isVideo}
                multiple={isMultiple}
            />

            {name && isSubmitting && (
                <ErrorMessage name={name}>
                    {(errMsg) => (
                        <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
                            <span>
                                {errMsg.charAt(0).toUpperCase() +
                                    errMsg.slice(1).toLowerCase()}
                            </span>
                        </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMFilePickerWrapper
