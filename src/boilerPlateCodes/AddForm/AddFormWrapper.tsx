import { Form, Formik } from 'formik'
import React from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { object, string } from 'yup'
import AddForm from './AddForm'

export type AddFormValues = {
    firstName: string;
    lastName: string;
}

const AddFormWrapper = () => {

    // Form Initial Values
    const initialValues = {
        firstName: "",
        lastName: "",
    }

    // Form Validation Schema
    const validationSchema = object({
        firstName: string().required('Please enter first name')
    })

    const onSubmitHandler = (values: any) => {

        // Write your submit handler here
        console.log("🚀 ~ file: AddDealer.tsx:13 ~ onSubmitHandler ~ values", values)
    }

    return (
        <SideNavLayout>
            <div className='flex justify-center w-full py-2 h-full' >
                <div className='w-full h-full' >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmitHandler}

                    >
                        {
                            (formikProps) => {
                                return (
                                    <Form className='h-full' autoComplete='off' >
                                        <AddForm
                                            formikProps={formikProps}
                                        />
                                    </Form>
                                )
                            }
                        }


                    </Formik>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default AddFormWrapper
