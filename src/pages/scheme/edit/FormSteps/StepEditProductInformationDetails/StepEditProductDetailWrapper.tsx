/// ==============================================
// Filename:StepEditProductDetailsWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditSchemeWrapper'
import StepEditProductDetail from '../StepEditProductInformationDetails/StepEditProductDetail'
// import StepEditProduct from "./StepEditProductDetail";

// |-- ETypes --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
    productGroupOptions: any
}

export type DropdownOptions = {
    productGroupOptions: SelectOption[]
}

export type FieldType = Field<'productGroupOptions'>

const StepEditProductsWrapper = ({
    formikProps,
    productGroupOptions,
}: Props) => {
    const dropdownOptions: DropdownOptions = {
        productGroupOptions,
    }

    return (
        <>
            <StepEditProductDetail
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepEditProductsWrapper
