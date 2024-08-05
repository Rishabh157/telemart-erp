import { Dialog } from '@mui/material'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React from 'react'
// import { object, string } from 'yup'
import moment from 'moment'
import { WebLeadsFormInitialValuesFilterWithLabel } from '../WebLeadsListingWrapper'
import WebLeadsOrderListingFilterForm from './WebLeadsListingFilterForm'

type Props = {
    open: boolean
    onClose: () => void
    setFilter: React.Dispatch<
        React.SetStateAction<WebLeadsFormInitialValuesFilterWithLabel>
    >
    filter: WebLeadsFormInitialValuesFilterWithLabel
}

const WebLeadsListingFilterWrapper = ({
    open,
    onClose,
    setFilter,
    filter,
}: Props) => {
    const initialValues: WebLeadsFormInitialValuesFilterWithLabel = {
        leadStatus: filter?.leadStatus,
        product_name: filter?.product_name,
        startDate: filter?.startDate,
        endDate: filter?.endDate,
    }

    // Submit Handler
    const handleSubmit = async (
        values: WebLeadsFormInitialValuesFilterWithLabel,
        {
            setSubmitting,
        }: FormikHelpers<WebLeadsFormInitialValuesFilterWithLabel>
    ) => {
        setSubmitting(false)
        setFilter((prev) => ({
            ...prev,
            leadStatus: values?.leadStatus,
            product_name: values?.product_name,
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
        formikProps: FormikProps<WebLeadsFormInitialValuesFilterWithLabel>
    ) => {
        // reset formik props
        setFilter((prev) => ({
            ...prev,
            leadStatus: { fieldName: '', value: '', label: '' },
            product_name: { fieldName: '', value: '', label: '' },

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
                        <WebLeadsOrderListingFilterForm
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

export default WebLeadsListingFilterWrapper
