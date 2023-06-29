/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditProductWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Form, Formik, FormikProps } from 'formik'
import { array, number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
    ContentState,
    convertFromHTML,
    convertToRaw,
    EditorState,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import StepEditProductDetailsWrapper from './FormSteps/StepEditProductDetails/StepEditProductDetailsWrapper'
import EditProduct from './EditProduct'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import StepEditItemsWrapper from './FormSteps/StepEditItems/StepEditItemsWrapper'
import StepEditFAQsWrapper from './FormSteps/StepEditFAQs/StepEditFAQsWrapper'
import StepEditVideoWrapper from './FormSteps/StepEditVideo/StepEditVideoWrapper'
import StepEditCallScriptWrapper from './FormSteps/StepEditCallScript/StepEditCallScriptWrapper'
import { useGetAllItemsQuery } from 'src/services/ItemService'
// import { useEditProductMutation } from "src/services/ProductService";
import { showToast } from 'src/utils'
import {
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from 'src/services/ProductService'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/itemSlice'
import { setAllItems as setAllLanguage } from 'src/redux/slices/languageSlice'
import { setSelectedItem } from 'src/redux/slices/productSlice'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'

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
            product_code: string().required('Required'),
            product_name: string().required('Required'),
            product_category: string().required('Required'),
            product_sub_category: string().required('Required'),
            productGroup: string().required('Required'),
            product_weight: number()
                .min(0, 'Weight must be positive')
                .required('Required'),
            dimensions: object().shape({
                height: number().required('Required'),
                width: number().required('Required'),
                depth: number().required('Required'),
            }),
            description: string().required('Required'),
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
                    question: string().required('Required'),
                    answer: string().required('Required'),
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
                    videoName: string().required('Required'),
                    videoLink: string()
                        .url('Must be a valid link')
                        .required('Required'),
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
    const {
        data: prData,
        isLoading: prIsLoading,
        isFetching: prIsFetching,
    } = useGetProductByIdQuery(Id)

    const [editProduct] = useUpdateProductMutation()
    const [apiStatus, setApiStatus] = useState(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { allItems }: any = useSelector((state: RootState) => state?.item)
    const { allItems: allLanguages }: any = useSelector(
        (state: RootState) => state?.language
    )
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.products
    )

    const {
        data: languageData,
        isLoading: lIsLoading,
        isFetching: lIsFetching,
    } = useGetAllLanguageQuery('')

    const {
        data: itemData,
        isLoading: itemIsLoading,
        isFetching: itemIsFetching,
    } = useGetAllItemsQuery(userData?.companyId)

    // States
    const [activeStep, setActiveStep] = React.useState(0)

    useEffect(() => {
        if (!itemIsLoading && !itemIsFetching) {
            dispatch(setAllItems(itemData?.data || []))
        }
    }, [itemData, itemIsLoading, itemIsFetching])

    useEffect(() => {
        if (!prIsFetching && !prIsLoading) {
            dispatch(setSelectedItem(prData?.data || []))
        }
    }, [prData, prIsLoading, prIsFetching])

    useEffect(() => {
        if (!lIsLoading && !lIsFetching) {
            dispatch(setAllLanguage(languageData?.data || []))
        }
    }, [languageData, lIsLoading, lIsFetching])

    // From Initial Values
    const initialValues: FormInitialValues = {
        product_code: selectedItem?.productCode || '',
        product_name: selectedItem?.productName || '',
        product_category: selectedItem?.productCategoryId || '',
        product_sub_category: selectedItem?.productSubCategoryId || '',
        productGroup: selectedItem?.productGroupId || '',
        product_weight: selectedItem?.productWeight || '',
        dimensions: {
            height: selectedItem?.dimension?.height || '',
            width: selectedItem?.dimension?.width || '',
            depth: selectedItem?.dimension?.depth || '',
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
        <ConfigurationLayout>
            <Formik
                enableReinitialize={activeStep === 0}
                initialValues={initialValues}
                validationSchema={getValidationSchema(activeStep)}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => (
                    <Form className="">
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
        </ConfigurationLayout>
    )
}

export default EditProductWrapper
