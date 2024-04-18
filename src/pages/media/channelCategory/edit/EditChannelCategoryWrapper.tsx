// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector, useDispatch } from 'react-redux'
import { Formik, FormikProps } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import EditChannelGroup from './EditChannelCategory'
import {
    useGetChannelCategoryByIdQuery,
    useUpdateChannelCategoryMutation,
} from 'src/services/media/ChannelCategoriesServices'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'

// |-- Types --|
export type FormInitialValues = {
    channelCategory: string
    companyId: string
}

const EditChannelCategoryWrapper = () => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const params = useParams()
    const id = params.id
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Hook
    const { items } = useGetDataByIdCustomQuery<ChannelCategoryListResponse>({
        useEndPointHook: useGetChannelCategoryByIdQuery(id),
    })

    // Initiate Method
    const [updateChannelCategory] = useUpdateChannelCategoryMutation()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    // Form Validation Schema
    const validationSchema = object({
        channelCategory: string().required('Category Name is required'),
    })

    const initialValues: FormInitialValues = {
        channelCategory: items?.channelCategory || '',
        companyId: items?.companyId || userData?.companyId || '',
    }

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            updateChannelCategory({
                body: {
                    channelCategory: values.channelCategory,
                    companyId: values.companyId || '',
                },
                id: id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Channel Category Name Updated successfully!'
                        )
                        navigate('/media/channel-category')
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
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <EditChannelGroup
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditChannelCategoryWrapper
