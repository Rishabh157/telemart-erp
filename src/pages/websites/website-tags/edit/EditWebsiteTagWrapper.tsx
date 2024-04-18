// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import {
    useGetWebsiteTagsByIdQuery,
    useUpdateWebsiteTagsMutation,
} from 'src/services/websites/WebsiteTagsServices'
import { showToast } from 'src/utils'
import EditWebsiteTag from './EditWebsiteTag'

import { useGetAllWebsitePageQuery } from 'src/services/websites/WebsitePageServices'
import { useGetAllWebsiteQuery } from 'src/services/websites/WebsiteServices'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

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

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetWebsiteTagsByIdQuery(Id),
    })

    const { options: websiteItems } = useCustomOptions({
        useEndPointHook: useGetAllWebsiteQuery(userData?.companyId),
        keyName: 'productName',
        value: '_id',
    })

    const { options: websitePageItems } = useCustomOptions({
        useEndPointHook: useGetAllWebsitePageQuery(userData?.companyId),
        keyName: 'pageName',
        value: '_id',
    })

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
        WebsiteOptions: websiteItems,
        WebsitePageOptions: websitePageItems
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
