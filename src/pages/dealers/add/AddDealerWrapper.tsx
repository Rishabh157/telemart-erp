import React, { useEffect } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { array, mixed, object, string } from 'yup'
import AddDealers from './AddDealers'
import StepAddDealerDetailsWrapper from './FormSteps/StepAddDealerDetails/StepAddDealerDetailsWrapper'
import StepAddAddressWrapper from './FormSteps/StepAddAddress/StepAddAddressWrapper'
import StepAddContactWrapper from './FormSteps/StepAddContact/StepAddContactWrapper'
import StepAddDocumentsWrapper from './FormSteps/StepAddDocuments/StepAddDocumentsWrapper'
import { useAddDealerMutation } from 'src/services/DealerServices'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useGetAllDealerCategoryQuery } from 'src/services/DealerCategoryService'
import { setAllDealerCategory } from 'src/redux/slices/dealersCategorySlice'
import { setFormSubmitting } from 'src/redux/slices/authSlice'
import { regIndiaPhone } from 'src/pages/vendors/add/AddVendorWrapper'

// TYPE-  Form Intial Values
export type FormInitialValues = {
    dealerCode: string
    firmName: string
    firstName: string
    lastName: string
    dealerCategory: string
    email: string
    password: string
    registrationAddress: {
        phone: string
        address: string
        country: string
        state: string
        district: string
        pincode: string
    }
    billingAddress: {
        phone: string
        address: string
        country: string
        state: string
        district: string
        pincode: string
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
}

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
            firstName: string().required('First Name is required'),
            lastName: string().required('Last Name is required'),
            dealerCategory: string().required('Please choose Dealer Category'),
            email: string()
                .email('Email is inavlid')
                .required('Email is required'),
            password: string().required('password is required'),
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
                    name: string().required('Name is required'),
                    department: string().required('Department is required'),
                    designation: string().required('Designation is required'),
                    email: string()
                        .email('Email should be valid')
                        .required('Email is required')
                        .trim(),
                    mobileNumber: string()
                        .min(10, 'Number should be 10 digits')
                        .max(10, 'maximum 10 digit')
                        .matches(regIndiaPhone, 'Invalid Mobile Number')
                        .required('Mobile number is required'),
                    landLine: string()
                        .min(10, 'Number should be 10 digits')
                        .max(10, 'maximum 10 digit')
                        .required('Landline is required'),
                })
            ),
        }),
    },
    {
        label: 'Document',
        component: StepAddDocumentsWrapper,
        validationSchema: object({
            document: object().shape({
                gstNumber: string().required('GST number is required'),
                gstCertificate: mixed().required('GST certificate is required'),
                adharCardNumber: string()
                    .min(14, 'Number should be 12 digits')
                    .max(14, 'maximum 12 digit')
                    .required('Adhar Number is required'),
                adharCard: mixed().required('Declaration form is required'),
            }),
            otherDocument: array().of(
                object().shape({
                    documentName: string(),
                    documentFile: string(),
                })
            ),
        }),
    },
]

//Form validation schema based on the active step

// On Submit Handler
// const onSubmitHandler = (values: FormInitialValues) => {
//   if (activeStep === steps.length - 1) {
//     setTimeout(() => {
//       console.log(values);
//       setActiveStep(0);
//     }, 1000);
//   } else {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   }
// };

const AddDealerWrapper = () => {
    // States
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0)
    const [addDealer] = useAddDealerMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    // From Initial Values
    const initialValues: FormInitialValues = {
        dealerCode: '',
        firmName: '',
        firstName: '',
        lastName: '',
        dealerCategory: '',
        email: '',
        password: '',
        registrationAddress: {
            phone: '',
            address: '',
            country: '',
            state: '',
            district: '',
            pincode: '',
        },

        billingAddress: {
            phone: '',
            address: '',
            country: '',
            state: '',
            district: '',
            pincode: '',
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
            setTimeout(() => {
                addDealer({
                    dealerCode: values.dealerCode,
                    firmName: values.firmName,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    dealerCategoryId: values.dealerCategory,
                    email: values.email,
                    password: values.password,
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
                        />
                    </Form>
                )}
            </Formik>
        </SideNavLayout>
    )
}

export default AddDealerWrapper
