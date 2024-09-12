// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Redux--|
import { FormInitialValues } from '../../EditVendorWrapper'
import StepEditDocuments from './StepEditDocuments'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const formFields: { sectionName: string; fields: Field<''>[] }[] = [
    {
        sectionName: 'Documents',
        fields: [
            {
                name: 'gst_no',
                label: 'GST No.',
                placeholder: 'GST No.',
            },
            {
                name: 'declaration_form',
                label: 'Declaration Form',
                placeholder: 'Declaration Form',
                type: 'file-picker',
            },
            {
                name: 'gst_certificate',
                label: 'GST Certificate',
                placeholder: 'GST Certificate',
                type: 'file-picker',
            },
            {
                name: 'panNumber',
                label: 'Pan Number',
                placeholder: 'Pan Number',
            },
            {
                name: 'panCard',
                label: 'Pan Card',
                placeholder: 'Pan Card',
                type: 'file-picker',
                required: false,
            },
        ],
    },
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
