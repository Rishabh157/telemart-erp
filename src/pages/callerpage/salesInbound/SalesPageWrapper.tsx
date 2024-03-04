import React, { useState, useEffect } from 'react'
import { AppDispatch, RootState } from 'src/redux/store'
import { number, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import {
    useAddCallerFormMutation,
    useUpdateCallerFormMutation,
} from 'src/services/CallerService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/inboundCallerSlice'
import { setSelectedItem as setDidItems } from 'src/redux/slices/media/didManagementSlice'
import {
    useGetOrderNumberUnAuthCallerDataQuery,
    useGetPaginationUnAuthCallerDataQuery,
} from 'src/services/CallerService'
import { OrderListResponse } from 'src/models'
import { useLocation } from 'react-router-dom'
import { useGetByDidNumberQuery } from 'src/services/media/DidManagementServices'
import { statusProps } from '../../orders'
import { useNavigate } from 'react-router-dom'
import SalesPage from './SalesPage'
import moment from 'moment'

// import moment from 'moment'

export type FormInitialValues = {
    agentName: string | null
    didNo: string
    ageGroup: string
    mobileNo: string
    alternateNo: string
    autoFillingShippingAddress: string
    callType: string
    campaign: string
    customerName: string
    preffered_delivery_start_time: string
    preffered_delivery_end_time: string
    preffered_delivery_date: any
    countryId: string | null
    countryLabel: string
    stateId: string | null
    stateLabel: string
    districtId: string | null
    districtLabel: string
    tehsilId: string | null
    tehsilLabel: string
    schemeId: string | null
    schemeName: string
    pincodeId: string | null
    pincodeLabel: string | null
    areaId: string | null
    areaLabel: string
    emailId: string
    flagStatus: string
    gender: string
    houseNumber: string
    incomingCallerNo: string
    landmark: string
    medicalIssue: string[]
    orderFor: string[]
    orderForOther?: string | null
    paymentMode: string
    productGroupId: string | null
    reciversName: string
    remark: string
    shcemeQuantity: number
    socialMedia: {
        facebook: string
        instagram: string
    }
    streetNumber: string
    typeOfAddress: string
    whatsappNo: string
    price: number
    deliveryCharges: number
    totalAmount: number
    dispositionLevelTwoId: string | null
    dispositionLevelThreeId: string | null
    status: string
}

enum TabTypes {
    history = 'history',
    order = 'order',
    complaint = 'complaint',
}

const SalesPageWrapper = () => {
    const [orderData, setOrderData] = useState<any>({})
    const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.history)

    const [apiStatus, setApiStatus] = React.useState(false)
    const locationUrl = useLocation()
    const queryParams = new URLSearchParams(locationUrl.search)
    const phoneNumber = queryParams.get('phone')
    const agentName = queryParams.get('username')
    const didNumber = queryParams.get('didnumber')
    const campaignId = queryParams.get('campaign')
    const calltype = queryParams.get('calltype')
    // const dstphone = queryParams.get('dstphone')
    const columns: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderNumber === null ? '-' : row.orderNumber}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            headerName: 'Enquiry No.',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'agentName',
            headerName: 'Agent Name',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row.agentName} </span>
            ),
        },
        {
            field: 'agendName',
            headerName: 'Agent ID',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> NA </span>,
        },
        {
            field: 'edpDate',
            headerName: 'EDP Date',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> NA </span>,
        },
        {
            field: 'reciversName',
            headerName: 'Customer Name',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row.reciversName} </span>
            ),
        },
        {
            field: 'scheme',
            headerName: 'Scheme',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row.schemeName} </span>
            ),
        },
        {
            field: 'shcemeQuantity',
            headerName: 'Quantity',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row.shcemeQuantity} </span>
            ),
        },
        {
            field: 'disposition',
            headerName: 'Disposition',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row.dispositionLevelThree} </span>
            ),
        },
        {
            field: 'districtLabel',
            headerName: 'District',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row.districtLabel} </span>
            ),
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row.pincodeLabel} </span>
            ),
        },
        {
            field: 'remark',
            headerName: 'Agent Remark',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> {row.remark} </span>,
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Date',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => {
                return (
                    <>
                        <span>
                            {row?.preffered_delivery_date ? moment(row?.preffered_delivery_date).format(
                                'DD-MM-YYYY'
                            ) : '-'}
                        </span>
                        {/* <span>
                            {' '}
                            {moment(row?.preffered_delivery_date).format(
                                'hh:mm:ss A'
                            )}
                        </span>, */}
                    </>
                )
            }
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Time',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => {
                return (
                    <>
                        <span className='flex gap-1'>
                            {(row?.preffered_delivery_start_time).replaceAll('_', ' ') || '-'} - {(row?.preffered_delivery_end_time).replaceAll('_', ' ') || '-'}
                        </span>,
                    </>
                )
            }
        },
        {
            field: 'dealerCode',
            headerName: 'Dealer Code',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row?.dealerCode} </span>
            ),
        },
        {
            field: 'dealerStatus',
            headerName: 'Dealer Status',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> NA </span>,
        },
        {
            field: 'status',
            headerName: 'Status Date',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            // renderCell: (row: OrderListResponse) => (
            //     <span> {row?.dealerCode} </span>
            // ),
        },
        {
            field: 'ccName',
            headerName: 'CC Name',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row?.callCenterLabel} </span>
            ),
        },
        {
            field: 'wareHouseLabel',
            headerName: 'Warehouse',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row?.wareHouseLabel} </span>
            ),
        },
        {
            field: 'trackingNo',
            headerName: 'Tracking No.',
            flex: 'flex-[3_3_0%]',
            align: 'end',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> NA </span>,
        },
        // For Complaint Tab Showing Fields
        {
            field: 'complaintNumber',
            headerName: 'Complaint No.',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'customerNumber',
            headerName: 'Customer Number',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row?.orderStatus} </span>
            ),
        },
        {
            field: 'icOneLabel',
            headerName: 'IC One',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'icTwoLabel',
            headerName: 'IC Two',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'icThreeLabel',
            headerName: 'IC Three',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
    ]

    const inboundCallerState: any = useSelector(
        (state: RootState) => state.inboundCaller
    )
    const navigate = useNavigate()

    const { items, isTableLoading } = inboundCallerState

    // Table Data with MobileNo filtered

    const [AddCallerForm] = useAddCallerFormMutation()
    const [UpdateCallerForm] = useUpdateCallerFormMutation()

    const initialValues: FormInitialValues = {
        agentName: agentName,
        campaign: campaignId as string,
        callType: calltype as string,
        incomingCallerNo: '',
        customerName: orderData?.customerName || '',
        didNo: didNumber as string,
        flagStatus: '',
        productGroupId: null,
        schemeId: null,
        schemeName: '',
        shcemeQuantity: 1,
        price: 0,
        deliveryCharges: 0,
        totalAmount: 0,
        // DELEVERY ADDRESS SELECT OPTIONS
        countryId: null,
        countryLabel: '',
        pincodeId: orderData?.pincodeId || null,
        pincodeLabel: orderData?.pincodeLabel || '',
        stateId: orderData?.stateId || null,
        stateLabel: orderData?.stateLabel || '',
        // villageId: null,
        areaId: orderData?.areaId || null,
        areaLabel: orderData?.areaLabel || '',
        districtId: orderData?.districtId || null,
        districtLabel: orderData?.districtLabel || '',
        tehsilId: orderData?.tehsilId || null,
        tehsilLabel: orderData?.tehsilLabel || '',
        typeOfAddress: '',
        reciversName: orderData?.reciversName || '',
        preffered_delivery_start_time:
            orderData?.preffered_delivery_start_time || '',
        preffered_delivery_end_time:
            orderData?.preffered_delivery_end_time || '',
        preffered_delivery_date: null,
        houseNumber: orderData?.houseNumber || '',
        streetNumber: orderData?.streetNumber || '',
        landmark: orderData?.landmark || '',
        mobileNo: phoneNumber as string,
        whatsappNo: orderData?.whatsappNo || '',
        autoFillingShippingAddress: orderData?.autoFillingShippingAddress || '',
        // isRecording: false,
        gender: orderData?.gender || 'MALE',
        orderFor: orderData?.orderFor || [],
        orderForOther: orderData?.orderForOther || '',
        ageGroup: orderData?.ageGroup || '',
        emailId: orderData?.emailId || '',
        socialMedia: {
            facebook: orderData?.socialMedia?.facebook || '',
            instagram: orderData?.socialMedia?.instagram || '',
        },
        medicalIssue: orderData?.medicalIssue || [],
        paymentMode: 'COD',
        remark: '',
        dispositionLevelTwoId: null,
        dispositionLevelThreeId: null,
        alternateNo: orderData?.alternateNo || '',
        status: statusProps.fresh,
    }

    // Form validation schema
    // eslint-disable-next-line
    const validationSchema = object({
        productGroupId: string().required('product group id is required'),
        // DELEVERY ADDRESS SELECT OPTIONS
        countryId: string(),
        // pincodeId: string(),
        // stateId: string(),
        // areaId: string(),
        // districtId: string(),
        // tehsilId: string(),
        typeOfAddress: string(),
        reciversName: string(),
        deliveryTimeAndDate: string(),
        houseNumber: string(),
        streetNumber: string(),
        landmark: string(),
        mobileNo: string(),
        whatsappNo: string()
            .min(10, 'mobile number is not valid')
            .max(10, 'mobile number is not valid'),
        autoFillingShippingAddress: string(),
        // isRecording: boolean(),
        gender: string(),
        schemeQuantity: number()
            .integer()
            .min(1, 'Scheme quantity must be at least 1')
            .max(9, 'Scheme quantity cannot exceed 9')
            .required('Scheme quantity is required'),
        // orderFor: string(),
        orderForOtherText: string(),
        ageGroup: string(),
        emailId: string().email('invalid email'),
        // medicalIssue: array().of(string()),
        remark: string(),
        dispositionLevelTwoId: string().required(
            'disposition level one is required'
        ),
        dispositionLevelThreeId: string().required(
            'disposition level two is required'
        ),
        alternateNo: string()
            .min(10, 'mobile number is not valid')
            .max(10, 'mobile number is not valid'),
    })

    const {
        data: callerListingData,
        isFetching: isCallerFetching,
        isLoading: isCallerLoading,
    } = useGetPaginationUnAuthCallerDataQuery(
        { phoneNo: phoneNumber || '', type: activeTab },
        {
            skip: !phoneNumber,
        }
    )

    //
    const {
        data: singleCallerListingData,
        isFetching: singleIsCallerFetching,
        isLoading: singleIsCallerLoading,
    } = useGetOrderNumberUnAuthCallerDataQuery(
        { phoneNo: phoneNumber || '' },
        {
            skip: !phoneNumber,
        }
    )

    useEffect(() => {
        if (!isCallerFetching && !isCallerLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(callerListingData?.data || []))
            dispatch(setTotalItems(callerListingData?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCallerLoading, isCallerFetching, callerListingData])
    const dispatch = useDispatch<AppDispatch>()

    const { selectedItem: didItems }: any = useSelector(
        (state: RootState) => state.didManagement
    )

    // Set did Number
    const {
        data: didData,
        isLoading: didIsLoading,
        isFetching: didIsFetching,
    } = useGetByDidNumberQuery(didNumber, {
        skip: !didNumber,
    })
    useEffect(() => {
        if (!didIsLoading && !didIsFetching) {
            dispatch(setDidItems(didData?.data))
        }
    }, [didData, didIsLoading, didIsFetching, dispatch])

    // Caller Page Save Button Form Updation
    const onSubmitHandler = (values: FormInitialValues, { resetForm }: any) => {
        setApiStatus(true)
        const callerDetails: any = localStorage.getItem('callerPageData')
        let callerDataItem = JSON.parse(callerDetails)
        // setApiStatus(true)
        setTimeout(() => {
            UpdateCallerForm({
                body: {
                    ...values,
                    companyId: callerDataItem?.companyId,
                    agentId: callerDataItem?.agentId,
                    preffered_delivery_date: values?.preffered_delivery_date
                        ? values?.preffered_delivery_date
                        : '',
                },
                id: callerDataItem?.orderID,
            })
                .then((res: any) => {
                    if ('data' in res) {
                        // resetForm({ isSubmitting: false, dirty: false })
                        if (res?.data?.status) {
                            showToast('success', 'caller added successfully!')
                            localStorage.removeItem('callerPageData')
                            navigate('/success')
                            setApiStatus(false)
                        } else {
                            showToast('error', res?.data?.message)
                            setApiStatus(false)
                        }
                    } else {
                        setApiStatus(false)
                        showToast('error', 'Something went wrong')
                    }
                    // setApiStatus(false)
                })
                .catch((err) => {
                    setApiStatus(false)
                    showToast('error', 'Something went wrong')
                })
        }, 1000)
    }

    //  Add Form when page loaded & set 'callerPageData' key in LocalStorage
    useEffect(() => {
        const callDetails: any = localStorage.getItem('callerPageData')
        let callDataItem = JSON.parse(callDetails)

        const { preffered_delivery_date, ...rest } = initialValues

        if (!callDataItem) {
            // use object destructuring to remove the _id property
            AddCallerForm({
                ...rest,
                preffered_delivery_date: preffered_delivery_date || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        if (res?.data?.data?._id) {
                            let callerData = {
                                orderID: res?.data?.data?._id,
                                mobileNo: initialValues.mobileNo,
                                didNo: initialValues.didNo,
                                companyId: res?.data?.data?.companyId,
                                agentId: res?.data?.data?.agentId,
                            }
                            localStorage.setItem(
                                'callerPageData',
                                JSON.stringify(callerData)
                            )
                        }
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
            })
        }

        return () => {
            // Remove the localStorage item when component unmounts
            localStorage.removeItem('callerPageData')
        }
        // eslint-disable-next-line
    }, [orderData])

    useEffect(() => {
        if (!singleIsCallerFetching && !singleIsCallerLoading) {
            setOrderData(singleCallerListingData?.data)
        }
    }, [singleCallerListingData, singleIsCallerFetching, singleIsCallerLoading])

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <form autoComplete="off">
                        <SalesPage
                            formikProps={formikProps}
                            didItems={didItems}
                            activeTab={TabTypes[activeTab]}
                            setActiveTab={(value) => setActiveTab(value as any)}
                            column={columns}
                            rows={items}
                            apiStatus={apiStatus}
                            isTableLoading={isTableLoading}
                        />
                    </form>
                )
            }}
        </Formik>
    )
}

export default SalesPageWrapper
