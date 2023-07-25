/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:SlotRunWrapper.tsx
// Type: Update Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import UpdateSlotRun from './UpdateSlotRun'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItems } from 'src/redux/slices/media/slotManagementSlice'
import {
    useGetSlotViewByIdQuery,
    useUpdateSlotViewMutation,
} from 'src/services/media/SlotsViewServices'

// |-- Types --|
type FormInitialValues = {
    slotName: string
    channelGroupId: string
    type: string
    tapeNameId: String
    channelNameId: string
    channelTrp: string
    remarks: string
    slotPrice: number
    slotDay: string[]
    slotStartTime: string
    slotEndTime: string
    // slotStartDate: string
    slotContinueStatus: boolean
    runYoutubeLink: string
    runStatus: boolean
    run: boolean
    showOk: boolean
    slotRunImage: string
    // slotRunVideo: string
    reasonNotShow: string | null
    // runStartTime: string
    // runEndTime: string
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
    const [updateSlot] = useUpdateSlotViewMutation()
    const { selectedItems }: any = useSelector(
        (state: RootState) => state.slotManagement
    )
    const { data, isLoading, isFetching } = useGetSlotViewByIdQuery(id)

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

    const initialValues: FormInitialValues = {
        slotName: selectedItems?.slotName || '',
        channelGroupId: selectedItems?.channelGroupId || '',
        type: selectedItems?.type || '',
        tapeNameId: selectedItems?.tapeNameId || '',
        channelNameId: selectedItems?.channelNameId || '',
        channelTrp: selectedItems?.channelTrp || '',
        remarks: selectedItems?.reamrks || '',
        slotPrice: selectedItems?.slotPrice || 0,
        slotDay: selectedItems?.slotDay || [''],
        // slotStartDate: selectedItems?.slotStartDate || '',
        slotStartTime: selectedItems?.slotStartTime || '',
        slotEndTime: selectedItems?.slotEndTime || '',
        slotContinueStatus: selectedItems?.slotContinueStatus || false,
        runYoutubeLink: selectedItems?.runYoutubeLink || '',
        runStatus: selectedItems?.runStatus || false,
        run: selectedItems?.run || false,
        slotRunImage: selectedItems?.slotRunImage || '',
        // slotRunVideo: selectedItems?.slotRunVideo || '',
        showOk: selectedItems?.showOk,
        reasonNotShow: selectedItems?.reasonNotShow || '',
        // runStartTime: selectedItems?.runStartTime || '',
        // runEndTime: selectedItems?.runEndTime || '',
        runRemark: selectedItems?.runRemark || '',
        companyId: selectedItems?.companyId || '',
    }
    const { object, boolean, string } = require('yup')

    const validationSchema = object({
        run: boolean(),
        //reasonNotShow: string().required('Required'),

        runRemark: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        console.log(values)

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
                    // slotStartDate: values.slotStartDate,
                    slotEndTime: values.slotEndTime,
                    slotContinueStatus: values.slotContinueStatus,
                    runYoutubeLink: values?.runYoutubeLink || '',
                    runStatus: values?.run,
                    run: values?.run,
                    slotRunImage: values?.slotRunImage || '',
                    // slotRunVideo: values?.slotRunVideo || '',
                    showOk: values?.showOk,
                    reasonNotShow: values?.reasonNotShow || null,
                    // runStartTime: values?.runStartTime || '',
                    // runEndTime: values?.runEndTime || '',
                    runRemark: values?.runRemark,
                    companyId: values?.companyId,
                },
                id: id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Status Updated successfully!')
                        setIsOpenDialog(false)
                        navigate('/media/slot/run-slots')
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
