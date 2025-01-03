import React, { useState, useEffect } from 'react'
import { AppDispatch, RootState } from 'src/redux/store'
import { number, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import {
    useAddOrderCreationFormMutation,
    useUpdateOrderCreationCallerFormMutation,
    useGetPaginationCallerDataQuery,
    useGetOrderNumberCallerDataQuery,
} from 'src/services/CreateOrderService'
import { useGetByDidNumberByAuthQuery } from 'src/services/media/DidManagementServices'

// redux slice
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/inboundCallerSlice'
import { OrderListResponse } from 'src/models'
import { useLocation } from 'react-router-dom'
import { statusProps } from '../../orders'
import { useNavigate } from 'react-router-dom'
import CreateOrderPage from './CreateOrderPage'
import { useGetAllProductGroupUnAuthQuery } from 'src/services/ProductGroupService'
import { SelectOption } from 'src/models/FormField/FormField.model'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { ATMDateTimeDisplay, ATMPincodeDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'

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
    productGroupLabel?: string | null
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
    dispositionLevelTwoLabel?: string | null
    dispositionLevelThreeId: string | null
    dispositionLevelThreeLabel?: string | null
    status: string
}

enum TabTypes {
    history = 'history',
    order = 'order',
    complaint = 'complaint',
}
type ProductGroupResponse = {
    _id: string
    groupName: string
    dealerSalePrice: number
    gst: number
    cgst: number
    sgst: number
    igst: number
    utgst: number
    companyId: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
}
type LocalUserStorage = {
    agentId: string
    companyId: string
    didNo: string
    mobileNo: string
    orderID: string
}

const CreateOrderPageWrapper = () => {
    const [orderData, setOrderData] = useState<any>({})
    const [customerReputationType, setCustomerReputationType] =
        useState<any>()
    const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.history)
    const [apiStatus, setApiStatus] = React.useState(false)
    const [productsGroupOptions, setProductsGroupOptions] = useState<
        SelectOption[] | []
    >([])
    const [addApi, setAddApi] = useState(false)

    const [callerLoacalStorage, setcallerLoacalStorage] =
        useState<LocalUserStorage>()

    const locationUrl = useLocation()
    const createOrderState = locationUrl.state
    const inboundCallerState: any = useSelector(
        (state: RootState) => state.inboundCaller
    )

    const navigate = useNavigate()
    const { items, isTableLoading } = inboundCallerState
    // Table Data with MobileNo filtered
    const [addCallerForm] = useAddOrderCreationFormMutation()
    const [updateCallerForm] = useUpdateOrderCreationCallerFormMutation()

    // get DID number by
    const { items: didItems } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetByDidNumberByAuthQuery(
            createOrderState?.didNumber,
            {
                skip: !createOrderState?.didNumber,
            }
        ),
    })

    const {
        data: callerListingData,
        isFetching: isCallerFetching,
        isLoading: isCallerLoading,
    } = useGetPaginationCallerDataQuery<any>(
        {
            phoneNo: createOrderState?.mobileNumber || '',
            type: activeTab,
        },
        {
            skip: !createOrderState?.mobileNumber,
        }
    )

    const {
        data: singleCallerListingData,
        isFetching: singleIsCallerFetching,
        isLoading: singleIsCallerLoading,
    } = useGetOrderNumberCallerDataQuery<any>(
        { phoneNo: createOrderState?.mobileNumber || '' },
        {
            skip: !createOrderState?.mobileNumber,
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

    //  Add Form when page loaded & set 'callerPageData' key in LocalStorage
    useEffect(() => {
        const callDetails: any = localStorage.getItem('callerPageData')
        let callDataItem = JSON.parse(callDetails)

        const { preffered_delivery_date, ...rest } = initialValues

        if (!callDataItem && addApi) {
            // use object destructuring to remove the _id property
            addCallerForm({
                ...rest,
                companyCode: createOrderState?.companyCode,
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
                            setcallerLoacalStorage(callerData)
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
    }, [addApi])

    useEffect(() => {
        if (!singleIsCallerFetching && !singleIsCallerLoading) {
            setOrderData(singleCallerListingData?.data)
            setCustomerReputationType(
                singleCallerListingData?.customerReputation
            )
            setAddApi(true)
        }
    }, [singleCallerListingData, singleIsCallerFetching, singleIsCallerLoading])

    useEffect(() => {
        return () => {
            dispatch(setIsTableLoading(null))
            dispatch(setItems(null))
            dispatch(setTotalItems(null))
            // dispatch(setDidItems(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //product data
    const {
        data: productGroupData,
        isLoading: isProductGroupLoading,
        isFetching: isProductGroupFetching,
    } = useGetAllProductGroupUnAuthQuery(callerLoacalStorage?.companyId, {
        skip: !callerLoacalStorage?.companyId,
    })

    useEffect(() => {
        if (!isProductGroupLoading && !isProductGroupFetching) {
            if (productGroupData?.status) {
                const productGroupOptionsList = productGroupData?.data?.map(
                    (products: ProductGroupResponse) => {
                        return {
                            label: products?.groupName,
                            value: products?._id,
                        }
                    }
                )
                setProductsGroupOptions(productGroupOptionsList)
            }
        }
    }, [productGroupData, isProductGroupLoading, isProductGroupFetching])

    const columns: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderNumber === null ? '-' : row.orderNumber}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            headerName: 'Enquiry No.',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'agentName',
            headerName: 'Agent Name',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
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
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> NA </span>,
        },
        {
            field: 'edpDate',
            headerName: 'EDP Date',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> NA </span>,
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row.customerName} </span>
            ),
        },
        {
            field: 'scheme',
            headerName: 'Scheme',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row.schemeName} </span>
            ),
        },
        {
            field: 'shcemeQuantity',
            headerName: 'Quantity',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
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
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row.dispositionLevelThreeLabel} </span>
            ),
        },
        {
            field: 'districtLabel',
            headerName: 'District',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
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
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <ATMPincodeDisplay pincode={row?.pincodeLabel} />,
        },
        {
            field: 'remark',
            headerName: 'Agent Remark',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> {row.remark} </span>,
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Date',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <ATMDateTimeDisplay createdAt={row?.preffered_delivery_date} disableTime />
        },
        {
            field: 'preffered_delivery_start_time',
            headerName: 'Preffred Delivery Time',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => {
                return (
                    <>
                        <span className="flex gap-1">
                            {row?.preffered_delivery_start_time?.replaceAll(
                                '_',
                                ' '
                            ) || '-'}{' '}
                            -{' '}
                            {row?.preffered_delivery_end_time?.replaceAll(
                                '_',
                                ' '
                            ) || '-'}
                        </span>
                        ,
                    </>
                )
            },
        },
        {
            field: 'dealerCode',
            headerName: 'Dealer Code',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => (
                <span> {row?.assignDealerCode} </span>
            ),
        },
        {
            field: 'dealerStatus',
            headerName: 'Dealer Status',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> NA </span>,
        },
        {
            field: 'status',
            headerName: 'Status Date',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
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
            extraClasses: 'text-white text-xs min-w-[150px]',
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
            extraClasses: 'text-white text-xs min-w-[150px]',
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
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <span> NA </span>,
        },
        // For Complaint Tab Showing Fields
        {
            field: 'complaintNumber',
            headerName: 'Complaint No.',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'customerNumber',
            headerName: 'Customer Number',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
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
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'icTwoLabel',
            headerName: 'IC Two',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'icThreeLabel',
            headerName: 'IC Three',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-white text-xs min-w-[150px]',
            hidden: !(activeTab === TabTypes?.complaint),
        },
    ]

    const initialValues: FormInitialValues = {
        agentName: createOrderState?.userName,
        campaign: createOrderState?.campaignName,
        callType: createOrderState?.callType,
        incomingCallerNo: '',
        customerName: orderData?.customerName || '',
        didNo: createOrderState?.didNumber,
        flagStatus: '',
        productGroupId: didItems?.schemeProductGroup?.[0]?.productGroup || null,
        productGroupLabel: '',
        schemeId: didItems?.schemeId || null,
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
        preffered_delivery_start_time:
            orderData?.preffered_delivery_start_time || '',
        preffered_delivery_end_time:
            orderData?.preffered_delivery_end_time || '',
        preffered_delivery_date: null,
        houseNumber: orderData?.houseNumber || '',
        streetNumber: orderData?.streetNumber || '',
        landmark: orderData?.landmark || '',
        mobileNo: createOrderState?.mobileNumber,
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
        dispositionLevelTwoLabel: '',
        dispositionLevelThreeId: null,
        dispositionLevelThreeLabel: '',
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
    // Caller Page Save Button Form Updation
    const onSubmitHandler = (values: FormInitialValues, { resetForm }: any) => {


        const addressLabels = `${values.stateLabel ? values.stateLabel + '\n' : ''
            }${values.districtLabel ? values.districtLabel + '\n' : ''}${values.tehsilLabel ? values.tehsilLabel + '\n' : ''
            }${values.pincodeLabel ? values.pincodeLabel + '\n' : ''}${values.areaLabel ? values.areaLabel + '\n' : ''
            }${values.houseNumber ? values.houseNumber + '\n' : ''}${values.streetNumber ? values.streetNumber + '\n' : ''
            }${values.landmark ? values.landmark + '\n' : ''}`

        if (!values?.autoFillingShippingAddress) {
            values.autoFillingShippingAddress = addressLabels
        }


        setApiStatus(true)
        const callerDetails: any = localStorage.getItem('callerPageData')
        let callerDataItem = JSON.parse(callerDetails)
        // setApiStatus(true)
        setTimeout(() => {
            updateCallerForm({
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
                        showToast('error', res?.error?.data?.message)
                    }
                    // setApiStatus(false)
                }).catch((err) => {
                    setApiStatus(false)
                    showToast('error', 'Something went wrong')
                })
        }, 1000)
    }

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
                        <CreateOrderPage
                            formikProps={formikProps}
                            didItems={didItems}
                            customerReputationType={
                                customerReputationType || ''
                            }
                            activeTab={TabTypes[activeTab]}
                            setActiveTab={(value) => setActiveTab(value as any)}
                            column={columns}
                            rows={items}
                            apiStatus={apiStatus}
                            isTableLoading={isTableLoading}
                            productsGroupOptions={productsGroupOptions}
                            companyId={
                                (callerLoacalStorage?.companyId as string) || ''
                            }
                        />
                    </form>
                )
            }}
        </Formik>
    )
}

export default CreateOrderPageWrapper
