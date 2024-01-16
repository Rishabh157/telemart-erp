/// ==============================================
// Filename:StepAddDealerWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { array, boolean, mixed, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import AddDealers from './AddDealers'
import StepAddDealerDetailsWrapper from './FormSteps/StepAddDealerDetails/StepAddDealerDetailsWrapper'
import StepAddAddressWrapper from './FormSteps/StepAddAddress/StepAddAddressWrapper'
import StepAddContactWrapper from './FormSteps/StepAddContact/StepAddContactWrapper'
import StepAddDocumentsWrapper from './FormSteps/StepAddDocuments/StepAddDocumentsWrapper'
import StepAddOthersWrapper from './FormSteps/StepAddOthers/StepAddOthersWrapper'
import { useAddDealerMutation } from 'src/services/DealerServices'
import { showToast, validationofGst } from 'src/utils'
import { useGetAllDealerCategoryQuery } from 'src/services/DealerCategoryService'
import { regIndiaPhone } from 'src/pages/vendors/add/AddVendorWrapper'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllDealerCategory } from 'src/redux/slices/dealersCategorySlice'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'

// |-- Types --|
export type FormInitialValues = {
    dealerCode: string
    firmName: string
    creditLimit: number
    openingBalance: number
    autoMapping: boolean
    quantityQuotient: number
    firstName: string
    lastName: string
    dealerCategory: string
    email: string
    password: string
    isAutoMap: boolean
    isCreditLimit: boolean
    isAvailableQuantity: boolean
    registrationAddress: {
        phone: string
        address: string
        country: string
        state: string
        district: string
        pincode: string
        pincodeSearch: string
    }
    billingAddress: {
        phone: string
        address: string
        country: string
        state: string
        district: string
        pincode: string
        pincodeSearch: string
    }
    contactInformation: {
        name: string
        department: string
        designation: string
        email: string
        mobileNumber: string
        landLine: string
    }[]
    document: {
        gstNumber: string
        gstCertificate: string
        adharCardNumber: string
        adharCard: string
    }
    otherDocument: {
        documentName: string
        documentFile: string
    }[]
    zonalManagerId: string | null
    zonalExecutiveId: string | null
}
export const gstNumberRegex = RegExp(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
)
// export const adharNoRegexp = RegExp(
//     /[0-9]{4}[\-][0-9]{4}[\-][0-9]{4}[\-][0-9]{4}/
// )
// .matches(adharNoRegexp, "Adhar Number must be (0000-0000-0000-0000)")
// .length(17, 'adhar card must be 16 digit')

// Form Steps
const steps = [
    {
        label: 'Dealer Details',
        component: StepAddDealerDetailsWrapper,
        validationSchema: object({
            dealerCode: string().required('Dealer Code is required'),
            firmName: string().required('Firm Name is required'),
            creditLimit: number()
                .moreThan(0, 'Credit limit must be greater than 0')
                .required('Credit limit is required'),
            // openingBalance: number()
            //     .moreThan(0, 'Opeaning balance must be greater than 0')
            //     .required('Opeaning balance is required'),
            autoMapping: boolean(),
            quantityQuotient: number()
                .moreThan(0, 'Quantity quotient must be greater than 0')
                .required('quantity quotient is required'),
            firstName: string().required('First Name is required'),
            lastName: string().required('Last Name is required'),
            dealerCategory: string().required('Please choose Dealer Category'),
            email: string()
                .email('Email is inavlid')
                .required('Email is required'),
            password: string().required('Password is required'),
        }),
    },
    {
        label: 'Regd./Billing address',
        component: StepAddAddressWrapper,
        validationSchema: object({
            registrationAddress: object().shape({
                phone: string()
                    .min(10, 'Number should be 10 digits')
                    .max(10, 'maximum 10 digit')
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Phone number is required'),
                address: string().required('Address is required'),
                country: string().required('Please choose a country'),
                state: string().required('Please choose a state'),
                district: string().required('Please choose a district'),
                pincode: string().required('Please choose a pincode'),
            }),
            billingAddress: object().shape({
                phone: string()
                    .min(10, 'Number should be 10 digits')
                    .max(10, 'maximum 10 digit')
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
            contactInformation: array().of(
                object().shape({
                    name: string(),
                    department: string(),
                    designation: string(),
                    email: string().email('Email should be valid').trim(),
                    mobileNumber: string()
                        .min(10, 'Number should be 10 digits')
                        .max(10, 'maximum 10 digit')
                        .matches(regIndiaPhone, 'Invalid Mobile Number'),
                    landLine: string()
                        .min(10, 'Number should be 10 digits')
                        .max(10, 'maximum 10 digit'),
                })
            ),
        }),
    },
    {
        label: 'Document',
        component: StepAddDocumentsWrapper,
        validationSchema: object({
            document: object().shape({
                gstNumber: string()
                .matches(validationofGst, 'gst number must be valid'),
                // .required('GST number is required'),
                // gstCertificate: mixed().required('GST certificate is required'),
                adharCardNumber: string()
                    .min(14, 'Number should be 12 digits')
                    .max(14, 'Number should be 12 digits')
                    .required('Aadhar number  is required'),
                adharCard: mixed().required('Aadhar certificate is required'),
            }),
            otherDocument: array().of(
                object().shape({
                    documentName: string(),
                    documentFile: string(),
                })
            ),
        }),
    },
    {
        label: 'Others',
        component: StepAddOthersWrapper,
        validationSchema: object({
            isAutoMap: boolean(),
            isCreditLimit: boolean(),
            isAvailableQuantity: boolean(),
        }),
    },
]

const AddDealerWrapper = () => {
    // States
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0)
    const [apiStatus, setApiStatus] = React.useState<boolean>(false)
    const [addDealer] = useAddDealerMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    // From Initial Values
    const initialValues: FormInitialValues = {
        dealerCode: '',
        firmName: '',
        creditLimit: 0,
        openingBalance: 0,
        autoMapping: false,
        quantityQuotient: 0,
        firstName: '',
        lastName: '',
        dealerCategory: '',
        email: '',
        password: '',
        isAutoMap: true,
        isCreditLimit: false,
        isAvailableQuantity: false,
        registrationAddress: {
            phone: '',
            address: '',
            country: '',
            state: '',
            district: '',
            pincode: '',
            pincodeSearch: '',
        },

        billingAddress: {
            phone: '',
            address: '',
            country: '',
            state: '',
            district: '',
            pincode: '',
            pincodeSearch: '',
        },
        contactInformation: [
            {
                name: '',
                department: '',
                designation: '',
                email: '',
                mobileNumber: '',
                landLine: '',
            },
        ],
        document: {
            gstNumber: '',
            gstCertificate: '',
            adharCardNumber: '',
            adharCard: '',
        },
        otherDocument: [
            {
                documentName: '',
                documentFile: '',
            },
        ],
        zonalManagerId: null,
        zonalExecutiveId: null,
    }

    const getValidationSchema = (activeStep: number) => {
        return steps.find((_, stepIndex) => stepIndex === activeStep)
            ?.validationSchema
    }

    const dispatch = useDispatch<AppDispatch>()
    const { data, isLoading, isFetching } = useGetAllDealerCategoryQuery(
        userData?.companyId
    )

    const { alldealerCategory }: any = useSelector(
        (state: RootState) => state.dealersCategory
    )

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setAllDealerCategory(data?.data))
        }
    }, [data, isLoading, isFetching, dispatch])

    const dealerCategoryOptions = alldealerCategory?.map((ele: any) => {
        return {
            label: ele?.dealersCategory,
            value: ele?._id,
        }
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        if (activeStep === steps.length - 1) {
            dispatch(setFieldCustomized(false))
            setApiStatus(true)
            setTimeout(() => {
                addDealer({
                    dealerCode: values.dealerCode,
                    firmName: values.firmName,
                    firstName: values.firstName,
                    creditLimit: values.creditLimit,
                    openingBalance: values.openingBalance,
                    // autoMapping: values.autoMapping,
                    quantityQuotient: values.quantityQuotient,
                    lastName: values.lastName,
                    dealerCategoryId: values.dealerCategory,
                    email: values.email,
                    password: values.password,
                    isAutoMapping: values.isAutoMap,
                    isCheckCreditLimit: values.isCreditLimit,
                    isCheckAvailableQuotient: values.isAvailableQuantity,
                    registrationAddress: {
                        phone: values.registrationAddress.phone,
                        address: values.registrationAddress.address,
                        countryId: values.registrationAddress.country,
                        stateId: values.registrationAddress.state,
                        districtId: values.registrationAddress.district,
                        pincodeId: values.registrationAddress.pincode,
                    },
                    billingAddress: {
                        phone: values.billingAddress.phone,
                        address: values.billingAddress.address,
                        countryId: values.billingAddress.country,
                        stateId: values.billingAddress.state,
                        districtId: values.billingAddress.district,
                        pincodeId: values.billingAddress.pincode,
                    },
                    contactInformation: values.contactInformation,
                    document: {
                        gstNumber: values.document.gstNumber,
                        gstCertificate: values.document.gstCertificate,
                        adharCardNumber: values.document.adharCardNumber,
                        adharCard: values.document.adharCard,
                    },
                    otherDocument: values.otherDocument,
                    companyId: userData?.companyId || '',
                    zonalManagerId: values.zonalManagerId || null,
                    zonalExecutiveId: values.zonalExecutiveId || null,
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Dealer added successfully!')
                            navigate('/dealers')
                        } else {
                            showToast('error', res?.data?.message)
                        }
                    } else {
                        showToast('error', 'Something went wrong')
                    }
                })
                setApiStatus(false)
            }, 1000)
        } else {
            dispatch(setFormSubmitting(false))
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    return (
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={getValidationSchema(activeStep)}
                onSubmit={onSubmitHandler}
                validateOnChange={true}
            >
                {(formikProps: FormikProps<FormInitialValues>) => (
                    <Form className="">
                        <AddDealers
                            formikProps={formikProps}
                            steps={steps}
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                            dealerCategoryOptions={dealerCategoryOptions}
                            apiStatus={apiStatus}
                        />
                    </Form>
                )}
            </Formik>
        </SideNavLayout>
    )
}

export default AddDealerWrapper
