import React from 'react'
import { Form, Formik, FormikProps } from 'formik'
// import { string } from 'yup'
import CustomerComplainOrderDetailsForm from './CustomerComplainOrderDetailsForm'
import { useGetOrderByIdQuery } from 'src/services/OrderService'
import { OrderListResponse } from 'src/models'
import { CircularProgress } from '@mui/material'
// import { showToast } from 'src/utils'

type Props = {
    orderId: string
    setIsOpenCustomerOrderModel: any
    handleClose: () => void
}

export type FormInitialValues = {
    orderId: string
    orderNo: number | string
    orderDate: string
    disposition: string
    orderStatus: string
    invoice?: any
    dispatchTime: string
    shippingCharges: number
    discount: number
    total: number
}

const CustomerComplainOrderDetailsWrapper = ({
    orderId,
    setIsOpenCustomerOrderModel,
    handleClose,
}: Props) => {
    const [orderDetails, setOrderDetails] = React.useState<OrderListResponse>()

    const initialValues: FormInitialValues = {
        orderId,
        orderNo: orderDetails?.orderNumber || 0,
        orderDate: orderDetails?.createdAt || '',
        disposition: orderDetails?.dispositionLevelThree || '',
        orderStatus: orderDetails?.status || '',
        invoice: '',
        dispatchTime: orderDetails?.updatedAt || '',
        shippingCharges: orderDetails?.deliveryCharges || 0,
        discount: orderDetails?.deliveryCharges || 0,
        total: orderDetails?.totalAmount || 0,
    }

    const { data, isLoading, isFetching } = useGetOrderByIdQuery(orderId, {
        skip: !orderId,
    })

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            setOrderDetails(data?.data)
        }
    }, [data, isLoading, isFetching])

    const onSubmitHandler = (values: FormInitialValues) => {
        // addDealer({}).then((res) => {
        //     if ('data' in res) {
        //         if (res?.data?.status) {
        //             showToast('success', 'Dealer added successfully!')
        //             // navigate('/dealers')
        //         } else {
        //             showToast('error', res?.data?.message)
        //         }
        //     } else {
        //         showToast('error', 'Something went wrong')
        //     }
        // })
        // setApiStatus(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form>
                    {(isLoading || isFetching) && (
                        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                            <CircularProgress />
                        </div>
                    )}
                    <CustomerComplainOrderDetailsForm
                        setIsOpenCreateComplainModel={
                            setIsOpenCustomerOrderModel
                        }
                        customerDetails={null}
                        // customerDetails={{customerDetails}}
                        formikProps={formikProps}
                        handleClose={() => handleClose()}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default CustomerComplainOrderDetailsWrapper
