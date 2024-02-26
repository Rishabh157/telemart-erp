/// ==============================================
// Filename:StepEditCompanyDeatilsWrapper.tsx
// Type: Edit Component
// Last Updated: FEB 26, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditVendorWrapper'
import StepEditComapnyDetails from './StepEditComapnyDetails'
import {
    companyTypeOptions,
    ownershipTypeOptions,
} from 'src/utils/constants/customeTypes'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

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

const StepEditCompanyDetailsWrapper = ({ formikProps }: Props) => {
    const dropdownOptions = {
        companyTypeOptions: companyTypeOptions(),
        ownershipTypeOptions: ownershipTypeOptions(),
    }

    return (
        <StepEditComapnyDetails
            formikProps={formikProps}
            dropdownOptions={dropdownOptions}
            formFields={formFields}
        />
    )
}

export default StepEditCompanyDetailsWrapper
