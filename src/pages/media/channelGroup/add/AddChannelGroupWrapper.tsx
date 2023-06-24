import React, { useState } from 'react'
import MediaLayout from '../../MediaLayout'
import { useAddChannelGroupMutation } from 'src/services/media/ChannelGroupServices'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import AddChannelGroup from './AddChannelGroup'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

export type FormInitialValues = {
    groupName: string
    companyId: string
}

const AddChannelGroupWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddChannelGroupApi] = useAddChannelGroupMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        groupName: '',
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
            AddChannelGroupApi({
                groupName: values.groupName,
                companyId: values.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Channel Group name added successfully!'
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddChannelGroup
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </MediaLayout>
    )
}

export default AddChannelGroupWrapper
