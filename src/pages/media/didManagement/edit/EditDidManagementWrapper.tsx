/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditDidManagementWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'


// |-- Internal Dependencies --|
import MediaLayout from '../../MediaLayout'
import { showToast } from 'src/utils'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { SchemeListResponse } from 'src/models/scheme.model'
import { ChannelManagementListResponse } from 'src/models/Channel.model'
import EditDidManagements from './EditDidManagement'
import {
    useGetDidByIdQuery,
    useUpdateDidMutation,
} from 'src/services/media/DidManagementServices'


// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/media/didManagementSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
export type FormInitialValues = {
    didNumber: string
    companyId: string
    schemeId: string
    channelId: string
}

const EditDidManagementWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const {
        data: didData,
        isLoading: didIsLoading,
        isFetching: didIsFetching,
    } = useGetDidByIdQuery(Id)
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [EditDidManagement] = useUpdateDidMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem } = useSelector(
        (state: RootState) => state?.didManagement
    )
    const [channel, setChannel] = useState([])
    const [schemeData, setSchemeData] = useState([])

    const initialValues: FormInitialValues = {
        didNumber: selectedItem?.didNumber || '',
        schemeId: selectedItem?.schemeId || '',
        channelId: selectedItem?.channelId || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        didNumber: string().required('Did number is required'),
        schemeId: string().required('Scheme is required'),
        channelId: string().required('Cahnnel name is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            EditDidManagement({
                body: {
                    didNumber: values.didNumber,
                    schemeId: values.schemeId,
                    channelId: values.channelId,
                    companyId: values.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Did updated successfully!')
                        navigate('/media/did')
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

    const {
        isLoading: isSchemeLoading,
        isFetching: isSchemeFetching,
        data: schemeDataApi,
    } = useGetSchemeQuery(userData?.companyId)
    const {
        isLoading,
        isFetching,
        data: channelData,
    } = useGetAllChannelQuery(userData?.companyId)
    useEffect(() => {
        if (!isLoading && !isFetching) {
            setChannel(channelData?.data)
        }
    }, [isLoading, isFetching, channelData])

    useEffect(() => {
        if (!isSchemeLoading && !isSchemeFetching) {
            setSchemeData(schemeDataApi?.data)
        }
    }, [isSchemeLoading, isSchemeFetching, schemeDataApi])

    useEffect(() => {
        if (!didIsLoading && !didIsFetching) {
            dispatch(setSelectedItem(didData?.data))
        }
    }, [didIsLoading, didIsFetching, didData])

    const dropdownOptions = {
        channelOptions: channel?.map(
            (channelItem: ChannelManagementListResponse) => {
                return {
                    label: channelItem.channelName,
                    value: channelItem._id,
                }
            }
        ),

        schemeDataOption: schemeData?.map((schemeItem: SchemeListResponse) => {
            return {
                label: schemeItem?.schemeName,
                value: schemeItem?._id,
            }
        }),
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
                        <EditDidManagements
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            dropdownOptions={dropdownOptions}
                        />
                    )
                }}
            </Formik>
        </MediaLayout>
    )
}

export default EditDidManagementWrapper
