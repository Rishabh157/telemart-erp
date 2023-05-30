import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import EditWebsite from './EditWebsite'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    useGetWebsiteByIdQuery,
    useUpdateWebsiteMutation,
} from 'src/services/websites/WebsiteServices'
import { setSelectedWebsite } from 'src/redux/slices/website/websiteSlice'
import WebsitesLayout from '../../WebsiteLayout'

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
    const { selectedItem }: any = useSelector(
        (state: RootState) => state.website
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [editWebsites] = useUpdateWebsiteMutation()
    const { data, isLoading, isFetching } = useGetWebsiteByIdQuery(Id)

    useEffect(() => {
        dispatch(setSelectedWebsite(data?.data))
    }, [dispatch, data, isLoading, isFetching])

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
        url: string().required('Required'),
        gaTagIp: string(),
        searchConsoleIp: string(),
        headerSpace: string(),
        footerSpace: string(),
        siteMap: string(),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editWebsites({
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
        <WebsitesLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <>
                            <EditWebsite
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                            />
                        </>
                    )
                }}
            </Formik>
        </WebsitesLayout>
    )
}

export default EditWebsiteWrapper
