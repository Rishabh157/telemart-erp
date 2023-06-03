import React, { useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddWebsite from './AddInfluencer'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useAddWebsiteMutation } from 'src/services/websites/WebsiteServices'
import WebsiteLayout from '../../WebsiteLayout'
import AddInfluencer from './AddInfluencer'

type Props = {}

export type FormInitialValues = {
    productName: string
    url: string
    gaTagIp: string
    searchConsoleIp: string
    headerSpace: string
    footerSpace: string
    siteMap: string
}

const AddInfluencerWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addWebsite] = useAddWebsiteMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        productName: '',
        url: '',
        gaTagIp: '',
        searchConsoleIp: '',
        headerSpace: '',
        footerSpace: '',
        siteMap: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        productName: string().required('Required'),
        url: string().url('Please enter valid URL').required('Required'),
        gaTagIp: string(),
        searchConsoleIp: string(),
        headerSpace: string(),
        footerSpace: string(),
        siteMap: string(),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        //console.log(values)
        setTimeout(() => {
            addWebsite({
                productName: values.productName,
                url: values.url,
                gaTagIp: values.gaTagIp || '',
                searchConsoleIp: values.searchConsoleIp || '',
                headerSpace: values.headerSpace || '',
                footerSpace: values.footerSpace || '',
                siteMap: values.siteMap || '',
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Website added successfully!')
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
                        <AddInfluencer
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default AddInfluencerWrapper
