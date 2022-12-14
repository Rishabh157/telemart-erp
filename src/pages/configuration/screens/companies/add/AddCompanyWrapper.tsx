import { Form, Formik } from 'formik'
import React from 'react'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { object, string } from 'yup'
import AddCompany from './AddCompany'

const AddCompanyWrapper = () => {

    const initialValues = {
        company_name: "",
        logo: "",
        website_url: "",
        address: "",
        gst_no: "",
        phone_no: "",
    }

    const validationSchema = object({
        company_name: string().required('Please enter a name')
    })

    const onSubmitHandler = (values: any) => {
        // console.log("🚀 ~ file: AddDealer.tsx:13 ~ onSubmitHandler ~ values", values)
    }

    return (
        <ConfigurationLayout>
            <div className='flex justify-center w-full py-2 h-full' >
                <div className='w-full h-full' >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmitHandler}

                    >
                        {
                            ({ values, setFieldValue }) => {
                                return (
                                    <Form className='h-full' autoComplete='off' >
                                        <AddCompany
                                            values
                                            setFieldValue={setFieldValue}
                                        />
                                    </Form>
                                )
                            }
                        }


                    </Formik>
                </div>
            </div>
        </ConfigurationLayout>
    )
}

export default AddCompanyWrapper
