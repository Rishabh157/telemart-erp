import { Dialog } from '@mui/material'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React from 'react'
import CallListingFilterForm from './CallListingFilterForm'
import moment from 'moment'

type Props = {
    open: boolean
    onClose: () => void
    setFilter: React.Dispatch<
        React.SetStateAction<CallListFilterFormValues>
    >
    filter: CallListFilterFormValues
}
type LabelValuePair = {
    fieldName: string
    label: string
    value: any
}

export type CallListFilterFormValues = {
    dispositionOneId: LabelValuePair
    dispositionTwoId: LabelValuePair
    startDate: LabelValuePair
    endDate: LabelValuePair
}

const CallListingFilterWrapper = ({
    open,
    onClose,
    setFilter,
    filter,
}: Props) => {
    const initialValues: CallListFilterFormValues = {
        dispositionOneId: filter?.dispositionOneId,
        dispositionTwoId: filter?.dispositionTwoId,
        startDate: filter?.startDate,
        endDate: filter?.endDate
    }

    // Submit Handler
    const handleSubmit = async (
        values: CallListFilterFormValues,
        { setSubmitting }: FormikHelpers<CallListFilterFormValues>
    ) => {
        setSubmitting(false)
        setFilter((prev) => ({
            ...prev,
            dispositionOneId: values.dispositionOneId,
            dispositionTwoId: values.dispositionTwoId,

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
        formikProps: FormikProps<CallListFilterFormValues>
    ) => {
        // reset formik props
        setFilter((prev) => ({
            ...prev,
            dispositionOneId: { fieldName: '', value: '', label: '' },
            dispositionTwoId: { fieldName: '', value: '', label: '' },
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
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <Form>
                        <CallListingFilterForm
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

export default CallListingFilterWrapper
