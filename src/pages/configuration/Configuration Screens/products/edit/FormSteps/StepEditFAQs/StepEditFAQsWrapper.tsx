/// ==============================================
// Filename:StepEditFAQsWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditProductWrapper'
import StepEditFAQs from './StepEditFAQs'

// |-- Types --|
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
