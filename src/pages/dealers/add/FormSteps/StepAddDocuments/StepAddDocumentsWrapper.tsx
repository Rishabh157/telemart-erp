import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from '../../AddDealerWrapper'
import StepAddDocuments from './StepAddDocuments'
import { Field } from 'src/models/FormField/FormField.model'

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
            },
            {
                name: 'document.adharCard',
                label: 'Aadhar Card',
                placeholder: 'Aadhar Card',
                type: 'file-picker',
                offset: 1,
            },
        ],
    },
]

const StepAddDocumentsWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddDocuments
                formikProps={formikProps}
                formFields={formFields}
            />
        </>
    )
}

export default StepAddDocumentsWrapper
