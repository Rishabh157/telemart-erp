// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import { regIndiaPhone } from 'src/pages/vendors/add/AddVendorWrapper'
import { useAddDealerWarehouseMutation } from 'src/services/DealerWarehouseService'
import { showToast, validationofGst } from 'src/utils'
import AddDealerWarehouse from './AddDealerWarehouse'
import StepAddAddressWrapper from './FormSteps/StepAddAddress/StepAddAddressWrapper'
import StepAddCompanyDetailsWrapper from './FormSteps/StepAddComapnyDetails/StepAddCompanyDetailsWrapper'
import StepAddContactWrapper from './FormSteps/StepAddContact/StepAddContactWrapper'

// |-- Redux --|
import useCountries from 'src/hooks/useCountry'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
export type FormInitialValues = {
    warehouseName: string
    country: string
    email: string
    dealerId: any
    regd_address: {
        phone: string
        address: string
        country: string
        state: string
        district: string
        pincode: string
        pincodeSearch: string
    }
    billing_address: {
        gstNumber: string
        gstCertificate: string
        phone: string
        address: string
        country: string
        state: string
        district: string
        pincode: string
        pincodeSearch: string
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
        label: 'Warehouse Details',
        component: StepAddCompanyDetailsWrapper,
        validationSchema: object({
            warehouseName: string().required('name is required'),
            country: string().required('please select country'),
            email: string()
                .email('Invalid Email')
                .required('Email is required')
                .email('Email address is invalid'),
        }),
    },
    {
        label: 'Regd./Billing address',
        component: StepAddAddressWrapper,
        validationSchema: object({
            regd_address: object().shape({
                phone: string()
                    .trim()
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
                    .trim()
                    .max(10, 'Phone must be 10 digits')
                    .min(10, 'Phone must be 10 digits')
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
        component: StepAddContactWrapper,
        validationSchema: object({
            contact_informations: array().of(
                object().shape({
                    name: string(),
                    department: string(),
                    designation: string(),
                    email: string().email('Invalid email'),
                    mobileNumber: string()
                        .max(10, 'Mobile Number must be 10 characters')
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

const AddDealerWarehouseWrapper = () => {
    const state = useParams()
    const dealerId = state?.dealerId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [addDealerWarehouse] = useAddDealerWarehouseMutation()
    const { country: allCountry } = useCountries()

    // States
    const [apiStatus, setApiStatus] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0)

    // From Initial Values
    const initialValues: FormInitialValues = {
        warehouseName: '',
        country: '',
        email: '',
        dealerId: dealerId,
        regd_address: {
            phone: '',
            address: '',
            country: '',
            state: '',
            district: '',
            pincode: '',
            pincodeSearch: '',
        },
        billing_address: {
            gstNumber: '',
            gstCertificate: '',
            phone: '',
            address: '',
            country: '',
            state: '',
            district: '',
            pincode: '',
            pincodeSearch: '',
        },
        contact_informations: [
            {
                name: '',
                department: '',
                designation: '',
                email: '',
                mobileNumber: '',
                landLine: '',
            },
        ],
    }

    // Form validation schema based on the active step
    const getValidationSchema = (activeStep: number) => {
        return steps.find((_, stepIndex) => stepIndex === activeStep)
            ?.validationSchema
    }

    // On Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        if (activeStep === steps?.length - 1) {
            setApiStatus(true)
            dispatch(setFieldCustomized(false))
            setTimeout(() => {
                addDealerWarehouse({
                    wareHouseName: values.warehouseName,
                    country: values.country,
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
                        gstCertificate: values.billing_address.gstCertificate,
                        phone: values.billing_address.phone,
                        address: values.billing_address.address,
                        countryId: values.billing_address.country,
                        stateId: values.billing_address.state,
                        districtId: values.billing_address.district,
                        pincodeId: values.billing_address.pincode,
                    },
                    contactInformation: values.contact_informations,
                    companyId: userData?.companyId || '',
                    dealerId: values.dealerId || null,
                }).then((res: any) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast(
                                'success',
                                'warehouse added successfully!'
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
            }, 1000)
        } else {
            dispatch(setFormSubmitting(false))
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema(activeStep)}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form >
                    <AddDealerWarehouse
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

export default AddDealerWarehouseWrapper
