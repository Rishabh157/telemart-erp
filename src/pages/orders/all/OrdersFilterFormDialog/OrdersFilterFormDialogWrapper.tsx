import React from 'react'
import { Dialog } from '@mui/material'
import { object, string } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import UserListFilterFormDialog from './OrdersFilterFormDialog'
import moment from 'moment'
import {
    setSchemeFilterValue,
    setOrderStatusFilterValue,
    setDeliveryBoyFilterValue,
    setDispositionFilterValue,
    setDistrictFilterValue,
    setTehsilFilterValue,
    setDateFilter,
    setOrderStatusDateFilter,
    setFolloUpToDateFilter,
} from 'src/redux/slices/orderSlice'

type Props = {
    open: boolean
    onClose: () => void
}

export type FormInitialValues = {
    schemeId: string
    orderStatus: string
    deliveryBoyId: string
    dispositionId: string
    districtId: string
    tehsilId: string
    startDate: string
    endDate: string
    orderStatusFrom: string
    orderStatusTo: string
    folloUpDateFrom: string
    folloUpDateTo: string
}

const OrdersFilterFormDialogWrapper = ({ open, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const userState: any = useSelector((state: RootState) => state.order)
    const {
        schemeValueFilter,
        orderStatusValueFilter,
        deliveryBoyValueFilter,
        dispositionValueFilter,
        districtValueFilter,
        tehsilValueFilter,
        dateFilter,
        orderStatusdateFilter,
        folloUpTodateFilter,
    } = userState

    const initialValues: FormInitialValues = {
        schemeId: schemeValueFilter || '',
        orderStatus: orderStatusValueFilter || '',
        deliveryBoyId: deliveryBoyValueFilter || '',
        dispositionId: dispositionValueFilter || '',
        districtId: districtValueFilter || '',
        tehsilId: tehsilValueFilter || '',
        startDate: dateFilter?.startDate || '',
        endDate: dateFilter?.endDate,
        orderStatusFrom: orderStatusdateFilter?.startDate || '',
        orderStatusTo: orderStatusdateFilter?.endDate || '',
        folloUpDateFrom: folloUpTodateFilter?.folloUpDateFrom || '',
        folloUpDateTo: folloUpTodateFilter?.folloUpDateTo || '',
    }

    const validationSchema: any = object({
        stateId: string(),
        districtId: string(),
    })

    // Submit Handler
    const handleSubmit = async (
        values: FormInitialValues,
        { setSubmitting }: FormikHelpers<FormInitialValues>
    ) => {
        setSubmitting(false)

        // scheme
        dispatch(setSchemeFilterValue(values.schemeId))
        // order type
        dispatch(setOrderStatusFilterValue(values.orderStatus))
        // delivery boy
        dispatch(setDeliveryBoyFilterValue(values.deliveryBoyId))
        // dispositions
        dispatch(setDispositionFilterValue(values.dispositionId))
        // district
        dispatch(setDistrictFilterValue(values.districtId))
        // tehsil
        dispatch(setTehsilFilterValue(values.tehsilId))
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
        // order status date FROM to TO
        dispatch(
            setOrderStatusDateFilter({
                startDate: values?.orderStatusFrom
                    ? moment(values.orderStatusFrom)?.format('yyyy-MM-DD')
                    : '',
                endDate: values?.orderStatusTo
                    ? moment(values.orderStatusTo)?.format('yyyy-MM-DD')
                    : '',
            })
        )

        // follow up date FROM to TO
        dispatch(
            setFolloUpToDateFilter({
                startDate: values?.folloUpDateFrom
                    ? moment(values.folloUpDateFrom)?.format('yyyy-MM-DD')
                    : '',
                endDate: values?.folloUpDateTo
                    ? moment(values.folloUpDateTo)?.format('yyyy-MM-DD')
                    : '',
            })
        )

        // dispatch(setIsActivateUser(values.isActive))
        onClose()
    }

    // Reset Handler
    const handleReset = async (formikProps: FormikProps<FormInitialValues>) => {
        // scheme
        await dispatch(setSchemeFilterValue(''))
        // order status
        await dispatch(setOrderStatusFilterValue(''))
        // delivery boy
        await dispatch(setDeliveryBoyFilterValue(''))
        // disposition
        await dispatch(setDispositionFilterValue(''))
        // district
        await dispatch(setDistrictFilterValue(''))
        // tehsil
        await dispatch(setTehsilFilterValue(''))
        // date FROM to TO
        await dispatch(
            setDateFilter({
                startDate: '',
                endDate: '',
            })
        )
        // order status date FROM to TO
        await dispatch(
            setOrderStatusDateFilter({
                startDate: '',
                endDate: '',
            })
        )
        // follow up date FROM to TO
        await dispatch(
            setFolloUpToDateFilter({
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

export default OrdersFilterFormDialogWrapper
