// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { OrderListResponse } from 'src/models'
import {
    setComplaintNumberSearch,
    setOrderNumberSearch,
} from 'src/redux/slices/ComplainSlice'
import {
    useApprovedOrderStatusMutation,
    useGetAllOrderGlobalSearchQuery,
    useGetOrderQuery,
} from 'src/services/OrderService'

// |-- Redux --|
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import {
    setIsTableLoading,
    setItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setTotalItems,
} from 'src/redux/slices/orderSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// Dispatching imports
import { Chip } from '@mui/material'
import moment from 'moment'
import { BiSearch } from 'react-icons/bi'
import { useGetPaginationComplaintQuery } from 'src/services/CallerService'
import { showToast } from 'src/utils'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { handleValidNumber } from 'src/utils/methods/numberMethods'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import AddOrderAssigneeFormWrapper from '../OrderAssigneeForm/AddOrderAssigneeFormWrapper'

enum FirstCallApprovalStatus {
    'APPROVED' = 'APPROVED',
    'CANCEL' = 'CANCEL',
}

const OrderListing = ({
    tabName,
    orderStatus,
    currentStatus,
}: {
    tabName: string
    orderStatus: string
    currentStatus: string
}) => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    // Complaint Redux State
    const complainState: any = useSelector((state: RootState) => state.complain)
    const { orderNumberSearch, complaintNumberSearch } = complainState
    // States
    const [orderMobSearchValue, setOrderMobSearchValue] = useState<string>('')

    // global search order no. and mobile no. value
    const [orderNumberSearchValue, setOrderNumberSearchValue] =
        useState<string>()
    const [mobileNumberSearchValue, setMobileNumberSearchValue] =
        useState<string>()

    const [selectedRows, setSelectedRows] = useState([])
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isOrderAssigneeFormOpen, setIsOrderAssigneeFormOpen] =
        useState<boolean>(false)
    const orderState: any = useSelector((state: RootState) => state.order)

    const [approvedOrderStatus] = useApprovedOrderStatusMutation<any>()

    // Get All Order Data Query
    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        totalItems,
        isTableLoading,
        // filter
        schemeValueFilter,
        // orderStatusValueFilter,
        // deliveryBoyValueFilter,
        // dispositionValueFilter,
        districtValueFilter,
        tehsilValueFilter,
        // dateFilter,
        // orderStatusdateFilter,
        // folloUpTodateFilter,
    } = orderState

    const [filterBy, setFilterBy] = useState<any>([])
    useEffect(() => {
        let filter: any = [
            {
                fieldName: 'companyId',
                value: userData?.companyId,
            },
            {
                fieldName: 'orderNumber',
                value: [searchValue],
            },
            {
                fieldName: 'mobileNo',
                value: [orderMobSearchValue],
            },
            {
                fieldName: 'schemeId',
                value: schemeValueFilter,
            },
            {
                fieldName: 'districtId',
                value: districtValueFilter,
            },
            {
                fieldName: 'tehsilId',
                value: tehsilValueFilter,
            },
        ]
        if (!orderStatus) {
            setFilterBy(filter)
            return
        }
        switch (orderStatus) {
            case null:
                setFilterBy(filter)
                return
            case 'inquiry':
                let filterInquiry = [
                    {
                        fieldName: 'companyId',
                        value: userData?.companyId,
                    },
                    // {
                    //     fieldName: 'orderNumber',
                    //     value: null,
                    // },
                    {
                        fieldName: 'mobileNo',
                        value: [orderMobSearchValue],
                    },
                    {
                        fieldName: 'inquiryNumber',
                        value: [searchValue],
                    },
                    {
                        fieldName: 'status',
                        value: currentStatus,
                    },
                ]
                setFilterBy(filterInquiry)
                return
            case 'all':
                setFilterBy(filter)
                return

            case 'complaint':
                let filtrComplaint = [
                    {
                        fieldName: 'orderNumber',
                        value: orderNumberSearch,
                    },
                    {
                        fieldName: 'complaintNumber',
                        value: complaintNumberSearch,
                    },
                ]
                setFilterBy(filtrComplaint)
                return
            case 'assign':
                let filterAssignedOrders = [
                    ...filter,
                    {
                        fieldName: 'isOrderAssigned',
                        value: true,
                    },
                ]
                setFilterBy([...filterAssignedOrders])
                return
            case 'approved':
                let filterApproval = [
                    ...filter,
                    {
                        fieldName: 'approved',
                        value: false,
                    },
                ]
                setFilterBy([...filterApproval])
                return
            case 'reattempt':
                let filterReattempt = [
                    ...filter,
                    {
                        fieldName: 'status',
                        value: currentStatus,
                    },
                ]
                setFilterBy([...filterReattempt])
                return
            default:
                let filterdefault = [
                    ...filter,
                    {
                        fieldName: 'status',
                        value: currentStatus,
                    },
                    {
                        fieldName: 'approved',
                        value: true,
                    },
                    // {
                    //     fieldName: 'isOrderAssigned',
                    //     value: false,
                    // },
                ]
                setFilterBy(filterdefault)
                return
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        orderState,
        currentStatus,
        orderMobSearchValue,
        orderNumberSearch,
        complaintNumberSearch,
    ])

    const { data, isLoading, isFetching } = useGetOrderQuery(
        {
            limit: rowsPerPage,
            searchValue: '',
            params: ['didNo', 'mobileNo'],
            page: page,
            filterBy: [...filterBy],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        },
        {
            skip:
                orderStatus === 'global-search' || orderStatus === 'complaint',
        }
    )
    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])

    // Global Search Api when Global Search Tab is Avtive
    const {
        data: globalData,
        isLoading: globalDataIsLoading,
        isFetching: globalDataIsFetching,
    } = useGetAllOrderGlobalSearchQuery(
        {
            orderNumber: orderNumberSearchValue || '0',
            phoneNumber: mobileNumberSearchValue,
        },
        {
            skip: !(orderNumberSearchValue || mobileNumberSearchValue),
        }
    )

    useEffect(() => {
        if (orderStatus === 'global-search') {
            if (!globalDataIsFetching && !globalDataIsLoading) {
                dispatch(setIsTableLoading(false))
                dispatch(setTotalItems(0))
                dispatch(setItems(globalData?.data || []))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalData, globalDataIsLoading, globalDataIsFetching, orderStatus])

    const {
        data: complaintData,
        isFetching: isComlaintFecthing,
        isLoading: isComplaintLoading,
        refetch,
    } = useGetPaginationComplaintQuery(
        {
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['customerNumber'],
            page: page,
            filterBy: [...filterBy],

            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        },
        {
            // refetchOnFocus: true,
            skip: orderStatus !== 'complaint' ? true : false,
        }
    )
    useEffect(() => {
        if (orderStatus === 'complaint') {
            refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderStatus])
    useEffect(() => {
        // if (orderStatus === 'complaint') {
        if (!isComplaintLoading && !isComlaintFecthing) {
            dispatch(setIsTableLoading(false))

            dispatch(setItems(complaintData?.data || []))
            dispatch(setTotalItems(complaintData?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isComplaintLoading, isComlaintFecthing, complaintData])

    //
    const handleDeactive = (rowId: string) => {
        setShowDropdown(false)
        approvedOrderStatus(rowId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Status changed successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast(
                    'error',
                    'Something went wrong, Please try again later'
                )
            }
        })
    }

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            extraClasses: 'mr-4',
            renderCell: (row: OrderListResponse) => (
                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                    }}
                    isCustomBtn={!row?.isOrderAssigned}
                    customBtnText="Order Assignee"
                    handleCustomActionButton={() => {
                        setIsOrderAssigneeFormOpen(true)
                        setSelectedOrder(row)
                    }}
                    children={
                        <>
                            <button
                                onClick={() => {
                                    navigate(`/orders/view/${row?._id}`)
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                                View
                            </button>
                        </>
                    }
                />
            ),
        },
        {
            field: 'inquiryNumber',
            headerName: 'Enquiry No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ENQUIRY_NUMBER,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ORDER_NUMBER,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'assignDealerLabel',
            headerName: 'Assigned Dealer',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_DEALER,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.assignDealerLabel || '-'}</span>
            ),
        },
        {
            field: 'firstCallApproval',
            headerName: '1st Call Approval',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_FIRST_CALL_APPROVAL,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => {
                return (
                    <span className="block w-full px-2 py-1 text-left cursor-pointer">
                        {row?.assignWarehouseId ? (
                            row?.firstCallApproval ? (
                                <Chip
                                    className="cursor-pointer"
                                    label="Approved"
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                />
                            ) : row?.firstCallState ===
                              FirstCallApprovalStatus.CANCEL ? (
                                <Chip
                                    className="cursor-pointer"
                                    label="Cancled"
                                    color="warning"
                                    variant="outlined"
                                    size="small"
                                />
                            ) : (
                                <Chip
                                    className="cursor-pointer"
                                    label="Pending"
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        ) : null}
                    </span>
                )
            },
        },
        {
            field: 'firstCallRemark',
            headerName: '1st call remark',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_FIRST_CALL_REMARK,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallRemark || '-'}</span>
            ),
        },
        {
            field: 'firstCallState',
            headerName: 'first Call State',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_FIRST_CALL_STATE,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallState || '-'}</span>
            ),
        },
        {
            field: 'firstCallCallBackDate',
            headerName: 'call back date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_FIRST_CALL_BACK_DATE,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallCallBackDate || '-'}</span>
            ),
        },
        {
            field: 'assignWarehouseLabel',
            headerName: 'Assigned Warehouse',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_WEARHOUSE,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.assignWarehouseLabel || '-'}</span>
            ),
        },
        {
            field: 'orderReferenceNumber',
            headerName: 'Order Ref No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ORDER_REF_NUMBER,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderReferenceNumber || '-'}</span>
            ),
        },

        {
            field: 'trackingNo',
            headerName: 'Tracking No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_TRACKING_NUMBER,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>-</span>,
        },
        {
            field: 'tehsilLabel',
            headerName: 'Taluk',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_TALUK,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.tehsilLabel}</span>
            ),
        },
        {
            field: 'statusDate',
            headerName: 'Status Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_STATUS_DATE,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: OrderListResponse) => (
            //     <span>{row?.assignWarehouseLabel}</span>
            // ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_STATUS,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>{row?.status}</span>,
        },
        {
            field: 'shippingCharges',
            headerName: 'Shipping Charges',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_SHIPPING_CHARGES,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.deliveryCharges}</span>
            ),
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_SCHEME_NAME,
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeName} </span>
            ),
        },
        {
            field: 'schemeCode',
            headerName: 'Scheme Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_SCHEME_CODE,
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeCode} </span>
            ),
        },
        {
            field: 'shcemeQuantity',
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_SHCEME_QUANTITY,
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.shcemeQuantity} </span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_PRICE,
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'pincodeLabel',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_PIN_CODE_LABEL,
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.pincodeLabel} </span>
            ),
        },
        {
            field: 'paymentMode',
            headerName: 'Payment Mode',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_PAYMENT_MODE,
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.paymentMode} </span>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Order Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_CREATED_AT,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">
                    <div className="text-[12px] text-slate-700 font-medium">
                        {moment(row?.createdAt).format('DD MMM YYYY')}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                        {moment(row?.createdAt).format('hh:mm A')}
                    </div>
                </div>
            ),
        },
        // {
        //     field: 'onBackVerifiedDate',
        //     headerName: 'ONBACK Verifie Date',
        //     flex: 'flex-[1_1_0%]',
        // name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_ORDER_NUMBER,
        //     extraClasses: 'min-w-[150px]',
        //     renderCell: (row: OrderListResponse) => <div>-</div>,
        // },
        {
            field: 'edpDate',
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_EDP_DATE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <div>-</div>,
        },
        {
            field: 'districtLabel',
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_DISTRICT_LABEL,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'dispositionLevelThree',
            headerName: 'Disposition',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_DISPOSITION_LEVEL_THREE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dispositionLevelThree}</div>
            ),
        },
        {
            field: 'dealerStatus',
            headerName: 'Dealer Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_DEALER_STATUS,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">
                    {/* {row?.dealerStatus === true ? 'Active' : 'DeActive'} */}
                </div>
            ),
        },
        {
            field: 'dealerCode',
            headerName: 'Dealer Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_DEALER_CODE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dealerCode || '-'}</div>
            ),
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_CUSTOMER_NAME,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'areaLabel',
            headerName: 'Customer Address',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_AREA_LABEL,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'mobileNo',
            headerName: 'Contact No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_MOBILE_NO,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'channelName',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_CHANNEL_NAME,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_CALL_CENTER_LABEL,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },

        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_REMARK,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_AGENT,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.agentName}</div>
            ),
        },
        // {
        //     field: 'agentIdl',
        //     headerName: 'Agent ID',
        //     flex: 'flex-[1_1_0%]',
        // name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_ORDER_NUMBER,
        //     extraClasses: 'min-w-[150px]',
        //    renderCell: (row: OrderListResponse) => (
        //         <div className="py-0">{row?.agentId}</div>
        //     ),
        // },

        {
            field: 'isApproved',
            headerName: 'Approval',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_IS_APPROVED,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: any) => {
                return (
                    <span className="block w-full px-2 py-1 text-left cursor-pointer">
                        {row?.approved ? (
                            <Chip
                                className="cursor-pointer"
                                label="Approved"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Approved',
                                        text: `Do you want to ${
                                            row?.approved
                                                ? 'Disapprove this order'
                                                : 'Approval this order'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : setShowDropdown(false)
                                        },
                                    })
                                }}
                                className="cursor-pointer"
                                label="Disapproved"
                                color="error"
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </span>
                )
            },
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Date Time',
            flex: 'flex-[3_3_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_PREFFERED_DELIVERY_DATE,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            // hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => {
                return (
                    <>
                        <span>
                            {row?.preffered_delivery_date
                                ? moment(row?.preffered_delivery_date).format(
                                      'DD-MM-YYYY'
                                  )
                                : '-'}
                        </span>
                        {/* <span>
                            {' '}
                            {moment(row?.preffered_delivery_date).format(
                                'hh:mm:ss A'
                            )}
                        </span>, */}
                    </>
                )
            },
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Time',
            flex: 'flex-[3_3_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_PREFFERED_DELIVERY_TIME,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => {
                return row?.preffered_delivery_start_time &&
                    row?.preffered_delivery_end_time ? (
                    <span className="flex gap-1">
                        {(row?.preffered_delivery_start_time).replaceAll(
                            '_',
                            ' '
                        ) || '-'}{' '}
                        -{' '}
                        {(row?.preffered_delivery_end_time).replaceAll(
                            '_',
                            ' '
                        ) || '-'}
                    </span>
                ) : (
                    '-'
                )
            },
        },
        {
            field: 'orderMBKNumber',
            headerName: 'MBK Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ORDER_MBK_NUMBER,
            extraClasses: 'min-w-[250px]',
            renderCell: (row: any) => (
                <span> {row.orderMBKNumber || '-'} </span>
            ),
        },
    ]

    const columnsComplaint: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: any) => <span> {row.orderNumber} </span>,
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_ORDER_NUMBER,
        },
        {
            field: 'complaintNumber',
            headerName: 'Complaint Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_COMPLAINT_NUMBER,
            renderCell: (row: any) => <span> {row?.complaintNumber} </span>,
        },
        {
            field: 'complaintbyLabel',
            headerName: 'Complaint Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_COMPLAINT_LABEL,
            renderCell: (row: any) => (
                <span>
                    {' '}
                    {row.complaintbyLabel ? row.complaintbyLabel : 'NA'}
                </span>
            ),
        },
        {
            field: 'schemeName',
            headerName: 'Scheme',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_SCHEME_NAME,
            renderCell: (row: any) => <span> {row.schemeName} </span>,
        },
        {
            field: 'initialCallOneLabel',
            headerName: 'Initial Call One Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_INITAL_CALL_ONE_LABEL,
            renderCell: (row: any) => <span> {row.initialCallOneLabel} </span>,
        },
        {
            field: 'initialCallTwoLabel',
            headerName: 'Initial Call Two Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_INITAL_CALL_TWO_LABEL,
            renderCell: (row: any) => <span> {row.initialCallTwoLabel} </span>,
        },
        {
            field: 'initialCallThreeLabel',
            headerName: 'Initial Call Three Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px]',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_LIST_INITAL_CALL_THREE_LABEL,
            renderCell: (row: any) => (
                <span> {row.initialCallThreeLabel} </span>
            ),
        },
    ]

    return (
        <div className="px-4 h-[calc(100vh-150px)]">
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Order </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
                {/*Table Header */}
                {orderStatus === 'global-search' ? (
                    <div className="flex px-2 py-2 gap-x-4">
                        <div className="flex items-center p-1 border rounded shadow w-fit hover:border-primary-main">
                            <BiSearch className="text-xl text-slate-600" />
                            <input
                                className="border-none rounded outline-none px-2 w-[200px] placeholder:text-slate-500"
                                value={orderNumberSearchValue}
                                placeholder="Order No..."
                                onChange={(e) => {
                                    handleValidNumber(e) &&
                                        setOrderNumberSearchValue(
                                            e.target.value
                                        )
                                    setMobileNumberSearchValue('')
                                }}
                            />
                        </div>
                        <div className="flex items-center p-1 border rounded shadow w-fit hover:border-primary-main">
                            <BiSearch className="text-xl text-slate-600" />
                            <input
                                className="border-none rounded outline-none px-2 w-[200px] placeholder:text-slate-500"
                                value={mobileNumberSearchValue}
                                placeholder="Mobile No..."
                                onChange={(e) => {
                                    handleValidNumber(e) &&
                                        setMobileNumberSearchValue(
                                            e.currentTarget.value
                                        )
                                    setOrderNumberSearchValue('')
                                }}
                            />
                        </div>
                    </div>
                ) : orderStatus === 'complaint' ? (
                    <ATMTableHeader
                        page={page}
                        searchValue={searchValue}
                        isAnotherSearch
                        anotherSearchValue={orderNumberSearch}
                        anotherSearchPlaceholder="Order No..."
                        onAnotherSearch={(newValue) => {
                            dispatch(setOrderNumberSearch(newValue))
                        }}
                        isAnotherSearchTwo
                        anotherSearchTwoValue={complaintNumberSearch}
                        anotherSearchTwoPlaceholder="Complaint No..."
                        onAnotherSearchTwo={(newValue) => {
                            dispatch(setComplaintNumberSearch(newValue))
                        }}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={items}
                        onRowsPerPageChange={(newValue) =>
                            dispatch(setRowsPerPage(newValue))
                        }
                        onSearch={(newValue) =>
                            dispatch(setSearchValue(newValue))
                        }
                    />
                ) : (
                    <ATMTableHeader
                        searchValue={searchValue}
                        placeholder={
                            orderStatus !== 'inquiry'
                                ? 'Order No...'
                                : 'Inquiry No...'
                        }
                        page={page}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={items}
                        onRowsPerPageChange={(newValue) =>
                            dispatch(setRowsPerPage(newValue))
                        }
                        onSearch={(newValue) =>
                            dispatch(setSearchValue(newValue))
                        }
                        isAnotherSearch
                        anotherSearchValue={orderMobSearchValue}
                        anotherSearchPlaceholder="Mobile No..."
                        onAnotherSearch={(newValue) => {
                            setOrderMobSearchValue(newValue)
                        }}
                        isRefresh
                        // isFilter
                    />
                )}

                {/* Table */}
                <div className="overflow-auto grow">
                    <ATMTable
                        extraClasses="w-[200%]"
                        columns={
                            orderStatus === 'complaint'
                                ? columnsComplaint
                                : columns
                        }
                        rows={items}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) => {
                            setSelectedRows(selectedRows)
                        }}
                        isLoading={isTableLoading}
                    />
                </div>

                <DialogLogBox
                    maxWidth="md"
                    handleClose={() => {
                        setIsOrderAssigneeFormOpen(false)
                        setSelectedOrder(null)
                    }}
                    isOpen={isOrderAssigneeFormOpen}
                    component={
                        <AddOrderAssigneeFormWrapper
                            selectedOrder={selectedOrder}
                            handleClose={() => {
                                setIsOrderAssigneeFormOpen(false)
                                setSelectedOrder(null)
                            }}
                        />
                    }
                />

                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={items}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrderListing
