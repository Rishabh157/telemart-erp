/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:AddAssetsRequestWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|

import AddAsstesRequest from './AddAssetsRequest'
import { useAddAssetsRequestMutation } from 'src/services/assets/AssetsRequestServcies'
import { showToast } from 'src/utils'
import { useGetAllAssetsCategoryQuery } from 'src/services/assets/AssetsCategoryService'
import { setAllItems } from 'src/redux/slices/assets/assetsCategorySlice'
import { AssetsCategoryListResponse } from 'src/models'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    assetName: string
    assetCategory: string
    quantity: number
    price: number
    remark: string
    assetDetails: string
}

const AddAssetsRequestWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addAsset] = useAddAssetsRequestMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { allItems } = useSelector(
        (state: RootState) => state?.assetsCategory
    )
    const { data, isLoading, isFetching } = useGetAllAssetsCategoryQuery(
        userData?.companyId
    )

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setAllItems(data?.data))
        }
    }, [data, isLoading, isFetching])
    const initialValues: FormInitialValues = {
        assetName: '',
        assetCategory: '',
        quantity: 0,
        price: 0,
        remark: '',
        assetDetails: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        assetName: string().required('Required'),
        assetCategory: string().required('Required'),
        quantity: number(),
        price: number(),
        remark: string(),
        assetDetails: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        const assetDetails = values.assetDetails.split(',')
        setApiStatus(true)
        setTimeout(() => {
            addAsset({
                assetCategoryId: values.assetCategory,
                assetName: values.assetName,
                quantity: values.quantity,
                price: values.price,
                remark: values.remark,
                assetDetails: assetDetails,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/assets/assets-management')
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

    const dropdownOptions = {
        assetCategoryOptions: allItems?.map(
            (assetCategory: AssetsCategoryListResponse) => {
                return {
                    label: assetCategory.assetCategoryName,
                    value: assetCategory._id,
                }
            }
        ),
    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddAsstesRequest
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            dropdownOptions={dropdownOptions}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default AddAssetsRequestWrapper
