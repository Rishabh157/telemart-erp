import { Form, Formik } from 'formik'
import React from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { object, string } from 'yup'
import AddDealer from './AddDealer'

const AddDealerWrapper = () => {

    const initialValues = {
        name: "",
        mobile: "",
        dealer_code: "",
        district: "",
        password: "",
        confirm_password: "",
    }

    const validationSchema = object({
        name: string().required('Please enter a name')
    })

    const onSubmitHandler = (values: any) => {
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
                            ({ values, setFieldValue }) => {
                                return (
                                    <Form className='h-full' autoComplete='off' >
                                        <AddDealer
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
        </SideNavLayout>
    )
}

export default AddDealerWrapper
