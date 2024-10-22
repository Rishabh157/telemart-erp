import React from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import CustomerComplaintDetailsForm from './CustomerComplaintDetailsForm'
import { CircularProgress } from '@mui/material'
import {
    useGetComplaintByIdQuery,
    useUpdateCustomerComplainMutation,
    useGetComplaintLogsByIdQuery,
} from 'src/services/CustomerComplainServices'
import { showToast } from 'src/utils'
import { FormInitialValues } from './AddCustomerComplaintDetailsWrapper'

type Props = {
    complaintId: string
    handleClose: () => void
}

const EditCustomerComplaintDetailsWrapper = ({
    complaintId = '',
    handleClose,
}: Props) => {

    const [complaintOrderDetails, setComplaintOrderDetails] =
        React.useState<any>()
    const [complaintLogs, setComplaintLogs] = React.useState<any[]>([])

    // get single complaint details
    const { isLoading, isFetching, data } = useGetComplaintByIdQuery<any>(
        complaintId,
        {
            skip: !complaintId,
        }
    )

    // update the selected complaint
    const [updateComplaint, updateComplaintInfo] =
        useUpdateCustomerComplainMutation()

    // get complaint logs by id
    const {
        isLoading: isComplaintLogsLoading,
        isFetching: isComplaintLogsFetching,
        data: complaintLogsData,
    } = useGetComplaintLogsByIdQuery<any>(complaintId, {
        skip: !complaintId,
    })

    React.useEffect(() => {
        if (!isComplaintLogsLoading && !isComplaintLogsFetching) {
            setComplaintLogs(complaintLogsData?.data)
        }
    }, [complaintLogsData, isComplaintLogsLoading, isComplaintLogsFetching])

    const initialValues: FormInitialValues = {
        complaintNumber: complaintOrderDetails?.complaintNumber,
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
        icOneLabel: complaintOrderDetails?.icOneLabel || '',
        icTwoLabel: complaintOrderDetails?.icTwoLabel || '',
        icThreeLabel: complaintOrderDetails?.icThreeLabel || '',
        images: complaintOrderDetails?.images || [],
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
            customerNumber: complaintOrderDetails?.customerNumber || '',
            icOneLabel: values?.icOneLabel,
            icTwoLabel: values?.icTwoLabel,
            icThreeLabel: values?.icThreeLabel,
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
                        complaintLogs={complaintLogs || []}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default EditCustomerComplaintDetailsWrapper
