/// ==============================================
// Filename:AddVendorWrapper.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { array, object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import AddVendor from './AddVendor'
import StepAddAddressWrapper from './FormSteps/StepAddAddress/StepAddAddressWrapper'
import StepAddBankDetailsWrapper from './FormSteps/StepAddBankDetails/StepAddBankDetailsWrapper'
import StepAddCompanyDetailsWrapper from './FormSteps/StepAddComapnyDetails/StepAddCompanyDetailsWrapper'
import StepAddContactWrapper from './FormSteps/StepAddContact/StepAddContactWrapper'
import StepAddDocumentsWrapper from './FormSteps/StepAddDocuments/StepAddDocumentsWrapper'
import { useAddVendorMutation } from 'src/services/VendorServices'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import { deleteKeyFromArrayObjects } from '../../../utils'

// |-- Types --|
export type FormInitialValues = {
    company_name: string
    company_type: string
    ownership_type: string
    website_address: string
    vendor_code: string
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
    gst_no: string
    gst_certificate: string
    declaration_form: string
    bank_informations: {
        bankName: string
        bankBranchName: string
        accountHolderName: string
        accountNumber: string
        ifscNumber: string
        accountType: string
        cancelledCheque: string
    }[]
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

// Form Steps
const steps = [
    {
        label: 'Company Details',
        component: StepAddCompanyDetailsWrapper,
        validationSchema: object({
            company_name: string().required('Company name is required'),
            company_type: string().required('Please select company type'),
            ownership_type: string().required('Please select ownership type'),
            website_address: string().url('Invalid URL'),
            vendor_code: string().required('Vendor code is required'),
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
                    .min(10, 'Phone must be at least 10 digits')
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Required!'),
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
                    .min(10, 'Phone must be at least 10 digits')
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Required!'),
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
                    name: string(),
                    department: string(),
                    designation: string(),
                    email: string().email('Invalid  Email'),
                    mobileNumber: string()
                        .trim()
                        .max(10, 'Mobile number must be 10 digits')
                        .min(10, 'Phone must be at least 10 digits')
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
            gst_no: string().required('GST number is required'),
            gst_certificate: string()
                // .url('GST Certificate must be valid URL')
                .required('GST certificate is required'),
            declaration_form: string(),
            // .url('Form must be valid URL'),
        }),
    },
    {
        label: 'Bank Details',
        component: StepAddBankDetailsWrapper,
        validationSchema: object({
            bank_informations: array().of(
                object().shape({
                    bankName: string().required('Bank name is required'),
                    bankBranchName: string().required(
                        'bankBranchName name is required'
                    ),
                    accountHolderName: string().required(
                        'Account holder name is required'
                    ),
                    accountNumber: string().required(
                        'Account number is required'
                    ),
                    ifscNumber: string().required('IFSC code is required'),
                    accountType: string().required(
                        'Please select account type'
                    ),
                    cancelledCheque: string(),
                    // .url('Cancle Cheque must be valid URL'),
                })
            ),
        }),
    },
]

const AddVendorWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [addVendor] = useAddVendorMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = React.useState(false)
    // States
    const [activeStep, setActiveStep] = React.useState(0)

    // From Initial Values
    const initialValues: FormInitialValues = {
        company_name: '',
        company_type: '',
        ownership_type: '',
        website_address: '',
        vendor_code: '',
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
        ],
        gst_no: '',
        gst_certificate: '',
        declaration_form: '',
        bank_informations: [
            {
                bankName: '',
                bankBranchName: '',
                accountHolderName: '',
                accountNumber: '',
                ifscNumber: '',
                accountType: '',
                cancelledCheque: '',
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
        if (activeStep === steps.length - 1) {
            setApiStatus(true)
            dispatch(setFieldCustomized(false))
            let contactInformation = deleteKeyFromArrayObjects(
                values.contact_informations,
                'maskedPhoneNo'
            )

            setTimeout(() => {
                addVendor({
                    companyName: values.company_name,
                    vendorCode: values.vendor_code,
                    companyType: values.company_type,
                    ownerShipType: values.ownership_type,
                    websiteAddress: values.website_address,
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
                    contactInformation: contactInformation,
                    document: {
                        gstNumber: values.gst_no,
                        gstCertificate: values.gst_certificate,
                        declarationForm: values.declaration_form,
                    },
                    bankInformation: values.bank_informations,
                    companyId: userData?.companyId || '',
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Vendor added successfully!')
                            navigate('/vendors')
                        } else {
                            showToast('error', res?.data?.message)
                        }
                    } else {
                        showToast('error', 'Not able to add vendor')
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
                        <AddVendor
                            formikProps={formikProps}
                            steps={steps}
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                            apiStatus={apiStatus}
                        />
                    </Form>
                )}
            </Formik>
        </SideNavLayout>
    )
}

export default AddVendorWrapper
