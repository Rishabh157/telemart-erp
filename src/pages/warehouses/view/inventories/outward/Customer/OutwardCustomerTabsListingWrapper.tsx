// |-- External Dependencies --|
import React, { useState } from 'react'
import { IconType } from 'react-icons'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { useParams } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import OutwardRequestListing from './OutwardCustomerTabs'

// |-- Redux --|
import { RootState } from 'src/redux/store'

import { Chip } from '@mui/material'
import moment from 'moment'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { OrderListResponse } from 'src/models'
import { useGetOrderQuery } from 'src/services/OrderService'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'

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

const OutwardCustomerTabsListingWrapper = () => {
    const params = useParams()
    const warehouseId = params?.id

    const [orderSearchValue, setOrderSearchValue] = useState<string>()
    const [barcodeSearchValue, setBarcodeSearchValue] = useState<string>()

    const { userData }: any = useSelector((state: RootState) => state?.auth)

    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue, orderStatus, dateFilter } =
        outwardCustomerState
    const { items } = useGetCustomListingData<OrderListResponse>({
        useEndPointHook: useGetOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['didNo', 'mobileNo'],
            page: page,
            filterBy: [
                { fieldName: 'assignWarehouseId', value: warehouseId },
                { fieldName: 'companyId', value: userData?.companyId },
                { fieldName: 'firstCallApproval', value: true },
                { fieldName: 'status', value: orderStatus },
            ],
            dateFilter: dateFilter,
            orderBy: 'createdAt',
            orderNumber: (orderSearchValue as any) || '',
            barcodeNumber: barcodeSearchValue || '',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'firstCallApproval',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_FIRSTCALL_APPROVAL,
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
            field: 'orderNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_ORDER_NUMBER,
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'orderReferenceNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_ORDER_REF_NUMBER,
            headerName: 'Order Ref No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderReferenceNumber || '-'}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_INQUIRY_NUMBER,
            headerName: 'Enquiry No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'firstCallRemark',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_FIRSTCALL_REMARK,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_FIRSTCALL_STATUS,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_FIRSTCALL_CALLBACK_DATE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_ASSIGNED_WAREHOUSE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_TRACKING_NUMBER,
            headerName: 'Tracking No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>-</span>,
        },
        {
            field: 'tehsilLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_TEHSIL_LABEL,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_STATUS_DATE,
            headerName: 'Status Date',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
        },
        {
            field: 'status',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_STATUS,
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>{row?.status}</span>,
        },
        {
            field: 'shippingCharges',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_SHIPPING_CHARGES,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_SCHEME_NAME,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_SCHEME_CODE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_SCHEME_QUANTITY,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_PRICE,
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'pincodeLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_PINCODE_LABEl,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_PAYMENT_MODE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_CREATE_ORDER_DATE,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_EDP_DATE,
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <div>-</div>,
        },
        {
            field: 'districtLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_DISTRICT_LABEL,
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'dispositionLevelThree',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_DISPOSITION_LEVEL_THREE,
            headerName: 'Disposition',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dispositionLevelThree}</div>
            ),
        },
        {
            field: 'dealerStatus',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_DEALER_STATUS,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_DEALER_CODE,
            headerName: 'Dealer Code',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dealerCode || '-'}</div>
            ),
        },
        {
            field: 'customerName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_CUSTOMER_NAME,
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'areaLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_AREA_LABEL,
            headerName: 'Customer Address',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[30px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'mobileNo',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_MOBILE_NO,
            headerName: 'Contact No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'channelName',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_CHHANEL_NAME,
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_CALLCENTER_LABEL,
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },

        {
            field: 'remark',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_REMARK,
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_AGENT_NAME,
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.agentName}</div>
            ),
        },
        {
            field: 'preffered_delivery_date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_PREFFERED_DELIVERY_DATE,
            headerName: 'Preffred Delivery Date Time',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs min-w-[150px]',
            renderCell: (row: OrderListResponse) => formatedDateTimeIntoIst(row?.createdAt),
        },
        {
            field: 'preffered_delivery_date',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_PREFFERED_DELIVERY_TIME,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER_LIST_ORDER_MBK_NUMBER,

            headerName: 'MBK Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px]',
            renderCell: (row: any) => (
                <span> {row.orderMBKNumber || '-'} </span>
            ),
        },
    ]

    return (
        <OutwardRequestListing
            columns={columns}
            rows={items}
            orderSearchValue={orderSearchValue as any}
            barcodeSearchValue={barcodeSearchValue}
            onChangeOrderSearchValue={(newValue) =>
                setOrderSearchValue(newValue)
            }
            onChangeBarcodeSearchValue={(newValue) =>
                setBarcodeSearchValue(newValue)
            }
        />
    )
}

export default OutwardCustomerTabsListingWrapper
