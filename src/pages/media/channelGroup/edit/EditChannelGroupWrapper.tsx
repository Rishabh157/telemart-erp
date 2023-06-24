/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import MediaLayout from '../../MediaLayout'
// import { useEditChannelGroupMutation } from 'src/services/media/ChannelGroupServices'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import EditChannelGroup from './EditChannelGroup'
import {
    useGetChannelGroupByIdQuery,
    useUpdateChannelGroupMutation,
} from 'src/services/media/ChannelGroupServices'
import { setSelectedItem } from 'src/redux/slices/media/channelGroupSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    groupName: string
    companyId: string
}

const EditChannelGroupWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { data, isLoading, isFetching } = useGetChannelGroupByIdQuery(Id)
    const [EditChannelGroupApi] = useUpdateChannelGroupMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem } = useSelector(
        (state: RootState) => state?.channelGroup
    )

    const initialValues: FormInitialValues = {
        groupName: selectedItem?.groupName || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        groupName: string().required('Group Name is required'),
    })

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [data, isLoading, isFetching])

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            EditChannelGroupApi({
                body: {
                    groupName: values.groupName,
                    companyId: values.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Channel Group updated successfully!'
                        )
                        navigate('/media/channel-group')
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

export default EditChannelGroupWrapper
