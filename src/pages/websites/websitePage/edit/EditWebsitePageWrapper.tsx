import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import WebsiteLayout from '../../WebsiteLayout'
import {
    useGetWebsitePageByIdQuery,
    useUpdateWebsitePageMutation,
} from 'src/services/websites/WebsitePageServices'
import EditWebsitePage from './EditWebsitePage'
import { setSelectedWebsite } from 'src/redux/slices/website/websitePageSlice'

type Props = {}

export type FormInitialValues = {
    pageName: string
    pageUrl: string
    headerSpace: string
    footerSpace: string
}

const EditWebsitePageWrapper = (props: Props) => {
    // Form Initial Values
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const params = useParams()
    const Id = params.id
    const [editWebsitePage] = useUpdateWebsitePageMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.websitePage
    )

    const { data, isLoading, isFetching } = useGetWebsitePageByIdQuery(Id)

    const initialValues: FormInitialValues = {
        pageName: selectedItem?.pageName || '',
        pageUrl: selectedItem?.pageUrl || '',
        headerSpace: selectedItem?.headerSpace || '',
        footerSpace: selectedItem?.footerSpace || '',
    }

    useEffect(() => {
        console.log(data?.data)
        dispatch(setSelectedWebsite(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    // Form Validation Schema
    const validationSchema = object({
        pageName: string().required('Name is required'),
        pageUrl: string().required('url is required'),
        headerSpace: string().required('Header is required'),
        footerSpace: string().required('Footer is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editWebsitePage({
                body: {
                    pageName: values.pageName,
                    pageUrl: values.pageUrl,
                    headerSpace: values.headerSpace,
                    footerSpace: values.footerSpace,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Website-Page updated successfully!'
                        )
                        navigate('/all-websites/website-Page')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditWebsitePage
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default EditWebsitePageWrapper
