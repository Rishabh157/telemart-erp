/* eslint-disable react-hooks/exhaustive-deps */
// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import { regIndiaPhone } from 'src/pages/vendors/edit/EditVendorWrapper'
import {
    useGetDealerWarehouseByIdQuery,
    useUpdateDealerWarehouseMutation,
} from 'src/services/DealerWarehouseService'
import { showToast, validationofGst } from 'src/utils'
import EditDealerWarehouse from './EditDealerWarehouse'
import StepEditAddressWrapper from './FormSteps/StepEditAddress/StepEditAddressWrapper'
import StepEditCompanyDetailsWrapper from './FormSteps/StepEditComapnyDetails/StepEditCompanyDetailsWrapper'
import StepEditContactWrapper from './FormSteps/StepEditContact/StepEditContactWrapper'

// |-- Redux --|
import useCountries from 'src/hooks/useCountry'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
export type FormInitialValues = {
    warehouseName: string
    email: string
    dealerId: any
    regd_address: {
        phone: string
        address: string
        country: string
        state: string
        district: string
        pincode: string
    }
    billing_address: {
        phone: string
        address: string
        country: string
        state: string
        district: string
        pincode: string
        gstNumber: string
        gstCertificate: string
    }
    contact_informations: {
        name: string
        department: string
        designation: string
        email: string
        mobileNumber: string
        landLine: string
    }[]
}

// Form Steps
const steps = [
    {
        label: 'Company Details',
        component: StepEditCompanyDetailsWrapper,
        validationSchema: object({
            warehouseName: string().required('warehouse Name is required'),
            email: string().email('Invalid email'),
        }),
    },
    {
        label: 'Regd./Billing address',
        component: StepEditAddressWrapper,
        validationSchema: object({
            regd_address: object().shape({
                phone: string()
                    .max(10, 'Phone must be 10 digits')
                    .min(10, 'Phone must be 10 digits')
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Phone number is required'),
                address: string().required('Address is required'),
                country: string().required('Please select a country'),
                state: string().required('Please select a state'),
                district: string().required('Please select a district'),
                pincode: string().required('Please select a pincode'),
            }),
            billing_address: object().shape({
                phone: string()
                    .max(10, 'Phone must be 10 digits')
                    .min(10, 'Pnone must be 10 digits')
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Phone number is required'),
                address: string().required('Address is required'),
                gstNumber: string().matches(
                    validationofGst,
                    'gst number must be valid'
                ),
                gstCertificate: string(),
                country: string().required('Please select a country'),
                state: string().required('Please select a state'),
                district: string().required('Please select a district'),
                pincode: string().required('Please select a pincode'),
            }),
        }),
    },
    {
        label: 'Contact',
        component: StepEditContactWrapper,
        validationSchema: object({
            contact_informations: array().of(
                object().shape({
                    name: string(),
                    department: string(),
                    designation: string(),
                    email: string().email('Invalid Email'),
                    mobileNumber: string()
                        .max(10, 'Mobile Number must be 10 digits')
                        .min(10, 'Mobile Number must be 10 digits')
                        .matches(regIndiaPhone, 'Invalid Mobile Number'),
                    landLine: string()
                        .max(10, 'Mobile Number must be 10 characters')
                        .min(10, 'Mobile Number must be 10 digits'),
                })
            ),
        }),
    },
]

const EditDealerWarehouseWrapper = () => {
    // Local State
    const [apiStatus, setApiStatus] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0)

    // Redux States
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { dealerId, id: Id } = useParams()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetDealerWarehouseByIdQuery(Id || ''),
    })
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [updateDealerWarehouse] = useUpdateDealerWarehouseMutation()

    const { country: allCountry } = useCountries()

    // From Initial Values
    const initialValues: FormInitialValues = {
        warehouseName: selectedItem?.wareHouseName || '',
        email: selectedItem?.email || '',
        regd_address: {
            phone: selectedItem?.registrationAddress?.phone || '',
            address: selectedItem?.registrationAddress?.address || '',
            country: selectedItem?.registrationAddress?.countryId || '',
            state: selectedItem?.registrationAddress?.stateId || '',
            district: selectedItem?.registrationAddress?.districtId || '',
            pincode: selectedItem?.registrationAddress?.pincodeId || '',
        },
        billing_address: {
            gstNumber: selectedItem?.billingAddress?.gstNumber || '',
            gstCertificate: selectedItem?.billingAddress?.gstCertificate || '',
            phone: selectedItem?.billingAddress?.phone || '',
            address: selectedItem?.billingAddress?.address || '',
            country: selectedItem?.billingAddress?.countryId || '',
            state: selectedItem?.billingAddress?.stateId || '',
            district: selectedItem?.billingAddress?.districtId || '',
            pincode: selectedItem?.billingAddress?.pincodeId || '',
        },
        contact_informations: selectedItem?.contactInformation || '',
        dealerId: selectedItem?.dealerId,
    }

    // Form validation schema based on the active step
    const getValidationSchema = (activeStep: number) => {
        return steps.find((_, stepIndex) => stepIndex === activeStep)
            ?.validationSchema
    }

    // On Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        if (activeStep === steps?.length - 1) {
            const contactInformation = values.contact_informations.map(
                (ele: any) => {
                    const { _id, maskedPhoneNo, ...rest } = ele // use object destructuring to remove the _id property
                    return rest // return the new object without the _id property
                }
            )
            setApiStatus(true)
            dispatch(setFieldCustomized(false))
            setTimeout(() => {
                updateDealerWarehouse({
                    body: {
                        wareHouseName: values.warehouseName,
                        email: values.email,
                        registrationAddress: {
                            phone: values.regd_address.phone,
                            address: values.regd_address.address,
                            countryId: values.regd_address.country,
                            stateId: values.regd_address.state,
                            districtId: values.regd_address.district,
                            pincodeId: values.regd_address.pincode,
                        },
                        billingAddress: {
                            gstNumber: values.billing_address.gstNumber,
                            gstCertificate:
                                values.billing_address.gstCertificate,
                            phone: values.billing_address.phone,
                            address: values.billing_address.address,
                            countryId: values.billing_address.country,
                            stateId: values.billing_address.state,
                            districtId: values.billing_address.district,
                            pincodeId: values.billing_address.pincode,
                        },
                        contactInformation: contactInformation,

                        companyId: userData?.companyId || '',
                        dealerId: values?.dealerId || null,
                    },
                    id: Id || '',
                }).then((res: any) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast(
                                'success',
                                'Warehouse Upated successfully!'
                            )
                            navigate(`/dealers/${dealerId}/warehouse`)
                        } else {
                            showToast('error', res?.data?.message)
                        }
                    } else {
                        showToast('error', 'Something went wrong')
                    }
                    setApiStatus(false)
                })
                //setActiveStep(0)
            }, 1000)
        } else {
            dispatch(setFormSubmitting(false))
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={getValidationSchema(activeStep)}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form >
                    <EditDealerWarehouse
                        formikProps={formikProps}
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        apiStatus={apiStatus}
                        allCountry={allCountry}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default EditDealerWarehouseWrapper
