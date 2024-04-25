/// ==============================================
// Filename:EditSchemeWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, boolean, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import StepEditFAQ from './FormSteps/StepEditFAQ/StepEditFAQ'
import StepEditSchemeDetailsWrapper from './FormSteps/StepEditSchemeDetail/StepEditSchemeDetailsWrapper'

import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useGetSubCategoryByParentQuery } from 'src/services/ProductSubCategoryService'
import {
    useGetSchemeByIdQuery,
    useUpdateSchemeMutation,
} from 'src/services/SchemeService'
import { showToast } from 'src/utils'
import EditScheme from './EditScheme'
import StepEditProductDetailWrapper from './FormSteps/StepEditProductInformationDetails/StepEditProductDetailWrapper'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
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
    deliveryCharges: string
    comboPacking: boolean
    startDate: string | null
    endDate: string | null
    schemeDescription: string
    productInformation: {
        productGroup: string
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
        component: StepEditSchemeDetailsWrapper,
        validationSchema: object({
            // schemeCode: string().required('Scheme code is required'),
            category: string().required('Category is required'),
            subCategory: string().required('Sub category is required'),
            schemeName: string().required('Scheme Name is required'),
            schemePrice: number()
                .typeError('Please enter number')
                .integer('Price must be positive')
                .positive('Please enter positive digit')
                .required('scheme description is required'),
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
        component: StepEditProductDetailWrapper,
        validationSchema: object({
            productInformation: array().of(
                object().shape({
                    productGroup: string().required('Please select a product'),
                    productQuantity: number()
                        .typeError('Quantity must be a number')
                        .min(1, 'Please enter quantity')
                        .required('Quantity is required'),
                    mrp: number()
                        .min(0, 'MRP must be postive')
                        .required('MRP is required'),
                    pop: number()
                        .min(0, 'Offer price must be positive')
                        .required('Offer price is required'),
                })
            ),
        }),
    },

    {
        label: "FAQ's",
        component: StepEditFAQ,
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
const pageHeading = 'Edit Scheme'

const EditSchemeWrapper = () => {
    // Breadcrumbs
    const breadcrumbs = [
        {
            label: 'Scheme',
            onClick: () => {},
            path: '/configurations/scheme',
        },
        {
            label: 'Update Scheme',
            onClick: () => {},
        },
    ]

    // States
    const params = useParams()
    const Id = params.id

    const [activeStep, setActiveStep] = React.useState(0)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState(false)

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [selectedCategory, setSelectedCategory] = useState('')

    const [UpdateScheme] = useUpdateSchemeMutation()

    const { items: selectedItem } =
        useGetDataByIdCustomQuery<any>({
            useEndPointHook: useGetSchemeByIdQuery(Id),
        })

    useEffect(() => {
        if (selectedItem !== null) {
            setSelectedCategory(selectedItem?.category)
        }
    }, [selectedItem])

    // From Initial Values
    const initialValues: FormInitialValues = {
        // schemeCode: selectedItem?.schemeCode || '',
        category: selectedItem?.category || '',
        subCategory: selectedItem?.subCategory || '',
        schemeName: selectedItem?.schemeName || '',
        schemePrice: selectedItem?.schemePrice || '',
        dimension: {
            height: selectedItem?.dimension.height || '',
            width: selectedItem?.dimension.width || '',
            depth: selectedItem?.dimension.depth || '',
        },
        weight: selectedItem?.weight || '',
        deliveryCharges: selectedItem?.deliveryCharges || '',
        comboPacking: selectedItem?.comboPacking || false,
        startDate: selectedItem?.startDate || null,
        endDate: selectedItem?.endDate || null,
        schemeDescription: selectedItem?.schemeDescription || '',
        productInformation: selectedItem?.productInformation?.map(
            (ele: any) => {
                return {
                    productGroup: ele.productGroup,
                    productQuantity: ele.productQuantity,
                    mrp: ele.mrp,
                    pop: ele.pop,
                }
            }
        ),
        faq: selectedItem?.faq || [
            {
                question: '',
                answer: '',
            },
        ],
        commission: selectedItem?.commission || 0,
    }

    // Form validation schema based on the active step
    const getValidationSchema = (activeStep: number) => {
        return steps.find((_, stepIndex) => stepIndex === activeStep)
            ?.validationSchema
    }

    const { options: productCategoryoption } = useCustomOptions({
        useEndPointHook: useGetAllProductCategoryQuery(''),
        keyName: 'categoryName',
        value: '_id',
    })

    const { options: productSubCategoryOption } = useCustomOptions({
        useEndPointHook: useGetSubCategoryByParentQuery(selectedCategory, {
            skip: !selectedCategory,
        }),
        keyName: 'subCategoryName',
        value: '_id',
    })

    const { options: productGroupOptions } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        if (activeStep === steps?.length - 1) {
            const productInformationData = values.productInformation?.map(
                (ele: any) => {
                    const { _id, ...rest } = ele
                    return rest
                }
            )

            const faqData = values.faq?.map((ele: any) => {
                const { _id, ...rest } = ele
                return rest
            })

            setApiStatus(true)
            dispatch(setFieldCustomized(false))
            setTimeout(() => {
                UpdateScheme({
                    body: {
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
                        startDate: moment(values.startDate).format('YYYY/MM/D'),
                        endDate: moment(values.endDate).format('YYYY/MM/D'),
                        faq: faqData,
                        schemeDescription: values.schemeDescription,
                        productInformation: productInformationData,
                        commission: values.commission,
                        companyId: userData?.companyId || '',
                    },
                    id: Id || '',
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Scheme Updated successfully!')
                            navigate('/configurations/Scheme')
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
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    return (
        <Formik
            enableReinitialize={activeStep === 0}
            initialValues={initialValues}
            validationSchema={getValidationSchema(activeStep)}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form className="">
                    <EditScheme
                        formikProps={formikProps}
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        breadcrumbs={breadcrumbs}
                        pageHeading={pageHeading}
                        productCategoryoption={productCategoryoption}
                        productSubCategoryOption={productSubCategoryOption}
                        productGroupOptions={productGroupOptions}
                        apiStatus={apiStatus}
                        setSelectedCategory={setSelectedCategory}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default EditSchemeWrapper
