// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import AddChannelManagement from './AddChannelManagement'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState } from 'src/redux/store'
import { useGetAllChannelCategoryQuery } from 'src/services/media/ChannelCategoriesServices'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { useAddChannelMutation } from 'src/services/media/ChannelManagementServices'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
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

const AddChannelManagementWrapper = () => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Initiate Method
    const [addChannelApi] = useAddChannelMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Hook
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
        channelName: '',
        address: '',
        phone: '',
        email: '',
        district: '',
        channelGroupId: '',
        contactPerson: '',
        mobile: '',
        country: '',
        language: '',
        channelCategory: '',
        designation: '',
        website: '',
        state: '',
        paymentType: '',
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
            addChannelApi({
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <AddChannelManagement
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddChannelManagementWrapper
