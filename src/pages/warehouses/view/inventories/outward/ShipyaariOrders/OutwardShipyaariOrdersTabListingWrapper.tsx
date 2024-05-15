// |-- Built-in Dependencies --|
import { useState } from 'react'
// |-- External Dependencies --|
import { IconType } from 'react-icons'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { useParams } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import OutwardShipyaariOrdersTabListing from './OutwardShipyaariOrdersTabListing'

// |-- Redux --|
import { Chip } from '@mui/material'
import moment from 'moment'
// import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
// import { OrderListResponse } from 'src/models'
// import { RootState } from 'src/redux/store'
import {
    useGetGenerateCouriorLabelByAwbNumberMutation,
    useGetGenerateInvoiceByAwbNumberMutation,
    useGetOrderQuery,
    useDispatchGPOOrdersToWarehouseMutation,
} from 'src/services/OrderService'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { FaRegFilePdf } from 'react-icons/fa'
import { MdLabelImportantOutline } from 'react-icons/md'
import BarcodeCard from 'src/components/UI/Barcode/BarcodeCard'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
// import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { BarcodeListResponseType, OrderListResponse } from 'src/models'
import { SaleOrderStatus } from 'src/models/SaleOrder.model'
import { AlertText } from 'src/pages/callerpage/components/constants'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAllBarcodeOfDealerOutWardDispatchMutation } from 'src/services/BarcodeService'
// import { useDispatchGPOOrdersToWarehouseMutation, useGetOrderQuery } from 'src/services/OrderService'
import { showToast } from 'src/utils'
import { barcodeStatusEnum } from 'src/utils/constants/enums'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
// import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

enum FirstCallApprovalStatus {
    'APPROVED' = 'APPROVED',
    'CANCEL' = 'CANCEL',
}

const OutwardShipyaariOrdersTabListingWrapper = () => {
    useUnmountCleanup()
    const { id } = useParams()
    const { userData, customized }: any = useSelector(
        (state: RootState) => state?.auth
    )

    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeQuantity, setBarcodeQuantity] = useState<number>(0)
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<any>(null)
    const dispatch = useDispatch<AppDispatch>()
    const {
        page,
        rowsPerPage,
        searchValue,

        dateFilter,
    } = outwardCustomerState

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['didNo', 'mobileNo'],
            page: page,
            filterBy: [
                { fieldName: 'orderAssignedToCourier', value: 'SHIPYAARI' },
                { fieldName: 'companyId', value: userData?.companyId },
                { fieldName: 'assignWarehouseId', value: id },
            ],
            dateFilter: dateFilter,
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })
    const [getGenerateCouriorLabel] =
        useGetGenerateCouriorLabelByAwbNumberMutation()
    const [getGenerateInvoice] = useGetGenerateInvoiceByAwbNumberMutation()

    function base64ToBlob(base64Data: any) {
        // Extract base64 content without the data URL prefix
        const base64Content = base64Data.split(';base64,').pop()

        // Convert base64 to ArrayBuffer
        const arrayBuffer = Uint8Array.from(atob(base64Content), (c) =>
            c.charCodeAt(0)
        ).buffer

        // Create Blob from ArrayBuffer
        return new Blob([arrayBuffer], { type: 'application/pdf' })
    }

    const handleGenerateCourierLabel = (row: any) => {
        getGenerateCouriorLabel({ awbNumber: row.awbNumber }).then(
            (res: any) => {
                if (res.data?.data) {
                    const pdfBlob = base64ToBlob(res.data?.data)
                    if (pdfBlob) {
                        const pdfUrl = URL.createObjectURL(pdfBlob)
                        window.open(pdfUrl, '_blank')
                    }
                }
            }
        )
    }

    const handleGenerateInvoice = (row: any) => {
        getGenerateInvoice({ awbNumber: row.awbNumber }).then((res: any) => {
            if (res.data?.data) {
                const pdfBlob = base64ToBlob(res.data?.data)
                if (pdfBlob) {
                    const pdfUrl = URL.createObjectURL(pdfBlob)
                    window.open(pdfUrl, '_blank')
                }
            }
        })
    }

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Dispatch',
            flex: 'flex-[0.5_0.5_0%]',
            hidden: true,
            renderCell: (row: OrderListResponse) =>
                row?.orderStatus === SaleOrderStatus.complete ? (
                    'Dispatched'
                ) : row?.orderStatus === SaleOrderStatus.dispatched ? (
                    ''
                ) : (
                    <ActionPopup
                        handleOnAction={() => {}}
                        isCustomBtn={true}
                        customBtnText="Dispatch"
                        handleCustomActionButton={() => {
                            setIsShow(true)

                            setBarcodeQuantity(row.shcemeQuantity)
                            setSelectedItemsTobeDispatch(row)
                        }}
                    />
                ),
        },
        {
            field: 'awbBill',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_FIRST_CALL_APPROVAL,
            headerName: 'Download Label/Invoice',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => {
                return (
                    <>
                        {row.awbNumber ? (
                            <div className="flex gap-2">
                                <MdLabelImportantOutline
                                    title="Print label"
                                    size={25}
                                    color="blue"
                                    onClick={() =>
                                        handleGenerateCourierLabel(row)
                                    }
                                />
                                <FaRegFilePdf
                                    title="Print Invoice"
                                    color="red"
                                    size={22}
                                    onClick={() => handleGenerateInvoice(row)}
                                />
                            </div>
                        ) : null}
                    </>
                )
            },
        },

        {
            field: 'firstCallApproval',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_FIRST_CALL_APPROVAL,
            headerName: '1st Call Approval',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
                        {row.firstCallApproval ? (
                            <Chip
                                className="cursor-pointer"
                                label="Approved"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : row.firstCallState ===
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
                                onClick={() => {}}
                                className="cursor-pointer"
                                label="Pending"
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
            field: 'awbNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_ORDER_NUMBER,
            headerName: 'AWB Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main ">{row.awbNumber}</span>
            ),
        },
        {
            field: 'orderNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_ORDER_NUMBER,
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'orderReferenceNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_ORDER_REF_NUMBER,
            headerName: 'Order Ref No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderReferenceNumber || '-'}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_ENQUIRY_NUMBER,
            headerName: 'Enquiry No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'firstCallRemark',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_FIRST_CALL_REMARK,
            headerName: '1st call remark',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallRemark || '-'}</span>
            ),
        },
        {
            field: 'firstCallState',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_FIRST_CALL_STATE,
            headerName: 'first Call State',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallState || '-'}</span>
            ),
        },
        {
            field: 'firstCallCallBackDate',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_FIRST_CALL_BACK_DATE,
            headerName: 'call back date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.firstCallCallBackDate || '-'}</span>
            ),
        },
        {
            field: 'assignWarehouseLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_ASSIGNED_WEARHOUSE,
            headerName: 'Warehouse',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.assignWarehouseLabel || '-'}</span>
            ),
        },
        {
            field: 'trackingNo',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_TRACKING_NUMBER,
            headerName: 'Tracking No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>-</span>,
        },
        {
            field: 'tehsilLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_TALUK,
            headerName: 'Taluk',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.tehsilLabel}</span>
            ),
        },
        {
            field: 'statusDate',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_STATUS_DATE,
            headerName: 'Status Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
        },
        {
            field: 'status',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_STATUS,
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>{row?.status}</span>,
        },
        {
            field: 'shippingCharges',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_SHIPPING_CHARGES,
            headerName: 'Shippgig Charges',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.deliveryCharges}</span>
            ),
        },
        {
            field: 'schemeName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_SCHEME_NAME,
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeName} </span>
            ),
        },
        {
            field: 'schemeCode',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_SCHEME_CODE,
            headerName: 'Scheme Code',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeCode} </span>
            ),
        },
        {
            field: 'shcemeQuantity',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_SHCEME_QUANTITY,
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.shcemeQuantity} </span>
            ),
        },
        {
            field: 'price',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_PRICE,
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'pincodeLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_PIN_CODE_LABEL,
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.pincodeLabel} </span>
            ),
        },
        {
            field: 'paymentMode',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_PAYMENT_MODE,
            headerName: 'Payment Mode',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.paymentMode} </span>
            ),
        },
        {
            field: 'createdAt',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_ORDER_DATE,
            headerName: 'Order Date',
            flex: 'flex-[1_1_0%]',
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_EDP_DATE,
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <div>-</div>,
        },
        {
            field: 'districtLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_DISTRICT_LABEL,
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'dispositionLevelThree',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_DISPOSITION_LEVEL_THREE,
            headerName: 'Disposition',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dispositionLevelThree}</div>
            ),
        },
        {
            field: 'dealerStatus',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_DEALER_STATUS,
            headerName: 'Dealer Status',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">
                    {/* {row?.dealerStatus === true ? 'Active' : 'DeActive'} */}
                </div>
            ),
        },
        {
            field: 'dealerCode',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_DEALER_CODE,
            headerName: 'Dealer Code',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dealerCode || '-'}</div>
            ),
        },
        {
            field: 'customerName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_CUSTOMER_NAME,
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'areaLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_AREA_LABEL,
            headerName: 'Customer Address',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[30px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'mobileNo',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_MOBILE_NO,
            headerName: 'Contact No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'channelName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_CHANNEL_NAME,
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_CALL_CENTER_LABEL,
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },
        {
            field: 'areaLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_AREA,
            headerName: 'Area',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'remark',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_REMARK,
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_AGENT,
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.agentName}</div>
            ),
        },

        {
            field: 'preffered_delivery_date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_PREFFERED_DELIVERY_DATE,
            headerName: 'Preffred Delivery Date Time',
            flex: 'flex-[3_3_0%]',
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_PREFFERED_DELIVERY_TIME,
            headerName: 'Preffred Delivery Time',
            flex: 'flex-[3_3_0%]',
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS_TAB_LIST_ORDER_MBK_NUMBER,
            headerName: 'MBK Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px]',
            renderCell: (row: any) => (
                <span> {row.orderMBKNumber || '-'} </span>
            ),
        },
    ]
    const [getBarCode] = useGetAllBarcodeOfDealerOutWardDispatchMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useDispatchGPOOrdersToWarehouseMutation()

    const handleReload = () => {
        if (customized) {
            const confirmValue: boolean = window.confirm(AlertText)
            if (confirmValue) {
                dispatch(setFieldCustomized(false))
                setIsShow(!isShow)
                setSelectedItemsTobeDispatch(null)
            }
        } else {
            setIsShow(!isShow)
            setSelectedItemsTobeDispatch(null)
        }
    }

    // remove barcode
    const handleRemoveBarcode = (barcodeNumber: string, ind: number) => {
        // eslint-disable-next-line array-callback-return
        const filteredObj = barcodeList[ind]?.filter((item: any) => {
            if (item?.barcodeNumber !== barcodeNumber) {
                return item
            }
        })
        let barcode = [...barcodeList]
        barcode[ind] = [...filteredObj]

        setBarcodeList(barcode)
    }

    const handleBarcodeSubmit = (
        barcodeNumber: string,
        index: number,
        productGroupId: string
    ) => {
        console.log('11000001', 'barcodeNumber', barcodeNumber, productGroupId)
        dispatch(setFieldCustomized(true))
        getBarCode({
            id: barcodeNumber,
            groupId: productGroupId,
            status: barcodeStatusEnum.atWarehouse,
            companyId: userData?.companyId,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data) {
                        let newBarcode = [...barcodeList]
                        if (!newBarcode[index]) {
                            newBarcode[index] = [...res?.data?.data]
                        } else {
                            newBarcode[index] = [
                                ...newBarcode[index],
                                ...res?.data?.data,
                            ]
                            const uniqueArray = Array.from(
                                new Set(
                                    newBarcode[index].map((obj: any) => obj._id)
                                )
                            ).map((id) =>
                                newBarcode[index].find(
                                    (obj: any) => obj._id === id
                                )
                            )
                            newBarcode[index] = [...uniqueArray]
                        }

                        setBarcodeList([...newBarcode])
                    }
                } else {
                    // showToast('error', 'barcode number is not matched')
                }
            })
            .catch((err) => console.error(err))
    }

    const handleDispatchBarcode = () => {
        const filterValue = barcodeList?.flat(1)?.map((ele: any) => {
            return ele?._id
        })

        barcodeDispatch({
            barcodes: [...filterValue],
            orderId: selectedItemsTobeDispatch?._id,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    showToast('success', 'dispatched successfully')
                    setIsShow(false)
                    dispatch(setFieldCustomized(false))
                } else {
                    showToast('error', res?.data?.message)
                }
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    const handleDisableDispatchButton = () => {
        return barcodeQuantity === barcodeList?.flat(1)?.length
    }
    return (
        <>
            <OutwardShipyaariOrdersTabListing columns={columns} rows={items} />
            <DialogLogBox
                isOpen={isShow}
                fullScreen={true}
                buttonClass="cursor-pointer"
                maxWidth="lg"
                handleClose={() => {
                    handleReload()
                }}
                component={
                    <div className="px-4 pt-2 pb-6">
                        {/* SO NO. & DEALER NAME */}
                        <div className="grid grid-cols-4 pb-2 border-slate-300 border-b-[1px]">
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">
                                        Order Number
                                    </div>
                                    {':'}
                                    <div className="">
                                        {selectedItemsTobeDispatch?.orderNumber}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">To GPO</div>
                                    {':'}
                                    <div className="">
                                        {
                                            selectedItemsTobeDispatch?.selectedItemsTobeDispatch
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pb-6 border-b-slate-300 border-[1px] shadow p-4 my-4 rounded">
                            <div className="grid grid-cols-4 mt-2">
                                <div>
                                    <div>
                                        <span className="font-bold">
                                            Item Name
                                        </span>
                                        <span className="px-4">:</span>
                                        <span>
                                            {
                                                selectedItemsTobeDispatch?.schemeName
                                            }
                                        </span>
                                    </div>

                                    <div>
                                        <span className="font-bold">
                                            Quantity
                                        </span>
                                        <span className="pl-[2.23rem] pr-[1rem]">
                                            :
                                        </span>
                                        <span>
                                            {
                                                selectedItemsTobeDispatch?.shcemeQuantity
                                            }
                                            {barcodeList[0]?.length ? (
                                                <> / {barcodeList[0]?.length}</>
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 grid grid-cols-4 gap-x-4">
                                <ATMTextField
                                    disabled={
                                        barcodeList[0]?.length ===
                                        selectedItemsTobeDispatch?.shcemeQuantity
                                    }
                                    name=""
                                    value={barcodeNumber[0]}
                                    label="Barcode Number"
                                    placeholder="enter barcode number"
                                    className="shadow bg-white rounded w-[50%] "
                                    onChange={(e) => {
                                        if (e.target.value?.length > 6) {
                                            handleBarcodeSubmit(
                                                e.target.value,
                                                0,
                                                selectedItemsTobeDispatch?.productGroupId
                                            )
                                        }
                                        setBarcodeNumber((prev: any) => {
                                            const updatedArray = [...prev] // Create a copy of the previous array
                                            updatedArray[0] = e.target.value // Set the value at the desired index
                                            return updatedArray // Return the updated array
                                        })
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-x-4">
                                {barcodeList[0]?.map(
                                    (
                                        barcode: BarcodeListResponseType,
                                        barcodeIndex: number
                                    ) => (
                                        <BarcodeCard
                                            key={barcodeIndex}
                                            barcodeNumber={
                                                barcode?.barcodeNumber
                                            }
                                            productGroupLabel={capitalizeFirstLetter(
                                                barcode?.productGroupLabel || ''
                                            )}
                                            handleRemoveBarcode={() => {
                                                handleRemoveBarcode(
                                                    barcode?.barcodeNumber,
                                                    0
                                                )
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end items-end ">
                            <div>
                                <ATMLoadingButton
                                    disabled={!handleDisableDispatchButton()}
                                    isLoading={barcodeDispatchInfo?.isLoading}
                                    loadingText="Dispatching"
                                    onClick={() => handleDispatchBarcode()}
                                    className="bg-primary-main text-white flex items-center py-1 px-4 rounded"
                                >
                                    Dispatch
                                </ATMLoadingButton>
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default OutwardShipyaariOrdersTabListingWrapper
