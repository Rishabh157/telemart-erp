import React, { useEffect, useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { array, object, string } from 'yup'
import EditVendor from './EditVendor'
import StepEditAddressWrapper from './FormSteps/StepEditAddress/StepEditAddressWrapper'
import StepEditBankDetailsWrapper from './FormSteps/StepEditBankDetails/StepEditBankDetailsWrapper'
import StepEditCompanyDetailsWrapper from './FormSteps/StepEditComapnyDetails/StepEditCompanyDetailsWrapper'
import StepEditContactWrapper from './FormSteps/StepEditContact/StepEditContactWrapper'
import StepEditDocumentsWrapper from './FormSteps/StepEditDocuments/StepEditDocumentsWrapper'
// import { useEditVendorMutation } from "src/services/VendorServices";
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/vendorSlice'
import {
    useGetVendorByIdQuery,
    useUpdateVendorMutation,
} from 'src/services/VendorServices'
import { setFormSubmitting } from 'src/redux/slices/authSlice'

// TYPE-  Form Intial Values
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
        component: StepEditCompanyDetailsWrapper,
        validationSchema: object({
            company_name: string().required('Company name is required'),
            company_type: string().required('Please select company type'),
            ownership_type: string().required('Please select ownership type'),
            website_address: string()
                .url('Web Address must be valid URL')
                .required('Website address is required'),
            vendor_code: string().required('Vendor code is required'),
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
                country: string().required('Please choose a country'),
                state: string().required('Please choose a state'),
                district: string().required('Please choose a district'),
                pincode: string().required('Please choose a pincode'),
            }),
            billing_address: object().shape({
                phone: string()
                    .trim()
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
        component: StepEditContactWrapper,
        validationSchema: object({
            contact_informations: array().of(
                object().shape({
                    name: string().required('Name is required'),
                    department: string().required('Department is required'),
                    designation: string().required('Designation is required'),
                    email: string()
                        .required('Required!')
                        .email('Invalid  Email'),
                    mobileNumber: string()
                        .trim()
                        .matches(regIndiaPhone, 'Invalid Mobile Number')
                        .required('Required!'),
                    landLine: string().required('LandLine is required'),
                })
            ),
        }),
    },
    {
        label: 'Document',
        component: StepEditDocumentsWrapper,
        validationSchema: object({
            gst_no: string().required('GST number is required'),
            gst_certificate: string()
                .url('GST Certificate must be valid URL')
                .required('GST certificate is required'),
            declaration_form: string()
                .url('Form must be valid URL')
                .required('Declaration form is required'),
        }),
    },
    {
        label: 'Bank Details',
        component: StepEditBankDetailsWrapper,
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
                    cancelledCheque: string()
                        .url('Cancle Check must be valid URL')
                        .required('Cancelled cheque is required'),
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
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.vendor
    )

    const { data, isLoading, isFetching } = useGetVendorByIdQuery(Id)

    // States
    const [activeStep, setActiveStep] = React.useState(0)
    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    // From Initial Values
    const initialValues: FormInitialValues = {
        company_name: selectedItem?.companyName || '',
        company_type: selectedItem?.companyType || '',
        ownership_type: selectedItem?.ownerShipType || '',
        website_address: selectedItem?.websiteAddress || '',
        vendor_code: selectedItem?.vendorCode || '',
        regd_address: {
            phone: selectedItem?.registrationAddress?.phone || '',
            address: selectedItem?.registrationAddress?.address || '',
            country: selectedItem?.registrationAddress?.countryId || '',
            state: selectedItem?.registrationAddress?.stateId || '',
            district: selectedItem?.registrationAddress?.districtId || '',
            pincode: selectedItem?.registrationAddress?.pincodeId || '',
        },
        billing_address: {
            phone: selectedItem?.billingAddress?.phone || '',
            address: selectedItem?.billingAddress?.address || '',
            country: selectedItem?.billingAddress?.countryId || '',
            state: selectedItem?.billingAddress?.stateId || '',
            district: selectedItem?.billingAddress?.districtId || '',
            pincode: selectedItem?.billingAddress?.pincodeId || '',
        },
        contact_informations: selectedItem?.contactInformation || '',
        gst_no: selectedItem?.document?.gstNumber || '',
        gst_certificate: selectedItem?.document?.gstCertificate || '',
        declaration_form: selectedItem?.document?.declarationForm || '',
        bank_informations: selectedItem?.bankInformation || '',
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

            const contactInformation = values.contact_informations.map(
                (ele: any) => {
                    const { _id, ...rest } = ele // use object destructuring to remove the _id property
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
                    <Form className="">
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
