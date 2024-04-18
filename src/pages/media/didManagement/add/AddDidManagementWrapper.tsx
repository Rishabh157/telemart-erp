// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'

// |-- Redux--|
import { RootState } from 'src/redux/store'
import AddDidManagements from './AddDidManagement'
import { useAddDidMutation } from 'src/services/media/DidManagementServices'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetSlotMangementQuery } from 'src/services/media/SlotDefinitionServices'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types--|
export type FormInitialValues = {
    didNumber: string
    slotId: string
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

    const initialValues: FormInitialValues = {
        didNumber: '',
        slotId: '',
        schemeId: '',
        channelId: '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        didNumber: string().required('Did number is required'),
        slotId: string().required('Slot is required'),
        schemeId: string().required('Scheme is required'),
        channelId: string().required('Channel name is required'),
    })

    // Hook
    const { options: schemeOptions } = useCustomOptions({
        useEndPointHook: useGetSchemeQuery(userData?.companyId),
        keyName: 'schemeName',
        value: '_id',
    })

    const { options: channelNameOptions } = useCustomOptions({
        useEndPointHook: useGetAllChannelQuery(userData?.companyId),
        keyName: 'channelName',
        value: '_id',
    })

    const { options: slotOptions } = useCustomOptions({
        useEndPointHook: useGetSlotMangementQuery(userData?.companyId),
        keyName: 'slotName',
        value: '_id',
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            AddDidManagement({
                didNumber: values.didNumber,
                slotId: values.slotId,
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

    const dropdownOptions = {
        schemeOptions,
        channelNameOptions,
        slotOptions,
    }

    return (
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
    )
}

export default AddDidManagementWrapper
