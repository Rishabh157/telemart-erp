/// ==============================================
// Filename:StepAddProductsWrapper.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddSchemeWrapper'
import StepAddProducts from './StepAddProducts'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
    productGroupOptions: any
}

export type DropdownOptions = {
    productGroupOptions: SelectOption[]
}

export type FieldType = Field<'productGroupOptions'>

const StepAddProductsWrapper = ({
    formikProps,
    productGroupOptions,
}: Props) => {
    const dropdownOptions: DropdownOptions = {
        productGroupOptions,
    }

    return (
        <>
            <StepAddProducts
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepAddProductsWrapper
