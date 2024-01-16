/// ==============================================
// Filename:StepEditDealerDetailsWrapper.tsx
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
import { FormInitialValues } from '../../EditDealerWrapper'
import StepEditComapnyDetails from './StepEditDealerDetails'

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
        name: 'dealerCategoryId',
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
        label: 'Opening Balance',
        placeholder: 'Opening  Balance',
        type: 'number',
    },
    {
        name: 'quantityQuotient',
        label: 'Quantity Quotient',
        placeholder: 'Quantity Quotient',
        type: 'number',
    },
    // {
    //     name: 'autoMapping',
    //     label: 'Auto Mapping',
    //     placeholder: 'Auto Mapping',
    //     type: 'switch-button',
    // },
    {
        name: 'firmName',
        label: 'Party(firm) Name',
        placeholder: 'Party Name',
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
]

const StepEditCompanyDetailsWrapper = ({
    formikProps,
    dealerCategoryOptions,
}: Props) => {
    const dropdownOptions: DropdownOptions = {
        dealerCategoryOptions,
    }

    return (
        <>
            <StepEditComapnyDetails
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
                formFields={formFields}
            />
        </>
    )
}
export default StepEditCompanyDetailsWrapper
