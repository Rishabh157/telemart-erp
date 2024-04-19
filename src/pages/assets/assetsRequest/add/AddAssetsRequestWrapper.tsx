/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:AddAssetsRequestWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { number, object, string } from 'yup'

// |-- Internal Dependencies --|

import { useGetAllAssetsCategoryQuery } from 'src/services/assets/AssetsCategoryService'
import { useAddAssetsRequestMutation } from 'src/services/assets/AssetsRequestServcies'
import { showToast } from 'src/utils'
import AddAsstesRequest from './AddAssetsRequest'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
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

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addAsset] = useAddAssetsRequestMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { options: allItems } = useCustomOptions({
        useEndPointHook: useGetAllAssetsCategoryQuery(
            userData?.companyId
        ),
        keyName: 'assetCategoryName',
        value: '_id',
    })

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
                        navigate('/assets/assets-request')
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
        assetCategoryOptions: allItems
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
