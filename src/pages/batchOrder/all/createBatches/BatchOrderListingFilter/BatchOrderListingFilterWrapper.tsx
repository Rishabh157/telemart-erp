import React from 'react'
import { Dialog } from '@mui/material'
import { object, string } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import UserListFilterFormDialog from './BatchOrderListingFilterForm'
import moment from 'moment'
import {
    setDateFilter,
    setCallbackDateFilter,
    setSchemeFilterValue,
    setOrderStatusFilterValue,
    setTehsilFilterValue,
    setDistrictFilterValue,
    setCallCenterManagerFilterValue,
    setIsUrgentOrderFilterValue,
} from 'src/redux/slices/warehouseOrders/warehouseAssignedOrderSlice'

type Props = {
    open: boolean
    onClose: () => void
}

export type FormInitialValues = {
    isUrgentOrder: boolean
    schemeId: string
    orderStatus: string
    districtId: string
    tehsilId: string
    startDate: string
    endDate: string
    callBackFrom: string
    callBackTo: string
    callCenterManagerId: string
}

const BatchOrderListingFilterWrapper = ({ open, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const userState: any = useSelector(
        (state: RootState) => state.warehouseOrdersAssigned
    )
    const {
        schemeValueFilter,
        orderStatusValueFilter,
        districtValueFilter,
        tehsilValueFilter,
        callCenterManagerValueFilter,
        dateFilter,
        callbackDateFilter,
        isUrgentOrder,
    } = userState

    const initialValues: FormInitialValues = {
        isUrgentOrder: isUrgentOrder || false,
        schemeId: schemeValueFilter || '',
        orderStatus: orderStatusValueFilter || '',
        districtId: districtValueFilter || '',
        tehsilId: tehsilValueFilter || '',
        startDate: dateFilter?.startDate || '',
        endDate: dateFilter?.endDate,
        callBackFrom: callbackDateFilter?.startDate || '',
        callBackTo: callbackDateFilter?.endDate || '',
        callCenterManagerId: callCenterManagerValueFilter,
    }

    const validationSchema: any = object({
        tehsilId: string(),
        districtId: string(),
        isActive: string(),
    })

    // Submit Handler
    const handleSubmit = async (
        values: FormInitialValues,
        { setSubmitting }: FormikHelpers<FormInitialValues>
    ) => {
        setSubmitting(false)

        // scheme
        dispatch(setSchemeFilterValue(values.schemeId))
        // order status
        dispatch(setOrderStatusFilterValue(values.orderStatus))
        // district
        dispatch(setDistrictFilterValue(values.districtId))
        // tehsil
        dispatch(setTehsilFilterValue(values.tehsilId))
        // call center manager
        dispatch(setCallCenterManagerFilterValue(values.callCenterManagerId))
        // urgent order
        dispatch(setIsUrgentOrderFilterValue(values.isUrgentOrder))

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

        // callback date FROM to TO
        dispatch(
            setCallbackDateFilter({
                startDate: values?.callBackFrom
                    ? moment(values.callBackFrom)?.format('yyyy-MM-DD')
                    : '',
                endDate: values?.callBackTo
                    ? moment(values.callBackTo)?.format('yyyy-MM-DD')
                    : '',
                dateFilterKey: 'firstCallCallBackDate',
            })
        )

        onClose()
    }

    // Reset Handler
    const handleReset = async (formikProps: FormikProps<FormInitialValues>) => {
        // scheme
        dispatch(setSchemeFilterValue(''))
        // order status
        dispatch(setOrderStatusFilterValue(''))
        // district
        dispatch(setDistrictFilterValue(''))
        // state
        dispatch(setTehsilFilterValue(''))
        // call center manager
        dispatch(setCallCenterManagerFilterValue(''))
        // urgent order
        dispatch(setIsUrgentOrderFilterValue(false))

        // date FROM to TO
        await dispatch(
            setDateFilter({
                startDate: '',
                endDate: '',
            })
        )

        // callback date FROM to TO
        await dispatch(
            setCallbackDateFilter({
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

export default BatchOrderListingFilterWrapper
