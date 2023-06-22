import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'

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
}: Props) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        showDenyButton,
        denyButtonText,
        reverseButtons,
    }).then(next)
}
