// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { array, boolean, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import AddScheme from './AddScheme'
import StepAddFAQ from './FormSteps/StepAddFAQ/StepAddFAQ'
import StepAddProductsWrapper from './FormSteps/StepAddProducts/StepAddProductsWrapper'
import StepAddSchemeDetailsWrapper from './FormSteps/StepAddSchemeDetails/StepAddSchemeDetailsWrapper'

import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useAddSchemeMutation } from 'src/services/SchemeService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
export type FormInitialValues = {
    // schemeCode: string
    category: string
    subCategory: string
    schemeName: string
    schemePrice: string
    dimension: {
        height: string
        width: string
        depth: string
    }
    weight: string
    deliveryCharges: number
    comboPacking: boolean
    startDate: string | null
    endDate: string | null
    schemeDescription: string
    productInformation: {
        productGroup: string
        productGroupName: string
        productQuantity: number
        mrp: number
        pop: number
    }[]
    faq: {
        question: string
        answer: string
    }[]
    commission: number
}

// Form Steps
const steps = [
    {
        label: 'Scheme Details',
        component: StepAddSchemeDetailsWrapper,
        validationSchema: object({
            // schemeCode: string().required('Scheme code is required'),
            category: string().required('Category is required'),
            subCategory: string().required('Sub category is required'),
            schemeName: string().required('Scheme Name is required'),
            schemePrice: string().required('Scheme price is required!'),
            dimension: object().shape({
                height: string().required('Height is required'),
                width: string().required('Width is required'),
                depth: string().required('Depth is required'),
            }),
            weight: string()
                .min(0, 'Weight must be positive')
                .required('Product weight is required'),
            deliveryCharges: string()
                .min(0, 'Delivery charges must be positive')
                .required('delivery charges is required'),
            comboPacking: boolean().required(),
            startDate: string().required('Please select start date'),
            endDate: string().required('Please select end date'),
            schemeDescription: string().required(
                'scheme description is required'
            ),
            commission: number()
                .required('Commission is required')
                .min(1, 'Commission is required'),
        }),
    },

    {
        label: 'Products',
        component: StepAddProductsWrapper,
        validationSchema: object({
            productInformation: array().of(
                object().shape({
                    productGroup: string().required('Please select a product'),
                    productQuantity: number()
                        .min(1, 'Please enter quantity')
                        .required('Quantity is required'),
                    mrp: number()
                        .min(1, 'MRP must be positive')
                        .required('MRP is required'),
                    pop: number()
                        .min(1, 'Offer price must be positive')
                        .required('Offer price is required'),
                })
            ),
        }),
    },

    {
        label: "FAQ's",
        component: StepAddFAQ,
        validationSchema: object({
            faq: array().of(
                object().shape({
                    question: string(),
                    answer: string(),
                })
            ),
        }),
    },
]

// Page Heading
const pageHeading = 'Add New Scheme'

const AddSchemeWrapper = () => {
    // Breadcrumbs
    const breadcrumbs = [
        {
            label: 'Outer Scheme',
            onClick: () => {},
            path: '/configurations/scheme',
        },
        {
            label: 'Add Scheme',
            onClick: () => {},
        },
    ]

    // States
    const [activeStep, setActiveStep] = React.useState(0)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [AddSchemes] = useAddSchemeMutation()
    const [apiStatus, setApiStatus] = useState(false)

    const { userData } = useSelector((state: RootState) => state?.auth)

    // From Initial Values
    const initialValues: FormInitialValues = {
        // schemeCode: '',
        category: '',
        subCategory: '',
        schemeName: '',
        schemePrice: '',
        dimension: {
            height: '',
            width: '',
            depth: '',
        },
        weight: '',
        deliveryCharges: 0,
        comboPacking: false,
        startDate: null,
        endDate: null,
        schemeDescription: '',
        productInformation: [
            {
                productGroup: '',
                productGroupName: '',
                productQuantity: 0,
                mrp: 0,
                pop: 0,
            },
        ],
        faq: [
            {
                question: '',
                answer: '',
            },
        ],
        commission: 0,
    }

    // Form validation schema based on the active step
    const getValidationSchema = (activeStep: number) => {
        return steps.find((_, stepIndex) => stepIndex === activeStep)
            ?.validationSchema
    }

    // On Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        if (activeStep === steps?.length - 1) {
            setApiStatus(true)
            dispatch(setFieldCustomized(false))
            setTimeout(() => {
                AddSchemes({
                    // schemeCode: values.schemeCode,
                    schemeName: values.schemeName,
                    category: values.category,
                    subCategory: values.subCategory,
                    schemePrice: Number(values.schemePrice),
                    dimension: {
                        height: Number(values.dimension.height),
                        width: Number(values.dimension.width),
                        depth: Number(values.dimension.depth),
                    },
                    weight: Number(values.weight),
                    deliveryCharges: Number(values.deliveryCharges),
                    comboPacking: values.comboPacking,
                    startDate: moment(values.startDate).format('YYYY/MM/DD'),
                    endDate: moment(values.endDate).format('YYYY/MM/DD'),
                    faq: values.faq,
                    schemeDescription: values.schemeDescription,
                    productInformation: values.productInformation,
                    commission: values.commission,
                    companyId: userData?.companyId || '',
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Scheme added successfully!')
                            navigate('/configurations/scheme')
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

    const { options: productGroupOptions } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema(activeStep)}
            onSubmit={onSubmitHandler}
            touch={false}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form >
                    <AddScheme
                        formikProps={formikProps}
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        breadcrumbs={breadcrumbs}
                        pageHeading={pageHeading}
                        productGroupOptions={productGroupOptions}
                        apiStatus={apiStatus}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default AddSchemeWrapper
