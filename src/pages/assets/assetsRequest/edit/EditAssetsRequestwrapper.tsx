/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditAssetsRequestWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|

import EditAsstesRequest from './EditAsstesRequest'
import {
    useUpdateAssetsRequestMutation,
    useGetAssetsRequestByIdQuery,
} from 'src/services/assets/AssetsRequestServcies'
import { showToast } from 'src/utils'
import { useGetAllAssetsCategoryQuery } from 'src/services/assets/AssetsCategoryService'
import { setAllItems } from 'src/redux/slices/assets/assetsCategorySlice'
import { AssetsCategoryListResponse } from 'src/models'
import { setSelectedAssetRequest } from 'src/redux/slices/assets/assetsRequestSlice'

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

const EditAssetsRequestwrapper = (props: Props) => {
    // Form Initial Values

    const params = useParams()
    const Id = params.id
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [editAsset] = useUpdateAssetsRequestMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { allItems } = useSelector(
        (state: RootState) => state?.assetsCategory
    )
    const { selectedItem } = useSelector(
        (state: RootState) => state?.assetsRequest
    )

    const {
        data: asData,
        isLoading: asIsLoading,
        isFetching: asIsFetching,
    } = useGetAssetsRequestByIdQuery(Id)
    const { data, isLoading, isFetching } = useGetAllAssetsCategoryQuery(
        userData?.companyId
    )

    useEffect(() => {
        if (!asIsLoading && !asIsFetching) {
            dispatch(setSelectedAssetRequest(asData?.data))
        }
    }, [asData, asIsLoading, asIsFetching])

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setAllItems(data?.data))
        }
    }, [data, isLoading, isFetching])
    const initialValues: FormInitialValues = {
        assetName: selectedItem?.assetName || '',
        assetCategory: selectedItem?.assetCategoryId || '',
        quantity: selectedItem?.quantity || 0,
        price: selectedItem?.price || 0,
        remark: selectedItem?.remark || '',
        assetDetails: selectedItem?.assetDetails?.join(',') || '',
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
            editAsset({
                body: {
                    assetCategoryId: values.assetCategory,
                    assetName: values.assetName,
                    quantity: values.quantity,
                    price: values.price,
                    remark: values.remark,
                    assetDetails: assetDetails,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditAsstesRequest
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

export default EditAssetsRequestwrapper
