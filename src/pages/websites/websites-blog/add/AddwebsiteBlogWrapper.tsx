import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import WebsiteLayout from '../../WebsiteLayout'
import { useAddWebsiteBlogMutation } from 'src/services/websites/WebsiteBlogServices'
import AddWebsiteBlog from './AddWebsiteBlog'
import { setAllItems } from 'src/redux/slices/website/websiteSlice'
import { useGetAllWebsiteQuery } from 'src/services/websites/WebsiteServices'

type Props = {}

export type FormInitialValues = {
    blogName: string
    blogTitle: string
    blogSubtitle: string
    image: string
    blogDescription: string
    websiteId: string
}

const AddWebsiteBlogWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addWebsiteBlog] = useAddWebsiteBlogMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { items }: any = useSelector((state: RootState) => state?.website)

    const websiteOptions = items?.map((ele: any) => {
        return {
            label: ele.productName,
            value: ele._id,
        }
    })

    const { data, isFetching, isLoading } = useGetAllWebsiteQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) dispatch(setAllItems(data?.data))
    }, [data, isFetching, isLoading])

    const initialValues: FormInitialValues = {
        blogName: '',
        blogTitle: '',
        blogSubtitle: '',
        image: '',
        blogDescription: '',
        websiteId: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        blogName: string().required('Name is required'),
        blogTitle: string().required('Title is required'),
        blogSubtitle: string().required('SubTitle is required'),
        image: string().required('Image is required'),
        blogDescription: string().required('Description is required'),
        websiteId: string().required('website is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addWebsiteBlog({
                blogName: values.blogName,
                blogTitle: values.blogTitle,
                blogSubtitle: values.blogSubtitle,
                image: values.image,
                blogDescription: values.blogDescription,
                websiteId: values.websiteId,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Website-Blog added successfully!')
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
                            websiteOptions={websiteOptions}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default AddWebsiteBlogWrapper
