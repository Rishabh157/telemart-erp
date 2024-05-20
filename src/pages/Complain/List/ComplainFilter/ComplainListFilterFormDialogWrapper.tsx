import React from 'react'
import { Dialog } from '@mui/material'
import { object } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import DispositionOneListFilterFormDialog from './ComplainListFilterFormDialog'
import { setDateFilter } from 'src/redux/slices/ListingPaginationSlice'
import moment from 'moment'

type Props = {
    open: boolean
    onClose: () => void
}

export type FormInitialValues = {
    startDate: string
    endDate: string
}

const ComplainListFilterFormDialogWrapper = ({ open, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const complain: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { dateFilter } = complain

    const initialValues: FormInitialValues = {
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
    }

    const validationSchema: any = object({})

    // Submit Handler
    const handleSubmit = async (
        values: FormInitialValues,
        { setSubmitting }: FormikHelpers<FormInitialValues>
    ) => {
        setSubmitting(false)

        // created date from to dispatch
        dispatch(
            setDateFilter({
                startDate: values?.startDate
                    ? moment(values.startDate)?.format('yyyy-MM-DD')
                    : '',
                endDate: values?.endDate
                    ? moment(values.endDate)?.format('yyyy-MM-DD')
                    : '',
            })
        )
        onClose()
    }

    // Reset Handler
    const handleReset = async (formikProps: FormikProps<FormInitialValues>) => {
        await dispatch(
            setDateFilter({
                startDate: '',
                endDate: '',
            })
        )
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
                        <DispositionOneListFilterFormDialog
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

export default ComplainListFilterFormDialogWrapper
