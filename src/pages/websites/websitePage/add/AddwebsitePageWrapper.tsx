import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import WebsiteLayout from '../../WebsiteLayout'
import { useAddWebsitePageMutation } from 'src/services/websites/WebsitePageServices'
import AddWebsitePage from './AddWebsitePage'

type Props = {}

export type FormInitialValues = {
    pageUrl: string
    pageName: string
    headerSpace: string
    footerSpace: string
}

const AddWebsitePageWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addWebsitePage] = useAddWebsitePageMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        pageUrl: '',
        pageName: '',
        headerSpace: '',
        footerSpace: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        pageUrl: string().required('Url is required'),
        pageName: string().required('Name is required'),
        headerSpace: string().required('Header is required'),
        footerSpace: string().required('Footer is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addWebsitePage({
                pageUrl: values.pageUrl,
                pageName: values.pageName,
                headerSpace: values.headerSpace,
                footerSpace: values.footerSpace,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Website-Page added successfully!')
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddWebsitePage
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default AddWebsitePageWrapper
