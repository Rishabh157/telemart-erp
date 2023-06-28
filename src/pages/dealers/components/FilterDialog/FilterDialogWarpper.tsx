/// ==============================================
// Filename:FilterDialogWrapper.tsx
// Type: Card Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Formik, Form, FormikProps, FormikHelpers } from 'formik'

// |-- Internal Dependencies --|
import FilterDialog from './FilterDialog'

type Props = {
    onClose: () => void
}

export type FormInitalValues = {
    name: string
}

const FilterDialogWarpper = ({ onClose }: Props) => {
    // Call your api here

    // Form Initial Values
    const initialValues: FormInitalValues = {
        name: '',
    }

    // Form Submit Handler
    const onSubmitHandler = (
        values: FormInitalValues,
        { setSubmitting }: FormikHelpers<FormInitalValues>
    ) => {
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            onClose()
        }, 1000)
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
                {(formikProps: FormikProps<FormInitalValues>) => {
                    return (
                        <Form>
                            <FilterDialog
                                onClose={onClose}
                                formikProps={formikProps}
                            />
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default FilterDialogWarpper
