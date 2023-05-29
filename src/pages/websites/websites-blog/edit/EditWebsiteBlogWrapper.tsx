import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import WebsiteLayout from '../../WebsiteLayout'
import {  useGetWebsiteBlogByIdQuery, useUpdateWebsiteBlogMutation } from 'src/services/websites/WebsiteBlogServices'
import EditWebsiteBlog from './EditWebsiteBlog'
import { setSelectedWebsite } from 'src/redux/slices/website/websiteBlogSlice'


type Props = {}

export type FormInitialValues = {
    blogName: string
    blogTitle: string
    blogSubtitle: string
    image: string
    blogDescription: string
}

const EditWebsiteBlogWrapper = (props: Props) => {
    // Form Initial Values
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const params=useParams()
    const Id=params.id
    const [editWebsiteBlog] = useUpdateWebsiteBlogMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const {selectedItem}:any=useSelector((state: RootState) => state?.websiteBlog)

    const { data, isLoading, isFetching } = useGetWebsiteBlogByIdQuery(Id)

    //Channel category
  
    const initialValues: FormInitialValues = {
        blogName:selectedItem?.blogName || '',
        blogTitle:selectedItem?.blogTitle || '',
        blogSubtitle:selectedItem?.blogSubtitle || '',
        image:selectedItem?.image || '',
        blogDescription:selectedItem?.blogDescription ||  ''
    }

    useEffect(() => {
        console.log(data?.data)
        dispatch(setSelectedWebsite(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    // Form Validation Schema
    const validationSchema = object({
        blogName: string().required('Name is required'),
        blogTitle: string().required('Title is required'),
        blogSubtitle: string().required('SubTitle is required'),
        image: string().required('Image is required'),
        blogDescription:string().required('Description is required')
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editWebsiteBlog({
                body:{
                blogName: values.blogName,
                blogTitle:values.blogTitle,
                blogSubtitle:values.blogSubtitle,
                image:values.image,
                blogDescription:values.blogDescription ,
                companyId: userData?.companyId || '',
                },
                id: Id || '',
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
                        <EditWebsiteBlog
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default EditWebsiteBlogWrapper
