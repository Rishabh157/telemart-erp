import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'

type Props = {
    title: string
    text: string
    icon?: SweetAlertIcon    
    showCancelButton?: boolean
    confirmButtonColor?: string
    cancelButtonColor?: string
    confirmButtonText?: string 
    showDenyButton?: boolean,
    denyButtonText?: string,
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
    cancelButtonColor = 'orange',
    confirmButtonText = 'Yes',    
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
    }).then(next)
}
