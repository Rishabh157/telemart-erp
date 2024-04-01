import React, { useState, useEffect } from 'react'
import { Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import WarehouseFirstCallPage from './WarehouseFirstCallPage'
import {
    useGetOrderByIdQuery,
    useUpdateWarehouseFirstCallMutation,
} from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { OrderListResponse } from 'src/models'
import { useParams } from 'react-router-dom'

export type FormInitialValues = {
    address: string
    remark: string
    callbackDate: string
    status: string
}

export interface OrderDetailsPropsTypes {
    orderNumber: string | number
    assignDealerLabel: string
    name: string
    price: number
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

const WarehouseFirstCallPageWrapper = () => {
    const [apiStatus, setApiStatus] = React.useState<boolean>(false)
    const params = useParams()
    const orderId = params?.id
    //  showing initial order details
    const [orderDetails, setOrderDetails] = useState<OrderDetailsPropsTypes>({
        orderNumber: '',
        assignDealerLabel: '',
        name: '',
        price: 0,
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
    const { isLoading, isFetching, data } = useGetOrderByIdQuery(orderId, {
        skip: !orderId,
    })

    useEffect(() => {
        if (!isLoading && !isFetching) {
            const orderData: OrderListResponse = data?.data
            setOrderDetails({
                orderNumber: orderData.orderNumber,
                assignDealerLabel: orderData?.assignDealerLabel,
                name: orderData?.customerName,
                price: orderData?.price || 0,
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
                shcemeQuantity: orderData?.shcemeQuantity || 0,
                totalAmount: orderData?.totalAmount || 0,
                deliveryCharges: orderData?.deliveryCharges || 0,
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
    const [updateWarehouseFirstCall] = useUpdateWarehouseFirstCallMutation()

    const initialValues: FormInitialValues = {
        address: orderDetails?.address,
        remark: '',
        callbackDate: '',
        status: '',
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
                        window.history.back()
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
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <WarehouseFirstCallPage
                            formikProps={formikProps}
                            orderDetails={orderDetails}
                            column={columns}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default WarehouseFirstCallPageWrapper
