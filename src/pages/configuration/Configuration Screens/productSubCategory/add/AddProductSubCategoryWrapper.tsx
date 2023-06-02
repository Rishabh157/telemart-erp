import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddProductSubCategory from './AddProductSubCategory'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAddProductSubCategoryMutation } from 'src/services/ProductSubCategoryService'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import { useGetAllTaxesQuery } from 'src/services/TaxesService'
import { setAllTaxes } from 'src/redux/slices/TaxesSlice'
import { setAllProductCategory } from 'src/redux/slices/productCategorySlice'

type Props = {}

export type FormInitialValues = {
    subCategoryCode: string
    subCategoryName: string
    parentCategory: string
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
    } = useGetAllProductCategoryQuery('')

    const {
        data: tData,
        isLoading: tIsLoading,
        isFetching: tIsFetching,
    } = useGetAllTaxesQuery('')
    const [addProductSubCategory] = useAddProductSubCategoryMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        subCategoryCode: '',
        subCategoryName: '',
        parentCategory: '',
        hsnCode: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        subCategoryCode: string().required('Required'),
        subCategoryName: string().required('Required'),
        parentCategory: string().required('Required'),
        hsnCode: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        addProductSubCategory({
            subCategoryCode: values.subCategoryCode,
            subCategoryName: values.subCategoryName,
            parentCategoryId: values.parentCategory,
            hsnCode: values.hsnCode,
            companyId: userData?.companyId || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Product sub category added successfully!'
                    )
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

    const parentCategoryOptions = allProductCategory?.map((ele: any) => {
        return { label: ele?.categoryName, value: ele?._id }
    })
    // const applicableTaxesOptions = allTaxes?.map((ele: any) => {
    //   return { label: ele?.taxName, value: ele?._id };
    // });
    const dropdownOptions = {
        parentCategoryOptions: parentCategoryOptions,
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
