/// ==============================================
// Filename:DialogLogBox.tsx
// Type: Utils Component
// Last Updated: JULY 30, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import Dialog from '@mui/material/Dialog'
import { DialogContent } from '@mui/material'
import { MdCancel } from 'react-icons/md'

enum ButtonPosition {
    left = 'justify-start',
    right = 'justify-end',
    center = 'justify-center',
}
type DialogLogBoxType = {
    handleClose: () => void
    isOpen: boolean
    component: React.ReactNode
    closeButtonPosition?: ButtonPosition
    buttonClass?: string
    fullScreen?: boolean
    fullWidth?: boolean
    width?: string
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

const DialogLogBox: React.FC<DialogLogBoxType> = ({
    handleClose,
    isOpen,
    component,
    closeButtonPosition = 'right',
    buttonClass = 'rounded',
    fullScreen = false,
    fullWidth = true,
    maxWidth = 'lg',
}) => {
    const handleButtonClose = (closeButtonPosition: string) => {
        switch (closeButtonPosition) {
            case 'center':
                return ButtonPosition.center
            case 'left':
                return ButtonPosition.left
            default:
                return ButtonPosition.right
        }
    }
    return (
        <Dialog
            className={`h-full w-full mb-0 `}
            fullScreen={fullScreen}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={isOpen}
            onClose={handleClose}
        >
            <div
                onClick={handleClose}
                className={`${handleButtonClose(
                    closeButtonPosition
                )} ${buttonClass}  p-1 px-4 mt-0  flex w-full`}
            >
                <MdCancel size="30" color="red" className="cursor-pointer" />
            </div>
            <DialogContent style={{ margin: '0px', padding: '0px' }}>
                {component}
            </DialogContent>
        </Dialog>
    )
}

export default DialogLogBox
