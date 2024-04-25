// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { Formik, FormikProps } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { array, boolean, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import EditSlotManagement from './EditSlotManagement'
import { SlotManagementListResponse } from 'src/models/Slot.model'

// |-- Redux --|
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import {
    useGetSlotMangementByIdQuery,
    useUpdateSlotMutation,
} from 'src/services/media/SlotDefinitionServices'
import { useGetAllTapeMangementQuery } from 'src/services/media/TapeManagementServices'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types --|
export type FormInitialValues = {
    slotName: string
    channelGroupId: string
    slotPrice: number
    slotDay: string[]
    slotStartTime: string
    slotEndTime: string
    slotRenewal: string
    slotContinueStatus: boolean
    type: string
    tapeNameId: string
    channelNameId: string
    channelTrp: string
    remarks: string
    companyId: string
    slotStartDate: string
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const EditSlotManagementWrapper = () => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const params = useParams()
    const id = params.id

    // Initiate Method
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [updateSlot] = useUpdateSlotMutation()

    // Hook
    const { items } = useGetDataByIdCustomQuery<SlotManagementListResponse>({
        useEndPointHook: useGetSlotMangementByIdQuery(id || ''),
    })

    const { options: channelGroupOptions } = useCustomOptions({
        useEndPointHook: useGetAllChannelGroupQuery(userData?.companyId),
        keyName: 'groupName',
        value: '_id',
    })

    const { options: channelNameOptions } = useCustomOptions({
        useEndPointHook: useGetAllChannelQuery(userData?.companyId),
        keyName: 'channelName',
        value: '_id',
    })

    const { options: tapeManagementOptions } = useCustomOptions({
        useEndPointHook: useGetAllTapeMangementQuery(userData?.companyId),
        keyName: 'tapeName',
        value: '_id',
    })

    const initialValues: FormInitialValues = {
        slotName: items?.slotName || '',
        channelGroupId: items?.channelGroupId || '',
        type: items?.type || '',
        tapeNameId: items?.tapeNameId || '',
        channelNameId: items?.channelNameId || '',
        slotPrice: items?.slotPrice || 0,
        slotDay: items?.slotDay || [],
        slotStartTime: items?.slotStartTime || '',
        slotEndTime: items?.slotEndTime || '',
        slotRenewal: items?.slotRenewal || '',
        slotContinueStatus: items?.slotContinueStatus || false,
        channelTrp: items?.channelTrp || '',
        remarks: items?.remarks || '',
        slotStartDate: items?.slotStartDate || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        slotName: string().required('Required'),
        channelGroup: string().required('Required'),
        type: string().required('Required'),
        slotPrice: number().required('Required'),
        slotStartDate: string().required('Required'),
        slotDay: array()
            .of(string())
            .min(1, 'At least one day is required')
            .required('Required'),
        slotStartTime: string().required('Required'),
        slotEndTime: string().required('Required'),
        slotContinueStatus: boolean().required('Required'),
        tapeName: string().required('Required'),
        channelName: string().required('Required'),
        channelTrp: string(),
        remarks: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            updateSlot({
                body: {
                    slotName: values?.slotName,
                    channelGroupId: values?.channelGroupId,
                    type: values?.type,
                    tapeNameId: values?.tapeNameId,
                    channelNameId: values?.channelNameId,
                    channelTrp: values?.channelTrp,
                    remarks: values?.remarks,
                    slotPrice: values.slotPrice,
                    slotDay: values.slotDay,
                    slotStartTime: values.slotStartTime,
                    slotEndTime: values.slotEndTime,
                    slotRenewal: values.slotRenewal,
                    slotContinueStatus: values.slotContinueStatus,
                    slotStartDate: values.slotStartDate,
                    companyId: values?.companyId,
                },
                id: id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Slot Updated successfully!')
                        navigate('/media/slot/defination')
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
        channelNameOptions,
        tapeManagementOptions,
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
                    <EditSlotManagement
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditSlotManagementWrapper
