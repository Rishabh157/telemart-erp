/// ==============================================
// Filename:AddProductSubWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddProductSubCategory from './AddProductSubCategory'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAddProductSubCategoryMutation } from 'src/services/ProductSubCategoryService'
import { showToast } from 'src/utils'
import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import { useGetAllTaxesQuery } from 'src/services/TaxesService'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllTaxes } from 'src/redux/slices/TaxesSlice'
import { setAllProductCategory } from 'src/redux/slices/productCategorySlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'


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
    const { allProductCategory }: any = useSelector(
        (state: RootState) => state?.productCategory
    )
    // const { allTaxes }: any = useSelector((state: RootState) => state?.tax);

    const {
        data: pcData,
        isLoading: pcIsLoading,
        isFetching: pcIsFetching,
    } = useGetAllProductCategoryQuery(userData?.companyId)

    const {
        data: tData,
        isLoading: tIsLoading,
        isFetching: tIsFetching,
    } = useGetAllTaxesQuery(userData?.companyId)
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
        subCategoryCode: string().required('Required'),
        subCategoryName: string().required('Required'),
        parentCategoryId: string().required('Required'),
        hsnCode: string().required('Required'),
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

    useEffect(() => {
        dispatch(setAllProductCategory(pcData?.data))
    }, [dispatch, pcData, pcIsLoading, pcIsFetching])

    useEffect(() => {
        dispatch(setAllTaxes(tData?.data))
    }, [dispatch, tData, tIsLoading, tIsFetching])

    const parentCategoryIdOptions = allProductCategory?.map((ele: any) => {
        return { label: ele?.categoryName, value: ele?._id }
    })
    // const applicableTaxesOptions = allTaxes?.map((ele: any) => {
    //   return { label: ele?.taxName, value: ele?._id };
    // });
    const dropdownOptions = {
        parentCategoryOptions: parentCategoryIdOptions,
    }

    return (
        <ConfigurationLayout>
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
        </ConfigurationLayout>
    )
}

export default AddProductSubCategoryWrapper
