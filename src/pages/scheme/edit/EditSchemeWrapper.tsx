import React, { useEffect, useState } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { array, boolean, number, object, string } from 'yup'
import StepEditSchemeDetailsWrapper from './FormSteps/StepEditSchemeDetail/StepEditSchemeDetailsWrapper'
import StepEditFAQ from './FormSteps/StepEditFAQ/StepEditFAQ'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/productGroupSlice'
import { setAllItems as setAllSubCategory } from 'src/redux/slices/productSubCategorySlice'

import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetSchemeByIdQuery,
    useUpdateSchemeMutation,
} from 'src/services/SchemeService'
import moment from 'moment'
import { setSelectedItem } from 'src/redux/slices/schemeSlice'
import EditScheme from './EditScheme'
import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import { setAllProductCategory } from 'src/redux/slices/productCategorySlice'
import { useGetSubCategoryByParentQuery } from 'src/services/ProductSubCategoryService'
import StepEditProductDetailWrapper from './FormSteps/StepEditProductInformationDetails/StepEditProductDetailWrapper'

// TYPE-  Form Intial Values

export type FormInitialValues = {
    schemeCode: string
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
            schemeCode: string().required('Scheme code is required'),
            category: string().required('Category is required'),
            subCategory: string().required('Sub category is required'),
            schemeName: string().required('Scheme Name is required'),
            schemePrice: number()
                .typeError('Please enter number')
                .integer('Price must be positive')
                .positive('Please enter positive digit')
                .required('Required!'),
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
            commission: string().required('Commission is required'),
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
                    question: string().required('Question is required'),
                    answer: string().required('Answer is required'),
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
            onClick: () => {
                console.log('Scheme')
            },
            path: '/scheme',
        },
        {
            label: 'Update Scheme',
            onClick: () => {
                console.log('Update Scheme')
            },
        },
    ]

    // States
    const params = useParams()
    const Id = params.id

    const [activeStep, setActiveStep] = React.useState(0)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    //const [AddSchemes] = useAddSchemeMutation();
    const [apiStatus, setApiStatus] = useState(false)

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [selectedCategory, setSelectedCategory] = useState('')
    const { selectedItem }: any = useSelector(
        (state: RootState) => state.scheme
    )
    const [UpdateScheme] = useUpdateSchemeMutation()
    const {
        data: updateData,
        isLoading: updateisLoading,
        isFetching: updateisFetching,
    } = useGetSchemeByIdQuery(Id)

    useEffect(() => {
        if (selectedItem !== null) {
            setSelectedCategory(selectedItem?.category)
        }
    }, [selectedItem])

    // From Initial Values
    const initialValues: FormInitialValues = {
        schemeCode: selectedItem?.schemeCode || '',
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

    // On Submit Handler
    const { allProductCategory }: any = useSelector(
        (state: RootState) => state.productCategory
    )

    const {
        data: dataPC,
        isLoading: isLoadingPC,
        isFetching: isFetchingPC,
    } = useGetAllProductCategoryQuery(userData?.companyId)

    useEffect(() => {
        dispatch(setAllProductCategory(dataPC?.data))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingPC, isFetchingPC, dataPC])

    const productCategoryoption: any = allProductCategory?.map((ele: any) => {
        return {
            label: ele.categoryName,
            value: ele._id,
        }
    })

    const {
        data: ProductScData,
        isLoading: ProductScIsLoading,
        isFetching: ProductScIsFetching,
    } = useGetSubCategoryByParentQuery(selectedCategory, {
        skip: !selectedCategory,
    })

    useEffect(() => {
        dispatch(setAllSubCategory(ProductScData?.data))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ProductScData, ProductScIsLoading, ProductScIsFetching])

    const { allItems: productSubCategory }: any = useSelector(
        (state: RootState) => state.productSubCategory
    )
    const productSubCategoryOption: any = productSubCategory?.map(
        (ele: any) => {
            return {
                label: ele.subCategoryName,
                value: ele._id,
            }
        }
    )

    const { data, isLoading, isFetching } = useGetAllProductGroupQuery(
        userData?.companyId
    )
    const { allItems: productGroup }: any = useSelector(
        (state: RootState) => state.productGroup
    )

    const productGroupOptions = productGroup?.map((ele: any) => {
        return {
            label: ele?.groupName,
            value: ele?._id,
        }
    })

    useEffect(() => {
        dispatch(setAllItems(data?.data))
    }, [data, dispatch, isLoading, isFetching])

    useEffect(() => {
        dispatch(setSelectedItem(updateData?.data))
    }, [updateData, dispatch, updateisLoading, updateisFetching])

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
            setTimeout(() => {
                UpdateScheme({
                    body: {
                        schemeCode: values.schemeCode,
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
                            navigate('/scheme')
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
        <SideNavLayout>
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
        </SideNavLayout>
    )
}

export default EditSchemeWrapper
