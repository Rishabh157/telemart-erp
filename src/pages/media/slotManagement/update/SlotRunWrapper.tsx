/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import { object, string, boolean } from 'yup'
import UpdateSlotRun from './UpdateSlotRun'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import {
    useGetSlotMangementByIdQuery,
    useUpdateSlotMutation,
} from 'src/services/media/SlotManagementServices'
import { setSelectedItems } from 'src/redux/slices/media/slotManagementSlice'

type FormInitialValues = {
    slotName: string
    channelGroupId: string
    type: string
    tapeNameId: String
    channelNameId: string
    channelTrp: string
    remarks: string
    slotDate: string
    slotStartTime: string
    slotEndTime: string
    runYoutubeLink: string
    runStatus: boolean
    run: boolean
    showOk: boolean
    slotRunImage: string
    slotRunVideo: string
    reasonNotShow: string | null
    runStartTime: string
    runEndTime: string
    runRemark: string
    companyId: string
}
type SlotRunWrapperProps = {
    id: string
    setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}
const SlotRunWrapper: React.FC<SlotRunWrapperProps> = ({
    id,
    setIsOpenDialog,
}) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateSlot] = useUpdateSlotMutation()
    const { selectedItems }: any = useSelector(
        (state: RootState) => state.slotManagement
    )
    const { data, isLoading, isFetching } = useGetSlotMangementByIdQuery(id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedItems(data?.data || []))
        }
    }, [data, dispatch, isLoading, isFetching])

    useEffect(() => {
        return () => {
            dispatch(setSelectedItems([]))
        }
    }, [dispatch])

    //console.log(selectedItems)

    const initialValues: FormInitialValues = {
        slotName: selectedItems?.slotName || '',
        channelGroupId: selectedItems?.channelGroupId || '',
        type: selectedItems?.type || '',
        tapeNameId: selectedItems?.tapeNameId || '',
        channelNameId: selectedItems?.channelNameId || '',
        channelTrp: selectedItems?.channelTrp || '',
        remarks: selectedItems?.reamrks || '',
        slotDate: selectedItems?.slotDate || '',
        slotStartTime: selectedItems?.slotStartTime || '',
        slotEndTime: selectedItems?.slotEndTime || '',
        runYoutubeLink: selectedItems?.runYoutubeLink || '',
        runStatus: selectedItems?.runStatus || false,
        run: selectedItems?.run || false,
        slotRunImage: selectedItems?.slotRunImage || '',
        slotRunVideo: selectedItems?.slotRunVideo || '',
        showOk: selectedItems?.showOk || true,
        reasonNotShow: selectedItems?.reasonNotShow || '',
        runStartTime: selectedItems?.runStartTime || '',
        runEndTime: selectedItems?.runEndTime || '',
        runRemark: selectedItems?.runRemark || '',
        companyId: selectedItems?.companyId || '',
    }
    const validationSchema = object({
        run: boolean(),
        //reasonNotShow:string().required('Required'),
        runStartTime: string().required('Required'),
        runEndTime: string().required('Required'),
        runRemark: string().required('Required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        var newRunStatus: boolean = false
        if (values?.runStartTime !== '' && values?.runEndTime !== '') {
            newRunStatus = true
        }
        //console.log(newRunStatus);
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
                    slotDate: values?.slotDate,
                    slotStartTime: values?.slotStartTime,
                    slotEndTime: values?.slotEndTime,
                    runYoutubeLink: values?.runYoutubeLink || '',
                    runStatus: newRunStatus,
                    run: values?.run,
                    slotRunImage: values?.slotRunImage || '',
                    slotRunVideo: values?.slotRunVideo || '',
                    showOk: values?.showOk || true,
                    reasonNotShow: values?.reasonNotShow || null,
                    runStartTime: values?.runStartTime || '',
                    runEndTime: values?.runEndTime || '',
                    runRemark: values?.runRemark,
                    companyId: values?.companyId,
                },
                id: id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Status Updated successfully!')
                        setIsOpenDialog(false)
                        navigate('/media/slot')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <UpdateSlotRun
                            dropdownOptions={[]}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </>
    )
}

export default SlotRunWrapper
