// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import { getDIDTypeOptions } from 'src/utils/constants/customeTypes'

// |-- Redux--|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState } from 'src/redux/store'
import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
import { useAddDidMutation } from 'src/services/media/DidManagementServices'
import { useGetSlotMangementQuery } from 'src/services/media/SlotDefinitionServices'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import AddDidManagements from './AddDidManagement'

// |-- Types--|
export type FormInitialValues = {
    didNumber: string
    slotId: string
    companyId: string
    schemeId: string
    channelId: string
    didType: string
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
        didType: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        didNumber: string().required('Did number is required'),
        slotId: string().required('Slot is required'),
        schemeId: string().required('Scheme is required'),
        channelId: string().required('Channel name is required'),
        didType: string().required('DID type is required'),
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
                didType: values.didType,
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
        didTypeOptions: getDIDTypeOptions(),
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
