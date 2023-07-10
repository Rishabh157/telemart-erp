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
import MediaLayout from '../../MediaLayout'
import { useGetPaginationchannelQuery } from 'src/services/media/ChannelManagementServices'
import { ChannelManagementListResponse } from 'src/models/Channel.model'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setChannelMgt } from 'src/redux/slices/media/channelManagementSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    competitorName: string
    companyName: string
    productName: string
    websiteLink: string
    youtubeLink: string
    whatsappNumber: string
    schemePrice: string
    channelNameId: string
    startTime: string
    endTime: string
    date: string | null
    mobileNumber: string
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

    const dropdownOptions = {
        channelOptions:
            channelMgt?.map((channel: ChannelManagementListResponse) => {
                return {
                    label: channel.channelName,
                    value: channel._id,
                }
            }) || [],
    }

    const initialValues: FormInitialValues = {
        competitorName: '',
        companyName: '',
        productName: '',
        websiteLink: '',
        youtubeLink: '',
        whatsappNumber: '',
        schemePrice: '',
        channelNameId: '',
        startTime: '',
        endTime: '',
        date: '',
        mobileNumber: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('Required'),
        companyName: string().required('Required'),
        productName: string().required('Required'),
        websiteLink: string().url('Invalid URL').required('Required'),
        youtubeLink: string().url('Invalid URL').required('Required'),
        whatsappNumber: string()
            .min(10, 'Number should be 10 digits')
            .max(10, 'maximum 10 digit')
            .required('Required'),
        schemePrice: string().required('Required'),
        channelNameId: string().required('Required'),
        startTime: string().required('Required'),
        endTime: string().required('Required'),
        date: string().required('Required'),
        mobileNumber: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addCompetitor({
                // channelNameId: values.channelNameId || '',
                // date: values.date || '',
                // productName: values.productName || '',
                // websiteLink: values.websiteLink || '',
                // video : values.youtubeLink || '',
                // mobileNumber: values.mobileNumber || '',
                // schemePrice: values.schemePrice || '',
                // startTime: values.startTime || '',
                // endTime: values.endTime || '',

                date: values.date || '',
                artist: values.companyName || '',
                // companyName: values.companyName || '',
                productName: values.productName || '',
                websiteLink: values.websiteLink || '',
                video: values.youtubeLink || '',
                schemePrice: values.schemePrice || '',
                // whatsappNumber: values.whatsappNumber || '',
                channelNameId: values.channelNameId || '',
                startTime: values.startTime || '',
                endTime: values.endTime || '',
                companyId: userData?.companyId || '',
                mobileNumber: values.mobileNumber || '',

                // competitorName: values.competitorName,
                // companyName: values.companyName,
                // productName: values.productName,
                // websiteLink: values.websiteLink,
                // youtubeLink: values.youtubeLink,
                // whatsappNumber: values.whatsappNumber,
                // schemePrice: values.schemePrice,
                // startTime: values.startTime,
                // endTime: values.endTime,
                // companyId: userData?.companyId || '',
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
        <MediaLayout>
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
        </MediaLayout>
    )
}

export default AddCompetitorWrapper
