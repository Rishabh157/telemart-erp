/// ==============================================
// Filename:StepAddCompanyDetailsWrapper.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddVendorWrapper'
import StepAddComapnyDetails from './StepAddComapnyDetails'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const companyTypeOptions = [
    { label: 'Private Limited Company', value: 'Private Limited Company' },
    { label: 'Public Limited Company', value: 'Public Limited Company' },
    { label: 'Partnerships Company', value: 'Partnerships Company' },
    {
        label: 'Limited Liability Partnership',
        value: 'Limited Liability Partnership',
    },
    { label: 'One Person Company', value: 'One Person Company' },
    { label: 'Sole Proprietorship', value: 'Sole Proprietorship' },
    { label: 'Section 8 Company', value: 'Section 8 Company' },
]
const ownershipTypeOptions = [
    { label: 'Partnership', value: 'partnership' },
    { label: 'Single', value: 'single' },
]

const formFields: Field<'companyTypeOptions' | 'ownershipTypeOptions'>[] = [
    {
        name: 'company_name',
        label: 'Company Name',
        placeholder: 'Company Name',
    },
    {
        name: 'company_type',
        label: 'Company Type',
        placeholder: 'Company Type',
        type: 'select',
        optionAccessKey: 'companyTypeOptions',
    },
    {
        name: 'ownership_type',
        label: 'Ownership Type',
        placeholder: 'Ownership Type',
        type: 'select',
        optionAccessKey: 'ownershipTypeOptions',
    },
    {
        name: 'website_address',
        label: 'Website Address',
        placeholder: 'Website Address',
    },
    {
        name: 'vendor_code',
        label: 'Vendor Code',
        placeholder: 'Vendor Code',
    },
]

const StepAddCompanyDetailsWrapper = ({ formikProps }: Props) => {
    const dropdownOptions = {
        companyTypeOptions,
        ownershipTypeOptions,
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
