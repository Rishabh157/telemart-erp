/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditChannelManagementWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'


// |-- External Dependencies --|
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import MediaLayout from '../../MediaLayout'
import {
    useGetChannelByIdQuery,
    useUpdateChannelMutation,
} from 'src/services/media/ChannelManagementServices'
import { showToast } from 'src/utils'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
import { useGetAllCountryQuery } from 'src/services/CountryService'
import { CountryListResponse } from 'src/models/Country.model'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'
import { LanguageListResponse } from 'src/models'
import { useGetAllChannelCategoryQuery } from 'src/services/media/ChannelCategoriesServices'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'
import EditChannelManagement from './EditChannelManagement'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
import { setSelectedItem } from 'src/redux/slices/media/channelManagementSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

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
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [countryData, setCountryData] = useState([])
    const [languageData, setlanguageData] = useState([])
    const [channelCategoryData, setChannelCategoryData] = useState([])
    const {
        data: chData,
        isLoading: chIsLoading,
        isFetching: chIsFetching,
    } = useGetChannelByIdQuery(Id)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem } = useSelector(
        (state: RootState) => state?.channelManagement
    )

    const { channelgroup }: any = useSelector(
        (state: RootState) => state?.channelGroup
    )
    const [EditChannelApi] = useUpdateChannelMutation()
    const {
        isLoading: isLanguageLoading,
        isFetching: isLanguageFetching,
        data: languageDataApi,
    } = useGetAllLanguageQuery('')
    const {
        isLoading: isCategoryLoading,
        isFetching: isCategoryFetching,
        data: categoryDataApi,
    } = useGetAllChannelCategoryQuery(userData?.companyId)
    const {
        isLoading: isCountryLoading,
        isFetching: isCountryFetching,
        data: countryDataApi,
    } = useGetAllCountryQuery('')

    const {
        isLoading,
        isFetching,
        data: channelGroupsData,
    } = useGetAllChannelGroupQuery(userData?.companyId)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setChannelGroups(channelGroupsData?.data || []))
        }
    }, [isLoading, isFetching, channelGroupsData, dispatch])
    useEffect(() => {
        if (!isCountryLoading && !isCountryFetching) {
            setCountryData(countryDataApi?.data)
        }
    }, [isCountryLoading, isCountryFetching, countryDataApi])
    useEffect(() => {
        if (!isLanguageLoading && !isLanguageFetching) {
            setlanguageData(languageDataApi?.data)
        }
    }, [isLanguageLoading, isLanguageFetching, languageDataApi])
    useEffect(() => {
        if (!isCategoryLoading && !isCategoryFetching) {
            setChannelCategoryData(categoryDataApi?.data)
        }
    }, [isCategoryLoading, isCategoryFetching, categoryDataApi])

    useEffect(() => {
        if (!chIsLoading && !chIsFetching) {
            dispatch(setSelectedItem(chData?.data))
        }
    }, [chIsLoading, chIsFetching, chData])

    const initialValues: FormInitialValues = {
        channelName: selectedItem?.channelName || '',
        address: selectedItem?.address || '',
        phone: selectedItem?.phone || '',
        email: selectedItem?.email || '',
        district: selectedItem?.districtId || '',
        channelGroupId: selectedItem?.channelGroupId || '',
        contactPerson: selectedItem?.contactPerson || '',
        mobile: selectedItem?.mobile || '',
        country: selectedItem?.countryId || '',
        language: selectedItem?.languageId || '',
        channelCategory: selectedItem?.channelCategoryId || '',
        designation: selectedItem?.designation || '',
        website: selectedItem?.website || '',
        state: selectedItem?.stateId || '',
        paymentType: selectedItem?.paymentType || '',
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
                id: Id || '',
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
        channelGroupOptions: channelgroup?.map(
            (channelGroup: GetAllChannelGroupResponse) => {
                return {
                    label: channelGroup.groupName,
                    value: channelGroup._id,
                }
            }
        ),
        countryOption: countryData?.map((country: CountryListResponse) => {
            return {
                label: country.countryName,
                value: country._id,
            }
        }),
        languageOption: languageData?.map((language: LanguageListResponse) => {
            return {
                label: language.languageName,
                value: language._id,
            }
        }),
        categoryOption: channelCategoryData?.map(
            (category: ChannelCategoryListResponse) => {
                return {
                    label: category.channelCategory,
                    value: category._id,
                }
            }
        ),
        paymentOptions: [
            { label: 'checque', value: 'CHECQUE' },
            { label: 'netBanking', value: 'NETBANKING' },
            { label: 'cash', value: 'CASH' },
            { label: 'creditCard', value: 'CREDITCARD' },
            { label: 'debitCard', value: 'DEBITCARD' },
        ],
    }
    return (
        <MediaLayout>
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
        </MediaLayout>
    )
}

export default EditChannelManagementWrapper
