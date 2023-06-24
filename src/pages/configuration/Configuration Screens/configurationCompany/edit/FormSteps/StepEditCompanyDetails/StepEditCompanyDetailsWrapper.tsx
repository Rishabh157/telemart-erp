/// ==============================================
// Filename:StepEditCompanyDetailsWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../EditCompanyWrapper'
import StepEditCompanyDetails from './StepEditCompanyDetails'


// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const StepEditCompanyDetailsWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepEditCompanyDetails formikProps={formikProps} />
        </>
    )
}

export default StepEditCompanyDetailsWrapper
