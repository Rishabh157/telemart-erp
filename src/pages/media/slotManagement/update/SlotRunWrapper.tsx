// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import UpdateSlotRun from './UpdateSlotRun'
import { showToast } from 'src/utils'

// |-- Redux --|
import {
    useGetSlotViewByIdQuery,
    useUpdateSlotViewMutation,
} from 'src/services/media/SlotsViewServices'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { SlotManagementListResponse } from 'src/models/Slot.model'

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
    slotContinueStatus: boolean
    runYoutubeLink: string
    runStatus: boolean
    run: boolean
    showOk: boolean
    slotRunImage: string
    reasonNotShow: string | null
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
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateSlot] = useUpdateSlotViewMutation()

    // Hook
    const { items } = useGetDataByIdCustomQuery<SlotManagementListResponse>({
        useEndPointHook: useGetSlotViewByIdQuery(id),
    })

    const initialValues: FormInitialValues = {
        slotName: items?.slotName || '',
        channelGroupId: items?.channelGroupId || '',
        type: items?.type || '',
        tapeNameId: items?.tapeNameId || '',
        channelNameId: items?.channelNameId || '',
        channelTrp: items?.channelTrp || '',
        remarks: items?.remarks || '',
        slotPrice: items?.slotPrice || 0,
        slotDay: items?.slotDay || [''],
        slotStartTime: items?.slotStartTime || '',
        slotEndTime: items?.slotEndTime || '',
        slotContinueStatus: items?.slotContinueStatus || false,
        runYoutubeLink: items?.runYoutubeLink || '',
        runStatus: items?.runStatus || false,
        run: items?.run || false,
        slotRunImage: items?.slotRunImage || '',
        showOk: items?.showOk || false,
        reasonNotShow: items?.reasonNotShow || '',
        runRemark: items?.runRemark || '',
        companyId: items?.companyId || '',
    }
    const { object, boolean, string } = require('yup')

    const validationSchema = object({
        run: boolean(),
        runRemark: string(),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
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
                    slotContinueStatus: values.slotContinueStatus,
                    runYoutubeLink: values?.runYoutubeLink || '',
                    runStatus: values?.run,
                    run: values?.run,
                    slotRunImage: values?.slotRunImage || '',
                    showOk: values?.showOk,
                    reasonNotShow: values?.reasonNotShow || null,
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
    )
}

export default SlotRunWrapper
