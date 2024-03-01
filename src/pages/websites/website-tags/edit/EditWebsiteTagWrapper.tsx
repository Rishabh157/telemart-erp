/// ==============================================
// Filename:EditWebsiteTagsWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import EditWebsiteTag from './EditWebsiteTag'
import { showToast } from 'src/utils'
import {
    useGetWebsiteTagsByIdQuery,
    useUpdateWebsiteTagsMutation,
} from 'src/services/websites/WebsiteTagsServices'

import { useGetAllWebsiteQuery } from 'src/services/websites/WebsiteServices'
import { useGetAllWebsitePageQuery } from 'src/services/websites/WebsitePageServices'
import { setAllItems as setAllWebsites } from 'src/redux/slices/website/websiteSlice'
import { setAllItems as setAllWebsitePage } from 'src/redux/slices/website/websitePageSlice'
import { WebsiteListResponse } from 'src/models/website/Website.model'
import { WebsitePageListResponse } from 'src/models/website/WebsitePage.model'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedTags } from 'src/redux/slices/website/websiteTagsSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
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

const EditWebsiteTagWrapper = (props: Props) => {
    // Form Initial Values
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [updateWebsiteTags] = useUpdateWebsiteTagsMutation()

    const { selectedItem }: any = useSelector(
        (state: RootState) => state.websiteTags
    )
    const { isLoading, isFetching, data } = useGetWebsiteTagsByIdQuery(Id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedTags(data?.data || []))
        }
    }, [isLoading, isFetching, data, dispatch])

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
    } = useGetAllWebsiteQuery(userData?.companyId)

    useEffect(() => {
        if (!iswebsiteLoading && !isWebsiteFetching) {
            dispatch(setAllWebsites(WebsiteData?.data || []))
        }
    }, [dispatch, iswebsiteLoading, isWebsiteFetching, WebsiteData])

    const {
        isLoading: isPageLoading,
        isFetching: isPageFetching,
        data: PageData,
    } = useGetAllWebsitePageQuery(userData?.companyId)

    useEffect(() => {
        if (!isPageLoading && !isPageFetching) {
            dispatch(setAllWebsitePage(PageData?.data || []))
        }
    }, [isPageLoading, isPageFetching, PageData, dispatch])

    const initialValues: FormInitialValues = {
        websitPageId: selectedItem?.websitPageId || '',
        websiteMasterId: selectedItem?.websiteMasterId || '',
        metaDescription: selectedItem?.metaDescription || '',
        metaKeyword: selectedItem?.metaKeyword || '',
        metaOgTitle: selectedItem?.metaOgTitle || '',
        metaOgUrl: selectedItem?.metaOgUrl || '',
        metaOgImage: selectedItem?.metaOgImage || '',
        metaOgDescription: selectedItem?.metaOgDescription || '',
        metaOgType: selectedItem?.metaOgType || '',
        metaTwitterTitle: selectedItem?.metaTwitterTitle || '',
        metaTwitterCard: selectedItem?.metaTwitterCard || '',
        metaTwitterImage: selectedItem?.metaTwitterImage || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        websitPageId: string().required('Required'),
        websiteMasterId: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        setTimeout(() => {
            updateWebsiteTags({
                body: {
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
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Tags Updated successfully!')
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
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <EditWebsiteTag
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        dropdownOptions={dropdownOptions}
                    />
                )
            }}
        </Formik>
    )
}

export default EditWebsiteTagWrapper
