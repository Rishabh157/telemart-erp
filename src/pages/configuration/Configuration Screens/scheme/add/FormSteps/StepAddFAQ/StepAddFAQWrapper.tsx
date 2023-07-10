/// ==============================================
// Filename:StepAddFaq.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddSchemeWrapper'
import StepAddFAQ from './StepAddFAQ'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepAddFAQWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddFAQ formikProps={formikProps} />
        </>
    )
}

export default StepAddFAQWrapper
