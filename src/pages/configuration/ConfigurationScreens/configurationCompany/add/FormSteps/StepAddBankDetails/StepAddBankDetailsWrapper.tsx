// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddCompanyWrapper'
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
                name: 'branchName',
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
