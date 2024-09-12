import { Dialog } from '@mui/material'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React from 'react'
import VendorListingFilterForm from './VendorListingFilterForm'

type Props = {
    open: boolean
    onClose: () => void
    setFilter: React.Dispatch<
        React.SetStateAction<VendorListFilterFormValues>
    >
    filter: VendorListFilterFormValues
}
type LabelValuePair = {
    fieldName: string
    label: string
    value: any
}
export type VendorListFilterFormValues = {
    stateId: LabelValuePair
    districtId: LabelValuePair
    companyType: LabelValuePair
}

const VendorListingFilterWrapper = ({
    open,
    onClose,
    setFilter,
    filter,
}: Props) => {
    const initialValues: VendorListFilterFormValues = {
        districtId: filter?.districtId,
        stateId: filter?.stateId,
        companyType: filter?.companyType,
    }

    // Submit Handler
    const handleSubmit = async (
        values: VendorListFilterFormValues,
        { setSubmitting }: FormikHelpers<VendorListFilterFormValues>
    ) => {

        console.log('SUBMIT', values)

        setSubmitting(false)
        setFilter((prev) => ({
            ...prev,
            stateId: values.stateId,
            districtId: values.districtId,
            companyType: values.companyType,
        }))
        onClose()
    }

    // Reset Handler
    const handleReset = async (
        formikProps: FormikProps<VendorListFilterFormValues>
    ) => {
        // reset formik props
        setFilter((prev) => ({
            ...prev,
            companyType: { fieldName: '', value: '', label: '' },
            districtId: { fieldName: '', value: '', label: '' },
            stateId: { fieldName: '', value: '', label: '' },
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
                        <VendorListingFilterForm
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

export default VendorListingFilterWrapper
