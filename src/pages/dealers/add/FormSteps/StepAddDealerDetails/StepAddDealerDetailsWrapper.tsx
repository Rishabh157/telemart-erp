import { FormikProps } from 'formik'
import React from 'react'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddDealerWrapper'
import StepAddComapnyDetails from './StepAddDealerDetails'

export type DropdownOptions = {
    dealerCategoryOptions: SelectOption[]
}

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
