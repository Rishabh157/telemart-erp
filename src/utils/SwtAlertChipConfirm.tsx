import { Chip } from '@mui/material'
import React from 'react'
import { showConfirmationDialog } from './showConfirmationDialog'
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'
type PropsChips = {
    color:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning'
    chipLabel: string
    title: string
    text: string
    icon?: SweetAlertIcon
    showCancelButton?: boolean
    confirmButtonColor?: string
    cancelButtonColor?: string
    confirmButtonText?: string
    showDenyButton?: boolean
    denyButtonText?: string
    reverseButtons?: boolean
    next?: (result: SweetAlertResult<any>) => void
    input?: any
    inputPlaceholder?: string
    preConfirm?: (result: SweetAlertResult<any>) => void
    preDeny?: (result: SweetAlertResult<any>) => void
    disabled?: boolean
    html?:any
}
const SwtAlertChipConfirm = ({
    color = 'default',
    chipLabel,
    title,
    text,
    icon = 'warning',
    showCancelButton = false,
    confirmButtonColor = '#3085d6',
    showDenyButton = false,
    denyButtonText = `Reject`,
    cancelButtonColor = '#dc3741',
    confirmButtonText = 'Yes',
    reverseButtons = true,
    next = () => {},
    input,
    inputPlaceholder = 'Enter your reason',
    preConfirm,
    preDeny,
    disabled = false,
    html
}: PropsChips) => {
    return (
        <div>
            <button
                id="btn"
                disabled={disabled}
                className="overflow-hidden cursor-pointer z-0"
                onClick={() => {
                    showConfirmationDialog({
                        title,
                        text,
                        icon,
                        showCancelButton,
                        confirmButtonColor,
                        showDenyButton,
                        denyButtonText,
                        cancelButtonColor,
                        confirmButtonText,
                        reverseButtons,
                        next,
                        input,
                        inputPlaceholder,
                        html,
                        preConfirm: (inputValue) => {
                            if (!inputValue) {
                                Swal.showValidationMessage(
                                    'Please enter a remark'
                                )
                            }
                        },
                        preDeny: (res) => {
                            Swal.showValidationMessage('Please enter a remark')

                            if (!Swal.getInput()?.value) {
                                return res
                            } else {
                                return Swal.getInput()?.value
                            }
                        },
                    })
                }}
            >
                <Chip
                    className="z-0"
                    label={chipLabel}
                    color={color}
                    variant="outlined"
                    size="small"
                    clickable={true}
                />
            </button>
        </div>
    )
}

export default SwtAlertChipConfirm
