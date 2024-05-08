import React from 'react'
import { Dialog } from '@mui/material'
// import { object, string } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import UserListFilterFormDialog from './AssignedOrderListFilterFormDialog'
import moment from 'moment'

export type FormInitialValuesFilter = {
    schemeId: string
    orderType: string
    stateId: string
    districtId: string
    startDate: string
    endDate: string
    callBackFrom: string
    callBackTo: string
    callCenterManagerId: string
    languageBarrier: boolean
    isPnd: boolean
}
type LabelValuePair = {
    fieldName: string
    label: string
    value: any
}

// Define the type for FormInitialValuesFilter
export type FormInitialValuesFilterWithLabel = {
    schemeId: LabelValuePair
    stateId: LabelValuePair
    districtId: LabelValuePair
    callCenterManagerId: LabelValuePair
    startDate: LabelValuePair
    endDate: LabelValuePair
    callBackFrom: LabelValuePair
    callBackTo: LabelValuePair
    orderType: LabelValuePair
    languageBarrier: LabelValuePair
    isPnd: LabelValuePair
}
type Props = {
    open: boolean
    onClose: () => void
    setFilter: React.Dispatch<
        React.SetStateAction<FormInitialValuesFilterWithLabel>
    >
    filter: FormInitialValuesFilterWithLabel
}

const AssignedOrderListFilterFormDialogWrapper = ({
    open,
    onClose,
    setFilter,
    filter,
}: Props) => {
    const initialValues: FormInitialValuesFilterWithLabel = {
        schemeId: filter.schemeId,
        stateId: filter.stateId,
        districtId: filter.districtId,
        callCenterManagerId: filter.callCenterManagerId,
        startDate: filter.startDate,
        endDate: filter.endDate,
        callBackFrom: filter.callBackFrom,
        callBackTo: filter.callBackTo,
        orderType: filter.orderType,
        languageBarrier: filter.languageBarrier,
        isPnd: filter.isPnd,
    }

    // const validationSchema: any = object({
    //     stateId: string(),
    //     districtId: string(),
    //     isActive: string(),
    // })

    // Submit Handler
    const handleSubmit = async (
        values: FormInitialValuesFilterWithLabel,
        { setSubmitting }: FormikHelpers<FormInitialValuesFilterWithLabel>
    ) => {
        setSubmitting(false)

        setFilter((prev) => ({
            ...prev,
            schemeId: values.schemeId,
            orderType: values.orderType,
            stateId: values.stateId,
            districtId: values.districtId,
            startDate: values?.startDate.value
                ? {
                      ...values.startDate,
                      label: moment(values.startDate.value)?.format(
                          'yyyy-MM-DD'
                      ),
                      value: moment(values.startDate.value)?.format(
                          'yyyy-MM-DD'
                      ),
                  }
                : { ...values.startDate, value: '' },
            endDate: values?.endDate.value
                ? {
                      ...values.endDate,
                      label: moment(values.endDate.value)?.format('yyyy-MM-DD'),
                      value: moment(values.endDate.value)?.format('yyyy-MM-DD'),
                  }
                : { ...values.endDate, value: '' },
            callBackFrom: values?.callBackFrom.value
                ? {
                      ...values.callBackFrom,
                      label: moment(values.callBackFrom.value)?.format(
                          'yyyy-MM-DD'
                      ),
                      value: moment(values.callBackFrom.value)?.format(
                          'yyyy-MM-DD'
                      ),
                  }
                : { ...values.callBackFrom, value: '' },
            callBackTo: values?.callBackTo.value
                ? {
                      ...values.callBackTo,
                      label: moment(values.callBackTo.value)?.format(
                          'yyyy-MM-DD'
                      ),
                      value: moment(values.callBackTo.value)?.format(
                          'yyyy-MM-DD'
                      ),
                  }
                : { ...values.callBackFrom, value: '' },

            callCenterManagerId: values.callCenterManagerId,
            languageBarrier: values.languageBarrier,
            isPnd: values.isPnd,
        }))

        onClose()
    }

    // Reset Handler
    const handleReset = async (
        formikProps: FormikProps<FormInitialValuesFilterWithLabel>
    ) => {
        setFilter((prev) => ({
            ...prev,
            schemeId: { fieldName: '', value: '', label: '' },
            orderType: { fieldName: '', value: '', label: '' },
            stateId: { fieldName: '', value: '', label: '' },
            districtId: { fieldName: '', value: '', label: '' },
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
            callBackFrom: { fieldName: '', value: '', label: '' },
            callBackTo: { fieldName: '', value: '', label: '' },
            callCenterManagerId: { fieldName: '', value: '', label: '' },
            languageBarrier: { fieldName: '', value: '', label: '' },
            isPnd: { fieldName: '', value: '', label: '' },
        }))

        formikProps.resetForm()
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                // validationSchema={validationSchema}
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
