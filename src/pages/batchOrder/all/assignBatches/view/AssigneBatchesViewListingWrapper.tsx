// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import AddOrderAssigneeFormWrapper from 'src/pages/batchOrder/all/assignBatches/OrderAssigneeForm/AddOrderAssigneeFormWrapper'

// |-- Redux --|
import { useGetSingleBatchesOrdersQuery } from 'src/services/BatchesServices'
import AssignBatchesViewListing from './AssignBatchesViewListing'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { OrderListResponse } from 'src/models'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { ATMOrderStatus, ATMDateTimeDisplay, ATMPincodeDisplay, ATMDealerDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'

const AssigneBatchesViewListingWrapper = () => {
    useUnmountCleanup()

    const params = useParams()
    const [selectedRows, setSelectedRows] = useState([])

    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isOrderAssigneeFormOpen, setIsOrderAssigneeFormOpen] =
        useState<boolean>(false)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const batchId = params?.id

    const { items } = useGetDataByIdCustomQuery<OrderListResponse>({
        useEndPointHook: useGetSingleBatchesOrdersQuery(batchId, {
            skip: !batchId,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            extraClasses: 'mr-4 text-xs',
            renderCell: (row: OrderListResponse) =>
                !row?.isOrderAssigned && (
                    <ActionPopup
                        handleOnAction={() => {
                            setShowDropdown(!showDropdown)
                            // setCurrentId(row?._id)
                        }}
                        isCustomBtn={isAuthorized(
                            UserModuleNameTypes.ACTION_ASSIGN_BATCH_LIST_ASSIGN
                        )}
                        customBtnText="Assign"
                        handleCustomActionButton={() => {
                            setIsOrderAssigneeFormOpen(true)
                            setSelectedOrder(row)
                        }}
                    // children={
                    //     <>
                    //         <button
                    //             onClick={() => {
                    //                 navigate(`/orders/view/${row?._id}`)
                    //             }}
                    //             className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    //         >
                    //             View
                    //         </button>
                    //     </>
                    // }
                    />
                ),
        },
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_ORDER_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        // {
        //     field: 'assignDealerLabel',
        //     headerName: 'Assigned Dealer',
        //     flex: 'flex-[1_1_0%]',
        //     name: UserModuleNameTypes.ASSIGN_BATCH_LIST_ASSIGNED_DEALER,
        //     align: 'start',
        //     extraClasses: 'text-xs min-w-[150px]',
        //     renderCell: (row: OrderListResponse) => (
        //         <span>
        //             {row?.assignDealerLabel || '-'}
        //             {row?.assignDealerCode || '-'}
        //         </span>
        //     ),
        // },
        {
            field: 'assignDealerLabel',
            headerName: 'Assigned Dealer',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_DOORCANCELLED_TAB_LIST_ASSIGNED_DEALER,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMDealerDisplay disableName dealerCode={row?.assignDealerCode} />,
        },
        {
            field: 'assignWarehouseLabel',
            headerName: 'Warehouse',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_WAREHOUSE,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.assignWarehouseLabel || '-'}</span>
            ),
        },
        {
            field: 'orderReferenceNumber',
            headerName: 'Order Ref No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_ORDER_REF_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.orderReferenceNumber || '-'}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            headerName: 'Enquiry No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_INQUIRY_NUMBER,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CUSTOMER_NAME,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_STATUS,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMOrderStatus status={row?.status} />,
        },
        {
            field: 'shippingCharges',
            headerName: 'Shipping Charges',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_SHIPPING_CHARGES,
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.deliveryCharges}</span>
            )
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_SCHEME_NAME,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeName} </span>
            ),
        },
        {
            field: 'schemeCode',
            headerName: 'Scheme Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_SCHEME_CODE,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeCode} </span>
            ),
        },
        {
            field: 'shcemeQuantity',
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_QUANTITY,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_PRICE,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'districtLabel',
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_DISTRICT,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'tehsilLabel',
            headerName: 'Taluk',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_TALUK,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_PINCODE,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMPincodeDisplay pincode={row?.pincodeLabel} />,
        },
        {
            field: 'areaLabel',
            headerName: 'Area',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CUSTOMER_ADDRESS,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Order Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_ORDER_DATE,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMDateTimeDisplay createdAt={row?.createdAt} />
        },
        {
            field: 'edpDate',
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_EDP_DATE,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => <div>-</div>,
        },
        {
            field: 'dispositionLevelThreeLabel',
            headerName: 'Disposition',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_DISPOSITION,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dispositionLevelThreeLabel}</div>
            ),
        },
        {
            field: 'dealerStatus',
            headerName: 'Dealer Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_DEALER_STATUS,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">
                    {/* {row?.dealerStatus === true ? 'Active' : 'DeActive'} */}
                </div>
            ),
        },
        {
            field: 'mobileNo',
            headerName: 'Contact No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CONTACT_NUMBER,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'channelName',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CHANNEL_NAME,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CC_NAME,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },
        {
            field: 'areaLabel',
            headerName: 'Area',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_AREA,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_REMARK,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_AGENT,
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.agentName}</div>
            ),
        },

        {
            field: 'Shipping Charges',
            headerName: 'Delivery Charges',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_DELIVERY_CHARGES,
            align: 'center',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main ">
                    &#8377; {row.deliveryCharges}
                </span>
            ),
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Date',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_PREFFRED_DELIVERY_DATE,
            renderCell: (row: OrderListResponse) => <ATMDateTimeDisplay createdAt={row?.preffered_delivery_date} disableTime />
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Time',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_PREFFRED_DELIVERY_TIME,
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
    ]

    return (
        <>
            <AssignBatchesViewListing
                columns={columns}
                rows={items as any}
                selectedRows={selectedRows}
                setSelectedRows={(ele) => setSelectedRows(ele)}
            />
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
        </>
    )
}

export default AssigneBatchesViewListingWrapper
