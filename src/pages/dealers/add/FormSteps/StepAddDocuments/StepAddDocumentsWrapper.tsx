// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddDealerWrapper'
import StepAddDocuments from './StepAddDocuments'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const formFields: { sectionName: string; fields: FieldType[] }[] = [
    {
        sectionName: 'Document',
        fields: [
            {
                name: 'document.gstNumber',
                label: 'GST No.',
                placeholder: 'GST No.',
                type: 'text',
            },
            {
                name: 'document.gstCertificate',
                label: 'GST Certificate',
                placeholder: 'GST Certificate',
                type: 'file-picker',
                offset: 1,
            },
            {
                name: 'document.adharCardNumber',
                label: 'Aadhar No.',
                placeholder: 'Aadhar No.',
                type: 'text',
                required: true,
            },
            {
                name: 'document.adharCard',
                label: 'Aadhar Card',
                placeholder: 'Aadhar Card',
                type: 'file-picker',
                offset: 1,
                required: true,
            },
            {
                name: 'document.panNumber',
                label: 'Pan Number',
                placeholder: 'Pan Number',
                type: 'text',
                required: false,
            },
            {
                name: 'document.panCard',
                label: 'Pan Card',
                placeholder: 'Pan Card',
                type: 'file-picker',
                required: false,
            },
        ],
    },
]

const StepAddDocumentsWrapper = ({ formikProps }: Props) => {
    return (
        <StepAddDocuments
            formikProps={formikProps}
            formFields={formFields}
        />
    )
}

export default StepAddDocumentsWrapper
