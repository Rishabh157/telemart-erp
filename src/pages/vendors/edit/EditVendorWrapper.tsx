
// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import EditVendor from './EditVendor'
import StepEditAddressWrapper from './FormSteps/StepEditAddress/StepEditAddressWrapper'
import StepEditBankDetailsWrapper from './FormSteps/StepEditBankDetails/StepEditBankDetailsWrapper'
import StepEditCompanyDetailsWrapper from './FormSteps/StepEditComapnyDetails/StepEditCompanyDetailsWrapper'
import StepEditContactWrapper from './FormSteps/StepEditContact/StepEditContactWrapper'
import StepEditDocumentsWrapper from './FormSteps/StepEditDocuments/StepEditDocumentsWrapper'
import {
    useGetVendorByIdQuery,
    useUpdateVendorMutation,
} from 'src/services/VendorServices'
import { showToast, validationofGst } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
export type FormInitialValues = {
    company_name: string
    company_type: string
    ownership_type: string
    website_address: string
    // vendor_code: string
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
        component: StepEditCompanyDetailsWrapper,
        validationSchema: object({
            company_name: string().required('Company name is required'),
            company_type: string().required('Please select company type'),
            ownership_type: string().required('Please select ownership type'),
            website_address: string().url('Web Address must be valid URL'),
            // vendor_code: string().required('Vendor code is required'),
        }),
    },
    {
        label: 'Regd./Billing address',
        component: StepEditAddressWrapper,
        validationSchema: object({
            regd_address: object().shape({
                phone: string()
                    .trim()
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Required!'),
                address: string().required('Address is required'),
                country: string().required('Please select a country'),
                state: string().required('Please select a state'),
                district: string().required('Please select a district'),
                pincode: string().required('Please select a pincode'),
            }),
            billing_address: object().shape({
                phone: string()
                    .trim()
                    .matches(regIndiaPhone, 'Invalid Mobile Number')
                    .required('Required!'),
                address: string().required('Address is required'),
                country: string().required('Please select a country'),
                state: string().required('Please select a state'),
                district: string().required('Please select a district'),
                pincode: string().required('Please select a pincode'),
            }),
        }),
    },
    {
        label: 'Contact',
        component: StepEditContactWrapper,
        validationSchema: object({
            contact_informations: array().of(
                object().shape({
                    name: string(),
                    department: string(),
                    designation: string(),
                    email: string().email('Invalid  Email'),
                    mobileNumber: string()
                        .trim()
                        .matches(regIndiaPhone, 'Invalid Mobile Number'),
                    landLine: string(),
                })
            ),
        }),
    },
    {
        label: 'Document',
        component: StepEditDocumentsWrapper,
        validationSchema: object({
            gst_no: string().matches(
                validationofGst,
                'gst number must be valid'
            ),
            gst_certificate: string(),
            declaration_form: string(),
        }),
    },
    {
        label: 'Bank Details',
        component: StepEditBankDetailsWrapper,
        validationSchema: object({
            bank_informations: array().of(
                object().shape({
                    bankName: string(),
                    bankBranchName: string(),
                    accountHolderName: string(),
                    accountNumber: string(),
                    ifscNumber: string(),
                    accountType: string(),
                    cancelledCheque: string(),
                    // .url('Cancle Check must be valid URL'),
                })
            ),
        }),
    },
]

const EditVendorWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState(false)
    const [editVendor] = useUpdateVendorMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetVendorByIdQuery(Id),
    })

    // States
    const [activeStep, setActiveStep] = React.useState(0)

    const initialValues: FormInitialValues = {
        company_name: items?.companyName || '',
        company_type: items?.companyType || '',
        ownership_type: items?.ownerShipType || '',
        website_address: items?.websiteAddress || '',
        // vendor_code: items?.vendorCode || '',
        regd_address: {
            phone: items?.registrationAddress?.phone || '',
            address: items?.registrationAddress?.address || '',
            country: items?.registrationAddress?.countryId || '',
            state: items?.registrationAddress?.stateId || '',
            district: items?.registrationAddress?.districtId || '',
            pincode: items?.registrationAddress?.pincodeId || '',
        },
        billing_address: {
            phone: items?.billingAddress?.phone || '',
            address: items?.billingAddress?.address || '',
            country: items?.billingAddress?.countryId || '',
            state: items?.billingAddress?.stateId || '',
            district: items?.billingAddress?.districtId || '',
            pincode: items?.billingAddress?.pincodeId || '',
        },
        contact_informations: items?.contactInformation || '',
        gst_no: items?.document?.gstNumber || '',
        gst_certificate: items?.document?.gstCertificate || '',
        declaration_form: items?.document?.declarationForm || '',
        bank_informations: items?.bankInformation || '',
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
            const contactInformation = values.contact_informations.map(
                (ele: any) => {
                    const { _id, maskedPhoneNo, ...rest } = ele // use object destructuring to remove the _id property
                    return rest // return the new object without the _id property
                }
            )
            const bankInformation = values.bank_informations.map((ele: any) => {
                const { _id, ...rest } = ele // use object destructuring to remove the _id property
                return rest // return the new object without the _id property
            })

            editVendor({
                body: {
                    companyName: values.company_name,
                    // vendorCode: values.vendor_code,
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
                    bankInformation: bankInformation,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/vendors')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
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
                    <Form>
                        <EditVendor
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

export default EditVendorWrapper
