/// ==============================================
// Filename:StepAddCompanyDetailsWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddCompanyWrapper'
import StepAddCompanyDetails from './StepAddCompanyDetails'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const StepAddCompanyDetailsWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddCompanyDetails formikProps={formikProps} />
        </>
    )
}

export default StepAddCompanyDetailsWrapper
