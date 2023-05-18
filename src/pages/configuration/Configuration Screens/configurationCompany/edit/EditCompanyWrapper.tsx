import React, { useEffect, useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { array, object, string } from 'yup'
import EditCompany from './EditCompany'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import StepEditCompanyDetailsWrapper from './FormSteps/StepEditCompanyDetails/StepEditCompanyDetailsWrapper'
import StepEditBankDetailsWrapper from './FormSteps/StepEditBankDetails/StepEditBankDetailsWrapper'
// import { useEditCompanyMutation } from "src/services/CompanyServices";
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetCompanyByIdQuery,
    useUpdateCompanyMutation,
} from 'src/services/CompanyServices'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCompany } from 'src/redux/slices/companySlice'
import { RootState } from 'src/redux/store'
import { showToast, validationofGst } from 'src/utils'
import { regIndiaPhone } from 'src/pages/vendors/add/AddVendorWrapper'

// TYPE-  Form Intial Values
export type FormInitialValues = {
    companyName: string
    websiteUrl: string
    gstNo: string
    address: string
    phoneNo: string
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
                .matches(validationofGst, 'invalidGstNumber')
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
                    bankName: string().required('Bank name is required'),
                    branchName: string().required('Branch name is required'),
                    accountHolderName: string().required(
                        'Account holder name is required'
                    ),
                    accountNumber: string().required(
                        'Account number is required'
                    ),
                    ifscNumber: string().required('IFSC number is required'),
                    accountType: string().required(
                        'Please select account type'
                    ),
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
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { selectedCompany }: any = useSelector(
        (state: RootState) => state.company
    )
    const { data, isLoading } = useGetCompanyByIdQuery(params.id)
    const [update] = useUpdateCompanyMutation()
    // Breadcrumbs
    const breadcrumbs = [
        {
            label: 'Company',
            onClick: () => {
                console.log('company')
            },
            path: '/configurations/company',
        },
        {
            label: 'Update Company',
            onClick: () => {
                console.log('edit-company')
            },
        },
    ]

    // States
    // const [company, companyInfo] = useEditCompanyMutation();
    const [activeStep, setActiveStep] = React.useState(0)
    // From Initial Values
    const initialValues: FormInitialValues = {
        companyName: selectedCompany?.companyName || '',
        websiteUrl: selectedCompany?.websiteUrl || '',
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
            setTimeout(() => {
                const bankDetail = values.bankDetails.map((ele) => {
                    const { _id, ...rest } = ele // use object destructuring to remove the _id property
                    return rest // return the new object without the _id property
                })
                update({
                    id: Id || '',
                    body: {
                        companyName: values.companyName,
                        websiteUrl: values.websiteUrl,
                        gstNo: values.gstNo,
                        address: values.address,
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
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    useEffect(() => {
        dispatch(setSelectedCompany(data?.data))
    }, [dispatch, data, isLoading])

    return (
        <ConfigurationLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={getValidationSchema(activeStep)}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => (
                    <Form className="">
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
        </ConfigurationLayout>
    )
}

export default EditCompanyWrapper
