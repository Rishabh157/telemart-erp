import React, { useState } from 'react'
import MediaLayout from '../../MediaLayout'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import AddChannelGroup from './AddChannelMaster'
import { useAddChannelCategoryMutation } from 'src/services/media/channelcategoryService'

export type FormInitialValues = {
    channelCategory: string
    companyId: string
}

const AddChannelCategoryWrapper = () => {
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddChannelcategory] = useAddChannelCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        channelCategory: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        channelCategory: string().required('Group Name is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddChannelcategory({
                channelCategory: values.channelCategory,
                companyId: values.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Channel Category name added successfully!'
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

export default AddChannelCategoryWrapper
