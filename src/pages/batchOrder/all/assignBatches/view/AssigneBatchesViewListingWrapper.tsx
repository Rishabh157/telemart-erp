// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddOrderAssigneeFormWrapper from 'src/pages/orders/OrderAssigneeForm/AddOrderAssigneeFormWrapper'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/CreateBatchOrderSlice'
import { useGetSingleBatchesOrdersQuery } from 'src/services/BatchesServices'
import { AppDispatch, RootState } from 'src/redux/store'
import AssignBatchesViewListing from './AssignBatchesViewListing'
// import { showToast } from 'src/utils'
import { OrderListResponse } from 'src/models'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const AssigneBatchesViewListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const [selectedRows, setSelectedRows] = useState([])
    // const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isOrderAssigneeFormOpen, setIsOrderAssigneeFormOpen] =
        useState<boolean>(false)

    // const [currentId, setCurrentId] = useState<string>('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    // const [addBatch] = useAddBatchesMutation()

    const createBatchOrderState: any = useSelector(
        (state: RootState) => state.createBatch
    )
    const batchId = params?.id

    const {
        // page,
        // rowsPerPage,
        // searchValue,
        items,
        // totalItems,
        // isTableLoading,
    } = createBatchOrderState

    const { data, isLoading, isFetching } = useGetSingleBatchesOrdersQuery(
        batchId,
        {
            skip: !batchId,
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
                        // setCurrentId(row?._id)
                    }}
                    isCustomBtn={isAuthorized(UserModuleNameTypes.ACTION_ASSIGN_BATCH_LIST_ASSIGN)}
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
                //             className="w-full text-left px-4 py-2 hover:bg-gray-100"
                //         >
                //             View
                //         </button>
                //         <button
                //             onClick={() => {
                //                 setIsShow(true)
                //                 setBarcodeQuantity(row?.shcemeQuantity)
                //                 setSelectedItemsTobeDispatch(row)
                //             }}
                //             className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                //         >
                //             Dispatch
                //         </button>
                //     </>
                // }
                />
            ),
            align: 'end',
        },
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_ORDER_NUMBER,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'assignDealerLabel',
            headerName: 'Assigned Dealer',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_ASSIGNED_DEALER,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_WAREHOUSE,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_ORDER_REF_NUMBER,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderReferenceNumber || '-'}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            headerName: 'Enquiry No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_INQUIRY_NUMBER,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'trackingNo',
            headerName: 'Tracking No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_TRACKING_NUMBER,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>-</span>,
        },
        {
            field: 'tehsilLabel',
            headerName: 'Taluk',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_TALUK,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_STATUS_DATE,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_STATUS,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>{row?.status}</span>,
        },
        {
            field: 'shippingCharges',
            headerName: 'Shippgig Charges',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_SHIPPING_CHARGES,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_SCHEME_NAME,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_SCHEME_CODE,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_QUANTITY,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_PRICE,
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'pincodeLabel',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_PINCODE,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_PAYMENT_MODE,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_ORDER_DATE,
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
        {
            field: 'edpDate',
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_EDP_DATE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <div>-</div>,
        },
        {
            field: 'districtLabel',
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_DISTRICT,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'dispositionLevelThree',
            headerName: 'Disposition',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_DISPOSITION,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dispositionLevelThree}</div>
            ),
        },
        {
            field: 'dealerStatus',
            headerName: 'Dealer Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_DEALER_STATUS,
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
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_DEALER_CODE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dealerCode || '-'}</div>
            ),
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CUSTOMER_NAME,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'areaLabel',
            headerName: 'Customer Address',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CUSTOMER_ADDRESS,
            extraClasses: 'min-w-[30px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'mobileNo',
            headerName: 'Contact No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CONTACT_NUMBER,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'channelName',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CHANNEL_NAME,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_CC_NAME,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },
        {
            field: 'areaLabel',
            headerName: 'Area',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_AREA,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_REMARK,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_AGENT,
            extraClasses: 'min-w-[150px]',
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
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main ">
                    &#8377; {row.deliveryCharges}
                </span>
            ),
        },

        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Date Time',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_PREFFRED_DELIVERY_DATE,
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
        {
            field: 'orderMBKNumber',
            headerName: 'MBK Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ASSIGN_BATCH_LIST_MBK_NUMBER,
            extraClasses: 'min-w-[250px]',
            renderCell: (row: any) => (
                <span> {row.orderMBKNumber || '-'} </span>
            ),
        },
    ]

    return (
        <>
            <AssignBatchesViewListing
                columns={columns}
                rows={items}
                // apiStatus={apiStatus}
                setShowDropdown={setShowDropdown}
                selectedRows={selectedRows}
                setSelectedRows={(ele) => setSelectedRows(ele)}
            // handleSubmit={() => handleBatchSubmit()}
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
