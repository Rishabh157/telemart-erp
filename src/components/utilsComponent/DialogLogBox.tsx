import React from 'react'
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
    Component: React.ReactNode
    closeButtonPosition?: ButtonPosition
    buttonClass?: string
    fullScreen?: boolean
    fullWidth?: boolean
}

const DialogLogBox: React.FC<DialogLogBoxType> = ({
    handleClose,
    isOpen,
    Component,
    closeButtonPosition = 'right',
    buttonClass = 'rounded',
    fullScreen = false,
    fullWidth = true,
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
            className="h-full w-full mb-0 "
            fullScreen={fullScreen}
            fullWidth={fullWidth}
            maxWidth="lg"
            open={isOpen}
            onClose={handleClose}
        >
            <div
                onClick={handleClose}
                className={`${handleButtonClose(
                    closeButtonPosition
                )} ${buttonClass}  p-1 px-4 mt-0  flex w-full`}
            >
                <MdCancel size="40" color="red" />
            </div>
            <DialogContent>{Component}</DialogContent>
        </Dialog>
    )
}

export default DialogLogBox
