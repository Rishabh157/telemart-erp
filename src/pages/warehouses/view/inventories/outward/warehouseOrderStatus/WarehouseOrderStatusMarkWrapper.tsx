import { useRef, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps, FormikHelpers } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import AddCourierReturn from './WarehouseOrderStatusMark'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import { useOrderStatusUpdateFromWarehouseMutation } from 'src/services/OrderService'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    shippingProvider: string
    requestStatus: string
    orderNumber: string
    orderStatus: string
}

const WarehouseOrderStatusMarkWrapper = (props: Props) => {
    const navigate = useNavigate()
    const { id: warehouseId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    // Initialize ref to hold Formik's instance
    const formikRef = useRef<FormikProps<FormInitialValues>>(null)

    const [updateOrderstatusFromWH] =
        useOrderStatusUpdateFromWarehouseMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        shippingProvider: '',
        requestStatus: '',
        orderNumber: '',
        orderStatus: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        shippingProvider: string().required('Shipping provider is required'),
        requestStatus: string().when('orderStatus', (orderStatus: any, schema) => {
            return orderStatus === 'RTO'
                ? schema.required('Request Status is required when Order Status is RTO')
                : schema.notRequired()
        }),
        orderNumber: string().required('Enter an order number'),
        orderStatus: string().required('Order status is required'),
    })

    // Form Submit Handler
    const onSubmitHandler = (
        values: FormInitialValues,
        { resetForm }: FormikHelpers<FormInitialValues>
    ) => {
        setApiStatus(true)
        const arr = values.orderNumber.split('\n') // Splitting order numbers by newline

        const formattedValue = {
            orderNumbers: arr,
            courierType: values.shippingProvider,
            status: values.orderStatus,
            condition: values.requestStatus || null,
        }

        setTimeout(() => {
            updateOrderstatusFromWH({
                warehouseId: warehouseId || '',
                body: formattedValue,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res.data.status) {
                        showToast('success', 'Updated Successfully!')
                        navigate(
                            `/warehouse/view/${warehouseId}/outward-inventories/status-mark`
                        )
                        dispatch(setFieldCustomized(false))
                        resetForm() // Reset form after successful submission
                    } else {
                        showToast('error', res.error?.data?.message || res.data?.message)
                    }
                } else {
                    showToast('error', res?.error?.data?.message)
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    return (
        <Formik
            innerRef={formikRef} // Assign ref to Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
            enableReinitialize
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <AddCourierReturn
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default WarehouseOrderStatusMarkWrapper
