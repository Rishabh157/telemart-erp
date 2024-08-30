import React from 'react'
import { Dialog } from '@mui/material'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import OutwardDealerTabOrderFilterForm from './OutwardDealerTabOrderFilterForm'
import moment from 'moment'

type LabelValuePair = {
    fieldName: string
    label: string
    value: any
}

// Define the type for
export type FormInitialValuesFilterWithLabel = {
    startDate: LabelValuePair
    endDate: LabelValuePair
    startTime: LabelValuePair
    endTime: LabelValuePair
    orderStatus: LabelValuePair
}

type Props = {
    open: {
        isFilterOpen: boolean
        isMenifest: boolean
    }
    onClose: () => void
    filter: FormInitialValuesFilterWithLabel
    setFilter: React.Dispatch<
        React.SetStateAction<FormInitialValuesFilterWithLabel>
    >
}

const OutwardDealerTabFilterFormWrapper = ({
    open,
    onClose,
    filter,
    setFilter,
}: Props) => {
    const initialValues: FormInitialValuesFilterWithLabel = {
        startDate: filter.startDate,
        endDate: filter.endDate,
        startTime: filter.startTime,
        endTime: filter.endTime,
        orderStatus: filter.orderStatus,
    }

    // Submit Handler
    const handleSubmit = async (
        values: FormInitialValuesFilterWithLabel,
        { setSubmitting }: FormikHelpers<FormInitialValuesFilterWithLabel>
    ) => {
        setSubmitting(false)

        const startDateTime =
            values.startTime.value && values?.startDate.value
                ? `${moment(values.startDate.value).format('YYYY-MM-DD')}T${
                      values.startTime.value + ':00'
                  }Z`
                : `${moment(values.startDate.value).format(
                      'YYYY-MM-DD'
                  )}T${'00:00:00'}Z`
        const endDateTime =
            values.endTime.value && values?.endDate.value
                ? `${moment(values.endDate.value).format('YYYY-MM-DD')}T${
                      values.endTime.value + ':00'
                  }Z`
                : `${moment(values.endDate.value).format(
                      'YYYY-MM-DD'
                  )}T${'23:59:59'}Z`

        setFilter((prev) => ({
            ...prev,
            startDate: values?.startDate.value
                ? {
                      ...values.startDate,
                      label: moment(startDateTime).format('yyyy-MM-DD'),
                      value: startDateTime,
                  }
                : { ...values.startDate, value: '' },
            endDate: values?.endDate.value
                ? {
                      ...values.endDate,
                      label: moment(endDateTime).format('yyyy-MM-DD'),
                      value: endDateTime,
                  }
                : { ...values.endDate, value: '' },

            startTime: values?.startTime.value
                ? {
                      ...values.startTime,
                      label: values.startTime.value,
                      value: values.startTime.value,
                  }
                : { ...values.startTime, value: '' },
            endTime: values?.endTime.value
                ? {
                      ...values.endTime,
                      label: values.endTime.value,
                      value: values.endTime.value,
                  }
                : { ...values.endTime, value: '' },
            orderStatus: values.orderStatus,
        }))
        onClose()
    }

    // Reset Handler
    const handleReset = async (
        formikProps: FormikProps<FormInitialValuesFilterWithLabel>
    ) => {
        setFilter((prev) => ({
            ...prev,
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
            startTime: { fieldName: '', value: '', label: '' },
            endTime: { fieldName: '', value: '', label: '' },
            orderStatus: { fieldName: '', value: '', label: '' },
        }))

        formikProps.resetForm()
    }

    return (
        <Dialog
            open={open.isFilterOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <Formik
                enableReinitialize
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <Form>
                        <OutwardDealerTabOrderFilterForm
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

export default OutwardDealerTabFilterFormWrapper
