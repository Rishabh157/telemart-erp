import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import EditProductSubCategory from './EditProductSubCategory'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import {
    useGetProductSubCategoryByIdQuery,
    useUpdateProductSubCategoryMutation,
} from 'src/services/ProductSubCategoryService'
import { setSelectedItem } from 'src/redux/slices/productSubCategorySlice'

type Props = {}

export type FormInitialValues = {
    subCategoryCode: string
    subCategoryName: string
    parentCategory: string
    hsnCode: string
}

const EditProductSubCategoryWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState(false)
    // Product sub category single view data (PS)
    const {
        data: psData,
        isLoading: psIsLoading,
        isFetching: psIsFetching,
    } = useGetProductSubCategoryByIdQuery(Id)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { allProductCategory }: any = useSelector(
        (state: RootState) => state?.productCategory
    )

    // const { allTaxes }: any = useSelector((state: RootState) => state?.tax);
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.productSubCategory
    )

    // Product category all data (pc)
    const {
        data: pcData,
        isLoading: pcIsLoading,
        isFetching: pcIsFetching,
    } = useGetAllProductCategoryQuery('')

    // Taxes all data (t)
    // const {
    //   data: tData,
    //   isLoading: tIsLoading,
    //   isFetching: tIsFetching,
    // } = useGetAllTaxesQuery("");
    const [editProductSubCategory] = useUpdateProductSubCategoryMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        subCategoryCode: selectedItem?.subCategoryCode || '',
        subCategoryName: selectedItem?.subCategoryName || '',
        parentCategory: selectedItem?.parentCategory || '',
        hsnCode: selectedItem?.hsnCode || '',
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
        editProductSubCategory({
            body: {
                subCategoryCode: values.subCategoryCode,
                subCategoryName: values.subCategoryName,
                parentCategoryId: values.parentCategory,
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

    useEffect(() => {
        dispatch(setSelectedItem(psData?.data))
    }, [dispatch, psData, psIsFetching, psIsLoading])

    useEffect(() => {
        // dispatch(selAllproductCategory(pcData?.data));
    }, [dispatch, pcData, pcIsLoading, pcIsFetching])

    // useEffect(() => {
    //   dispatch(setAllTaxes(tData?.data));
    // }, [dispatch, tData, tIsLoading, tIsFetching]);

    const parentCategoryOptions = allProductCategory?.map((ele: any) => {
        return { label: ele?.categoryName, value: ele?._id }
    })

    const dropdownOptions = {
        parentCategoryOptions: parentCategoryOptions,
    }

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
                        <EditProductSubCategory
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

export default EditProductSubCategoryWrapper
