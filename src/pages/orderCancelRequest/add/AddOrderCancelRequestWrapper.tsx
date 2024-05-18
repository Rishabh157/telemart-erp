// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import {
    useDispatch,
    // useSelector
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import AddOrderCancelRequest from './AddOrderCancelRequest'
import { useAddOrderCancelRequestMutation } from 'src/services/OrderCancelRequestServices'
import { showToast } from 'src/utils'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import {
    AppDispatch,
    // RootState
} from 'src/redux/store'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    orderNumber: string
    cancelReason: string
    remark: string
}

const AddOrderCancelRequestWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState(false)
    // const { userData } = useSelector((state: RootState) => state?.auth)

    const [addCancelOrderRequest] = useAddOrderCancelRequestMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        orderNumber: '',
        cancelReason: '',
        remark: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        orderNumber: string().required('Order number is required'),
        cancelReason: string().required('Cancel reason is required'),
        remark: string().required('Remark is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        addCancelOrderRequest(values).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/order-cancel-request')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    return (
        <SideNavLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddOrderCancelRequest
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default AddOrderCancelRequestWrapper
