/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditVendorWarehouseWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 29, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { array, object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import StepEditCompanyDetailsWrapper from './FormSteps/StepEditComapnyDetails/StepEditCompanyDetailsWrapper'
import StepEditAddressWrapper from './FormSteps/StepEditAddress/StepEditAddressWrapper'
import StepEditContactWrapper from './FormSteps/StepEditContact/StepEditContactWrapper'
import EditVendorWarehouse from './EditVendorWarehouse'
import { showToast } from 'src/utils'
import {
    useGetVendorWarehouseByIdQuery,
    useUpdateVendorWarehouseMutation,
} from 'src/services/VendorWarehouseService'
import { regIndiaPhone } from 'src/pages/vendors/edit/EditVendorWrapper'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import { setSelectedItem } from 'src/redux/slices/VendorWarehouseSlice'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import useCountries from 'src/hooks/useCountry'

// |-- Types --|
export type FormInitialValues = {
    warehouseName: string
    country: string
    email: string
    vendorId: any
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
            country: string().required('please select country'),
            email: string().required('Required').email('Invalid email'),
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
                gstNumber: string().required('GST Number is required'),
                gstCertificate: string().required(
                    'GST Certificate is required'
                ),
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
                    name: string().required('Name is required'),
                    department: string().required('Department is required'),
                    designation: string().required('Designation is required'),
                    email: string()
                        .email('Invalid Email')
                        .required('Email is Required'),
                    mobileNumber: string()
                        .max(10, 'Mobile Number must be 10 digits')
                        .min(10, 'Mobile Number must be 10 digits')
                        .required('Mobile Number is Required')
                        .matches(regIndiaPhone, 'Invalid Mobile Number'),
                    landLine: string()
                        .max(10, 'Mobile Number must be 10 characters')
                        .min(10, 'Mobile Number must be 10 digits')
                        .required('Landline is required'),
                })
            ),
        }),
    },
]

const EditVendorWarehouseWrapper = () => {
    const params = useParams()
    const Id: any = params.id
    const vendorId = params?.vendorId
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetVendorWarehouseByIdQuery(Id)
    const [updateVendorWarehouse] = useUpdateVendorWarehouseMutation()

    // States
    const { allCountry }: any = useSelector((state: RootState) => state.country)

    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.vendorWarehouse
    )

    const [apiStatus, setApiStatus] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0)

    const { country } = useCountries()
    useEffect(() => {
        if (country) {
            dispatch(setAllCountry(country))
        }
    }, [country, dispatch])

    // From Initial Values
    const initialValues: FormInitialValues = {
        warehouseName: selectedItem?.wareHouseName || '',
        country: selectedItem?.country || '',
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
        vendorId: vendorId,
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
                    const { _id, ...rest } = ele // use object destructuring to remove the _id property
                    return rest // return the new object without the _id property
                }
            )
            setApiStatus(true)
            dispatch(setFieldCustomized(false))
            setTimeout(() => {
                updateVendorWarehouse({
                    body: {
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
                        vendorId: values?.vendorId || null,
                    },
                    id: Id || '',
                }).then((res: any) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast(
                                'success',
                                'Warehouse Upated successfully!'
                            )
                            navigate('/vendors/' + vendorId + '/warehouse')
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

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [data, isLoading, isFetching])
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={getValidationSchema(activeStep)}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form className="">
                    <EditVendorWarehouse
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

export default EditVendorWarehouseWrapper
