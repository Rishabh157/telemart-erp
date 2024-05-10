// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|

import {
    useGetTransportByIdQuery,
    useUpdateTransportMutation,
} from 'src/services/TransportServices'
import { showToast } from 'src/utils'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { TransportListResponse } from 'src/models/Transport.model'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import EditTransport from './EditTransport'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    transportName: string
    gst: string
}

const EditTransportWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id

    // const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [EditTransportApi] = useUpdateTransportMutation()
    const { items } = useGetDataByIdCustomQuery<TransportListResponse>({
        useEndPointHook: useGetTransportByIdQuery(Id),
    })
    const initialValues: FormInitialValues = {
        transportName: items?.transportName || '',
        gst: items?.gst || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        transportName: string().required('Required'),
        gst: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            EditTransportApi({
                body: {
                    transportName: values.transportName,
                    gst: values.gst,
                    // companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/configurations/transport')
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
            {(formikProps) => {
                return (
                    <EditTransport
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default EditTransportWrapper
