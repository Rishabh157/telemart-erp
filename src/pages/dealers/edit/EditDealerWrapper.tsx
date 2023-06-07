import React, { useEffect, useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { array, mixed, object, string } from 'yup'
import EditDealers from './EditDealers'
import StepEditDealerDetailsWrapper from './FormSteps/StepEditDealerDetails/StepEditDealerDetailsWrapper'
import StepEditAddressWrapper from './FormSteps/StepEditAddress/StepEditAddressWrapper'
import StepEditContactWrapper from './FormSteps/StepEditContact/StepEditContactWrapper'
import StepEditDocumentsWrapper from './FormSteps/StepEditDocuments/StepEditDocumentsWrapper'
import {
    useGetDealerByIdQuery,
    useUpdateDealerMutation,
} from 'src/services/DealerServices'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllDealerCategory } from 'src/redux/slices/dealersCategorySlice'
import { setSelectedItem } from 'src/redux/slices/dealerSlice'
import { useGetAllDealerCategoryQuery } from 'src/services/DealerCategoryService'
import { setFormSubmitting } from 'src/redux/slices/authSlice'

// TYPE-  Form Intial Values
export type FormInitialValues = {
    dealerCode: string
    firmName: string
    firstName: string
    lastName: string
    dealerCategory: string
    email: string
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

// Form Steps
const steps = [
    {
        label: 'Dealer Details',
        component: StepEditDealerDetailsWrapper,
        validationSchema: object({
            dealerCode: string().required('dealer code is required'),
            firmName: string().required('firm name is required'),
            firstName: string().required('first name is required'),
            lastName: string().required('LastName is required'),
            dealerCategory: string().required('please choose dealer category'),
            email: string().required('email is required'),
        }),
    },
    {
        label: 'Regd./Billing address',
        component: StepEditAddressWrapper,
        validationSchema: object({
            registrationAddress: object().shape({
                phone: string()
                    .max(10, 'maximum 10 digits')
                    .min(10, 'minimum 10 digits')
                    .required('Phone number is required'),
                address: string().required('Address is required'),
                country: string().required('Please choose a country'),
                state: string().required('Please choose a state'),
                district: string().required('Please choose a district'),
                pincode: string().required('Please choose a pincode'),
            }),
            billingAddress: object().shape({
                phone: string()
                    .max(10, 'maximum 10 digits')
                    .min(10, 'minimum 10 digits')
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
            contactInformation: array().of(
                object().shape({
                    name: string().required('Name is required'),
                    department: string().required('Department is required'),
                    designation: string().required('Designation is required'),
                    email: string().required('Email is required'),
                    mobileNumber: string()
                        .max(10, 'maximum 10 digits')
                        .min(10, 'minimum 10 digits')
                        .required('Mobile number is required'),
                    landLine: string()
                        .max(10, 'maximum 10 digits')
                        .min(10, 'minimum 10 digits')
                        .required('Landline is required'),
                })
            ),
        }),
    },
    {
        label: 'Document',
        component: StepEditDocumentsWrapper,
        validationSchema: object({
            document: object().shape({
                gstNumber: string().required('GST number is required'),
                gstCertificate: mixed().required('GST certificate is required'),
                adharCardNumber: string()
                    .min(14, 'Number should be 12 digits')
                    .max(14, 'maximum 12 digit')
                    .required('Declaration form is required'),
                adharCard: mixed().required('Declaration form is required'),
            }),
            otherDocument: array().of(
                object().shape({
                    documentName: string().required('documentName is required'),
                    documentFile: string().required('documentFile is required'),
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

const EditDealerWrapper = () => {
    // States
    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0)
    const [apiStatus, setApiStatus] = useState(false)
    const [UpdateDealer] = useUpdateDealerMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const params = useParams()
    const Id = params.id
    const { data, isLoading, isFetching } = useGetDealerByIdQuery(Id)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.dealer
    )
    const {
        data: dealerData,
        isLoading: isDealerLoading,
        isFetching: isDealerFetching,
    } = useGetAllDealerCategoryQuery(userData?.companyId)

    // From Initial Values
    const initialValues: FormInitialValues = {
        dealerCode: selectedItem?.dealerCode || '',
        firmName: selectedItem?.firmName || '',
        firstName: selectedItem?.firstName || '',
        lastName: selectedItem?.lastName || '',
        dealerCategory: selectedItem?.dealerCategory || '',
        email: selectedItem?.email || '',
        registrationAddress: {
            phone: selectedItem?.registrationAddress.phone || '',
            address: selectedItem?.registrationAddress.address || '',
            country: selectedItem?.registrationAddress.country || '',
            state: selectedItem?.registrationAddress.state || '',
            district: selectedItem?.registrationAddress.district || '',
            pincode: selectedItem?.registrationAddress.pincode || '',
        },
        billingAddress: {
            phone: selectedItem?.billingAddress.phone || '',
            address: selectedItem?.billingAddress.address || '',
            country: selectedItem?.billingAddress.country || '',
            state: selectedItem?.billingAddress.state || '',
            district: selectedItem?.billingAddress.district || '',
            pincode: selectedItem?.billingAddress.pincode || '',
        },
        contactInformation: selectedItem?.contactInformation || '',
        document: {
            gstNumber: selectedItem?.document?.gstNumber || '',
            gstCertificate: selectedItem?.document?.gstCertificate || '',
            adharCardNumber: selectedItem?.document?.adharCardNumber || '',
            adharCard: selectedItem?.document?.adharCard || '',
        },
        otherDocument: selectedItem?.otherDocument || '',
    }
    const getValidationSchema = (activeStep: number) => {
        return steps.find((_, stepIndex) => stepIndex === activeStep)
            ?.validationSchema
    }
    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    const { alldealerCategory }: any = useSelector(
        (state: RootState) => state.dealersCategory
    )

    useEffect(() => {
        if (!isDealerFetching && !isDealerLoading) {
            dispatch(setAllDealerCategory(dealerData?.data))
        }
    }, [dealerData, isDealerLoading, isDealerFetching, dispatch])

    const dealerCategoryOptions = alldealerCategory?.map((ele: any) => {
        return {
            label: ele?.dealersCategory,
            value: ele?._id,
        }
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        if (activeStep === steps.length - 1) {
            setApiStatus(true)
            const contactInformation = values.contactInformation.map(
                (ele: any) => {
                    const { _id, ...rest } = ele // use object destructuring to remove the _id property
                    return rest // return the new object without the _id property
                }
            )

            const otherDocument = values.otherDocument.map((ele: any) => {
                const { _id, ...rest } = ele
                return rest
            })

            setTimeout(() => {
                UpdateDealer({
                    body: {
                        dealerCode: values.dealerCode,
                        firmName: values.firmName,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        dealerCategoryId: values.dealerCategory,
                        email: values.email,
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
                        contactInformation: contactInformation,
                        document: {
                            gstNumber: values.document.gstNumber,
                            gstCertificate: values.document.gstCertificate,
                            adharCardNumber: values.document.adharCardNumber,
                            adharCard: values.document.adharCard,
                        },
                        otherDocument: otherDocument,
                        companyId: userData?.companyId || '',
                    },
                    id: Id || '',
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Dealer updated successfully!')
                            navigate('/dealers')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={getValidationSchema(activeStep)}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => (
                    <Form className="">
                        <EditDealers
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

export default EditDealerWrapper
