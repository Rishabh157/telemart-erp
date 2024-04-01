import { CircularProgress } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { OrderListResponse } from 'src/models'
import {
    useGetOrderByNumberUsingForNdrDealerQuery,
    useUpdateNdrDealerDialerMutation,
} from 'src/services/OrderService'
import { object, string } from 'yup'
import CustomerNDRDetailsForm from './DealerNDRDetailsForm'
import { showToast } from 'src/utils'

export type FormInitialValues = {
    customerName: string
    mobileNumber: string
    alternateNumber1: string
    // alternateNumber2: string
    orderNo: number | string
    orderStatus: string
    schemeName: string
    schemeCode: string
    courier: string
    courierStatus: string
    courierRemark: string
    remarkTimestamp: string
    address1: string
    address2: string
    pincode: string
    district: string
    state: string
    callDisposition: string
    // rtoReattemptReason: string
    validateCourierRemark: string
    reAttemptDate: string
    reAttemeptReason: string
    remark: string
    ndrDiscountApplicable: boolean
}

const AddDealerNDRDetailsWrapper = () => {
    const [orderDetails, setOrderDetails] = React.useState<OrderListResponse>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updateOrderNdrDealer, updateOrderNdrDealerInfo] =
        useUpdateNdrDealerDialerMutation()
    const locationUrl = useLocation()
    const queryParams = new URLSearchParams(locationUrl.search)
    const phoneNumber = queryParams.get('phone')
    // const userName = queryParams.get('user')

    const initialValues: FormInitialValues = {
        customerName: orderDetails?.customerName || '',
        mobileNumber: orderDetails?.mobileNo || '',
        alternateNumber1: orderDetails?.alternateNo || '',
        orderNo: orderDetails?.orderNumber || 0,
        orderStatus: orderDetails?.status || '',
        schemeName: orderDetails?.schemeName || '',
        schemeCode: orderDetails?.schemeName || '',
        courier: '',
        courierStatus: orderDetails?.status || '',
        courierRemark: '',
        remarkTimestamp: '',
        address1: orderDetails?.autoFillingShippingAddress || '',
        address2: '',
        pincode: orderDetails?.pincodeLabel || '',
        district: orderDetails?.districtLabel || '',
        state: orderDetails?.stateLabel || '',
        callDisposition: '',
        // rtoReattemptReason: '',
        validateCourierRemark: '',
        reAttemptDate: '',
        reAttemeptReason: '' || '',
        remark: orderDetails?.remark || '',
        ndrDiscountApplicable: false,
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

    const { data, isLoading, isFetching } =
        useGetOrderByNumberUsingForNdrDealerQuery(phoneNumber, {
            skip: !phoneNumber,
        })

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            setOrderDetails(data?.data)
        }
    }, [data, isLoading, isFetching])
    const onSubmitHandler = (values: FormInitialValues) => {
        const formatedValues = {
            reAttemptDate: values.reAttemptDate,
            ndrRemark: values.remark || '',
            ndrDiscountApplicable: values?.ndrDiscountApplicable,
            alternateNumber: values.alternateNumber1,
        }
        updateOrderNdrDealer({
            id: orderDetails?._id,
            body: formatedValues,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Updated successfully!')
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
                    <CustomerNDRDetailsForm
                        formType="ADD"
                        formikProps={formikProps}
                        apiStatus={updateOrderNdrDealerInfo?.isLoading}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default AddDealerNDRDetailsWrapper
