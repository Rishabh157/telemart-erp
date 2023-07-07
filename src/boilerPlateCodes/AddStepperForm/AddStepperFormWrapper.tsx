/// ==============================================
// Filename:AddStepperFormWrapper.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import AddStepperForm from './AddStepperForm'
import AddStep1Wrapper from './FormSteps/AddStep1/AddStep1Wrapper'

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
}

// Form Steps
const steps = [
    {
        label: 'Step 1',
        component: AddStep1Wrapper,
        validationSchema: object({
            company_name: string().required('company name is required'),
            company_type: string().required('Please select company type'),
            ownership_type: string().required('please select ownership type'),
            website_address: string().required('Website address is required'),
            vendor_code: string().required('Vendor code is required'),
        }),
    },
    {
        label: 'Step 2',
        component: AddStep1Wrapper,
        validationSchema: object({
            regd_address: object().shape({
                phone: string().required('Phone number is required'),
                address: string().required('Address is required'),
                country: string().required('Please choose a country'),
                state: string().required('Please choose a state'),
                district: string().required('Please choose a district'),
                pincode: string().required('Please choose a pincode'),
            }),
            billing_address: object().shape({
                phone: string().required('Phone number is required'),
                address: string().required('Address is required'),
                country: string().required('Please choose a country'),
                state: string().required('Please choose a state'),
                district: string().required('Please choose a district'),
                pincode: string().required('Please choose a pincode'),
            }),
        }),
    },
]

// Page Heading
const pageHeading = 'Add New Vendor'

const AddStepperFormWrapper = () => {
    // Breadcrumbs
    const breadcrumbs = [
        {
            label: 'Vendors',
            onClick: () => {
                console.log('Vendors')
            },
            path: '/vendors',
        },
        {
            label: 'Add Vendor',
            onClick: () => {
                console.log('add-Vendors')
            },
        },
    ]

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
    }

    // Form validation schema based on the active step
    const getValidationSchema = (activeStep: number) => {
        return steps.find((_, stepIndex) => stepIndex === activeStep)
            ?.validationSchema
    }

    // On Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        if (activeStep === steps.length - 1) {
            setTimeout(() => {
                //console.log(values);
                setActiveStep(0)
            }, 1000)
        } else {
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
                        <AddStepperForm
                            formikProps={formikProps}
                            steps={steps}
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                            breadcrumbs={breadcrumbs}
                            pageHeading={pageHeading}
                        />
                    </Form>
                )}
            </Formik>
        </SideNavLayout>
    )
}

export default AddStepperFormWrapper
