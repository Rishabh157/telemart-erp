// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddProductSubCategory from './AddProductSubCategory'

import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import { useAddProductSubCategoryMutation } from 'src/services/ProductSubCategoryService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    subCategoryCode: string
    subCategoryName: string
    parentCategoryId: string
    hsnCode: string
}

const AddProductSubCategoryWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { options: productCategoryOPtions } = useCustomOptions({
        useEndPointHook: useGetAllProductCategoryQuery(''),
        keyName: 'categoryName',
        value: '_id',
    })

    const [addProductSubCategory] = useAddProductSubCategoryMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        subCategoryCode: '',
        subCategoryName: '',
        parentCategoryId: '',
        hsnCode: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        subCategoryCode: string().required('Sub category code is required'),
        subCategoryName: string().required('Sub category name is required'),
        parentCategoryId: string().required('Parents category id  is required'),
        hsnCode: string().required('HSN code is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        addProductSubCategory({
            subCategoryCode: values.subCategoryCode,
            subCategoryName: values.subCategoryName,
            parentCategoryId: values.parentCategoryId,
            hsnCode: values.hsnCode,
            companyId: userData?.companyId || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
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

    const dropdownOptions = {
        parentCategoryOptions: productCategoryOPtions,
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddProductSubCategory
                        formikProps={formikProps}
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default AddProductSubCategoryWrapper
