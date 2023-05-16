import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from '../../AddCompanyWrapper'
import StepAddCompanyDetails from './StepAddCompanyDetails'

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
