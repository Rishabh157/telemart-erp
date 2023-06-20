import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from '../../AddDealerWrapper'
import StepAddOthers from './StepAddOthers'
import { Field } from 'src/models/FormField/FormField.model'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepAddOthersWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddOthers formikProps={formikProps}   />
        </>
    )
}

export default StepAddOthersWrapper
