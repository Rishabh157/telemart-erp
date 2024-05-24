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
        required: true,
    },
    {
        name: 'dealerCategoryId',
        label: 'Dealer Category',
        placeholder: 'Dealer Category',
        type: 'select',
        optionAccessKey: 'dealerCategoryOptions',
        required: true,
    },
    {
        name: 'firmName',
        label: 'Party(firm) Name',
        placeholder: 'Firm Name',
        required: true,
    },

    {
        name: 'creditLimit',
        label: 'Credit Limit',
        placeholder: 'Credit Limit',
        type: 'number',
        required: true,
    },
    {
        name: 'openingBalance',
        label: 'Opening Balance',
        placeholder: 'Opening  Balance',
        type: 'number',
        required: true,
    },
    {
        name: 'quantityQuotient',
        label: 'Quantity Quotient',
        placeholder: 'Quantity Quotient',
        type: 'number',
        required: true,
    },
    // {
    //     name: 'autoMapping',
    //     label: 'Auto Mapping',
    //     placeholder: 'Auto Mapping',
    //     type: 'switch-button',
    // },
    {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'First Name',
        required: true,
    },
    {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
        required: true,
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        required: true,
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
