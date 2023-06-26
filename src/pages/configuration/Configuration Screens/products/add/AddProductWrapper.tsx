/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { array, number, object, string } from 'yup'
import StepAddProductDetailsWrapper from './FormSteps/StepAddProductDetails/StepAddProductDetailsWrapper'
import AddProduct from './AddProduct'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import StepAddItemsWrapper from './FormSteps/StepAddItems/StepAddItemsWrapper'
import StepAddFAQsWrapper from './FormSteps/StepAddFAQs/StepAddFAQsWrapper'
import StepAddVideoWrapper from './FormSteps/StepAddVideo/StepAddVideoWrapper'
import { EditorState, convertToRaw } from 'draft-js'
import StepAddCallScriptWrapper from './FormSteps/StepAddCallScript/StepAddCallScriptWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/itemSlice'
import { setAllItems as setAllLanguage } from 'src/redux/slices/languageSlice'

import { useGetAllItemsQuery } from 'src/services/ItemService'
import { useAddProductMutation } from 'src/services/ProductService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import draftToHtml from 'draftjs-to-html'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'

// TYPE-  Form Intial Values
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
        component: StepAddProductDetailsWrapper,
        validationSchema: object({
            product_code: string().required('Required'),
            product_name: string().required('Required'),
            product_category: string().required('Required'),
            product_sub_category: string().required('Required'),
            product_weight: number().min(0, 'Required').required('Required'),
            productGroup: string().required('Required'),
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
        component: StepAddItemsWrapper,
        validationSchema: object({
            items: array().of(
                object().shape({
                    itemId: string().required('Required'),
                    itemQuantity: number()
                        .typeError('Required')
                        .min(1, 'Quantity should be greater than or equal to 1')
                        .required('Required'),
                })
            ),
        }),
    },

    {
        label: "FAQ's",
        component: StepAddFAQsWrapper,
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
        component: StepAddVideoWrapper,
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
        component: StepAddCallScriptWrapper,
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
        label: 'Add ',
    },
]

// Page Heading
const pageHeading = 'Add'

const AddProductWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [addProduct] = useAddProductMutation()
    // const [taxStatus, setTaxStatus] = useState(false);
    const [apiStatus, setApiStatus] = useState(false)

    // const { allTaxes: taxData }: any = useSelector(
    //   (state: RootState) => state?.tax
    // );
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { allItems }: any = useSelector((state: RootState) => state?.item)
    const { allItems: allLanguages }: any = useSelector(
        (state: RootState) => state?.language
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
    // const allTaxes = taxData?.map((ele: any) => {
    //   return { tax_name: ele?.taxName, id: ele?._id };
    // });
    // [{ tax_name: "ele?.taxName", id: "ele?._id" }];

    useEffect(() => {
        if (!itemIsLoading && !itemIsFetching) {
            dispatch(setAllItems(itemData?.data || []))
        }
    }, [itemData, itemIsLoading, itemIsFetching])

    useEffect(() => {
        if (!lIsLoading && !lIsFetching) {
            dispatch(setAllLanguage(languageData?.data || []))
        }
    }, [languageData, lIsLoading, lIsFetching])

    // From Initial Values
    const initialValues: FormInitialValues = {
        product_code: '',
        product_name: '',
        product_category: '',
        product_sub_category: '',
        productGroup: '',
        product_weight: '',
        dimensions: {
            height: '',
            width: '',
            depth: '',
        },
        description: '',
        items: [
            {
                itemId: '',
                itemQuantity: 0,
            },
        ],
        FAQs: [
            {
                question: '',
                answer: '',
            },
        ],
        videos: [
            {
                videoName: '',
                videoLink: '',
            },
        ],
        call_scripts: [
            {
                script: EditorState.createEmpty(),
                language: '',
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
        if (activeStep === steps?.length - 1) {
            setApiStatus(true)
            dispatch(setFieldCustomized(false))

            const callScriptData = values.call_scripts.map((ele) => {
                return {
                    language: ele?.language,
                    script: draftToHtml(
                        convertToRaw(ele.script.getCurrentContent())
                    ),
                }
            })
            setTimeout(() => {
                addProduct({
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

                    faq: values.FAQs,
                    video: values.videos,
                    callScript: callScriptData,
                    companyId: userData?.companyId || '',
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Added successfully!')
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
                // enableReinitialize
                initialValues={initialValues}
                validationSchema={getValidationSchema(activeStep)}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => (
                    <Form className="">
                        <AddProduct
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

export default AddProductWrapper
