import React from 'react'
import { FormikProps } from 'formik'
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddProductWrapper'
import StepAddVideo from './StepAddVideo'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const StepAddVideoWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddVideo formikProps={formikProps} />
        </>
    )
}

export default StepAddVideoWrapper
