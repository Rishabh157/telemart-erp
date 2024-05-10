// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|

import { useAddTransportMutation } from 'src/services/TransportServices'
import { showToast } from 'src/utils'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import AddTransport from './AddTransport'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    transportName: string
    gst: string
}

const AddTransportWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [AddTransportApi] = useAddTransportMutation()
    // const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        transportName: '',
        gst: '',
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
            AddTransportApi({
                transportName: values.transportName,
                gst: values.gst,
                // companyId: userData?.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddTransport
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddTransportWrapper
