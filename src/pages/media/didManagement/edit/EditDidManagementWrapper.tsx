// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import { DidManagementListResponse } from 'src/models/Media.model'
import EditDidManagements from './EditDidManagement'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { AppDispatch, RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import {
    useGetDidByIdQuery,
    useUpdateDidMutation,
} from 'src/services/media/DidManagementServices'
import { useGetSlotMangementQuery } from 'src/services/media/SlotDefinitionServices'

// |-- Types --|
export type FormInitialValues = {
    didNumber: string
    slotId: string
    companyId: string
    schemeId: string
    channelId: string
}

const EditDidManagementWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const id = params.id

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    // const { selectedItem } = useSelector(
    //     (state: RootState) => state?.didManagement
    // )

    // Initiate Method
    const [editDidManagement] = useUpdateDidMutation()

    // Hook
    const { items } = useGetDataByIdCustomQuery<DidManagementListResponse>({
        useEndPointHook: useGetDidByIdQuery(id),
    })

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

    const initialValues: FormInitialValues = {
        didNumber: items?.didNumber || '',
        slotId: items?.slotId || '',
        schemeId: items?.schemeId || '',
        channelId: items?.channelId || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        didNumber: string().required('Did number is required'),
        slotId: string().required('Did number is required'),
        schemeId: string().required('Scheme is required'),
        channelId: string().required('Cahnnel name is required'),
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            editDidManagement({
                body: {
                    didNumber: values.didNumber,
                    slotId: values.slotId,
                    schemeId: values.schemeId,
                    channelId: values.channelId,
                    companyId: values.companyId || '',
                },
                id: id || '',
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

    const dropdownOptions = {
        schemeOptions,
        channelNameOptions,
        slotOptions,
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
                    <EditDidManagements
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                        dropdownOptions={dropdownOptions}
                    />
                )
            }}
        </Formik>
    )
}

export default EditDidManagementWrapper
