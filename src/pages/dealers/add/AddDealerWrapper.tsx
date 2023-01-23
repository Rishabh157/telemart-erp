import { Form, Formik } from 'formik'
import React from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { object, string } from 'yup'
import AddDealer from './AddDealer'

export type AddDealerFormValues = {
    firstName: string;
    lastName: string;
    dealerCode: string;
    firmName: string;
    registeredAddress: string;
    pincode: string;
    state: string;
    district: string;
    contactNo: string;
    mobile: string;
    email: string;
    gstNo: string;
    pan: string;
    aadharNo: string;
    shippingAddresses: string[];
}

const AddDealerWrapper = () => {

    const initialValues = {
        firstName: "",
        lastName: "",
        dealerCode: "",
        firmName: "",
        registeredAddress: "",
        pincode: "",
        state: "",
        district: "",
        contactNo: "",
        mobile: "",
        email: "",
        gstNo: "",
        pan: "",
        aadharNo: "",
        shippingAddresses: ["" , ""],
    }

    const validationSchema = object({
        firstName: string().required('Please enter first name')
    })

    const onSubmitHandler = (values: any) => {
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
                                        <AddDealer
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

export default AddDealerWrapper
