// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import EditChannelGroup from './EditChannelGroup'
import {
    useGetChannelGroupByIdQuery,
    useUpdateChannelGroupMutation,
} from 'src/services/media/ChannelGroupServices'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { ChannelGroupListResponse } from 'src/models/ChannelGroup.model'

// |-- Types --|
export type FormInitialValues = {
    groupName: string
    companyId: string
}

const EditChannelGroupWrapper = () => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const params = useParams()
    const id = params.id
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Hook
    const { items } = useGetDataByIdCustomQuery<ChannelGroupListResponse>({
        useEndPointHook: useGetChannelGroupByIdQuery(id),
    })

    // Initiate Method
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [editChannelGroupApi] = useUpdateChannelGroupMutation()

    const initialValues: FormInitialValues = {
        groupName: items?.groupName || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        groupName: string().required('Group Name is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editChannelGroupApi({
                body: {
                    groupName: values.groupName,
                    companyId: values.companyId || '',
                },
                id: id || '',
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
