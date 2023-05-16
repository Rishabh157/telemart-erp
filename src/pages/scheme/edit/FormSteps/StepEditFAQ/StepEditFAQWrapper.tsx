import React from 'react'
import { FormikProps } from 'formik'
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditSchemeWrapper'
import StepEditFAQ from './StepEditFAQ'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepEditFAQWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepEditFAQ formikProps={formikProps} />
        </>
    )
}

export default StepEditFAQWrapper
