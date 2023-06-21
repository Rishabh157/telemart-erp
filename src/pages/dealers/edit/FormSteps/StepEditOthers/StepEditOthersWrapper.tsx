import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from '../../EditDealerWrapper'
import StepAddOthers from './StepEditOthers'
import { Field } from 'src/models/FormField/FormField.model'

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
