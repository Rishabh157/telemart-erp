
// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import EditProductSubCategory from './EditProductSubCategory'

import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import {
    useGetProductSubCategoryByIdQuery,
    useUpdateProductSubCategoryMutation,
} from 'src/services/ProductSubCategoryService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { AppDispatch } from 'src/redux/store'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { ProductSubCategoryListResponse } from 'src/models'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    subCategoryCode: string
    subCategoryName: string
    parentCategoryId: string
    hsnCode: string
}

const EditProductSubCategoryWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState(false)
    const { userData } = useGetLocalStorage()
    const { items } = useGetDataByIdCustomQuery<ProductSubCategoryListResponse>(
        {
            useEndPointHook: useGetProductSubCategoryByIdQuery(Id),
        }
    )

    const [editProductSubCategory] = useUpdateProductSubCategoryMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        subCategoryCode: items?.subCategoryCode || '',
        subCategoryName: items?.subCategoryName || '',
        parentCategoryId: items?.parentCategoryId || '',
        hsnCode: items?.hsnCode || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        subCategoryCode: string().required('Required'),
        subCategoryName: string().required('Required'),
        parentCategoryId: string().required('Required'),
        hsnCode: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        editProductSubCategory({
            body: {
                subCategoryCode: values.subCategoryCode,
                subCategoryName: values.subCategoryName,
                parentCategoryId: values.parentCategoryId,
                hsnCode: values.hsnCode,
                companyId: userData?.companyId || '',
            },
            id: Id || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Updated successfully!')
                    navigate('/configurations/product-sub-category')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    const { options: productCategoryOPtions } = useCustomOptions({
        useEndPointHook: useGetAllProductCategoryQuery(''),
        keyName: 'categoryName',
        value: '_id',
    })

    const dropdownOptions = {
        parentCategoryOptions: productCategoryOPtions,
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
                    <EditProductSubCategory
                        formikProps={formikProps}
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default EditProductSubCategoryWrapper
