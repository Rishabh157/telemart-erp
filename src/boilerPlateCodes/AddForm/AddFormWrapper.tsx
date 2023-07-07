/// ==============================================
// Filename:AddFormWrapper.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import AddForm from './AddForm'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    field1: string
    field2: string
    field3: string
    field4: {
        field4a: string
        field4b: string
        field4c: string
    }[]
}

const AddFormWrapper = (props: Props) => {
    // Form Initial Values
    const initialValues: FormInitialValues = {
        field1: '',
        field2: '',
        field3: '',
        field4: [
            {
                field4a: '',
                field4b: '',
                field4c: '',
            },
        ],
    }

    // Form Validation Schema
    const validationSchema = object({
        field1: string().required('Field1 is required'),
        field2: string().required('Please select a Field2'),
        field3: string().required('Field3 is required'),
        field4: array().of(
            object().shape({
                field4a: string().required('field4a is required'),
                field4b: string().required('field4b is required'),
                field4c: string().required('field4c is required'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        console.log('onSubmitHandler', values)
    }

    const dropdownOptions = {
        field2Options: [{ label: 'dealer', value: 'dealer' }],
    }

    return (
        <SideNavLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddForm
                            formikProps={formikProps}
                            dropdownOptions={dropdownOptions}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default AddFormWrapper
