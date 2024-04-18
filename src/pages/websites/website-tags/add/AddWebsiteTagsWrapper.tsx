// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import { useAddWebsiteTagsMutation } from 'src/services/websites/WebsiteTagsServices'
import { showToast } from 'src/utils'
import AddWebsiteTag from './AddWebsiteTag'

import { useGetAllWebsitePageQuery } from 'src/services/websites/WebsitePageServices'
import { useGetAllWebsiteQuery } from 'src/services/websites/WebsiteServices'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
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

const AddWebsiteTagsWrapper = (props: Props) => {
    // Form Initial Values
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addWebsiteTags] = useAddWebsiteTagsMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

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
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

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
    const dropdownOptions = {
        WebsiteOptions: websiteItems,
        WebsitePageOptions: websitePageItems,
    }

    return (
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
    )
}

export default AddWebsiteTagsWrapper
