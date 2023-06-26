/// ==============================================
// Filename:StepAddVideoWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddProductWrapper'
import StepAddVideo from './StepAddVideo'


// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepAddVideoWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddVideo formikProps={formikProps} />
        </>
    )
}

export default StepAddVideoWrapper
