/// ==============================================
// Filename:AddWebsiteWrapper.tsx
// Type: Add Component
// Last Updated: JULY 05, 2023
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
import AddWebsite from './AddWebsite'
import { showToast } from 'src/utils'
import { useAddWebsiteMutation } from 'src/services/websites/WebsiteServices'
import WebsiteLayout from '../../WebsiteLayout'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
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

const AddWebsiteWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
        dispatch(setFieldCustomized(false))
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
                        <AddWebsite
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default AddWebsiteWrapper
