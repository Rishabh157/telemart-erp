/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StepEditProductDetailsWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { Field } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditProductWrapper'
import StepEditProductDetails from './StepEditProductDetails'
import { useGetAllProductCategoryQuery } from 'src/services/ProductCategoryServices'
import { useGetSubCategoryByParentQuery } from 'src/services/ProductSubCategoryService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'

// |-- Redux --|
import { setAllProductCategory } from 'src/redux/slices/productCategorySlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/productSubCategorySlice'
import { setAllItems as setAllProductGroup } from 'src/redux/slices/productGroupSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<
    'productSubCategoryOPtions' | 'productCategoryOPtions'
>
const StepEditProductDetailsWrapper = ({ formikProps }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { allProductCategory }: any = useSelector(
        (state: RootState) => state?.productCategory
    )
    const { allItems: productSubCategory }: any = useSelector(
        (state: RootState) => state?.productSubCategory
    )
    const { allItems: productGroup }: any = useSelector(
        (state: RootState) => state?.productGroup
    )

    const {
        data: pcData,
        isLoading: pcIsLoading,
        isFetching: pcIsFetching,
    } = useGetAllProductCategoryQuery(userData?.companyId)

    const {
        data: pscData,
        isLoading: pscIsLoading,
        isFetching: pscIsFetching,
    } = useGetSubCategoryByParentQuery(formikProps.values.product_category, {
        skip: !formikProps.values.product_category,
    })
    const {
        data: pgData,
        isLoading: pgIsLoading,
        isFetching: pgIsFetching,
    } = useGetAllProductGroupQuery(userData?.companyId)

    useEffect(() => {
        dispatch(setAllProductCategory(pcData?.data))
    }, [pcData, pcIsLoading, pcIsFetching])

    useEffect(() => {
        dispatch(setAllItems(pscData?.data))
    }, [pscData, pscIsLoading, pscIsFetching])

    useEffect(() => {
        dispatch(setAllProductGroup(pgData?.data))
    }, [pgData, pgIsLoading, pgIsFetching])

    const productCategoryOPtions = allProductCategory?.map((ele: any) => {
        return { label: ele?.categoryName, value: ele?._id }
    })

    const productSubCategoryOPtions = productSubCategory?.map((ele: any) => {
        return { label: ele?.subCategoryName, value: ele?._id }
    })

    const productGroupOPtions = productGroup?.map((ele: any) => {
        return { label: ele?.groupName, value: ele?._id }
    })

    const dropdownOptions = {
        productSubCategoryOPtions,
        productCategoryOPtions,
        productGroupOPtions,
    }

    return (
        <>
            <StepEditProductDetails
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepEditProductDetailsWrapper
