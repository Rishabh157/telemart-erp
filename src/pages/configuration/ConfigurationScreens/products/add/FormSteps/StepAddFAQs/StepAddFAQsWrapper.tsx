/// ==============================================
// Filename:StepAddFAQsWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddProductWrapper'
import StepAddFAQs from './StepAddFAQs'

// |-- Types --|
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
