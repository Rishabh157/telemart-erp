// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import EditCompany from './EditCompany'
import StepEditBankDetailsWrapper from './FormSteps/StepEditBankDetails/StepEditBankDetailsWrapper'
import StepEditCompanyDetailsWrapper from './FormSteps/StepEditCompanyDetails/StepEditCompanyDetailsWrapper'
import { regIndiaPhone } from 'src/pages/vendors/add/AddVendorWrapper'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import {
    useGetCompanyByIdQuery,
    useUpdateCompanyMutation,
} from 'src/services/CompanyServices'
import { showToast, validationofGst } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { AppDispatch } from 'src/redux/store'

// |-- Types --|
// TYPE-  Form Intial Values
export type FormInitialValues = {
    companyName: string
    panNumber: string
    websiteUrl: string
    gstNo: string
    address: string
    phoneNo: string
    companyLogo:string

    bankDetails: {
        bankName: string
        branchName: string
        accountHolderName: string
        accountNumber: string
        ifscNumber: string
        accountType: string
        _id: string
    }[]
}

// Form Steps
const steps = [
    {
        label: 'Company Details',
        component: StepEditCompanyDetailsWrapper,
        validationSchema: object({
            companyName: string().required('Company name is required'),
            websiteUrl: string().url().required('Website url is required'),
            gstNo: string()
                .matches(validationofGst, 'Invalid Gst Number')
                .required('GST number is required'),
            address: string().required('Address is required'),
            phoneNo: string()
                .matches(regIndiaPhone, 'Invalid Mobile Number')
                .required('Phone number is required'),
        }),
    },
    {
        label: 'Bank Details',
        component: StepEditBankDetailsWrapper,
        validationSchema: object({
            bankDetails: array().of(
                object().shape({
                    bankName: string(),
                    // required('Bank name is required'),
                    branchName: string(),
                    // .required('Branch name is required'),
                    accountHolderName: string(),
                    // //.required(
                    //     'Account holder name is required'
                    // ),
                    accountNumber: string(),
                    // .required(
                    //     'Account number is required'
                    // ),
                    ifscNumber: string(),
                    // .required('IFSC number is required'),
                    accountType: string(),
                    // .required(
                    //     'Please select account type'
                    // ),
                })
            ),
        }),
    },
]

// Page Heading
const pageHeading = 'Edit Company'

const EditCompanyWrapper = () => {
    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { items: selectedCompany } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetCompanyByIdQuery(params.id),
    })
    const [update] = useUpdateCompanyMutation()
    // Breadcrumbs
    const breadcrumbs = [
        {
            label: 'Company',
            onClick: () => {},
            path: '/configurations/company',
        },
        {
            label: 'Update Company',
            onClick: () => {},
        },
    ]

    // States
    const [activeStep, setActiveStep] = React.useState(0)
    // From Initial Values
    const initialValues: FormInitialValues = {
        companyName: selectedCompany?.companyName || '',
        panNumber: selectedCompany?.panNumber || '',
        websiteUrl: selectedCompany?.websiteUrl || '',
        companyLogo:selectedCompany?.companyLogo || '',
        gstNo: selectedCompany?.gstNo || '',
        address: selectedCompany?.address || '',
        phoneNo: selectedCompany?.phoneNo || '',
        bankDetails: selectedCompany?.bankDetails || '',
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
                const bankDetail = values.bankDetails.map((ele) => {
                    const { _id, ...rest } = ele // use object destructuring to remove the _id property
                    return rest // return the new object without the _id property
                })
                update({
                    id: Id || '',
                    body: {
                        companyName: values.companyName,
                        panNumber: values.panNumber,
                        websiteUrl: values.websiteUrl,
                        gstNo: values.gstNo,
                        address: values.address,
                        companyLogo: values.companyLogo,
                        phoneNo: values.phoneNo,
                        bankDetails: bankDetail,
                    },
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast(
                                'success',
                                'Company updated successfully!'
                            )
                        } else {
                            showToast('error', res?.data?.message)
                        }
                    } else {
                        showToast('error', 'Something went wrong')
                    }
                    setApiStatus(false)
                })
                navigate('/configurations/company')
            }, 1000)
        } else {
            dispatch(setFormSubmitting(false))
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={getValidationSchema(activeStep)}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form >
                    <EditCompany
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

export default EditCompanyWrapper
