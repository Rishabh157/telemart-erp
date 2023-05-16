import React from 'react'
import { FormikProps } from 'formik'
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddSchemeWrapper'
import StepAddFAQ from './StepAddFAQ'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepAddFAQWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddFAQ formikProps={formikProps} />
        </>
    )
}

export default StepAddFAQWrapper
