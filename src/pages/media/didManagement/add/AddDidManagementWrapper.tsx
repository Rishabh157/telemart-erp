/// ==============================================
// Filename:AddDidManagementWrapper.tsx
// Type: Add Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import MediaLayout from '../../MediaLayout'
import { useAddDidMutation } from 'src/services/media/DidManagementServices'
import { showToast } from 'src/utils'
import AddDidManagements from './AddDidManagement'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { SchemeListResponse } from 'src/models/scheme.model'
import { ChannelManagementListResponse } from 'src/models/Channel.model'


// |-- Redux--|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types--|
export type FormInitialValues = {
    didNumber: string
    companyId: string
    schemeId: string
    channelId: string
}

const AddDidManagementWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddDidManagement] = useAddDidMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [channel, setChannel] = useState([])
    const [schemeData, setSchemeData] = useState([])

    const initialValues: FormInitialValues = {
        didNumber: '',
        schemeId: '',
        channelId: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        didNumber: string().required('Did number is required'),
        schemeId: string().required('Scheme is required'),
        channelId: string().required('Channel name is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            AddDidManagement({
                didNumber: values.didNumber,
                schemeId: values.schemeId,
                channelId: values.channelId,
                companyId: values.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Did Number added successfully!')
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddDidManagements
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

export default AddDidManagementWrapper
