/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { array, object, string } from 'yup'
import StepAddCompanyDetailsWrapper from './FormSteps/StepAddComapnyDetails/StepAddCompanyDetailsWrapper'
import StepAddAddressWrapper from './FormSteps/StepAddAddress/StepAddAddressWrapper'
import StepAddContactWrapper from './FormSteps/StepAddContact/StepAddContactWrapper'
import AddWarehouse from './AddWarehouse'
import { useAddWareHouseMutation } from 'src/services/WareHoouseService'
import { showToast } from 'src/utils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGetAllCountryQuery } from 'src/services/CountryService'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import { regIndiaPhone } from 'src/pages/vendors/add/AddVendorWrapper'
import { setFormSubmitting } from 'src/redux/slices/authSlice'

// TYPE-  Form Intial Values
export type FormInitialValues = {
    warehouseCode: string
    warehouseName: string
    country: string
    email: string
    vendorId: any
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
        component: StepAddCompanyDetailsWrapper,
        validationSchema: object({
            warehouseCode: string().required('code is required'),
            warehouseName: string().required('name is required'),
            country: string().required('please select country'),
            email: string()
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
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Phone number is required'),
                address: string().required('Address is required'),
                country: string().required('Please choose a country'),
                state: string().required('Please choose a state'),
                district: string().required('Please choose a district'),
                pincode: string().required('Please choose a pincode'),
            }),
            billing_address: object().shape({
                phone: string()
                    .trim()
                    .max(10, 'Phone must be 10 digits')
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Phone number is required'),
                address: string().required('Address is required'),
                country: string().required('Please choose a country'),
                state: string().required('Please choose a state'),
                district: string().required('Please choose a district'),
                pincode: string().required('Please choose a pincode'),
            }),
        }),
    },
    {
        label: 'Contact',
        component: StepAddContactWrapper,
        validationSchema: object({
            contact_informations: array().of(
                object().shape({
                    name: string().required('Name is required'),
                    department: string().required('Department is required'),
                    designation: string().required('Designation is required'),
                    email: string().required('Email is required'),
                    mobileNumber: string()
                        .max(10, 'Phone must be 10 characters')
                        .required('Mobile Number is required')
                        .matches(regIndiaPhone, 'Invalid Mobile Number'),
                    landLine: string().required('Landline is required'),
                })
            ),
        }),
    },
]

const AddWarehouseWrapper = () => {
    const { state } = useLocation()
    const vendorId = state?.params?.vendorId || null
    const dealerId = state?.params?.dealerId || null
    const { userData } = useSelector((state: RootState) => state?.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [addWareHouse] = useAddWareHouseMutation()
    const { data, isLoading, isFetching } = useGetAllCountryQuery(
        userData?.companyId
    )

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setAllCountry(data?.data))
        }
    }, [data, isLoading, isFetching])

    // States
    const [apiStatus, setApiStatus] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0)
    const { allCountry }: any = useSelector((state: RootState) => state.country)

    // From Initial Values
    const initialValues: FormInitialValues = {
        warehouseCode: '',
        warehouseName: '',
        country: '',
        email: '',
        vendorId: vendorId,
        dealerId: dealerId,
        regd_address: {
            phone: '',
            address: '',
            country: '',
            state: '',
            district: '',
            pincode: '',
        },
        billing_address: {
            phone: '',
            address: '',
            country: '',
            state: '',
            district: '',
            pincode: '',
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
            setTimeout(() => {
                addWareHouse({
                    wareHouseCode: values.warehouseCode,
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
                    vendorId: values.vendorId || null,
                }).then((res: any) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast(
                                'success',
                                'warehouse added successfully!'
                            )
                            if (dealerId !== null) {
                                navigate('/dealers/' + dealerId + '/warehouse')
                            } else if (vendorId !== null) {
                                navigate('/vendors/' + vendorId + '/warehouse')
                            } else {
                                navigate('/warehouse')
                            }
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
        <SideNavLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={getValidationSchema(activeStep)}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => (
                    <Form className="">
                        <AddWarehouse
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
        </SideNavLayout>
    )
}

export default AddWarehouseWrapper
