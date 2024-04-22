// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddVendorWrapper'
import StepAddComapnyDetails from './StepAddComapnyDetails'
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
        required: true,
    },
    {
        name: 'company_type',
        label: 'Company Type',
        placeholder: 'Company Type',
        type: 'select',
        optionAccessKey: 'companyTypeOptions',
        required: true,
    },
    {
        name: 'ownership_type',
        label: 'Ownership Type',
        placeholder: 'Ownership Type',
        type: 'select',
        optionAccessKey: 'ownershipTypeOptions',
        required: true,
    },
    {
        name: 'website_address',
        label: 'Website Address',
        placeholder: 'Website Address',
        required: false,
    },
    {
        name: 'vendor_code',
        label: 'Vendor Code',
        placeholder: 'Vendor Code',
        required: true,
    },
]

const StepAddCompanyDetailsWrapper = ({ formikProps }: Props) => {
    const dropdownOptions = {
        companyTypeOptions: companyTypeOptions(),
        ownershipTypeOptions: ownershipTypeOptions(),
    }

    return (
        <StepAddComapnyDetails
            formikProps={formikProps}
            dropdownOptions={dropdownOptions}
            formFields={formFields}
        />
    )
}

export default StepAddCompanyDetailsWrapper
