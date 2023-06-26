/// ==============================================
// Filename:StepEditDocumentsWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../EditDealerWrapper'
import StepEditDocuments from './StepEditDocuments'
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
    // {
    //   sectionName: "otherDocument ",
    //   fields: [
    //     {
    //       name: "documentName",
    //       label: "document Name",
    //       placeholder: "document Name",

    //     },
    //     {
    //       name: "documentFile",
    //       label: "document File",
    //       placeholder: "document File",

    //     },
    //   ]
    // }
]

const StepEditDocumentsWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepEditDocuments
                formikProps={formikProps}
                formFields={formFields}
            />
        </>
    )
}

export default StepEditDocumentsWrapper
