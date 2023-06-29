/// ==============================================
// Filename:StepEditContactWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../EditWarehouseWrapper'
import StepEditContact from './StepEditContact'
import { Field } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const formFields: { sectionName: string; fields: FieldType[] }[] = [
    {
        sectionName: 'Contact Information',
        fields: [
            {
                name: 'name',
                label: 'Name',
                placeholder: 'Name',
            },
            {
                name: 'department',
                label: 'Department',
                placeholder: 'Department',
            },
            {
                name: 'designation',
                label: 'Designation',
                placeholder: 'Designation',
            },
            {
                name: 'email',
                label: 'Email',
                placeholder: 'Email',
            },
            {
                name: 'mobileNumber',
                label: 'Mobile Number',
                placeholder: 'Mobile Number',
            },
            {
                name: 'landLine',
                label: 'Landline',
                placeholder: 'Landline',
            },
        ],
    },
]

const StepEditContactWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepEditContact
                formikProps={formikProps}
                formFields={formFields}
            />
        </>
    )
}

export default StepEditContactWrapper
