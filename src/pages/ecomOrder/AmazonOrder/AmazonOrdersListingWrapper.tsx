import React from 'react'
import AmazonOrderListing from './AmazonOrderListing'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useGetAmzoneOrdersQuery } from 'src/services/EcomOrdersMasterService'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'


type AmazonOrderListingListResponse = {
    _id: string
    companyId: string
    orderNumber: number
    amazonOrderId: string
    purchaseDate: string
    productName: string
    productCode: string
    quantity: number
    itemPrice: number
    city: string
    state: string
    pincode: string
    label: string
    isDeleted: boolean,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
}

const AmazonOrdersListingWrapper = () => {

    useUnmountCleanup()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const amazonOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = amazonOrderState

    const { items } = useGetCustomListingData<AmazonOrderListingListResponse>({
        useEndPointHook: useGetAmzoneOrdersQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['orderNumber', 'amazonOrderId', 'productCode', 'productName', 'city', 'state', 'pincode'],
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
            headerName: 'Order Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ORDER_NUMBER,
            renderCell: (row: AmazonOrderListingListResponse) => (
                <span className="text-primary-main">#{row?.orderNumber}</span>
            ),
        },
        {
            field: 'amazonOrderId',
            headerName: 'Order Id',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ORDER_NUMBER,
            renderCell: (row: AmazonOrderListingListResponse) => (
                <span className="text-primary-main"> {row?.amazonOrderId}</span>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_DEALER,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: AmazonOrderListingListResponse) => (
                <span title={row?.productName} className="min-w-[100px] truncate">
                    {row?.productName}
                </span>
            ),
        },
        {
            field: 'productCode',
            headerName: 'Product Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_WEARHOUSE,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_WEARHOUSE,
        },
        {
            field: 'itemPrice',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_WEARHOUSE,
        },
        {
            field: 'purchaseDate',
            headerName: 'Purchase Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_WEARHOUSE,
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_WEARHOUSE,
        },
        {
            field: 'city',
            headerName: 'City',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_WEARHOUSE,
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_WEARHOUSE,
        },
        {
            field: 'label',
            headerName: 'Label',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_ASSIGNED_WEARHOUSE,
        },
    ]

    return <AmazonOrderListing columns={columns} rows={items} />
}

export default AmazonOrdersListingWrapper
