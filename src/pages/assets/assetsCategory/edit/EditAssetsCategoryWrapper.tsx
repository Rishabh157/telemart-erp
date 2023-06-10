/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import EditAsstesCategory from './EditAssetsCategory'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import {
    useUpdateAssetsCategoryMutation,
    useGetAssetsCategoryByIdQuery,
} from 'src/services/assets/AssetsCategoryService'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { setSelectedCategory } from 'src/redux/slices/assets/assetsCategorySlice'

type Props = {}

export type FormInitialValues = {
    categoryName: string
}

const EditAssetsCategoryWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [editCategory] = useUpdateAssetsCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem } = useSelector(
        (state: RootState) => state?.assetsCategory
    )
    const { data, isLoading, isFetching } = useGetAssetsCategoryByIdQuery(Id)
    const initialValues: FormInitialValues = {
        categoryName: selectedItem?.assetCategoryName || '',
    }

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedCategory(data?.data))
        }
    }, [data, isFetching, isLoading])
    // Form Validation Schema
    const validationSchema = object({
        categoryName: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editCategory({
                body: {
                    assetCategoryName: values.categoryName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/assets/assets-category')
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
                        <EditAsstesCategory
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default EditAssetsCategoryWrapper
