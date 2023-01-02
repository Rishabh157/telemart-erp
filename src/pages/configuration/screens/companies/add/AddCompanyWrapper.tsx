import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAddCompanyMutation } from 'src/services/CompanyServices'
import { object, string } from 'yup'
import AddCompany from './AddCompany'

export type FormValues = {
    company_name: string,
    logo: string,
    website_url: string,
    address: string,
    gst_no: string,
    phone_no: string,
}

const AddCompanyWrapper = () => {

    const [addCompany] = useAddCompanyMutation()

    const initialValues: FormValues = {
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

    const onSubmitHandler = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        const { setSubmitting, resetForm } = formikHelpers
        setSubmitting(true)

        addCompany(values).then((res: any) => {
            if (res?.error) {
                setSubmitting(false)
            } else {
                if (res?.data?.status) {
                    setSubmitting(false)
                    resetForm()
                } else {
                    setSubmitting(false)
                    resetForm()

                }
            }

        }).catch((error: any) => { });
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
                            (formikProps) => {
                                return (
                                    <Form className='h-full' autoComplete='off' >
                                        <AddCompany
                                            formikProps={formikProps}
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
