/// ==============================================
// Filename:StepEditOthersWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../EditDealerWrapper'
import StepAddOthers from './StepEditOthers'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepEditOthersWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddOthers formikProps={formikProps} />
        </>
    )
}

export default StepEditOthersWrapper
