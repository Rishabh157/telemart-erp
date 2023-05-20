import React, { useState, useEffect } from 'react'
import MediaLayout from '../../MediaLayout'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import EditChannelGroup from './EditChannelCategory'
import {
    useGetChannelCategoryByIdQuery,
    useUpdateChannelCategoryMutation,
} from 'src/services/media/channelcategoryService'
import { setSelectedItem } from 'src/redux/slices/media/channelCategorySlice'

export type FormInitialValues = {
    channelCategory: string
    companyId: string
}

const EditChannelCategoryWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    //alert(id)
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateChannelCategory] = useUpdateChannelCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.channelCategory
    )

    const { data, isLoading, isFetching } = useGetChannelCategoryByIdQuery(id)

    //Channel category
    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    // Form Validation Schema
    const validationSchema = object({
        channelCategory: string().required('Group Name is required'),
    })

    //console.log(selectedItem?.channelCategory)

    const initialValues: FormInitialValues = {
        channelCategory: selectedItem?.channelCategory || '',
        companyId: selectedItem?.companyId || userData?.companyId || '',
    }

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
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
        <MediaLayout>
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
        </MediaLayout>
    )
}

export default EditChannelCategoryWrapper
