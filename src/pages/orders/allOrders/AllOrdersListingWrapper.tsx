import React, { useState } from 'react'
import OrderListing from '../OrderListing'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { OrderListResponse } from 'src/models'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { Chip } from '@mui/material'
import { FirstCallApprovalStatus } from 'src/pages/warehouseFirstCallOrders/list/WarehouseAssignedOrderWrapper'
import moment from 'moment'
import { useApprovedOrderStatusMutation } from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import SwtAlertChipConfirm from 'src/utils/SwtAlertChipConfirm'

type Props = {
    tabName: string
    orderStatus: string
    currentStatus: string
}
const AllOrdersListingWrapper = ({
    tabName,
    orderStatus,
    currentStatus,
}: Props) => {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [approvedOrderStatus] = useApprovedOrderStatusMutation<any>()
    // const [selectedOrder, setSelectedOrder] = useState<any>(null)
    // const [isOrderAssigneeFormOpen, setIsOrderAssigneeFormOpen] =
    //     useState<boolean>(false)
    // order column
    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            extraClasses: 'mr-4',
            renderCell: (row: OrderListResponse) => (
                <ActionPopup
                    isView
                    handleViewActionButton={() => {
                        navigate(`/orders/view/${row?._id}`)
                    }}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                    }}
                    // isCustomBtn={!row?.isOrderAssigned}
                    // customBtnText="Order Assignee"
                    // handleCustomActionButton={() => {
                    //     setIsOrderAssigneeFormOpen(true)
                    //     setSelectedOrder(row)
                    // }}
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
                            // <Chip
                            //     onClick={() => {
                            //         showConfirmationDialog({
                            //             title: 'Approved',
                            //             text: `Do you want to ${
                            //                 row?.approved
                            //                     ? 'Disapprove this order'
                            //                     : 'Approval this order'
                            //             }`,
                            //             showCancelButton: true,
                            //             input={'text'},
                            //             inputPlaceholder="transaction id",

                            //             next: (res) => {
                            //                 return res.isConfirmed
                            //                     ? handleDeactive(row?._id)
                            //                     : setShowDropdown(false)
                            //             },
                            //         })
                            //     }}
                            //     className="cursor-pointer"
                            //     label="Pending"
                            //     color="warning"
                            //     variant="outlined"
                            //     size="small"
                            // />
                            <SwtAlertChipConfirm
                                title="Approval"
                                text="Do you want to Approve ?"
                                color="warning"
                                chipLabel="pending"
                                errorMessage="please enter transaction id"
                                // color={
                                //     row?.managerFirstApproval === null
                                //         ? 'warning'
                                //         : row?.managerFirstApproval === false
                                //         ? 'error'
                                //         : row?.managerSecondApproval
                                //         ? 'success'
                                //         : row?.managerSecondApproval === null
                                //         ? 'warning'
                                //         : 'error'
                                // }
                                // chipLabel={
                                //     row?.managerFirstApproval === null
                                //         ? 'First Pending'
                                //         : row?.managerFirstApproval === false
                                //         ? 'First Rejected'
                                //         : row?.managerSecondApproval
                                //         ? 'Second Approved'
                                //         : row?.managerSecondApproval === null
                                //         ? 'Second Pending'
                                //         : 'Second Rejected'
                                // }
                                // disabled={
                                //     row?.managerFirstApproval === null
                                //         ? false
                                //         : row?.managerFirstApproval === false
                                //         ? true
                                //         : row?.ccApproval === false
                                //         ? true
                                //         : row?.managerSecondApproval === null
                                //         ? false
                                //         : true
                                // }
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
                                            ? handleDeactive(
                                                  row?._id,
                                                  res?.value
                                              )
                                            : setShowDropdown(false)
                                        // if (!row?.managerFirstApproval) {
                                        //     return handleManagerFirstLevelApprovalComplete(
                                        //         row?._id,
                                        //         'FIRST',
                                        //         res?.isConfirmed,
                                        //         res?.value,
                                        //         row?.complaintNumber
                                        //     )
                                        // }
                                        // if (row?.managerSecondApproval === null) {
                                        //     return handleManagerFirstLevelApprovalComplete(
                                        //         row?._id,
                                        //         'SECOND',
                                        //         res?.isConfirmed,
                                        //         res?.value,
                                        //         row?.complaintNumber
                                        //     )
                                        // }
                                    }
                                }}
                            />
                        )}
                    </span>
                )
            },
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
                <div className="py-0">{row?.assignDealerCode || '-'}</div>
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
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Date Time',
            flex: 'flex-[3_3_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_PREFFERED_DELIVERY_DATE,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            // hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => {
                return (
                    <span>
                        {row?.preffered_delivery_date
                            ? moment(row?.preffered_delivery_date).format(
                                  'DD-MM-YYYY'
                              )
                            : '-'}
                    </span>
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

    const handleDeactive = (orderId: string, transactionId: string) => {
        setShowDropdown(false)
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

    return (
        <>
            <OrderListing
                tabName={tabName}
                orderStatus={orderStatus}
                currentStatus={currentStatus}
                columns={columns}
            />
            {/* <DialogLogBox
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
    /> */}
        </>
    )
}

export default AllOrdersListingWrapper
