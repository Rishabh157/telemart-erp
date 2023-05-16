import React from 'react'
import { FormikProps } from 'formik'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditProductWrapper'
import StepEditFAQs from './StepEditFAQs'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type DropdownOptions = {
    itemOptions: SelectOption[]
}

export type FieldType = Field<'companyTypeOptions' | 'ownershipTypeOptions'>

const StepEditFAQsWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepEditFAQs formikProps={formikProps} />
        </>
    )
}

export default StepEditFAQsWrapper
