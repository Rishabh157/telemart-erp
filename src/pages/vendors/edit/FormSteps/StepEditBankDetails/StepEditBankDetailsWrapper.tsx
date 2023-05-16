import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from '../../EditVendorWrapper'
import StepEditBankDetails from './StepEditBankDetails'
import { Field } from 'src/models/FormField/FormField.model'

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
