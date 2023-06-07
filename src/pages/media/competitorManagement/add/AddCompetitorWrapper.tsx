import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string} from 'yup'
import AddCompetitor from './Addcompetitor'
// import { useAddCompetitorsMutation } from 'src/services/AttributeService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useAddcompetitorMutation } from 'src/services/media/CompetitorManagementServices'
import MediaLayout from '../../MediaLayout'
import { useGetPaginationchannelQuery } from 'src/services/media/ChannelManagementServices'
import { setChannelMgt } from 'src/redux/slices/media/channelManagementSlice'
import { ChannelManagementListResponse } from 'src/models/Channel.model'

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
        channelOptions: channelMgt?.map(
            (channel: ChannelManagementListResponse) => {
                return {
                    label: channel.channelName,
                    value: channel._id,
                }
            }
        ) || [],
    }

    const initialValues: FormInitialValues = {
        competitorName: '',
        companyName: '',
        productName: '',
        websiteLink: '',
        youtubeLink: '',
        whatsappNumber: '',
        schemePrice: '0',
        channelNameId: '',
        startTime: '',
        endTime: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('Required'),
        productName: string().required('Required'),
        websiteLink: string().url().required('Required'),
        youtubeLink: string().url().required('Required'),
        whatsappNumber: string()
        .min(10, 'Number should be 10 digits')
        .max(10, 'maximum 10 digit')
        .required('Required'),
        schemePrice: string().required('Required'),           
        channelNameId: string().required('Required'),
        startTime: string().required('Required'),
        endTime: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addCompetitor({
                competitorName: values.competitorName,
                companyName: values.companyName,
                productName: values.productName,
                websiteLink: values.websiteLink,
                youtubeLink: values.youtubeLink,
                whatsappNumber: values.whatsappNumber,
                schemePrice: values.schemePrice,
                channelNameId: values.channelNameId || '',
                startTime: values.startTime,
                endTime: values.endTime,
                companyId: userData?.companyId || '',
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
