// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import {
    useGetChannelByIdQuery,
    useUpdateChannelMutation,
} from 'src/services/media/ChannelManagementServices'
import { showToast } from 'src/utils'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { useGetAllChannelCategoryQuery } from 'src/services/media/ChannelCategoriesServices'
import EditChannelManagement from './EditChannelManagement'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { ChannelManagementListResponse } from 'src/models/Channel.model'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllCountryQuery } from 'src/services/CountryService'

// |-- Types --|
export type FormInitialValues = {
    channelName: string
    address: string
    phone: string
    email: string
    district: string
    channelGroupId: string
    contactPerson: string
    mobile: string
    country: string
    language: string
    channelCategory: string
    designation: string
    website: string
    state: string
    paymentType: string
    companyId: string
}
export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const EditChannelManagementWrapper = () => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const params = useParams()
    const id = params.id

    // Initiate Method
    const [EditChannelApi] = useUpdateChannelMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Hook
    const { items } = useGetDataByIdCustomQuery<ChannelManagementListResponse>({
        useEndPointHook: useGetChannelByIdQuery(id),
    })

    const { options: channelGroupOptions } = useCustomOptions({
        useEndPointHook: useGetAllChannelGroupQuery(userData?.companyId),
        keyName: 'groupName',
        value: '_id',
    })

    const { options: channelCategoryOptions } = useCustomOptions({
        useEndPointHook: useGetAllChannelCategoryQuery(userData?.companyId),
        keyName: 'channelCategory',
        value: '_id',
    })

    const { options: languageOptions } = useCustomOptions({
        useEndPointHook: useGetAllLanguageQuery(''),
        keyName: 'languageName',
        value: '_id',
    })

    const { options: countryOptions } = useCustomOptions({
        useEndPointHook: useGetAllCountryQuery(''),
        keyName: 'countryName',
        value: '_id',
    })

    const initialValues: FormInitialValues = {
        channelName: items?.channelName || '',
        address: items?.address || '',
        phone: items?.phone || '',
        email: items?.email || '',
        district: items?.districtId || '',
        channelGroupId: items?.channelGroupId || '',
        contactPerson: items?.contactPerson || '',
        mobile: items?.mobile || '',
        country: items?.countryId || '',
        language: items?.languageId || '',
        channelCategory: items?.channelCategoryId || '',
        designation: items?.designation || '',
        website: items?.website || '',
        state: items?.stateId || '',
        paymentType: items?.paymentType || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        channelName: string().required('Required'),
        address: string(),
        phone: string(),
        email: string().email('Invalid  Email'),
        district: string().required('Required'),
        channelGroupId: string().required('Required'),
        contactPerson: string(),
        mobile: string()
            .max(10)
            .trim()
            .matches(regIndiaPhone, 'Invalid Mobile Number'),
        country: string().required('Required'),
        language: string().required('Required'),
        channelCategory: string().required('Required'),
        designation: string().required('Required'),
        website: string(),
        state: string().required('Required'),
        paymentType: string().required('Required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            EditChannelApi({
                body: {
                    channelName: values.channelName,
                    address: values.address,
                    phone: values.phone,
                    email: values.email,
                    districtId: values.district,
                    channelGroupId: values.channelGroupId,
                    contactPerson: values.contactPerson,
                    mobile: values.mobile,
                    countryId: values.country,
                    languageId: values.language,
                    channelCategoryId: values.channelCategory,
                    designation: values.designation,
                    website: values.website,
                    stateId: values.state,
                    paymentType: values.paymentType,
                    companyId: values.companyId || '',
                },
                id: id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Channel added successfully!')
                        navigate('/media/channel')
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
        channelGroupOptions,
        channelCategoryOptions,
        countryOptions,
        languageOptions,
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <EditChannelManagement
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditChannelManagementWrapper
