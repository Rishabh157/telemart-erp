/// ==============================================
// Filename:EditProductCategoryWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { showToast } from 'src/utils'
import {
    useGetProductCategoryByIdQuery,
    useUpdateProductCategoryMutation,
} from 'src/services/ProductCategoryServices'
import EditProductCategoryListing from './EditProductCategoryListing'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedProductCategory } from 'src/redux/slices/productCategorySlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    categoryCode: string
    categoryName: string
}

const EditProductCategoryWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const { selectedProductCategory }: any = useSelector(
        (state: RootState) => state.productCategory
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [EditPrductCategory] = useUpdateProductCategoryMutation()

    const { data, isLoading } = useGetProductCategoryByIdQuery(Id)

    const initialValues: FormInitialValues = {
        categoryCode: selectedProductCategory?.categoryCode || '',
        categoryName: selectedProductCategory?.categoryName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        categoryCode: string().required('Required'),
        categoryName: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        setTimeout(() => {
            EditPrductCategory({
                body: {
                    categoryCode: values.categoryCode,
                    categoryName: values.categoryName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/configurations/product-category')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    useEffect(() => {
        dispatch(setSelectedProductCategory(data?.data))
    }, [dispatch, data, isLoading])
    return (
        <ConfigurationLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditProductCategoryListing
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default EditProductCategoryWrapper
