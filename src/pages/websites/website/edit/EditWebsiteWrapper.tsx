/// ==============================================
// Filename:EditWebsiteWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 05, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import {
    useGetWebsiteByIdQuery,
    useUpdateWebsiteMutation,
} from 'src/services/websites/WebsiteServices'
import { showToast } from 'src/utils'
import EditWebsite from './EditWebsite'

// |-- Redux --|
import { RootState } from 'src/redux/store'

import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
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

const EditWebsiteWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [updateWebsite] = useUpdateWebsiteMutation()

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetWebsiteByIdQuery(Id),
    })

    const initialValues: FormInitialValues = {
        productName: selectedItem?.productName,
        url: selectedItem?.url,
        gaTagIp: selectedItem?.gaTagIp || '',
        searchConsoleIp: selectedItem?.searchConsoleIp || '',
        headerSpace: selectedItem?.headerSpace || '',
        footerSpace: selectedItem?.footerSpace || '',
        siteMap: selectedItem?.siteMap || '',
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
        setTimeout(() => {
            updateWebsite({
                body: {
                    productName: values.productName,
                    url: values.url,
                    gaTagIp: values.gaTagIp || '',
                    searchConsoleIp: values.searchConsoleIp || '',
                    headerSpace: values.headerSpace || '',
                    footerSpace: values.footerSpace || '',
                    siteMap: values.siteMap || '',
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Website updated successfully!')
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
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditWebsite
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default EditWebsiteWrapper
