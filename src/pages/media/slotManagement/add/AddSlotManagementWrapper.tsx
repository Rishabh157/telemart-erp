// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { array, boolean, number, object, string } from 'yup'
import { Formik, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import AddSlotManagement from './AddSlotManagement'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { useAddSlotMutation } from 'src/services/media/SlotDefinitionServices'
import { useGetAllChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { useGetAllTapeMangementQuery } from 'src/services/media/TapeManagementServices'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types --|
export type FormInitialValues = {
    slotName: string
    channelGroup: string
    type: string
    slotPrice: number
    slotDay: string[]
    slotStartTime: string
    slotEndTime: string
    slotStartDate: string
    slotRenewal: string
    slotContinueStatus: boolean
    tapeName: string
    channelName: string
    channelTrp: string
    remarks: string
    runYoutubeLink: string
    companyId: string
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const AddSlotManagementWrapper = () => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Initiate Method
    const [addSlotManagement] = useAddSlotMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Hook
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
        slotName: '',
        channelGroup: '',
        type: '',
        slotPrice: 0,
        slotDay: [],
        slotStartTime: '',
        slotStartDate: '',
        slotRenewal: '',
        slotEndTime: '',
        slotContinueStatus: true,
        tapeName: '',
        channelName: '',
        channelTrp: '',
        remarks: '',
        runYoutubeLink: '',
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
        addSlotManagement({
            slotName: values.slotName,
            channelGroupId: values.channelGroup,
            type: values.type,
            tapeNameId: values.tapeName,
            channelNameId: values.channelName,
            channelTrp: values.channelTrp,
            remarks: values.remarks,
            slotPrice: values.slotPrice,
            slotDay: values.slotDay,
            slotStartTime: values.slotStartTime,
            slotStartDate: values.slotStartDate,
            slotRenewal: values.slotRenewal,
            slotEndTime: values.slotEndTime,
            slotContinueStatus: values.slotContinueStatus,
            companyId: values.companyId || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Slot Added successfully!')
                    navigate('/media/slot/defination')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    const dropdownOptions = {
        channelGroupOptions,
        channelNameOptions,
        tapeManagementOptions,
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <AddSlotManagement
                        dropdownOptions={dropdownOptions}
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddSlotManagementWrapper
