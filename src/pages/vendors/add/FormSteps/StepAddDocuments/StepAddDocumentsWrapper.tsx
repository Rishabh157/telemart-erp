// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../AddVendorWrapper'
import StepAddDocuments from './StepAddDocuments'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Redux --|
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
                required: false,
            },
        ],
    },
]

const StepAddDocumentsWrapper = ({ formikProps }: Props) => {
    return (
        <StepAddDocuments formikProps={formikProps} formFields={formFields} />
    )
}

export default StepAddDocumentsWrapper
