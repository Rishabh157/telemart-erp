/// ==============================================
// Filename:StepEditFAQWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditSchemeWrapper'
import StepEditFAQ from './StepEditFAQ'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepEditFAQWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepEditFAQ formikProps={formikProps} />
        </>
    )
}

export default StepEditFAQWrapper
