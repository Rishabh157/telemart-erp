import React from 'react'
import FlipkartOrderListing from './FlipkartOrderListing'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useGetFlipkartOrdersQuery } from 'src/services/EcomOrdersMasterService'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'


type FlipkartOrderListingListResponse = {
    _id: string,
    companyId: string,
    orderNumber: string,
    order_item_id: string,
    order_id: string,
    fulfilment_source: string,
    fulfilment_type: string,
    order_date: string,
    order_approval_date: string,
    order_item_status: string,
    sku: string,
    fsn: string,
    product_title: string,
    quantity: number,
    pickup_logistics_partner: string,
    delivery_tracking_id: string,
    forward_logistics_form: string,
    forward_logistics_form_no: string,
    order_cancellation_date: string,
    cancellation_reason: string,
    cancellation_sub_reason: string,
    order_return_approval_date: string,
    return_id: string,
    return_reason: string,
    return_sub_reason: string,
    procurement_dispatch_sla: string,
    dispatch_after_date: string,
    dispatch_by_date: string,
    order_ready_for_dispatch_on_date: string,
    dispatched_date: string,
    dispatch_sla_breached: string,
    seller_pickup_reattempts: string,
    delivery_sla: string,
    deliver_by_date: string,
    order_delivery_date: string,
    delivery_sla_breached: string,
    order_service_completion_date: string,
    service_by_date: string,
    service_completion_sla: string,
    service_sla_breached: string,
    productCode: string,
    label: string,
    isDispatched: boolean
    status: string
    isDeleted: boolean,
    isActive: boolean,
    createdAt: string
    updatedAt: string
    __v: number
}

const FlipkartOrdersListingWrapper = () => {

    useUnmountCleanup()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const amazonOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = amazonOrderState

    const { items } = useGetCustomListingData<FlipkartOrderListingListResponse>({
        useEndPointHook: useGetFlipkartOrdersQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['orderNumber', 'order_item_id', 'order_id', 'product_title', 'productCode'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId,
                }
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        })
    })

    const columns: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.FLIPKART_LIST_ORDER_NUMBER,
            renderCell: (row: FlipkartOrderListingListResponse) => (
                <span className="text-primary-main">#{row?.orderNumber}</span>
            ),
        },
        {
            field: 'order_id',
            headerName: 'Order Id',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.FLIPKART_LIST_ORDER_ID,
            renderCell: (row: FlipkartOrderListingListResponse) => (
                <span className="text-primary-main"> {row?.order_id}</span>
            ),
        },
        {
            field: 'isDispatched',
            headerName: 'Dispatched',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            name: UserModuleNameTypes.FLIPKART_LIST_DISPATCHED,
            renderCell: (row: FlipkartOrderListingListResponse) => (
                <div>
                    {row?.isDispatched ? <span className='text-green-500'>Dispatched</span> : <span className='text-orange-400'>Not Dispatched</span>}
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            name: UserModuleNameTypes.FLIPKART_LIST_STATUS,
        },
        {
            field: 'product_title',
            headerName: 'Product Name',
            flex: 'flex-[2_2_0%]',
            name: UserModuleNameTypes.FLIPKART_LIST_PRODUCT_NAME,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: FlipkartOrderListingListResponse) => (
                // eslint-disable-next-line no-useless-escape
                <span title={row?.product_title} className="min-w-[100px] truncate"> {row?.product_title?.replace(/\"\"\"/g, '')}</span>
            ),
        },
        {
            field: 'productCode',
            headerName: 'Product Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.FLIPKART_LIST_PRODUCT_CODE,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.FLIPKART_LIST_PRODUCT_QUANTITY,
        },
        {
            field: 'order_date',
            headerName: 'Order Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.FLIPKART_LIST_ORDER_DATE,
        },
        {
            field: 'deliver_by_date',
            headerName: 'Deliver Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.FLIPKART_LIST_DELIVER_DATE,
        },
        {
            field: 'label',
            headerName: 'Label',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.FLIPKART_LIST_LABEL,
        },
    ]

    return <FlipkartOrderListing columns={columns} rows={items} />
}

export default FlipkartOrdersListingWrapper
