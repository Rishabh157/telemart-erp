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
    days: string[]
    tapeNameId: String
    channelNameId: string
    channelTrp: string
    remarks: string
    slotDate: string
    slotStartTime: string
    slotEndTime: string
    runStatus: boolean
    run: boolean
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
    }, [])

    //console.log(selectedItems)

    const initialValues: FormInitialValues = {
        slotName: selectedItems?.slotName || '',
        channelGroupId: selectedItems?.channelGroupId || '',
        type: selectedItems?.type || '',
        days: selectedItems?.days || [],
        tapeNameId: selectedItems?.tapeNameId || '',
        channelNameId: selectedItems?.channelNameId || '',
        channelTrp: selectedItems?.channelTrp || '',
        remarks: selectedItems?.reamrks || '',
        slotDate: selectedItems?.slotDate || '',
        slotStartTime: selectedItems?.slotStartTime || '',
        slotEndTime: selectedItems?.slotEndTime || '',
        runStatus: selectedItems?.runStatus || false,
        run: selectedItems?.run || false,
        runStartTime: selectedItems?.runStartTime || '',
        runEndTime: selectedItems?.runEndTime || '',
        runRemark: selectedItems?.runRemark || '',
        companyId: selectedItems?.companyId || '',
    }
    const validationSchema = object({
        run: boolean(),
        runStartTime: string(),
        runEndTime: string(),
        runRemark: string(),
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
                    days: values?.days,
                    tapeNameId: values?.tapeNameId,
                    channelNameId: values?.channelNameId,
                    channelTrp: values?.channelTrp,
                    remarks: values?.remarks,
                    slotDate: values?.slotDate,
                    slotStartTime: values?.slotStartTime,
                    slotEndTime: values?.slotEndTime,
                    runStatus: newRunStatus,
                    run: values?.run,
                    runStartTime: values?.runStartTime,
                    runEndTime: values?.runEndTime,
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
