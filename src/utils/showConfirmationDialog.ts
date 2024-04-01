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
    preConfirm?: (result: SweetAlertResult<any>) => void
    preDeny?: (result: SweetAlertResult<any>) => void
    html?: any
    denyButtonColor?: string
}

export const showConfirmationDialog = ({
    title,
    text,
    icon = 'warning',
    showCancelButton = false,
    confirmButtonColor = '#3085d6',
    denyButtonColor = '#dc3741',
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
    html,
}: Props) => {
    return Swal.fire({
        title,
        text,
        icon,
        input,
        inputPlaceholder,
        showCancelButton,
        confirmButtonColor,
        denyButtonColor,
        cancelButtonColor,
        confirmButtonText,
        showDenyButton,
        denyButtonText,
        reverseButtons,
        showLoaderOnConfirm: true,
        preConfirm,
        preDeny,
        html,
        allowOutsideClick: () => !Swal.isLoading(),
    }).then(next)
}
