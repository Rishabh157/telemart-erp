/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StepEditVideoWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditProductWrapper'
import StepEditVideo from './StepEditVideo'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepEditVideoWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepEditVideo formikProps={formikProps} />
        </>
    )
}

export default StepEditVideoWrapper
