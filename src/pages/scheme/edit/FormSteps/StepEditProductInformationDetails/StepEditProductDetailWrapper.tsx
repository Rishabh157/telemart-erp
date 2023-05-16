import React from 'react'
import { FormikProps } from 'formik'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditSchemeWrapper'
import StepEditProductDetail from '../StepEditProductInformationDetails/StepEditProductDetail'
// import StepEditProduct from "./StepEditProductDetail";
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
