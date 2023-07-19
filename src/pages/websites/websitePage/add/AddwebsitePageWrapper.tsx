/// ==============================================
// Filename:AddWebsitePageWrapper.tsx
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
import { showToast } from 'src/utils'
import WebsiteLayout from '../../WebsiteLayout'
import { useAddWebsitePageMutation } from 'src/services/websites/WebsitePageServices'
import AddWebsitePage from './AddWebsitePage'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
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
    const dispatch = useDispatch()
    const WebsiteBlogState: any = useSelector(
        (state: RootState) => state.websiteBlog
    )
    const { filterValue } = WebsiteBlogState
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
        pageUrl: string().required('Required'),
        pageName: string().required('Required'),
        headerSpace: string().required('Required'),
        footerSpace: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addWebsitePage({
                pageUrl: values.pageUrl,
                pageName: values.pageName,
                headerSpace: values.headerSpace,
                footerSpace: values.footerSpace,
                websiteId: filterValue,
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
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
