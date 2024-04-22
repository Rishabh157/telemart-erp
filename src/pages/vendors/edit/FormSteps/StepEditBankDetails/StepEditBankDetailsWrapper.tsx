// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../EditVendorWrapper'
import StepEditBankDetails from './StepEditBankDetails'
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
                required: true,
            },
            {
                name: 'bankBranchName',
                label: 'Branch Name',
                placeholder: 'Branch Name',
                required: true,
            },
            {
                name: 'accountHolderName',
                label: 'Account Holder Name',
                placeholder: 'Account Holder Name',
                required: true,
            },
            {
                name: 'accountNumber',
                label: 'Account Number',
                placeholder: 'Account Number',
                required: true,
            },
            {
                name: 'ifscNumber',
                label: 'IFSC No.',
                placeholder: 'IFSC No.',
                required: true,
            },
            {
                name: 'accountType',
                label: 'Account Type',
                placeholder: 'Account Type',
                type: 'select',
                optionAccessKey: 'accountTypeOptions',
                required: true,
            },
            {
                name: 'cancelledCheque',
                label: 'Cancelled Cheque',
                placeholder: 'Cancelled Cheque',
                type: 'file-picker',
            },
        ],
    },
]

const accountTypeOptions = [
    { label: 'Saving', value: 'SAVING' },
    { label: 'Current', value: 'CURRENT' },
]

const StepEditBankDetailsWrapper = ({ formikProps }: Props) => {
    const dropdownOptions = {
        accountTypeOptions,
    }

    return (
        <>
            <StepEditBankDetails
                formikProps={formikProps}
                formFields={formFields}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepEditBankDetailsWrapper
