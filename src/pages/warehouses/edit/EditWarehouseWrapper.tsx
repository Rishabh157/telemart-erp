/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { array, object, string } from 'yup'
import StepEditCompanyDetailsWrapper from './FormSteps/StepEditComapnyDetails/StepEditCompanyDetailsWrapper'
import StepEditAddressWrapper from './FormSteps/StepEditAddress/StepEditAddressWrapper'
import StepEditContactWrapper from './FormSteps/StepEditContact/StepEditContactWrapper'
import EditWarehouse from './EditWarehouse'
// import { useEditWareHouseMutation } from "src/services/WareHoouseService";
import { showToast } from 'src/utils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
    useGetWareHouseByIdQuery,
    useUpdateWareHouseMutation,
} from 'src/services/WareHoouseService'
import { setSelectedItem } from 'src/redux/slices/warehouseSlice'
import { useGetAllCountryQuery } from 'src/services/CountryService'
import { setAllCountry } from 'src/redux/slices/countrySlice'
import { regIndiaPhone } from 'src/pages/vendors/edit/EditVendorWrapper'
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
        component: StepEditCompanyDetailsWrapper,
        validationSchema: object({
            warehouseCode: string().required('warehouseCode is required'),
            warehouseName: string().required('warehouse Name is required'),
            country: string().required('please select country'),
            email: string().required().email('email address is required'),
        }),
    },
    {
        label: 'Regd./Billing address',
        component: StepEditAddressWrapper,
        validationSchema: object({
            regd_address: object().shape({
                phone: string()
                    .max(10, "Phone must be 10 digits")
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
                    .max(10, "Phone must be 10 digits")
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
        component: StepEditContactWrapper,
        validationSchema: object({
            contact_informations: array().of(
                object().shape({
                    name: string().required('Name is required'),
                    department: string().required('Department is required'),
                    designation: string().required('Designation is required'),
                    email: string().required().email('Email is required'),
                    mobileNumber: string()
                        .max(10, "Mobile Number must be 10 digits")
                        .required()
                        .matches(regIndiaPhone, 'Invalid Mobile Number'),
                    landLine: string().required('Landline is required'),
                })
            ),
        }),
    },
]

const EditWarehouseWrapper = () => {
    const { state } = useLocation()
    const params = useParams()
    const Id = params.id
    const vendorId = state?.params?.vendorId || null
    const dealerId = state?.params?.dealerId || null
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetWareHouseByIdQuery(Id)
    const [editWareHouse] = useUpdateWareHouseMutation()

    // States
    const { allCountry }: any = useSelector((state: RootState) => state.country)

    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.warehouse
    )

    const [apiStatus, setApiStatus] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0)
    const {
        data: countryData,
        isLoading: countryIsLoading,
        isFetching: countryIsFetching,
    } = useGetAllCountryQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setAllCountry(countryData?.data))
        }
    }, [countryData, countryIsLoading, countryIsFetching])

    // From Initial Values
    const initialValues: FormInitialValues = {
        warehouseCode: selectedItem?.wareHouseCode || '',
        warehouseName: selectedItem?.wareHouseName || '',
        country: selectedItem?.country || '',
        email: selectedItem?.email || '',

        regd_address: {
            phone: selectedItem?.registrationAddress?.phone || '',
            address: selectedItem?.registrationAddress?.address || '',
            country: selectedItem?.registrationAddress?.country || '',
            state: selectedItem?.registrationAddress?.state || '',
            district: selectedItem?.registrationAddress?.district || '',
            pincode: selectedItem?.registrationAddress?.pincode || '',
        },
        billing_address: {
            phone: selectedItem?.billingAddress?.phone || '',
            address: selectedItem?.billingAddress?.address || '',
            country: selectedItem?.billingAddress?.country || '',
            state: selectedItem?.billingAddress?.state || '',
            district: selectedItem?.billingAddress?.district || '',
            pincode: selectedItem?.billingAddress?.pincode || '',
        },
        contact_informations: selectedItem?.contactInformation || '',
        vendorId: selectedItem?.vendorId,
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
                    const { _id, ...rest } = ele // use object destructuring to remove the _id property
                    return rest // return the new object without the _id property
                }
            )
            setApiStatus(true)
            setTimeout(() => {
                editWareHouse({
                    body: {
                        wareHouseCode: values.warehouseCode,
                        wareHouseName: values.warehouseName,
                        country: values.country,
                        email: values.email,
                        registrationAddress: {
                            phone: values.regd_address.phone,
                            address: values.regd_address.address,
                            country: values.regd_address.country,
                            state: values.regd_address.state,
                            district: values.regd_address.district,
                            pincode: values.regd_address.pincode,
                        },
                        billingAddress: {
                            phone: values.billing_address.phone,
                            address: values.billing_address.address,
                            country: values.billing_address.country,
                            state: values.billing_address.state,
                            district: values.billing_address.district,
                            pincode: values.billing_address.pincode,
                        },
                        contactInformation: contactInformation,

                        companyId: userData?.companyId || '',
                        dealerId: values?.dealerId || null,
                        vendorId: values?.vendorId || null,
                    },
                    id: Id || '',
                }).then((res: any) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Udated successfully!')
                            if (dealerId !== null) {
                                navigate('/dealers/' + dealerId + '/warehouse')
                                // navigate(`/dealers/${Id}/warehouse`)
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
                setActiveStep(0)
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
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={getValidationSchema(activeStep)}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => (
                    <Form className="">
                        <EditWarehouse
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

export default EditWarehouseWrapper
