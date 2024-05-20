// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, boolean, mixed, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { regIndiaPhone } from 'src/pages/vendors/add/AddVendorWrapper'
import { useGetAllDealerCategoryQuery } from 'src/services/DealerCategoryService'
import {
    useGetDealerByIdQuery,
    useUpdateDealerMutation,
} from 'src/services/DealerServices'
import { showToast, validationofGst } from 'src/utils'
import EditDealers from './EditDealers'
import StepEditAddressWrapper from './FormSteps/StepEditAddress/StepEditAddressWrapper'
import StepEditContactWrapper from './FormSteps/StepEditContact/StepEditContactWrapper'
import StepEditDealerDetailsWrapper from './FormSteps/StepEditDealerDetails/StepEditDealerDetailsWrapper'
import StepEditDocumentsWrapper from './FormSteps/StepEditDocuments/StepEditDocumentsWrapper'
import StepEditOthersWrapper from './FormSteps/StepEditOthers/StepEditOthersWrapper'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'

// |-- Types --|
export type FormInitialValues = {
    dealerCode: string
    firmName: string
    firstName: string
    creditLimit: number
    openingBalance: number
    quantityQuotient: number
    lastName: string
    dealerCategoryId: string
    email: string
    isAutoMap: boolean
    isCreditLimit: boolean
    isAvailableQuantity: boolean
    registrationAddress: {
        phone: string
        address: string
        countryId: string
        stateId: string
        districtId: string
        pincodeId: string
    }
    billingAddress: {
        phone: string
        address: string
        countryId: string
        stateId: string
        districtId: string
        pincodeId: string
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
    zonalExecutiveAreaId: string[]
}

// Form Steps
const steps = [
    {
        label: 'Dealer Details',
        component: StepEditDealerDetailsWrapper,
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
                .required('Quantity quotient is required'),

            firstName: string().required('First Name is required'),
            lastName: string().required('Last Name is required'),
            dealerCategoryId: string().required(
                'please select dealer category'
            ),
            email: string()
                .email('Invalid Email')
                .required('Email is required'),
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
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Phone number is required'),
                address: string().required('Address is required'),
                countryId: string().required('Please select a country'),
                stateId: string().required('Please select a state'),
                districtId: string().required('Please select a district'),
                pincodeId: string().required('Please select a pincode'),
            }),
            billingAddress: object().shape({
                phone: string()
                    .max(10, 'maximum 10 digits')
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .min(10, 'minimum 10 digits')
                    .required('Phone number is required'),
                address: string().required('Address is required'),
                countryId: string().required('Please select a country'),
                stateId: string().required('Please select a state'),
                districtId: string().required('Please select a district'),
                pincodeId: string().required('Please select a pincode'),
            }),
        }),
    },
    {
        label: 'Contact',
        component: StepEditContactWrapper,
        validationSchema: object({
            contactInformation: array().of(
                object().shape({
                    name: string(),
                    department: string(),
                    designation: string(),
                    email: string().email('Invalid email'),
                    mobileNumber: string()
                        .max(10, 'maximum 10 digits')
                        .min(10, 'minimum 10 digits')
                        .matches(regIndiaPhone, 'Invalid Mobile Number'),
                    landLine: string()
                        .max(10, 'maximum 10 digits')
                        .min(10, 'minimum 10 digits'),
                })
            ),
        }),
    },
    {
        label: 'Document',
        component: StepEditDocumentsWrapper,
        validationSchema: object({
            document: object().shape({
                gstNumber: string().matches(
                    validationofGst,
                    'gst number must be valid'
                ),
                // gstCertificate: mixed().required('GST certificate is required'),
                adharCardNumber: string()
                    .min(14, 'Number should be 12 digits')
                    .max(14, 'maximum 12 digit')
                    .required('Aadhar number  is required'),
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
    {
        label: 'Others',
        component: StepEditOthersWrapper,
        validationSchema: object({
            zonalManagerId: string().nullable(),
            zonalExecutiveId: string().nullable(),
            isAutoMap: boolean(),
            isCreditLimit: boolean(),
            isAvailableQuantity: boolean(),
        }),
    },
]

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

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetDealerByIdQuery(Id),
    })

    // From Initial Values
    const initialValues: FormInitialValues = {
        dealerCode: selectedItem?.dealerCode || '',
        firmName: selectedItem?.firmName || '',
        firstName: selectedItem?.firstName || '',
        creditLimit: selectedItem?.creditLimit || 0,
        openingBalance: selectedItem?.openingBalance || 0,
        quantityQuotient: selectedItem?.quantityQuotient || 0,
        lastName: selectedItem?.lastName || '',
        dealerCategoryId: selectedItem?.dealerCategoryId || '',
        isAutoMap: selectedItem?.isAutoMapping,
        isCreditLimit: selectedItem?.isCheckCreditLimit,
        isAvailableQuantity: selectedItem?.isCheckAvailableQuotient,
        email: selectedItem?.email || '',
        registrationAddress: {
            phone: selectedItem?.registrationAddress.phone || '',
            address: selectedItem?.registrationAddress.address || '',
            countryId: selectedItem?.registrationAddress.countryId || '',
            stateId: selectedItem?.registrationAddress.stateId || '',
            districtId: selectedItem?.registrationAddress.districtId || '',
            pincodeId: selectedItem?.registrationAddress.pincodeId || '',
        },
        billingAddress: {
            phone: selectedItem?.billingAddress.phone || '',
            address: selectedItem?.billingAddress.address || '',
            countryId: selectedItem?.billingAddress.countryId || '',
            stateId: selectedItem?.billingAddress.stateId || '',
            districtId: selectedItem?.billingAddress.districtId || '',
            pincodeId: selectedItem?.billingAddress.pincodeId || '',
        },
        contactInformation: selectedItem?.contactInformation || '',
        document: {
            gstNumber: selectedItem?.document?.gstNumber || '',
            gstCertificate: selectedItem?.document?.gstCertificate || '',
            adharCardNumber: selectedItem?.document?.adharCardNumber || '',
            adharCard: selectedItem?.document?.adharCard || '',
        },
        otherDocument: selectedItem?.otherDocument || '',
        zonalManagerId: selectedItem?.zonalManagerId,
        zonalExecutiveId: selectedItem?.zonalExecutiveId,
        zonalExecutiveAreaId: selectedItem?.zonalExecutiveAreaId || [],
    }
    const getValidationSchema = (activeStep: number) => {
        return steps.find((_, stepIndex) => stepIndex === activeStep)
            ?.validationSchema
    }

    const { options: dealerCategoryOptions } = useCustomOptions({
        useEndPointHook: useGetAllDealerCategoryQuery(userData?.companyId),
        keyName: 'dealersCategory',
        value: '_id',
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        if (activeStep === steps.length - 1) {
            setApiStatus(true)
            dispatch(setFieldCustomized(false))
            const contactInformation = values.contactInformation.map(
                (ele: any) => {
                    const { _id, maskedPhoneNo, ...rest } = ele // use object destructuring to remove the _id property
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
                        creditLimit: values.creditLimit,
                        openingBalance: values.openingBalance,
                        isCheckAvailableQuotient: values.isAvailableQuantity,
                        isCheckCreditLimit: values.isCreditLimit,
                        isAutoMapping: values.isAutoMap,
                        quantityQuotient: values.quantityQuotient,
                        lastName: values.lastName,
                        dealerCategoryId: values.dealerCategoryId,
                        email: values.email,
                        registrationAddress: {
                            phone: values.registrationAddress.phone,
                            address: values.registrationAddress.address,
                            countryId: values.registrationAddress.countryId,
                            stateId: values.registrationAddress.stateId,
                            districtId: values.registrationAddress.districtId,
                            pincodeId: values.registrationAddress.pincodeId,
                        },
                        billingAddress: {
                            phone: values.billingAddress.phone,
                            address: values.billingAddress.address,
                            countryId: values.billingAddress.countryId,
                            stateId: values.billingAddress.stateId,
                            districtId: values.billingAddress.districtId,
                            pincodeId: values.billingAddress.pincodeId,
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
                        zonalManagerId: values.zonalManagerId || null,
                        zonalExecutiveId: values.zonalExecutiveId || null,
                        zonalExecutiveAreaId: values.zonalExecutiveAreaId || [],
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
