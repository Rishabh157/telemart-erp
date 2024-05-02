import React from 'react'
import { Dialog } from '@mui/material'
// import { object, string } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import SalesOrderFilterForm from './SalesOrderFilterForm'
import moment from 'moment'


type LabelValuePair = {
    fieldName: string
    label: string
    value: any
}

// Define the type for FormInitialValuesFilter
export type SalesOrderFormInitialValuesFilterWithLabel = {
    dealerId: LabelValuePair
    invoiceNo: LabelValuePair
    startDate: LabelValuePair
    endDate: LabelValuePair
    status: LabelValuePair
    IRNStatus: LabelValuePair
}
type Props = {
    open: boolean
    onClose: () => void
    setFilter: React.Dispatch<
        React.SetStateAction<SalesOrderFormInitialValuesFilterWithLabel>
    >
    filter: SalesOrderFormInitialValuesFilterWithLabel
}

const SalesOrderFilterWrapper = ({
    open,
    onClose,
    setFilter,
    filter,
}: Props) => {
    const initialValues: SalesOrderFormInitialValuesFilterWithLabel = {
        dealerId: filter.dealerId,
        invoiceNo: filter.invoiceNo,
        startDate: filter.startDate,
        endDate: filter.endDate,
        status: filter.status,
        IRNStatus: filter.IRNStatus,
    }

    // const validationSchema: any = object({
    //     stateId: string(),
    //     districtId: string(),
    //     isActive: string(),
    // })

    // Submit Handler
    const handleSubmit = async (
        values: SalesOrderFormInitialValuesFilterWithLabel,
        {
            setSubmitting,
        }: FormikHelpers<SalesOrderFormInitialValuesFilterWithLabel>
    ) => {
        setSubmitting(false)
        console.log('values', values)
        setFilter((prev) => ({
            ...prev,
            dealerId: values.dealerId,
            invoiceNo: values.invoiceNo,
            status: values.status,
            IRNStatus: values.IRNStatus,
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
        }))

        onClose()
    }

    // Reset Handler
    const handleReset = async (
        formikProps: FormikProps<SalesOrderFormInitialValuesFilterWithLabel>
    ) => {
        setFilter((prev) => ({
            ...prev,
            dealerId: { fieldName: '', value: '', label: '' },
            invoiceNo: { fieldName: '', value: '', label: '' },
            status: { fieldName: '', value: '', label: '' },
            IRNStatus: { fieldName: '', value: '', label: '' },
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
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
                        <SalesOrderFilterForm
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

export default SalesOrderFilterWrapper
