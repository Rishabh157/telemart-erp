import React, { useEffect } from 'react'
import OrderListing from '../OrderListing'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { OrderListResponse } from 'src/models'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { Chip } from '@mui/material'
import { FirstCallApprovalStatus } from 'src/pages/warehouseFirstCallOrders/list/WarehouseAssignedOrderWrapper'
import {
    useApprovedOrderStatusMutation,
    useGetOrderQuery,
} from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import SwtAlertChipConfirm from 'src/utils/SwtAlertChipConfirm'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/orderSlice'
import { OrderStatusEnum } from 'src/utils/constants/enums'
import { ATMOrderStatus, ATMDateTimeDisplay, ATMPincodeDisplay, ATMDealerDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'

const HoldOrdersListingWrapper = () => {
    const navigate = useNavigate()
    const [approvedOrderStatus] = useApprovedOrderStatusMutation<any>()
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const orderState: any = useSelector((state: RootState) => state.order)

    // Get All Order Data Query
    const { page, rowsPerPage, searchValue, mobileNumberSearchValue } =
        orderState

    const { data, isLoading, isFetching } = useGetOrderQuery({
        limit: rowsPerPage,
        searchValue: '',
        params: ['didNo', 'mobileNo'],
        page: page,
        filterBy: [
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
                value: [mobileNumberSearchValue],
            },
            {
                fieldName: 'status',
                value: OrderStatusEnum.HOLD,
            },
            {
                fieldName: 'approved',
                value: true,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

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

    const handleOrderApproval = (orderId: string, transactionId: string) => {
        approvedOrderStatus({ orderId, transactionId }).then((res: any) => {
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

    // order column
    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            extraClasses: 'text-xs mr-4',
            renderCell: (row: OrderListResponse) => (
                <ActionPopup
                    isView
                    handleViewActionButton={() => {
                        navigate(`/orders/view/${row?._id}`)
                    }}
                    handleOnAction={() => { }}
                />
            ),
        },
        {
            field: 'inquiryNumber',
            headerName: 'Inquiry No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_INQUIRY_NUMBER,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_ORDER_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'assignDealerLabel',
            headerName: 'Assigned Dealer',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_ASSIGNED_DEALER,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMDealerDisplay disableName dealerCode={row?.assignDealerCode} />,
        },
        {
            field: 'assignWarehouseLabel',
            headerName: 'Warehouse',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_ASSIGNED_WEARHOUSE,
            align: 'start',
            extraClasses: 'text-xs min-w-[200px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.assignWarehouseLabel || '-'}</span>
            ),
        },
        {
            field: 'isApproved',
            headerName: 'Approval',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_APPROVAL,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: any) => {
                return (
                    <span className="block w-full px-2 py-1 text-left cursor-pointer">
                        {row?.approved ? (
                            <Chip
                                className="cursor-pointer text-xs"
                                label="Approved"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <SwtAlertChipConfirm
                                title="Approval"
                                text="Do you want to Approve ?"
                                color="warning"
                                chipLabel="pending"
                                errorMessage="please enter transaction id"
                                input={'text'}
                                inputPlaceholder="transaction id"
                                showCancelButton
                                showDenyButton={false}
                                icon="warning"
                                confirmButtonColor="#3085d6"
                                cancelButtonColor="#dc3741"
                                confirmButtonText="Yes"
                                next={(res) => {
                                    if (res.isConfirmed || res?.isDenied) {
                                        return res.isConfirmed
                                            ? handleOrderApproval(
                                                row?._id,
                                                res?.value
                                            )
                                            : null
                                    }
                                }}
                            />
                        )}
                    </span>
                )
            },
        },
        {
            field: 'mobileNo',
            headerName: 'Mobile No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_MOBILE_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_CUSTOMER_NAME,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0" title={row?.customerName}>{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_STATUS,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMOrderStatus status={row?.status} />,
        },
        {
            field: 'firstCallApproval',
            headerName: '1st Call Approval',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_FIRST_CALL_APPROVAL,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => {
                return (
                    <span className="block w-full px-2 py-1 text-left">
                        {row?.assignWarehouseId ? (
                            row?.firstCallApproval ? (
                                <p className="text-green-500"> Approved </p>
                            ) : row?.firstCallState ===
                                FirstCallApprovalStatus.CANCEL ? (
                                <p className="text-red-500"> Cancelled </p>
                            ) : (
                                <p className="text-orange-500"> Pending </p>
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
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_FIRST_CALL_REMARK,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallRemark || '-'}</span>
            ),
        },
        {
            field: 'firstCallState',
            headerName: 'first Call State',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_FIRST_CALL_STATE,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallState || '-'}</span>
            ),
        },
        {
            field: 'firstCallCallBackDate',
            headerName: 'call back date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_FIRST_CALL_BACK_DATE,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallCallBackDate || '-'}</span>
            ),
        },
        {
            field: 'orderReferenceNumber',
            headerName: 'Order Ref No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_ORDER_REFRENCE_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderReferenceNumber || '-'}</span>
            ),
        },
        {
            field: 'trackingNo',
            headerName: 'Tracking No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_TRACKING_NUMBER,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>NA</span>,
        },
        {
            field: 'shippingCharges',
            headerName: 'Shipping Charges',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_SHIPPING_CHARGES,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.deliveryCharges}</span>
            ),
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_SCHEME_NAME,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeName} </span>
            ),
        },
        {
            field: 'shcemeQuantity',
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_SHCEME_QUANTITY,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.shcemeQuantity} </span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_PRICE,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'paymentMode',
            headerName: 'Payment Mode',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_PAYMENT_MODE,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.paymentMode} </span>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Order Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_CREATED_AT,
            extraClasses: 'text-xs min-w-[150px]',
renderCell: (row: OrderListResponse) => <ATMDateTimeDisplay createdAt={row?.createdAt} />
        },
        {
            field: 'edpDate',
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_EDP_DATE,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <div>NA</div>,
        },
        {
            field: 'dispositionLevelTwo',
            headerName: 'Disposition (One/Two)',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_DISPOSITION_LEVELS,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div>
                    <div className="text-xs text-slate-700 font-medium">
                        {row?.dispositionLevelTwoLabel || '-'}
                    </div>
                    <div className="text-xs text-primary-main font-medium">
                        {row?.dispositionLevelThreeLabel}
                    </div>
                </div>
            ),
        },
        {
            field: 'districtLabel',
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_DISTRICT,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'tehsilLabel',
            headerName: 'Taluk',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_TALUK,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.tehsilLabel}</span>
            ),
        },
        {
            field: 'pincodeLabel',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_PIN_CODE,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMPincodeDisplay pincode={row?.pincodeLabel} />,
        },
        {
            field: 'areaLabel',
            headerName: 'Area',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_AREA,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'channelName',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_CHANNEL_NAME,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_CALL_CENTER,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_REMARK,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_AGENT,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.agentName}</div>
            ),
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Date',
            flex: 'flex-[3_3_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_PREFFERED_DELIVERY_DATE,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMDateTimeDisplay createdAt={row?.preffered_delivery_date} disableTime />
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Time',
            flex: 'flex-[3_3_0%]',
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_PREFFERED_DELIVERY_TIME,
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
            name: UserModuleNameTypes.ORDER_HOLD_TAB_LIST_ORDER_MBK_NUMBER,
            extraClasses: 'text-xs min-w-[250px]',
            renderCell: (row: any) => (
                <span> {row.orderMBKNumber || '-'} </span>
            ),
        },
    ]

    return <OrderListing columns={columns} />
}

export default HoldOrdersListingWrapper
