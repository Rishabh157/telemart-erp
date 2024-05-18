// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import EditProductSubCategory from './EditOrderCancelRequest'
import { OrderCancelRequestListResponse } from 'src/models/OrderCancelRequest.modesl'
import { showToast } from 'src/utils'

// |-- Redux --|
import { AppDispatch } from 'src/redux/store'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import {
    useGetOrderCancelRequestByIdQuery,
    useUpdateOrderCancelRequestMutation,
} from 'src/services/OrderCancelRequestServices'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    orderNumber: string
    cancelReason: string
    remark: string
}

const EditOrderCancelRequestWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState(false)
    // const { userData } = useGetLocalStorage()

    const { items } = useGetDataByIdCustomQuery<OrderCancelRequestListResponse>(
        {
            useEndPointHook: useGetOrderCancelRequestByIdQuery(Id || '', {
                skip: !Id,
            }),
        }
    )

    const [updateOrderCancelRequest] = useUpdateOrderCancelRequestMutation()
    // Form Initial Values
    const initialValues: FormInitialValues = {
        orderNumber: items?.orderNumber || '',
        cancelReason: items?.cancelReason || '',
        remark: items?.remark || '',
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

        updateOrderCancelRequest({
            id: Id || '',
            body: values,
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Updated successfully!')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditProductSubCategory
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default EditOrderCancelRequestWrapper
