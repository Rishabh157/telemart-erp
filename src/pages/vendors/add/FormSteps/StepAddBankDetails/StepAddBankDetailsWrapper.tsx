/// ==============================================
// Filename:StepAddBankDetailsWrapper.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddVendorWrapper'
import StepAddBankDetails from './StepAddBankDetails'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const formFields: {
    sectionName: string
    fields: Field<'accountTypeOptions'>[]
}[] = [
    {
        sectionName: 'Bank Information',
        fields: [
            {
                name: 'bankName',
                label: 'Bank Name',
                placeholder: 'Bank Name',
            },
            {
                name: 'bankBranchName',
                label: 'Branch Name',
                placeholder: 'Branch Name',
            },
            {
                name: 'accountHolderName',
                label: 'Account Holder Name',
                placeholder: 'Account Holder Name',
            },
            {
                name: 'accountNumber',
                label: 'Account Number',
                placeholder: 'Account Number',
            },
            {
                name: 'ifscNumber',
                label: 'IFSC No.',
                placeholder: 'IFSC No.',
            },
            {
                name: 'accountType',
                label: 'Account Type',
                placeholder: 'Account Type',
                type: 'select',
                optionAccessKey: 'accountTypeOptions',
            },
            {
                name: 'cancelledCheque',
                label: 'Cancelled Cheque',
                placeholder: 'Cancelled Cheque',
                // type: "file-picker",
            },
        ],
    },
]

const accountTypeOptions = [
    { label: 'Saving', value: 'SAVING' },
    { label: 'Current', value: 'CURRENT' },
]

const StepAddBankDetailsWrapper = ({ formikProps }: Props) => {
    const dropdownOptions = {
        accountTypeOptions,
    }

    return (
        <>
            <StepAddBankDetails
                formikProps={formikProps}
                formFields={formFields}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepAddBankDetailsWrapper
