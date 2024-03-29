import React from 'react'
import { Dialog } from '@mui/material'
import { object, string } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import UserListFilterFormDialog from './AssignedOrderListFilterFormDialog'
import moment from 'moment'
import {
    setDateFilter,
    setCallbackDateFilter,
    setSchemeFilterValue,
    setOrderTypeFilterValue,
    setStateFilterValue,
    setDistrictFilterValue,
    setLanguageBarrierFilterValue,
    setPndOrderFilterValue,
} from 'src/redux/slices/warehouseOrders/warehouseAssignedOrderSlice'

type Props = {
    open: boolean
    onClose: () => void
}

export type FormInitialValues = {
    schemeId: string
    orderType: string
    stateId: string
    districtId: string
    startDate: string
    endDate: string
    callBackFrom: string
    callBackTo: string
    languageBarrier: boolean
    isPnd: boolean
}

const AssignedOrderListFilterFormDialogWrapper = ({ open, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const userState: any = useSelector(
        (state: RootState) => state.warehouseOrdersAssigned
    )
    const {
        schemeValueFilter,
        orderTypeValueFilter,
        stateValueFilter,
        districtValueFilter,
        langBarrierValueFilter,
        pndOrderValueFilter,
        dateFilter,
        callbackDateFilter,
    } = userState

    const initialValues: FormInitialValues = {
        schemeId: schemeValueFilter || '',
        orderType: orderTypeValueFilter || '',
        stateId: stateValueFilter || '',
        districtId: districtValueFilter || '',
        startDate: dateFilter?.startDate || '',
        endDate: dateFilter?.endDate,
        callBackFrom: callbackDateFilter?.startDate || '',
        callBackTo: callbackDateFilter?.endDate || '',
        languageBarrier: langBarrierValueFilter || false,
        isPnd: pndOrderValueFilter || false,
        // isActive: isActive,
    }

    const validationSchema: any = object({
        stateId: string(),
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
        // order type
        dispatch(setOrderTypeFilterValue(values.orderType))
        // state
        dispatch(setStateFilterValue(values.stateId))
        // district
        dispatch(setDistrictFilterValue(values.districtId))
        // language
        dispatch(setLanguageBarrierFilterValue(values.languageBarrier))
        // pnd
        dispatch(setPndOrderFilterValue(values.isPnd))

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

        // dispatch(setIsActivateUser(values.isActive))
        onClose()
    }

    // Reset Handler
    const handleReset = async (formikProps: FormikProps<FormInitialValues>) => {
        // scheme
        dispatch(setSchemeFilterValue(''))
        // order type
        dispatch(setOrderTypeFilterValue(''))
        // state
        dispatch(setStateFilterValue(''))
        // district
        dispatch(setDistrictFilterValue(''))
        // language
        dispatch(setLanguageBarrierFilterValue(false))
        // pnd
        dispatch(setPndOrderFilterValue(false))

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

export default AssignedOrderListFilterFormDialogWrapper
