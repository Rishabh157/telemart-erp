// Filename:showConfirmationDialog.ts
// Type: Dialog Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Built Dependencies --|
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'

// |-- Types --|
type Props = {
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
}

export const showConfirmationDialog = ({
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
}: Props) => {
    return Swal.fire({
        title,
        text,
        icon,
        input,
        inputPlaceholder,
        showCancelButton,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        showDenyButton,
        denyButtonText,
        reverseButtons,
    }).then(next)
}
