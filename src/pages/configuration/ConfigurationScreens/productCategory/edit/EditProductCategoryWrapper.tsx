// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|

import {
    useGetProductCategoryByIdQuery,
    useUpdateProductCategoryMutation,
} from 'src/services/ProductCategoryServices'
import { showToast } from 'src/utils'
import EditProductCategoryListing from './EditProductCategoryListing'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { ProductCategoryListResponse } from 'src/models/ProductCategory.model'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

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

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [EditPrductCategory] = useUpdateProductCategoryMutation()

    const { items } = useGetDataByIdCustomQuery<ProductCategoryListResponse>({
        useEndPointHook: useGetProductCategoryByIdQuery(Id),
    })

    const initialValues: FormInitialValues = {
        categoryCode: items?.categoryCode || '',
        categoryName: items?.categoryName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        categoryCode: string().required('Category code is required'),
        categoryName: string().required('Category name is required'),
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

    return (
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
    )
}

export default EditProductCategoryWrapper
