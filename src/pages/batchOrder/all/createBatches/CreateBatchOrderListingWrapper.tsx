// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { OrderListResponse } from 'src/models'
import { useGetOrderBatchesQuery } from 'src/services/OrderService'

// |-- Redux --|
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import AddBatchesFormWrapper from './AddBatchesForm/AddBatchesFormWrapper'
import CreateBatchOrderListing from './CreateBatchOrderListing'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { BatchFormInitialValuesFilterWithLabel } from './BatchOrderListingFilter/BatchOrderListingFilterWrapper'
import { ATMOrderStatus, ATMDateTimeDisplay, ATMPincodeDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'

const CreateBatchOrderListingWrapper = () => {
    useUnmountCleanup()

    const [isShowCreateBatchModel, setIsShowCreateBatchModel] =
        useState<boolean>(false)
    const [selectedRows, setSelectedRows] = useState([])

    const createBatchOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = createBatchOrderState

    const [filter, setFilter] =
        React.useState<BatchFormInitialValuesFilterWithLabel>({
            schemeId: { fieldName: '', label: '', value: '' },
            isUrgentOrder: { fieldName: '', label: '', value: '' },
            orderStatus: { fieldName: '', label: '', value: '' },
            tehsilId: { fieldName: '', label: '', value: '' },
            districtId: {
                fieldName: '',
                label: '',
                value: '',
            },
            callCenterManagerId: {
                fieldName: '',
                label: '',
                value: '',
            },
            startDate: {
                fieldName: '',
                label: '',
                value: '',
            },
            endDate: { fieldName: '', label: '', value: '' },
            callBackFrom: {
                fieldName: '',
                label: '',
                value: '',
            },
            callBackTo: {
                fieldName: '',
                label: '',
                value: '',
            },
        })

    // pagination api
    const { items } = useGetCustomListingData<OrderListResponse[]>({
        useEndPointHook: useGetOrderBatchesQuery({
            limit: rowsPerPage,
            searchValue: '',
            params: ['didNo', 'mobileNo'],
            page: page,
            filterBy: [
                {
                    fieldName: 'orderNumber',
                    value: [searchValue],
                },
                {
                    fieldName: 'status',
                    value: filter.orderStatus.value || 'FRESH',
                },
                {
                    fieldName: 'isUrgentOrder',
                    value: filter.isUrgentOrder.value,
                },
                {
                    fieldName: 'approved',
                    value: true,
                },
                {
                    fieldName: 'isOrderAssigned',
                    value: false,
                },
                { fieldName: 'schemeId', value: filter.schemeId.value },
                { fieldName: 'districtId', value: filter.districtId.value },
                { fieldName: 'tehsilId', value: filter.tehsilId.value },
            ],
            getBatchData: true,
            dateFilter: {
                startDate: filter.startDate.value,
                endDate: filter.endDate.value,
            },
            callbackDateFilter: {
                startDate: filter.callBackFrom.value,
                endDate: filter.callBackTo.value,
                dateFilterKey: 'firstCallCallBackDate',
            },
            callCenterId: filter.callCenterManagerId.value || null,
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
            name: UserModuleNameTypes.BATCH_ORDER_LIST_ORDER_NUMBER,
        },
        {
            field: 'orderReferenceNumber',
            headerName: 'Order Ref No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_ORDER_REF_NUMBER,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row.orderReferenceNumber || '-'}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            headerName: 'Enquiry No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_INQUIRY_NUMBER,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: OrderListResponse) => <span></span>,
        },
        {
            field: 'assignWarehouseLabel',
            headerName: 'Warehouse',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_WAREHOUSE,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <span>{row?.assignWarehouseLabel || '-'}</span>
            ),
        },
        {
            field: 'trackingNo',
            headerName: 'Tracking No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_TRACKING_NUMBER,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span>-</span>,
        },
        {
            field: 'tehsilLabel',
            headerName: 'Taluk',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_TALUK,
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
            name: UserModuleNameTypes.BATCH_ORDER_LIST_STATUS_DATE,
            align: 'start',
            extraClasses: 'min-w-[150px]',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_STATUS,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMOrderStatus status={row?.status} />,
        },
        {
            field: 'shippingCharges',
            headerName: 'Shipping Charges',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_SHIPPING_CHARGES,
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
            name: UserModuleNameTypes.BATCH_ORDER_LIST_SCHEME_NAME,
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
            name: UserModuleNameTypes.BATCH_ORDER_LIST_SCHEME_CODE,
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
            name: UserModuleNameTypes.BATCH_ORDER_LIST_QUANTITY,
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
            name: UserModuleNameTypes.BATCH_ORDER_LIST_PRICE,
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'pincodeLabel',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_PINCODE,
            align: 'center',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMPincodeDisplay pincode={row?.pincodeLabel} />,
        },
        {
            field: 'paymentMode',
            headerName: 'Payment Mode',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_PAYMENT_MODE,
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
            name: UserModuleNameTypes.BATCH_ORDER_LIST_ORDER_DATE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <ATMDateTimeDisplay createdAt={row?.createdAt} />
        },
        {
            field: 'edpDate',
            headerName: 'EDP Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_EDP_DATE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => <div>-</div>,
        },
        {
            field: 'districtLabel',
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_DISTRICT,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.districtLabel}</div>
            ),
        },
        {
            field: 'dispositionLevelThreeLabel',
            headerName: 'Disposition',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_DISPOSITION,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.dispositionLevelThreeLabel}</div>
            ),
        },
        {
            field: 'dealerStatus',
            headerName: 'Dealer Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_DEALER_STATUS,
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
            name: UserModuleNameTypes.BATCH_ORDER_LIST_DEALER_CODE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.assignDealerCode || '-'}</div>
            ),
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_CUSTOMER_NAME,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.customerName || '-'}</div>
            ),
        },
        {
            field: 'areaLabel',
            headerName: 'Customer Address',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_CUSTOMER_ADDRESS,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'mobileNo',
            headerName: 'Contact No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_CONTACT_NUMBER,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.mobileNo}</div>
            ),
        },
        {
            field: 'channelName',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_CHANNEL_NAME,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.channelLabel?.[0]}</div>
            ),
        },
        {
            field: 'callCenterLabel',
            headerName: 'CC Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_CC_NAME,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.callCenterLabel}</div>
            ),
        },
        {
            field: 'areaLabel',
            headerName: 'Area',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_AREA,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.areaLabel}</div>
            ),
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_REMARK,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.remark}</div>
            ),
        },
        {
            field: 'agent',
            headerName: 'Agent',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_AGENT,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: OrderListResponse) => (
                <div className="py-0">{row?.agentName}</div>
            ),
        },

        {
            field: 'Shipping Charges',
            headerName: 'Delivery Charges',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_DELIVERY_CHARGES,
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
            headerName: 'Preffred Delivery Date',
            flex: 'flex-[3_3_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_PREFFRED_DELIVERY_DATE,
            align: 'start',
            extraClasses: 'min-w-[180px]',
            // hidden: activeTab === TabTypes?.complaint,
            renderCell: (row: OrderListResponse) => <ATMDateTimeDisplay createdAt={row?.preffered_delivery_date} disableTime />
        },
        {
            field: 'preffered_delivery_date',
            headerName: 'Preffred Delivery Time',
            flex: 'flex-[3_3_0%]',
            name: UserModuleNameTypes.BATCH_ORDER_LIST_PREFFRED_DELIVERY_TIME,
            align: 'start',
            extraClasses: 'min-w-[180px]',
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
            name: UserModuleNameTypes.BATCH_ORDER_LIST_MBK_NUMBER,
            extraClasses: 'min-w-[250px]',
            renderCell: (row: any) => (
                <span> {row.orderMBKNumber || '-'} </span>
            ),
        },
    ]

    return (
        <>
            <CreateBatchOrderListing
                columns={columns}
                rows={items}
                selectedRows={selectedRows}
                setSelectedRows={(ele) => setSelectedRows(ele)}
                onClick={() => setIsShowCreateBatchModel(true)}
                filter={filter}
                setFilter={setFilter}
            />
            {/* Create Batches Form */}
            <DialogLogBox
                maxWidth="sm"
                isOpen={isShowCreateBatchModel}
                handleClose={() => {
                    setIsShowCreateBatchModel(false)
                }}
                component={
                    <AddBatchesFormWrapper
                        selectedRows={selectedRows}
                        handleClose={() => setIsShowCreateBatchModel(false)}
                    />
                }
            />
        </>
    )
}

export default CreateBatchOrderListingWrapper
