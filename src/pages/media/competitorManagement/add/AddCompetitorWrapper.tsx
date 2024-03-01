/// ==============================================
// Filename:AddCompitorWrapper.tsx
// Type: Add Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import AddCompetitor from './Addcompetitor'
// import { useAddCompetitorsMutation } from 'src/services/AttributeService'
import { showToast } from 'src/utils'
import { useAddcompetitorMutation } from 'src/services/media/CompetitorManagementServices'

import { useGetPaginationchannelQuery } from 'src/services/media/ChannelManagementServices'
import { ChannelManagementListResponse } from 'src/models/Channel.model'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setChannelMgt } from 'src/redux/slices/media/channelManagementSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { LanguageListResponse } from 'src/models'
import { setLanguage } from 'src/redux/slices/languageSlice'
import { useGetAllLanguageQuery } from 'src/services/LanguageService'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    competitorName: string
    productName: string
    channelNameId: string
    schemePrice: string
    ytLink: string
    websiteLink: string
    date: string | null
    startTime: string
    endTime: string
    mobileNumber: string
    languageId: string
    productCategory: string
    image: string[]
}

const AddCompetitorWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addCompetitor] = useAddcompetitorMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { channelMgt } = useSelector(
        (state: RootState) => state?.channelManagement
    )
    const { language } = useSelector((state: RootState) => state?.language)

    const {
        isLoading: isLanguageLoading,
        isFetching: isLanguageFetching,
        data: languageDataApi,
    } = useGetAllLanguageQuery('')

    const { data, isLoading, isFetching } = useGetPaginationchannelQuery({
        limit: 10,
        searchValue: '',
        params: ['channelName'],
        page: 1,
        filterBy: [
            {
                fieldName: '',
                value: [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: false,
    })

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setChannelMgt(data?.data || []))
        }
    }, [dispatch, data, isLoading, isFetching])

    useEffect(() => {
        if (!isLanguageLoading && !isLanguageFetching) {
            dispatch(setLanguage(languageDataApi?.data || []))
        }
    }, [isLanguageLoading, isLanguageFetching, languageDataApi, dispatch])

    const dropdownOptions = {
        channelOptions:
            channelMgt?.map((channel: ChannelManagementListResponse) => {
                return {
                    label: channel.channelName,
                    value: channel._id,
                }
            }) || [],
        languageOptions: language?.map((languageItem: LanguageListResponse) => {
            return {
                label: languageItem?.languageName,
                value: languageItem?._id,
            }
        }),
    }

    const initialValues: FormInitialValues = {
        competitorName: '',
        productName: '',
        websiteLink: '',
        ytLink: '',
        schemePrice: '',
        channelNameId: '',
        startTime: '',
        endTime: '',
        date: '',
        mobileNumber: '',
        languageId: '',
        productCategory: '',
        image: [''],
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('Required'),
        productName: string().required('Required'),
        websiteLink: string(),
        ytLink: string().url('Invalid URL'),
        channelNameId: string().required('Required'),
        startTime: string().required('Required'),
        endTime: string().required('Required'),
        date: string().required('Required'),
        languageId: string().required('Language is required'),
        mobileNumber: string()
            .required('Required')
            .min(10, 'Number should be 10 digits')
            .max(10, 'maximum 10 digit')
            .required('Required'),

        productCategory: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addCompetitor({
                competitorName: values.competitorName || '',
                productCategory: values.productCategory || '',
                companyId: userData?.companyId || '',
                date: values.date || '',
                productName: values.productName || '',
                channelNameId: values.channelNameId || '',
                schemePrice: values.schemePrice || '',
                websiteLink: values.websiteLink || '',
                ytLink: values.ytLink || '',
                mobileNumber: values.mobileNumber || '',
                startTime: values.startTime || '',
                endTime: values.endTime || '',
                languageId: values.languageId || '',
                image: values.image || [],
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Compititor added successfully!')
                        navigate('/media/competitor')
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddCompetitor
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default AddCompetitorWrapper
