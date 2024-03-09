/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditChannelGroupWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|

// import { useEditChannelGroupMutation } from 'src/services/media/ChannelGroupServices'
import { showToast } from 'src/utils'
import EditChannelGroup from './EditChannelGroup'
import {
    useGetChannelGroupByIdQuery,
    useUpdateChannelGroupMutation,
} from 'src/services/media/ChannelGroupServices'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/media/channelGroupSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
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

export default EditChannelGroupWrapper
