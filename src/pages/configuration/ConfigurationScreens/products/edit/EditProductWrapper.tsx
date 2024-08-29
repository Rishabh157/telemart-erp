// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import {
    ContentState,
    EditorState,
    convertFromHTML,
    convertToRaw,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Form, Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import EditProduct from './EditProduct'
import StepEditProductDetailsWrapper from './FormSteps/StepEditProductDetails/StepEditProductDetailsWrapper'

import { useGetAllItemsQuery } from 'src/services/ItemService'
import {
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from 'src/services/ProductService'
import { showToast } from 'src/utils'
import StepEditCallScriptWrapper from './FormSteps/StepEditCallScript/StepEditCallScriptWrapper'
import StepEditFAQsWrapper from './FormSteps/StepEditFAQs/StepEditFAQsWrapper'
import StepEditItemsWrapper from './FormSteps/StepEditItems/StepEditItemsWrapper'
import StepEditVideoWrapper from './FormSteps/StepEditVideo/StepEditVideoWrapper'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'

// |-- Types --|
export type FormInitialValues = {
    product_code: string
    product_name: string
    product_category: string
    product_sub_category: string
    productGroup: string
    product_weight: string
    dimensions: {
        height: string
        width: string
        depth: string
    }
    description: string
    items: {
        itemId: string
        itemQuantity: number
    }[]
    FAQs: {
        question: string
        answer: string
    }[]
    videos: {
        videoName: string
        videoLink: string
    }[]
    call_scripts: {
        script: any
        language: string
    }[]
}

// Form Steps
const steps = [
    {
        label: 'Product Details',
        component: StepEditProductDetailsWrapper,
        validationSchema: object({
            product_code: string().required('Product code is required'),
            product_name: string().required('Product name is required'),
            product_category: string().required('Product category is required'),
            product_sub_category: string().required(
                'Product sub category is required'
            ),
            productGroup: string().required('Product group is required'),
            product_weight: number()
                .min(0, 'Weight must be positive')
                .required('Product weight is required'),
            dimensions: object().shape({
                height: number().required('Height is required'),
                width: number().required('Width is required'),
                depth: number().required('Depth is required'),
            }),
            description: string(),
        }),
    },
    {
        label: 'Items',
        component: StepEditItemsWrapper,
        validationSchema: object({
            items: array().of(
                object().shape({
                    itemId: string().required('Required'),
                    itemQuantity: number()
                        .typeError('Quantity should be number')
                        .min(1, 'Quantity should be greater than or equal to 1')
                        .required('Required'),
                })
            ),
        }),
    },
    {
        label: "FAQ's",
        component: StepEditFAQsWrapper,
        validationSchema: object({
            FAQs: array().of(
                object().shape({
                    question: string(),
                    answer: string(),
                })
            ),
        }),
    },
    {
        label: 'Video',
        component: StepEditVideoWrapper,
        validationSchema: object({
            videos: array().of(
                object().shape({
                    videoName: string(),
                    videoLink: string().url('Must be a valid link'),
                })
            ),
        }),
    },
    {
        label: 'Call Script',
        component: StepEditCallScriptWrapper,
        validationSchema: object({
            call_scripts: array().of(
                object().shape({
                    script: object().test(
                        'has text',
                        'Please write script',
                        (value: any) => value.getCurrentContent().hasText()
                    ),
                    language: string().required('Required'),
                })
            ),
        }),
    },
]

// Breadcrumbs
const breadcrumbs = [
    {
        label: 'Product',
        path: '/configurations/products',
    },
    {
        label: 'Edit',
    },
]

// Page Heading
const pageHeading = 'Update'

const EditProductWrapper = () => {
    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const [editProduct] = useUpdateProductMutation()
    const [apiStatus, setApiStatus] = useState(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items: allLanguages } = useGetDataByIdCustomQuery({
        useEndPointHook: useGetAllLanguageQuery(''),
    })
    const { items: allItems } = useGetDataByIdCustomQuery({
        useEndPointHook: useGetAllItemsQuery(''),
    })
    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetProductByIdQuery(Id),
    })
    
    // States
    const [activeStep, setActiveStep] = React.useState(0)

    // From Initial Values
    const initialValues: FormInitialValues = {
        product_code: selectedItem?.productCode || '',
        product_name: selectedItem?.productName || '',
        product_category: selectedItem?.productCategoryId || '',
        product_sub_category: selectedItem?.productSubCategoryId || '',
        productGroup: selectedItem?.productGroupId || '',
        product_weight: selectedItem?.productWeight || 0,
        dimensions: {
            height: selectedItem?.dimension?.height || 0,
            width: selectedItem?.dimension?.width || 0,
            depth: selectedItem?.dimension?.depth || 0,
        },
        description: selectedItem?.description,
        items: selectedItem?.item?.map((ele: any) => {
            return {
                itemId: ele?.itemId,
                itemQuantity: ele?.itemQuantity,
            }
        }),

        FAQs: selectedItem?.faq || [
            {
                question: '',
                answer: '',
            },
        ],
        videos: selectedItem?.video || [
            {
                videoName: '',
                videoLink: '',
            },
        ],
        call_scripts: selectedItem?.callScript?.map((ele: any) => {
            return {
                script: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(ele?.script || '').contentBlocks,
                        convertFromHTML(ele?.script || '').entityMap
                    )
                ),
                language: ele?.languageId,
            }
        }),
    }

    // Form validation schema based on the active step
    const getValidationSchema = (activeStep: number) => {
        return steps.find((_, stepIndex) => stepIndex === activeStep)
            ?.validationSchema
    }

    // On Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        if (activeStep === steps?.length - 1) {
            dispatch(setFieldCustomized(false))

            setApiStatus(true)
            const faqData = values.FAQs.map((ele: any) => {
                const { _id, ...rest } = ele // use object destructuring to remove the _id property
                return rest // return the new object without the _id property
            })
            const videoData = values.videos.map((ele: any) => {
                const { _id, ...rest } = ele // use object destructuring to remove the _id property
                return rest // return the new object without the _id property
            })

            const callScriptData = values.call_scripts.map((ele) => {
                return {
                    language: ele?.language,
                    script: draftToHtml(
                        convertToRaw(ele.script.getCurrentContent())
                    ),
                }
            })
            setTimeout(() => {
                editProduct({
                    body: {
                        productCode: values.product_code,
                        productName: values.product_name,
                        productCategoryId: values.product_category,
                        productSubCategoryId: values.product_sub_category,
                        productGroupId: values.productGroup,
                        productWeight: Number(values.product_weight),
                        dimension: {
                            height: Number(values.dimensions.height),
                            width: Number(values.dimensions.width),
                            depth: Number(values.dimensions.depth),
                        },
                        description: values.description,
                        item: values.items,
                        faq: faqData,
                        video: videoData,
                        callScript: callScriptData,
                        companyId: userData?.companyId || '',
                    },
                    id: Id || '',
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Updated successfully!')
                            navigate('/configurations/products')
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
            enableReinitialize={activeStep === 0}
            initialValues={initialValues}
            validationSchema={getValidationSchema(activeStep)}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form >
                    <EditProduct
                        formikProps={formikProps}
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        breadcrumbs={breadcrumbs}
                        pageHeading={pageHeading}
                        allItems={allItems}
                        allLanguages={allLanguages}
                        apiStatus={apiStatus}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default EditProductWrapper
