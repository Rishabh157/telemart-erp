// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { array, object, string, number } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import AddCompany from './AddCompany'

import StepAddCompanyDetailsWrapper from './FormSteps/StepAddCompanyDetails/StepAddCompanyDetailsWrapper'
import StepAddBankDetailsWrapper from './FormSteps/StepAddBankDetails/StepAddBankDetailsWrapper'
import { useAddCompanyMutation } from 'src/services/CompanyServices'
import { showToast, validationofGst } from 'src/utils'
import { regIndiaPhone } from 'src/pages/vendors/add/AddVendorWrapper'

// |-- Redux --|
import { AppDispatch } from 'src/redux/store'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'

// |-- Types --|
// TYPE-  Form Intial Values
export type FormInitialValues = {
    companyName: string
    websiteUrl: string
    gstNo: string
    address: string
    phoneNo: string
    panNumber: string
    companyLogo:string
    bankDetails: {
        bankName: string
        branchName: string
        accountHolderName: string
        accountNumber: string
        ifscNumber: string
        accountType: string
    }[]
}

// Form Steps
const steps = [
    {
        label: 'Company Details',
        component: StepAddCompanyDetailsWrapper,
        validationSchema: object({
            companyName: string().required('Company name is required'),
            websiteUrl: string().url().required('Website url is required'),
            panNumber: string(),
            gstNo: string()
                .matches(validationofGst, 'gst number must be valid')
                .required('GST number is required'),
            address: string().required('Address is required'),
            phoneNo: string()
                .matches(regIndiaPhone, 'Invalid Mobile Number')
                .required('Phone number is required'),
        }),
    },
    {
        label: 'Bank Details',
        component: StepAddBankDetailsWrapper,
        validationSchema: object({
            bankDetails: array().of(
                object().shape({
                    bankName: string(),
                    branchName: string(),
                    accountHolderName: string(),
                    accountNumber: number(),
                    ifscNumber: string(),
                    accountType: string(),
                })
            ),
        }),
    },
]

// Page Heading
const pageHeading = 'Add '

const AddCompanyWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    // Breadcrumbs
    const breadcrumbs = [
        {
            label: 'Company',
            onClick: () => { },
            path: '/configurations/company',
        },
        {
            label: 'Add Company',
            onClick: () => { },
        },
    ]

    // States
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [company] = useAddCompanyMutation()
    const [activeStep, setActiveStep] = React.useState(0)

    // From Initial Values
    const initialValues: FormInitialValues = {
        companyName: '',
        websiteUrl: '',
        panNumber: '',
        gstNo: '',
        address: '',
        phoneNo: '',
        companyLogo:'',
        bankDetails: [
            {
                bankName: '',
                branchName: '',
                accountHolderName: '',
                accountNumber: '',
                ifscNumber: '',
                accountType: '',
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
            setTimeout(() => {
                company({
                    companyName: values.companyName,
                    panNumber: values.panNumber,
                    websiteUrl: values.websiteUrl,
                    gstNo: values.gstNo,
                    address: values.address,
                    phoneNo: values.phoneNo,
                    companyLogo:values.companyLogo,
                    bankDetails: values.bankDetails,
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Added successfully!')
                            navigate('/configurations/company')
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
                    <AddCompany
                        formikProps={formikProps}
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        breadcrumbs={breadcrumbs}
                        pageHeading={pageHeading}
                        apiStatus={apiStatus}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default AddCompanyWrapper
