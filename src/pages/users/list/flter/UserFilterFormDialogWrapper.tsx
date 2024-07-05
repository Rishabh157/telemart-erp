import React from 'react'
import { Dialog } from '@mui/material'
import { object, string } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import FilterStatusFormDialog from './UserFilterFormDialog'
import {
    setUserDepartment,
    setBranchId,
    setCallCenterId,
    setIsActivate,
} from 'src/redux/slices/ListingPaginationSlice'

type Props = {
    open: boolean
    onClose: () => void
}

export type FormInitialValues = {
    userDepartment: string
    branchId: string
    callCenterId: string
    isActive: string
}

const UserFilterFormDialogWrapper = ({ open, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { isActive, userDepartment, branchId, callCenterId } =
        listingPaginationState

    const initialValues: FormInitialValues = {
        userDepartment: userDepartment,
        branchId: branchId,
        callCenterId: callCenterId,
        isActive: isActive,
    }

    const validationSchema: any = object({
        userDepartment: string(),
        branchId: string(),
        callCenterId: string(),
        isActive: string(),
    })

    // Submit Handler
    const handleSubmit = async (
        values: FormInitialValues,
        { setSubmitting }: FormikHelpers<FormInitialValues>
    ) => {
        setSubmitting(false)

        dispatch(setUserDepartment(values.userDepartment))
        dispatch(setBranchId(values.branchId))
        dispatch(setIsActivate(values.isActive))
        dispatch(setCallCenterId(values.callCenterId))

        onClose()
    }

    // Reset Handler
    const handleReset = async (formikProps: FormikProps<FormInitialValues>) => {
        await dispatch(setUserDepartment(''))
        await dispatch(setBranchId(''))
        await dispatch(setIsActivate(''))
        await dispatch(setCallCenterId(''))
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
                        <FilterStatusFormDialog
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

export default UserFilterFormDialogWrapper
