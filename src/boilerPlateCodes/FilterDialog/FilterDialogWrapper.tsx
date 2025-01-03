/// ==============================================
// Filename:FilterDialogWrapper.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Formik, Form, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import FilterDialog from './FilterDialog'

// |-- Types --|
type Props = {
    onClose: () => void
    onApply: () => void
}

export type FormInitalValues = {
    name: string
}

const FilterDialogWarpper = ({ onClose, onApply }: Props) => {
    // Call your api here

    // Form Initial Values
    const initialValues: FormInitalValues = {
        name: '',
    }

    // Form Submit Handler
    const onSubmitHandler = (values: FormInitalValues) => {}

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
                {(formikProps: FormikProps<FormInitalValues>) => {
                    return (
                        <Form>
                            <FilterDialog
                                onClose={onClose}
                                onApply={onApply}
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
