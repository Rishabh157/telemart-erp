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
import DealerNDRDetailsForm from './DealerNDRDetailsForm'
import { showToast } from 'src/utils'
import { useGetAllUnauthNdrDispositionQuery } from 'src/services/configurations/NdrDisositionServices'
import { NdrDispositionListResponseType } from 'src/models/configurationModel/NdrDisposition.model'

export type FormInitialValues = {
    customerName: string
    mobileNumber: string
    alternateNumber: string
    orderNo: number | string
    dalerCode: string
    schemeName: string
    schemeCode: string
    courier: string
    status: string
    // remarkTimestamp: string
    address1: string
    pincode: string
    district: string
    state: string
    ndrCallDisposition: string
    ndrRtoReattemptReason: string
    dealerName: string
    reAttemptDate: string
    remark: string
    ndrDiscountApplicable: boolean
    ndrRemark: string
    dealerValidRemark: string
    orderDate: string
    preShipCancelDate: string
}

const AddDealerNDRDetailsWrapper = () => {
    const [orderDetails, setOrderDetails] = React.useState<OrderListResponse>()
    const [ndrDispositions, setNdrDispositions] =
        React.useState<NdrDispositionListResponseType[]>()

    console.log('orderDetails: ', orderDetails)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updateOrderNdrDealer, updateOrderNdrDealerInfo] =
        useUpdateNdrDealerDialerMutation()
    const locationUrl = useLocation()
    const queryParams = new URLSearchParams(locationUrl.search)
    const phoneNumber = queryParams.get('phone')
    const userName = queryParams.get('username')

    const initialValues: FormInitialValues = {
        customerName: orderDetails?.customerName || '',
        mobileNumber: orderDetails?.mobileNo || '',
        alternateNumber: orderDetails?.alternateNo || '',
        orderNo: orderDetails?.orderNumber || 0,
        schemeName: orderDetails?.schemeName || '',
        schemeCode: orderDetails?.schemeCode || '',
        status: orderDetails?.status || '',
        address1: orderDetails?.autoFillingShippingAddress || '',
        pincode: orderDetails?.pincodeLabel || '',
        district: orderDetails?.districtLabel || '',
        state: orderDetails?.stateLabel || '',
        remark: orderDetails?.remark || '',
        dealerName: orderDetails?.dealerLabel || '',
        dalerCode: orderDetails?.dealerCode || '',
        //editable
        ndrDiscountApplicable: false,
        ndrRemark: '',
        ndrCallDisposition: '',
        ndrRtoReattemptReason: '',
        courier: '',
        dealerValidRemark: '',
        reAttemptDate: '',
        orderDate: orderDetails?.createdAt || '',
        preShipCancelDate: orderDetails?.preShipCancelationDate || '',
    }

    // Form Validation Schema
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validationSchema = object({
        ndrCallDisposition: string().required('Required'),
        dealerValidRemark: string().required('Required'),
        ndrRtoReattemptReason: string().required('Required'),
        reAttemptDate: string().required('Required'),
        ndrDiscountApplicable: string().required('Required'),
        ndrRemark: string().required('Required'),
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

    //NDR Disposition

    const {
        data: NdrDisposition,
        isLoading: ndrIsLoading,
        isFetching: ndrIsFetching,
    } = useGetAllUnauthNdrDispositionQuery('')

    React.useEffect(() => {
        if (!ndrIsLoading && !ndrIsFetching) {
            setNdrDispositions(NdrDisposition?.data)
        }
    }, [NdrDisposition, ndrIsLoading, ndrIsFetching])
    const onSubmitHandler = (values: FormInitialValues) => {
        if (!orderDetails?._id) {
            alert('Please Select order')
            return
        }
        const formatedValues = {
            reAttemptDate: values?.reAttemptDate,
            ndrRemark: values?.ndrRemark || '',
            ndrDiscountApplicable: values?.ndrDiscountApplicable,
            alternateNumber: values?.alternateNumber,
            dealerValidRemark: values?.dealerValidRemark || '',
            ndrApprovedBy: userName || '',
            ndrCallDisposition: values?.ndrCallDisposition || '',
            ndrRtoReattemptReason: values?.ndrRtoReattemptReason || '',
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
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => (
                <Form>
                    {(isLoading || isFetching) && (
                        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                            <CircularProgress />
                        </div>
                    )}
                    <DealerNDRDetailsForm
                        formType="ADD"
                        formikProps={formikProps}
                        ndrDispositions={ndrDispositions || []}
                        apiStatus={updateOrderNdrDealerInfo?.isLoading}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default AddDealerNDRDetailsWrapper
