/// ==============================================
// Filename:EditWebsiteBlogWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import EditWebsiteBlog from './EditWebsiteBlog'
import { showToast } from 'src/utils'
import {
    useGetWebsiteBlogByIdQuery,
    useUpdateWebsiteBlogMutation,
} from 'src/services/websites/WebsiteBlogServices'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { setSelectedWebsiteBlog } from 'src/redux/slices/website/websiteBlogSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    blogName: string
    blogTitle: string
    blogSubtitle: string
    image: string
    blogDescription: string
    websiteId: string
}

const EditWebsiteBlogWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const { selectedItem }: any = useSelector(
        (state: RootState) => state.websiteBlog
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [updateWebsiteBlog] = useUpdateWebsiteBlogMutation()
    const { data, isLoading, isFetching } = useGetWebsiteBlogByIdQuery(Id)

    useEffect(() => {
        dispatch(setSelectedWebsiteBlog(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    const initialValues: FormInitialValues = {
        blogName: selectedItem?.blogName || '',
        blogTitle: selectedItem?.blogTitle || '',
        blogSubtitle: selectedItem?.blogSubtitle || '',
        image: selectedItem?.image || '',
        blogDescription: selectedItem?.blogDescription || '',
        websiteId: selectedItem?.websiteId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        blogName: string().required('Required'),
        blogTitle: string().required('Required'),
        blogSubtitle: string(),
        image: string().url('Image must be valid URL'),
        blogDescription: string(),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            updateWebsiteBlog({
                body: {
                    blogName: values.blogName,
                    blogTitle: values.blogTitle,
                    blogSubtitle: values.blogSubtitle || '',
                    image: values.image || '',
                    blogDescription: values.blogDescription || '',
                    companyId: userData?.companyId || '',
                    websiteId: values.websiteId,
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Blog updated successfully!')
                        navigate('/all-websites/website-blog')
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
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <>
                            <EditWebsiteBlog
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                            />
                        </>
                    )
                }}
            </Formik>
        </>
    )
}

export default EditWebsiteBlogWrapper
