/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditCallCenterMasterWrapper.tsx
// Type: Edit Component
// Last Updated: jan 10, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import {
    useGetCallCenterMasterByIdQuery,
    useUpdateCallCenterMasterMutation,
} from 'src/services/CallCenterMasterServices'
import { showToast } from 'src/utils'
import EditCallCenterMaster from './EditCallCenterMaster'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { setSelectedCallCenter } from 'src/redux/slices/CallCenterMasterSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    callCenterName: string
}

const EditCallCenterMasterWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const { selectedCallCenter }: any = useSelector(
        (state: RootState) => state.callCenter
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [EditCallCenterMasters] = useUpdateCallCenterMasterMutation()
    const { data, isLoading, isFetching } = useGetCallCenterMasterByIdQuery(Id)
    const initialValues: FormInitialValues = {
        callCenterName: selectedCallCenter?.callCenterName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        callCenterName: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            EditCallCenterMasters({
                body: {
                    callCenterName: values.callCenterName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res:any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/configurations/callcenter-master')
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

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedCallCenter(data?.data))
        }
    }, [dispatch, data, isLoading, isFetching])
    return (
        <ConfigurationLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditCallCenterMaster
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default EditCallCenterMasterWrapper
