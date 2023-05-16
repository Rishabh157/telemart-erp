import React from 'react'
import { FormikProps } from 'formik'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddProductWrapper'
import StepAddFAQs from './StepAddFAQs'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type DropdownOptions = {
    itemOptions: SelectOption[]
}

export type FieldType = Field<'companyTypeOptions' | 'ownershipTypeOptions'>

const StepAddFAQsWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddFAQs formikProps={formikProps} />
        </>
    )
}

export default StepAddFAQsWrapper
