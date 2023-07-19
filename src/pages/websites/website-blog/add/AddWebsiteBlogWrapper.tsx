/// ==============================================
// Filename:AddWebsiteBlogWrapper.tsx
// Type: Add Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddWebsiteBlog from './AddWebsiteBlog'
import { showToast } from 'src/utils'
import { useAddWebsiteBlogMutation } from 'src/services/websites/WebsiteBlogServices'
import WebsiteLayout from '../../WebsiteLayout'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    blogName: string
    blogTitle: string
    blogSubtitle: string
    image: string
    blogDescription: string
}

const AddWebsiteBlogWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const WebsiteBlogState: any = useSelector(
        (state: RootState) => state.websiteBlog
    )
    const { filterValue } = WebsiteBlogState
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addWebsiteBlog] = useAddWebsiteBlogMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        blogName: '',
        blogTitle: '',
        blogSubtitle: '',
        image: '',
        blogDescription: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        blogName: string().required('Required'),
        blogTitle: string().required('Required'),
        blogSubtitle: string(),
        image: string().url('Image must be valid url'),
        blogDescription: string(),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        setTimeout(() => {
            addWebsiteBlog({
                blogName: values.blogName,
                blogTitle: values.blogTitle,
                blogSubtitle: values.blogSubtitle || '',
                image: values.image || '',
                blogDescription: values.blogDescription || '',
                websiteId: filterValue,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Blog added successfully!')
                        navigate('/all-websites/website')
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
        <WebsiteLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddWebsiteBlog
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default AddWebsiteBlogWrapper
