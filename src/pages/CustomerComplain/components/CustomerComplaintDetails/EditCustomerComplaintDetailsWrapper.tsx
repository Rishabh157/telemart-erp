import React from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import CustomerComplaintDetailsForm from './CustomerComplaintDetailsForm'
// import { useGetOrderByIdQuery } from 'src/services/OrderService'
// import { OrderListResponse } from 'src/models'
import { CircularProgress } from '@mui/material'
import {
    useGetComplaintByIdQuery,
    useUpdateCustomerComplainMutation,
} from 'src/services/CustomerComplainServices'
import { showToast } from 'src/utils'

type Props = {
    complaintId: string
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

const EditCustomerComplaintDetailsWrapper = ({
    complaintId,
    handleClose,
}: Props) => {
    const [complaintOrderDetails, setComplaintOrderDetails] =
        React.useState<any>()
    const { isLoading, isFetching, data } = useGetComplaintByIdQuery<any>(
        complaintId,
        {
            skip: !complaintId,
        }
    )
    const [updateComplaint, updateComplaintInfo] =
        useUpdateCustomerComplainMutation()

    const initialValues: FormInitialValues = {
        orderNo: complaintOrderDetails?.orderNumber || 0,
        schemeName: complaintOrderDetails?.schemeName || '',
        schemeCode: complaintOrderDetails?.schemeName || '',
        orderStatus: complaintOrderDetails?.status || '',
        courierStatus: complaintOrderDetails?.status || '',
        callType: complaintOrderDetails?.callType || '',
        initialCallOne: complaintOrderDetails?.icOne,
        initialCallTwo: complaintOrderDetails?.icTwo,
        initialCallThree: complaintOrderDetails?.icThree,
        status: complaintOrderDetails?.status,
        remark: complaintOrderDetails?.remark || '',
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

    // const { data, isLoading, isFetching } = useGetOrderByIdQuery(orderId, {
    //     skip: !orderId,
    // })

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            setComplaintOrderDetails(data?.data[0])
        }
    }, [data, isLoading, isFetching])

    const onSubmitHandler = (values: FormInitialValues) => {
        const formatedValues = {
            orderId: complaintOrderDetails?.orderId,
            orderNumber: values.orderNo,
            schemeId: complaintOrderDetails?.schemeId,
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

        updateComplaint({ id: complaintId, body: formatedValues }).then(
            (res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'updated successfully!')
                        handleClose()
                    } else {
                        showToast('error', res?.message)
                    }
                } else {
                    showToast('error', res?.message)
                }
            }
        )
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
                        formType="EDIT"
                        formikProps={formikProps}
                        apiStatus={updateComplaintInfo?.isLoading}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default EditCustomerComplaintDetailsWrapper
