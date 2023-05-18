import React, { useEffect, useState } from 'react'
import MediaLayout from '../../MediaLayout'
import { useAddChannelMutation } from 'src/services/media/ChannelManagementServices'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import AddChannelManagement from './AddChannelManagement'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
import { useGetAllDidQuery } from 'src/services/media/DidManagementServices'
import { useGetSchemeQuery } from 'src/services/SchemeService'

export type FormInitialValues = {
    didNumber: string
    scheme: string
    channelGroupId: string
    channelName: string
    companyId: string
}

const AddChannelManagementWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [didData, setDidData] = useState([])
    const [schemeData, setSchemeData] = useState([])

    const { userData } = useSelector((state: RootState) => state?.auth)
    const { channelgroup }: any = useSelector(
        (state: RootState) => state?.channelGroup
    )
    const [AddChannelApi] = useAddChannelMutation()
    const {
        isLoading: isDidLoading,
        isFetching: isDidFetching,
        data: didDataApi,
    } = useGetAllDidQuery('')
    const {
        isLoading: isSchemeLoading,
        isFetching: isSchemeFetching,
        data: schemeDataApi,
    } = useGetSchemeQuery(' ')
    const {
        isLoading,
        isFetching,
        data: channelGroupsData,
    } = useGetAllChannelGroupQuery('')
    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setChannelGroups(channelGroupsData.data || []))
        }
    }, [isLoading, isFetching, channelGroupsData, dispatch])
    useEffect(() => {
        if (!isDidLoading && !isDidFetching) {
            setDidData(didDataApi?.data)
        }
    }, [isDidLoading, isDidFetching, didDataApi])
    useEffect(() => {
        if (!isSchemeLoading && !isSchemeFetching) {
            setSchemeData(schemeDataApi?.data)
        }
    }, [isSchemeLoading, isSchemeFetching, schemeDataApi])
    const initialValues: FormInitialValues = {
        didNumber: '',
        scheme: '',
        channelGroupId: '',
        channelName: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        didNumber: string().required('DID Number is required'),
        scheme: string().required('Scheme  is required'),
        channelGroupId: string().required('Channel group Name is required'),
        channelName: string().required('Channel Name is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddChannelApi({
                didNumber: values.didNumber,
                scheme: values.scheme,
                channelGroupId: values.channelGroupId,
                channelName: values.channelName,
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
        channelGroupOptions: channelgroup?.map(
            (channelGroup: GetAllChannelGroupResponse) => {
                return {
                    label: channelGroup.groupName,
                    value: channelGroup._id,
                }
            }
        ),
        didDataOption: didData?.map((didItem: any) => {
            return {
                label: didItem.didNumber,
                value: didItem._id,
            }
        }),
        schemeDataOption: schemeData?.map((schemeItem: any) => {
            return {
                label: schemeItem?.schemeName,
                value: schemeItem?._id,
            }
        }),
    }
    return (
        <MediaLayout>
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
        </MediaLayout>
    )
}

export default AddChannelManagementWrapper
