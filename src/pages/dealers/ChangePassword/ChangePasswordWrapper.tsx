/// ==============================================
// Filename:AddAreaWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'

// |-- Redux --|
import { useChangePasswordDealerMutation } from 'src/services/DealerServices'
import ChangePasswordDialog from './ChangePasswordDialog'

// |-- Types --|
type Props = {
    onClose: () => void,
    dealerId: string
}

export type FormInitialValues = {
    newPassword: string
}

const ChangePasswordWrapper = ({ onClose, dealerId }: Props) => {
    const [changePassword] = useChangePasswordDealerMutation()
    const [apiStatus, setApiStatus] = useState(false)

    const initialValues: FormInitialValues = {
        newPassword: '',
    }
    const validationSchema = object({
        newPassword: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            changePassword({
                newPassword: values.newPassword,
                dealerCode: dealerId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        onClose()
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <ChangePasswordDialog
                            onClose={onClose}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default ChangePasswordWrapper
