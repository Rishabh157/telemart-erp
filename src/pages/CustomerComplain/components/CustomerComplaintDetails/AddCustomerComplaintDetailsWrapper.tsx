import React from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import CustomerComplaintDetailsForm from './CustomerComplaintDetailsForm'
import { useGetOrderByIdQuery } from 'src/services/OrderService'
import { OrderListResponse } from 'src/models'
import { CircularProgress } from '@mui/material'
import { useAddCustomerComplainMutation } from 'src/services/CustomerComplainServices'
import { showToast } from 'src/utils'

type Props = {
    orderId: string
    handleClose: () => void
}

export type FormInitialValues = {
    orderNo: number
    schemeName: string
    schemeCode: string
    orderStatus: string
    courierStatus: string
    callType: string
    initialCallOne: string
    initialCallTwo: string
    initialCallThree: string
    status: string
    remark: string
}

const AddCustomerComplaintDetailsWrapper = ({
    orderId,
    handleClose,
}: Props) => {
    const [orderDetails, setOrderDetails] = React.useState<OrderListResponse>()
    const [addComplaint, addComplaintInfo] = useAddCustomerComplainMutation()

    const initialValues: FormInitialValues = {
        orderNo: orderDetails?.orderNumber || 0,
        schemeName: orderDetails?.schemeName || '',
        schemeCode: orderDetails?.schemeName || '',
        orderStatus: orderDetails?.status || '',
        courierStatus: orderDetails?.status || '',
        callType: orderDetails?.callType || '',
        initialCallOne: '',
        initialCallTwo: '',
        initialCallThree: '',
        status: '',
        remark: orderDetails?.remark || '',
    }

    // Form Validation Schema
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validationSchema = object({
        callType: string().required('call type is required'),
        initialCallOne: string().required('ic1 is required'),
        initialCallTwo: string().required('ic2 required'),
        initialCallThree: string().required('ic3 required'),
        status: string().required('status is required'),
        remark: string().required('remark is required'),
    })

    const { data, isLoading, isFetching } = useGetOrderByIdQuery(orderId, {
        skip: !orderId,
    })

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            setOrderDetails(data?.data)
        }
    }, [data, isLoading, isFetching])

    const onSubmitHandler = (values: FormInitialValues) => {

        const formatedValues = {
            orderId,
            orderNumber: values.orderNo,
            schemeId: orderDetails?.schemeId,
            schemeName: values.schemeName,
            schemeCode: values.schemeCode,
            orderStatus: values.orderStatus,
            courierStatus: values.courierStatus,
            callType: values.callType,
            icOne: values.initialCallOne,
            icTwo: values.initialCallTwo,
            icThree: values.initialCallThree,
            status: values.status,
            remark: values.remark,
        }

        addComplaint(formatedValues).then((res: any) => {
            if ('data' in res) {
                console.log('inside the create complain', res)
                if (res?.data?.status) {
                    showToast('success', 'complaint added successfully!')
                    handleClose()
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form>
                    {(isLoading || isFetching) && (
                        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                            <CircularProgress />
                        </div>
                    )}
                    <CustomerComplaintDetailsForm
                        formType="ADD"
                        formikProps={formikProps}
                        apiStatus={addComplaintInfo?.isLoading}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default AddCustomerComplaintDetailsWrapper
