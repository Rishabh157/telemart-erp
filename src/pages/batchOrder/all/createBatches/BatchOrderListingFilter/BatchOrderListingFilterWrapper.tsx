import { Dialog } from '@mui/material'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React from 'react'
// import { object, string } from 'yup'
import UserListFilterFormDialog from './BatchOrderListingFilterForm'
import moment from 'moment'

type Props = {
    open: boolean
    onClose: () => void
    setFilter: React.Dispatch<
        React.SetStateAction<BatchFormInitialValuesFilterWithLabel>
    >
    filter: BatchFormInitialValuesFilterWithLabel
}
type LabelValuePair = {
    fieldName: string
    label: string
    value: any
}
export type BatchFormInitialValuesFilterWithLabel = {
    isUrgentOrder: LabelValuePair
    schemeId: LabelValuePair
    orderStatus: LabelValuePair
    districtId: LabelValuePair
    tehsilId: LabelValuePair
    startDate: LabelValuePair
    endDate: LabelValuePair
    callBackFrom: LabelValuePair
    callBackTo: LabelValuePair
    callCenterManagerId: LabelValuePair
}

const BatchOrderListingFilterWrapper = ({
    open,
    onClose,
    setFilter,
    filter,
}: Props) => {
    const initialValues: BatchFormInitialValuesFilterWithLabel = {
        isUrgentOrder: filter?.isUrgentOrder,
        schemeId: filter?.schemeId,
        orderStatus: filter?.orderStatus,
        districtId: filter?.districtId,
        tehsilId: filter?.tehsilId,
        startDate: filter?.startDate,
        endDate: filter?.endDate,
        callBackFrom: filter?.callBackFrom,
        callBackTo: filter?.callBackTo,
        callCenterManagerId: filter?.callCenterManagerId,
    }

    // const validationSchema: any = object({
    //     tehsilId: string(),
    //     districtId: string(),
    //     isActive: string(),
    // })

    // Submit Handler
    const handleSubmit = async (
        values: BatchFormInitialValuesFilterWithLabel,
        { setSubmitting }: FormikHelpers<BatchFormInitialValuesFilterWithLabel>
    ) => {
        setSubmitting(false)
        setFilter((prev) => ({
            ...prev,
            isUrgentOrder: values.isUrgentOrder,
            schemeId: values.schemeId,
            orderStatus: values.orderStatus,
            tehsilId: values.tehsilId,
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
        }))
        onClose()
    }

    // Reset Handler
    const handleReset = async (
        formikProps: FormikProps<BatchFormInitialValuesFilterWithLabel>
    ) => {
        // reset formik props
        setFilter((prev) => ({
            ...prev,
            isUrgentOrder: { fieldName: '', value: '', label: '' },
            schemeId: { fieldName: '', value: '', label: '' },
            orderStatus: { fieldName: '', value: '', label: '' },
            districtId: { fieldName: '', value: '', label: '' },
            tehsilId: { fieldName: '', value: '', label: '' },
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
            callBackFrom: { fieldName: '', value: '', label: '' },
            callBackTo: { fieldName: '', value: '', label: '' },
            callCenterManagerId: { fieldName: '', value: '', label: '' },
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

export default BatchOrderListingFilterWrapper
