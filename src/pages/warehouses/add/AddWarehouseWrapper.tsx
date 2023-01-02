import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { boolean, number, object, string } from 'yup'
import AddWarehouse from './AddWarehouse'

export type AddWarehouseFormValues = {
  name: string;
  address: string;
  pincode: string;
  state: string;
  district: string;
  contactNo: string;
  mobile: string;
  gst_no: string;
  type: string;
  vendor: string;
  invoicePrefix: string;
  invoiceNo: string;
  barcodePrefix: string;
  cancellationHours: string;
  againstCForm: boolean;
  isBranchOffice: boolean;
  comapny: string;
  blueDartAreaCode: string;
  blueDartRouteCode: string;
  blueDartCustomerName: string;
  delhiverySurfacePickupLocation: string;
  delhiveryAirPickupLocation: string;
}

const AddWarehouseWrapper = () => {

    const initialValues: AddWarehouseFormValues = {
        name: "",
        address: "",
        pincode: "",
        state: "",
        district: "",
        contactNo: "",
        mobile: "",
        gst_no: "",
        type: "",
        vendor: "",
        invoicePrefix: "",
        invoiceNo: "",
        barcodePrefix: "",
        cancellationHours: "",
        againstCForm: false,
        isBranchOffice: false,
        comapny: "",
        blueDartAreaCode: "",
        blueDartRouteCode: "",
        blueDartCustomerName: "",
        delhiverySurfacePickupLocation: "",
        delhiveryAirPickupLocation: "",
    }

    const validationSchema = object({
        name: string().required('Please enter name'),
        isBranchOffice: boolean().required('Please check')
    })

    const onSubmitHandler = (values: any , formikHelpers: FormikHelpers<AddWarehouseFormValues>) => {

        const {setSubmitting , resetForm} = formikHelpers;
        setTimeout(()=> {
            console.log("🚀 ~ file: AddDealer.tsx:13 ~ onSubmitHandler ~ values", values)
            setSubmitting(false)
            resetForm()
        }, 800)
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
                                        <AddWarehouse
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

export default AddWarehouseWrapper
