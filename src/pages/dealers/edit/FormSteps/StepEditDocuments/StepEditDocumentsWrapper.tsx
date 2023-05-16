import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from '../../EditDealerWrapper'
import StepEditDocuments from './StepEditDocuments'
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
                type: 'text',
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
                type: 'text',
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
