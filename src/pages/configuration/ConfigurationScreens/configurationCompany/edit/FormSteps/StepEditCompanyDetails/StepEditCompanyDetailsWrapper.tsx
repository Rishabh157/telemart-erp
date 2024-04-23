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
    return <StepEditCompanyDetails formikProps={formikProps} />
}

export default StepEditCompanyDetailsWrapper
