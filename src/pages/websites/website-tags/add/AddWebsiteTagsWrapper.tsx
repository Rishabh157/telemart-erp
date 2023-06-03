import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import AddWebsiteTag from './AddWebsiteTag'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useAddWebsiteTagsMutation } from 'src/services/websites/WebsiteTagsServices'
import WebsiteLayout from '../../WebsiteLayout'
import { useGetAllWebsiteQuery } from 'src/services/websites/WebsiteServices'
import { useGetAllWebsitePageQuery } from 'src/services/websites/WebsitePageServices'
import { setAllItems as setAllWebsites } from 'src/redux/slices/website/websiteSlice'
import { setAllItems as setAllWebsitePage } from 'src/redux/slices/website/websitePageSlice'
import { WebsiteListResponse } from 'src/models/website/Website.model'
import { WebsitePageListResponse } from 'src/models/website/WebsitePage.model'

type Props = {}

export type FormInitialValues = {
    websitPageId: string
    websiteMasterId: string
    metaDescription: string
    metaKeyword: string
    metaOgTitle: string
    metaOgUrl: string
    metaOgImage: string
    metaOgDescription: string
    metaOgType: string
    metaTwitterTitle: string
    metaTwitterCard: string
    metaTwitterImage: string
    companyId: string
}

const AddWebsiteTagsWrapper = (props: Props) => {
    // Form Initial Values
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addWebsiteTags] = useAddWebsiteTagsMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { allItems: websiteItems }: any = useSelector(
        (state: RootState) => state.website
    )

    const { allItems: websitePageItems }: any = useSelector(
        (state: RootState) => state?.websitePage
    )

    const {
        isLoading: iswebsiteLoading,
        isFetching: isWebsiteFetching,
        data: WebsiteData,
    } = useGetAllWebsiteQuery('')

    useEffect(() => {
        if (!iswebsiteLoading && !isWebsiteFetching) {
            dispatch(setAllWebsites(WebsiteData?.data || []))
        }
    }, [dispatch, iswebsiteLoading, isWebsiteFetching, WebsiteData])

    const {
        isLoading: isPageLoading,
        isFetching: isPageFetching,
        data: PageData,
    } = useGetAllWebsitePageQuery('')

    useEffect(() => {
        if (!isPageLoading && !isPageFetching) {
            dispatch(setAllWebsitePage(PageData?.data || []))
        }
    }, [isPageLoading, isPageFetching, PageData, dispatch])

    const initialValues: FormInitialValues = {
        websitPageId: '',
        websiteMasterId: '',
        metaDescription: '',
        metaKeyword: '',
        metaOgTitle: '',
        metaOgUrl: '',
        metaOgImage: '',
        metaOgDescription: '',
        metaOgType: '',
        metaTwitterTitle: '',
        metaTwitterCard: '',
        metaTwitterImage: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        websitPageId: string().required('Required'),
        websiteMasterId: string().required('Required'),
        metaDescription: string().required('Required'),
        metaKeyword: string().required('Required'),
        metaOgTitle: string().required('Required'),
        metaOgUrl: string().url('URL must be valid').required('Required'),
        metaOgImage: string()
            .url('Image must be valid url')
            .required('Required'),
        metaOgDescription: string().required('Required'),
        metaOgType: string().required('Required'),
        metaTwitterTitle: string().required('Required'),
        metaTwitterCard: string().required('Required'),
        metaTwitterImage: string()
            .url('Image must be valid url')
            .required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        //console.log(values)
        setTimeout(() => {
            addWebsiteTags({
                websitPageId: values.websitPageId,
                websiteMasterId: values.websiteMasterId,
                metaDescription: values?.metaDescription || '',
                metaKeyword: values?.metaKeyword || '',
                metaOgTitle: values?.metaOgTitle || '',
                metaOgUrl: values?.metaOgUrl || '',
                metaOgImage: values?.metaOgImage || '',
                metaOgDescription: values?.metaOgDescription || '',
                metaOgType: values?.metaOgType || '',
                metaTwitterTitle: values?.metaTwitterTitle || '',
                metaTwitterCard: values?.metaTwitterCard || '',
                metaTwitterImage: values?.metaTwitterImage || '',
                companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Tags added successfully!')
                        navigate('/all-websites/website-tags')
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

    const dropdownOptions = {
        WebsiteOptions: websiteItems?.map((website: WebsiteListResponse) => {
            return {
                label: website.productName,
                value: website._id,
            }
        }),

        WebsitePageOptions: websitePageItems?.map(
            (page: WebsitePageListResponse) => {
                return {
                    label: page.pageName,
                    value: page._id,
                }
            }
        ),
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
                        <AddWebsiteTag
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            dropdownOptions={dropdownOptions}
                        />
                    )
                }}
            </Formik>
        </WebsiteLayout>
    )
}

export default AddWebsiteTagsWrapper
