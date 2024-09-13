import React, { useState } from 'react'
import OutwardAmazonTabs from './OutwardAmazonTabs'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useGetAmzoneOrdersQuery } from 'src/services/EcomOrdersMasterService'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import DispatchingEcomBarcodes from '../DispatchingEcomBarcodes/DispatchingEcomBarcodes'
import DispatchEcomOrderRTOModel from '../DispatchingEcomBarcodes/DispatchEcomOrderRTOModel'

import { EcomTypesEnum } from 'src/utils/constants/enums'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { isAuthorized } from 'src/utils/authorization'

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
    status: string
    isDispatched: boolean
    isDeleted: boolean,
    isActive: boolean,
    barcodeData: {
        barcodeId: string,
        barcode: string,
        _id: string
    }[]
    createdAt: string,
    updatedAt: string,
    __v: number
}

const OutwardAmazonTabsListingWrapper = () => {

    useUnmountCleanup()

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] = useState<AmazonOrderListingListResponse | null>(null);

    const { userData } = useSelector((state: RootState) => state?.auth)
    const amazonOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = amazonOrderState

    const { items } = useGetCustomListingData<AmazonOrderListingListResponse>({
        useEndPointHook: useGetAmzoneOrdersQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['amazonOrderId', 'productCode', 'productName', 'city', 'state', 'pincode'],
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
            field: 'action',
            headerName: 'Action',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: AmazonOrderListingListResponse) => (
                isAuthorized(
                    UserModuleNameTypes.ACTION_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_ORDER_DISPATCH
                ) && row?.status === 'RTO' ? <ActionPopup
                    handleOnAction={() => { }}
                    // moduleName={UserModuleNameTypes.saleOrder}
                    isCustomBtn={true}
                    customBtnText="Dispatch"
                    handleCustomActionButton={() => {
                        setIsOpen(true)
                        setSelectedItemsTobeDispatch(row)
                    }}
                /> : null
            ),
        },
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_ORDER_NUMBER,
            renderCell: (row: AmazonOrderListingListResponse) => (
                <span className="text-primary-main">#{row?.orderNumber}</span>
            ),
        },
        {
            field: 'amazonOrderId',
            headerName: 'Order Id',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_ORDER_ID,
            // align : 'start',
            extraClasses: 'min-w-[190px]',
            renderCell: (row: AmazonOrderListingListResponse) => (
                <span className="text-primary-main"> {row?.amazonOrderId}</span>
            ),
        },
        {
            field: 'isDispatched',
            headerName: 'Dispatched',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_DISPATCHED,
            renderCell: (row: AmazonOrderListingListResponse) => (
                <div>
                    {row.isDispatched ? <span className='text-green-500'>Dispatched</span> : <span className='text-orange-400'>Not Dispatched</span>}
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_STATUS,
            // renderCell: (row: AmazonOrderListingListResponse) => (
            //     <span>{row?.status}</span>
            // ),
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_PRODUCT_NAME,
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
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_PRODUCT_CODE,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_PRODUCT_QUANTITY,
        },
        {
            field: 'itemPrice',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_PRICE,
        },
        {
            field: 'purchaseDate',
            headerName: 'Purchase Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_PURCHASE_DATE,
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_STATE,
        },
        {
            field: 'city',
            headerName: 'City',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_CITY,
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_PINCODE,
        },
        {
            field: 'label',
            headerName: 'Label',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE_AMAZON_LIST_LABEL,
        },
    ]

    return <>
        <OutwardAmazonTabs columns={columns} rows={items} />
        <DispatchingEcomBarcodes ecomType={EcomTypesEnum.amazon} />

        {/* RTO Dispatching */}
        <DispatchEcomOrderRTOModel
            ecomType={EcomTypesEnum.amazon}
            open={isOpen}
            orderDetails={selectedItemsTobeDispatch}
            onClose={() => {
                setSelectedItemsTobeDispatch(null)
                setIsOpen(false)
            }}
        />
    </>
}

export default OutwardAmazonTabsListingWrapper
