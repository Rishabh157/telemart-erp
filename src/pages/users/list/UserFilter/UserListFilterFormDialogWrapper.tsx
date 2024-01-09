import React from 'react'
import { Dialog } from '@mui/material'
import { object, string } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import UserListFilterFormDialog from './UserListFilterFormDialog'
import { setIsActivateUser } from 'src/redux/slices/NewUserSlice'

type Props = {
    open: boolean
    onClose: () => void
}

export type FormInitialValues = {
    isActive: string
}

const UserListFilterFormDialogWrapper = ({ open, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const userState: any = useSelector((state: RootState) => state.newUser)
    const { isActive } = userState

    const initialValues: FormInitialValues = {
        isActive: isActive,
    }

    const validationSchema: any = object({
        isActive: string().required('please select user status'),
    })

    // Submit Handler
    const handleSubmit = async (
        values: FormInitialValues,
        { setSubmitting }: FormikHelpers<FormInitialValues>
    ) => {
        setSubmitting(false)

        // user status  dispatch
        dispatch(setIsActivateUser(values.isActive))

        onClose()
    }

    // Reset Handler
    const handleReset = async (formikProps: FormikProps<FormInitialValues>) => {
        await // user status  dispatch
        dispatch(setIsActivateUser(''))

        // reset formik props
        formikProps.resetForm()
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <Form>
                        <UserListFilterFormDialog
                            open={open}
                            onClose={onClose}
                            formikProps={formikProps}
                            onReset={() => handleReset(formikProps)}
                        />
                    </Form>
                )}
            </Formik>
        </Dialog>
    )
}

export default UserListFilterFormDialogWrapper
