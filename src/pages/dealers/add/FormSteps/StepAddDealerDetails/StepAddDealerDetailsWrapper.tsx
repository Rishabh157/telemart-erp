/// ==============================================
// Filename:StepAddDealerDetailsWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { FormikProps } from 'formik'

// |-- External Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddDealerWrapper'
import StepAddComapnyDetails from './StepAddDealerDetails'

// |-- Types --|
export type DropdownOptions = {
    dealerCategoryOptions: SelectOption[]
}

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dealerCategoryOptions: any[]
}

export type FieldType = Field<'dealerCategoryOptions'>

//const dealerCategoryOptions = [{ label: "Category 1", value: "category-1" }];

const formFields: FieldType[] = [
    {
        name: 'dealerCode',
        label: 'Dealer Code',
        placeholder: 'Dealer Code',
    },
    {
        name: 'dealerCategory',
        label: 'Dealer Category',
        placeholder: 'Dealer Category',
        type: 'select',
        optionAccessKey: 'dealerCategoryOptions',
    },
    {
        name: 'firmName',
        label: 'Firm Name',
        placeholder: 'Firm Name',
    },
    {
        name: 'creditLimit',
        label: 'Credit Limit',
        placeholder: 'Credit Limit',
        type: 'number',
    },
    {
        name: 'openingBalance',
        label: 'Opeaning Balance',
        placeholder: 'Opeaning Balance',
        type: 'number',
    },
    {
        name: 'quantityQuotient',
        label: 'Quantity Quotient',
        placeholder: 'Quantity Quotient',
        type: 'number',
    },
    {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'First Name',
    },
    {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password',
    },
]

const StepAddCompanyDetailsWrapper = ({
    formikProps,
    dealerCategoryOptions,
}: Props) => {
    const dropdownOptions: DropdownOptions = {
        dealerCategoryOptions,
    }

    return (
        <>
            <StepAddComapnyDetails
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
                formFields={formFields}
            />
        </>
    )
}
export default StepAddCompanyDetailsWrapper
