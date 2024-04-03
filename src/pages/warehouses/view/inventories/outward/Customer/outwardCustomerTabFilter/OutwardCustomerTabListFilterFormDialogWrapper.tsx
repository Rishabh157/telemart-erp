import React from 'react'
import { Dialog } from '@mui/material'
import { object, string } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import OutwardCustomerTabListFilterFormDialog from './OutwardCustomerTabListFilterFormDialog'
import moment from 'moment'
import {
    setCourierFilterValue,
    setOrderStatusFilterValue,
    setDateFilter,
} from 'src/redux/slices/outwardCustomerSlice'

type Props = {
    open: boolean
    onClose: () => void
}

export type FormInitialValues = {
    courierId: string
    dateRange: string // TODO
    startDate: string
    endDate: string
    orderStatus: string
}

const OutwardCustomerTabListFilterFormDialogWrapper = ({
    open,
    onClose,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.outwardCustomer
    )
    const { courierValue, orderStatus, dateFilter } = outwardCustomerState

    const initialValues: FormInitialValues = {
        courierId: courierValue || '',
        dateRange: '', // TODO
        startDate: dateFilter?.startDate || '',
        endDate: dateFilter?.endDate,
        orderStatus: orderStatus || '',
    }

    const validationSchema: any = object({
        courierId: string(),
        startDate: string(),
        endDate: string(),
        orderStatus: string(),
    })

    // Submit Handler
    const handleSubmit = async (
        values: FormInitialValues,
        { setSubmitting }: FormikHelpers<FormInitialValues>
    ) => {
        setSubmitting(false)

        // courirt
        dispatch(setCourierFilterValue(values.courierId))
        // order status
        dispatch(setOrderStatusFilterValue(values.orderStatus))

        // date FROM to TO
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

        // dispatch(setIsActivateUser(values.isActive))
        onClose()
    }

    // Reset Handler
    const handleReset = async (formikProps: FormikProps<FormInitialValues>) => {
        // courier
        dispatch(setCourierFilterValue(''))
        // order status
        dispatch(setOrderStatusFilterValue(''))

        // date FROM to TO
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
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <Form>
                        <OutwardCustomerTabListFilterFormDialog
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

export default OutwardCustomerTabListFilterFormDialogWrapper
