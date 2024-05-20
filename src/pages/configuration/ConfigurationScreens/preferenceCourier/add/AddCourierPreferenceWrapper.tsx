// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddPreferenceCourier from './AddCourierPreference'

import { useAddCourierPrefernceMutation } from 'src/services/CourierPreferenceService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    courierName: string
    priority: string
}

const AddCourierPreferenceWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id

    // const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [AddCourierPreferenceApi] = useAddCourierPrefernceMutation()

    const initialValues: FormInitialValues = {
        courierName: '',
        priority: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        courierName: string().required('Courier name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            AddCourierPreferenceApi({
                body: {
                    courierName: values.courierName,
                    priority: values.priority,
                    // companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/configurations/courier-preference')
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
                    <AddPreferenceCourier
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddCourierPreferenceWrapper
