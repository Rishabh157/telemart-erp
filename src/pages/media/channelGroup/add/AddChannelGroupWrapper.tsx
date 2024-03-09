/// ==============================================
// Filename:AddChannelGroupWrapper.tsx
// Type: Add Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, FormikProps } from 'formik'
import { object, string } from 'yup'

// |-- Internal Dependencies --|

import { useAddChannelGroupMutation } from 'src/services/media/ChannelGroupServices'
import { showToast } from 'src/utils'
import AddChannelGroup from './AddChannelGroup'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
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
    )
}

export default AddChannelGroupWrapper
