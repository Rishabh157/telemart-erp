import React from 'react'
import { Dialog } from '@mui/material'
// import { object, string } from 'yup'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import AgentWiseSchemeFormDialog from './AgentWiseSchemeFormDialog'
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
    startDate: LabelValuePair
    endDate: LabelValuePair
    callCenterId: LabelValuePair
    agentId: LabelValuePair
    floorManagerId: LabelValuePair
    userDepartment: LabelValuePair
    teamLeadId: LabelValuePair
}
type Props = {
    open: boolean
    onClose: () => void
    filter: FormInitialValuesFilterWithLabel
    setFilter: React.Dispatch<React.SetStateAction<FormInitialValuesFilterWithLabel>>
}

const AgentWiseSchemeFormDialogWrapper = ({
    open,
    onClose,
    setFilter,
    filter,
}: Props) => {
    const initialValues: FormInitialValuesFilterWithLabel = {

        startDate: filter.startDate,
        endDate: filter.endDate,
        callCenterId: filter.callCenterId,
        agentId: filter.agentId,
        floorManagerId: filter.floorManagerId,
        userDepartment: filter.userDepartment,
        teamLeadId: filter.teamLeadId,
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
            callCenterId: values.callCenterId,
            agentId: values.agentId,
            floorManagerId: values.floorManagerId,
            userDepartment: values.userDepartment,
            teamLeadId: values.teamLeadId,
            startDate: values?.startDate.value ? {
                ...values.startDate,
                label: moment(values.startDate.value)?.format(
                    'yyyy-MM-DD'
                ),
                value: moment(values.startDate.value)?.format(
                    'yyyy-MM-DD'
                ),
            } : { ...values.startDate, value: '' },
            endDate: values?.endDate.value ? {
                ...values.endDate,
                label: moment(values.endDate.value)?.format('yyyy-MM-DD'),
                value: moment(values.endDate.value)?.format('yyyy-MM-DD'),
            } : { ...values.endDate, value: '' },
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
                        <AgentWiseSchemeFormDialog
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

export default AgentWiseSchemeFormDialogWrapper
