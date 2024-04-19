// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { number, object, string } from 'yup'

// |-- Internal Dependencies --|

import { useGetAllAssetsCategoryQuery } from 'src/services/assets/AssetsCategoryService'
import {
    useGetAssetsRequestByIdQuery,
    useUpdateAssetsRequestMutation,
} from 'src/services/assets/AssetsRequestServcies'
import { showToast } from 'src/utils'
import EditAsstesRequest from './EditAsstesRequest'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
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
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [editAsset] = useUpdateAssetsRequestMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)


    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetAssetsRequestByIdQuery(Id),
    })
    const { options: allItems } = useCustomOptions({
        useEndPointHook: useGetAllAssetsCategoryQuery(
            userData?.companyId
        ),
        keyName: 'assetCategoryName',
        value: '_id',
    })

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
