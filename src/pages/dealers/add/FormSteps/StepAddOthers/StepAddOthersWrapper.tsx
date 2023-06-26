/// ==============================================
// Filename:StepAddOthersWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddDealerWrapper'
import StepAddOthers from './StepAddOthers'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepAddOthersWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddOthers formikProps={formikProps} />
        </>
    )
}

export default StepAddOthersWrapper
