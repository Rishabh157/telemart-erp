import React, { useState, useEffect } from 'react'
import { Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import WarehouseFirstCallDialerPage from './WarehouseFirstCallDialerPage'
import {
    useGetWHFirstCallOrderDetailsQuery,
    useUpdateWHFirstCallUnauthOrderMutation,
} from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useNavigate } from 'react-router-dom'
import { OrderListResponse } from 'src/models'
import { useLocation } from 'react-router-dom'

export type FormInitialValues = {
    address: string
    remark: string
    callbackDate: string
    status: string
    approvedBy: string
}

export interface OrderDetailsPropsTypes {
    orderNumber: string
    assignDealerLabel: string
    name: string
    price: string
    contactNumber: string
    mobileNumber: string
    alternateNumber: string
    country: string
    state: string
    district: string
    tehsil: string
    pincode: string
    area: string
    address: string

    schemeCode: string
    schemeName: string
    shcemeQuantity: number
    totalAmount: number
    deliveryCharges: number
    discount?: number
}

const WarehouseFirstCallDialerPageWrapper = () => {
    const [orderId, setOrderId] = useState<string>()
    const [apiStatus, setApiStatus] = React.useState<boolean>(false)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const phoneNumber = searchParams.get('phone') || ''
    const userName = searchParams.get('userid') || ''
    const navigate = useNavigate()

    //  showing initial order details
    const [orderDetails, setOrderDetails] = useState<OrderDetailsPropsTypes>({
        orderNumber: '',
        assignDealerLabel: '',
        name: '',
        price: '',
        contactNumber: '',
        mobileNumber: '',
        alternateNumber: '',
        country: 'India',
        state: '',
        district: '',
        tehsil: '',
        pincode: '',
        area: '',
        address: '',

        schemeCode: '',
        schemeName: '',
        shcemeQuantity: 0,
        totalAmount: 0,
        deliveryCharges: 0,
        discount: 0,
    })

    // get the order details
    const { isLoading, isFetching, data } = useGetWHFirstCallOrderDetailsQuery(
        phoneNumber,
        {
            skip: !phoneNumber,
        }
    )

    useEffect(() => {
        if (!isLoading && !isFetching) {
            const orderData: OrderListResponse = data?.data
            setOrderId(data?.data?._id)
            setOrderDetails({
                orderNumber: orderData?.orderNumber + '',
                assignDealerLabel: orderData?.assignDealerLabel,
                name: orderData?.customerName,
                price: orderData?.price + '',
                contactNumber: orderData?.mobileNo,
                mobileNumber: orderData?.mobileNo,
                alternateNumber: orderData?.alternateNo,
                country: orderData?.countryId || null || '',
                state: orderData?.stateLabel,
                district: orderData?.districtLabel,
                tehsil: orderData?.tehsilLabel,
                pincode: orderData?.pincodeLabel,
                area: orderData?.areaLabel,
                address: orderData?.autoFillingShippingAddress,
                schemeCode: orderData?.schemeCode,
                schemeName: orderData?.schemeName,
                shcemeQuantity: orderData?.shcemeQuantity,
                totalAmount: orderData?.totalAmount,
                deliveryCharges: orderData?.deliveryCharges,
                discount: orderData?.deliveryCharges || 0,
            })
        }
    }, [isLoading, isFetching, data])

    // Scheme Details Table
    const columns: columnTypes[] = [
        {
            field: 'schemeName',
            headerName: 'Scheme',
            flex: 'flex-[4_4_0%]',
            align: 'start',
            extraClasses: 'text-xs',
            renderCell: (row: any) => (
                <span className="text-primary-main">{row.schemeName}</span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.price} </span>,
        },
        {
            field: 'shcemeQuantity',
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.shcemeQuantity} </span>,
        },
        {
            field: 'totalAmount',
            headerName: 'Total Amt.',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.totalAmount} </span>,
        },
        {
            field: 'deliveryCharges',
            headerName: 'Del. Charge',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.deliveryCharges} </span>,
        },
        {
            field: 'discount',
            headerName: 'Discount',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.discount} </span>,
        },
    ]

    // Table Data with MobileNo filtered
    const [updateWarehouseFirstCall] = useUpdateWHFirstCallUnauthOrderMutation()

    const initialValues: FormInitialValues = {
        address: orderDetails?.address,
        remark: '',
        callbackDate: '',
        status: '',
        approvedBy: userName,
    }

    const validationSchema = object({
        remark: string().required('remark is required'),
        callbackDate: string().when(['status'], (status, schema) => {
            return status[0] === 'CALLBACK'
                ? schema.required('Callback data is required')
                : schema.notRequired()
        }),
    })

    // Caller Page Save Button Form Updation
    const onSubmitHandler = (values: FormInitialValues, { resetForm }: any) => {
        setApiStatus(true)

        setTimeout(() => {
            updateWarehouseFirstCall({
                id: orderId,
                body: values,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', res?.data?.message)
                        setApiStatus(false)
                        navigate(`/success`)
                    } else {
                        showToast('error', res?.data?.message)
                        setApiStatus(false)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                    setApiStatus(false)
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
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <WarehouseFirstCallDialerPage
                        formikProps={formikProps}
                        orderDetails={orderDetails}
                        column={columns}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default WarehouseFirstCallDialerPageWrapper
