import React, { useEffect, useState } from 'react'
import MediaLayout from '../../MediaLayout'
import { useAddTapeMutation } from 'src/services/media/TapeManagementServices'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import AddTapeManagement from './AddTapeManagement'
import { SchemeListResponse } from 'src/models/scheme.model'

export type FormInitialValues = {
    tapeName: string
    channelGroup: string
    tapeType: string
    scheme: string
    language: string
    duration: string
    artist: string
    remarks: string
    companyId: string
}

const AddTapeManagementWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [schemeData, setSchemeData] = useState([])

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { channelgroup } = useSelector(
        (state: RootState) => state?.channelGroup
    )

    const [AddTapeApi] = useAddTapeMutation()

    const {
        isLoading: isSchemeLoading,
        isFetching: isSchemeFetching,
        data: schemeDataApi,
    } = useGetSchemeQuery(' ')
    const {
        isLoading,
        isFetching,
        data: TapeGroupsData,
    } = useGetAllChannelGroupQuery('')
    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setChannelGroups(TapeGroupsData.data || []))
        }
    }, [isLoading, isFetching, TapeGroupsData, dispatch])
    useEffect(() => {
        if (!isSchemeLoading && !isSchemeFetching) {
            setSchemeData(schemeDataApi?.data)
        }
    }, [isSchemeLoading, isSchemeFetching, schemeDataApi])
    const initialValues: FormInitialValues = {
        tapeName: '',
        channelGroup: '',
        tapeType: '',
        scheme: '',
        language: '',
        duration: '',
        artist: '',
        remarks: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        scheme: string().required('Scheme  is required'),
        TapeGroup: string().required('Tape group Name is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            AddTapeApi({
                tapeName: values.tapeName,
                channelGroup: values.channelGroup,
                tapeType: values.tapeType,
                scheme: values.scheme,
                language: values.language,
                duration: values.duration,
                artist: values.artist,
                remarks: values.remarks,
                companyId: values.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Tape added successfully!')
                        navigate('/media/Tape')
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
        channelGroupOptions:
            channelgroup?.map((channelGroup: GetAllChannelGroupResponse) => {
                return {
                    label: channelGroup.groupName,
                    value: channelGroup._id,
                }
            }) || [],
        schemeDataOption: schemeData?.map((schemeItem: SchemeListResponse) => {
            return {
                label: schemeItem?.schemeName,
                value: schemeItem?._id,
            }
        }),
        languageOptions: [],
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
                        <AddTapeManagement
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

export default AddTapeManagementWrapper
