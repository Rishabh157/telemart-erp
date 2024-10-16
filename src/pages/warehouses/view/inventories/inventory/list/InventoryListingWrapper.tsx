// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WareHouseInventoryOfProductSummaryListResponse } from 'src/models/Inventory.model'
import InventoryListing from './InventoryListing'

// |-- Redux --|
import { useParams } from 'react-router-dom'
import { useGetInventoriesOfWarehouseQuery } from 'src/services/WareHouseService'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'

const columns: columnTypes[] = [
    {
        field: 'productName',
        headerName: 'Product Group Name',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_PRODUCT_GROUP_NAME,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span> {row?.productGroupLabel} </span>
        ),
    },
    {
        field: 'avaliableQuantity',
        headerName: 'Fresh Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_FRESH_COUNT,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span className="p-1"> {row.avaliableQuantity} </span>
        ),
    },
    {
        field: 'avaliableUsedQuantity',
        headerName: 'Avaliable Used Quantity',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_FRESH_COUNT,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span className="p-1"> {row.avaliableUsedQuantity} </span>
        ),
    },
    {
        field: 'freezeQuantity',
        headerName: 'Freeze Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_FAKE_COUNT,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span className="p-1">{row.freezeQuantity}</span>
        ),
    },
    {
        field: 'damageQuantity',
        headerName: 'Damage Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_DAMAGE_COUNT,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span className="p-1"> {row.damageQuantity} </span>
        ),
    },
    {
        field: 'lostQuantity',
        headerName: 'Lost / Missing Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_LOST_COUNT,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span className="p-1">{row.lostQuantity}</span>
        ),
    },
    {
        field: 'rtvQuantity',
        headerName: 'RTV Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_RTV_COUNT,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span className="p-1">{row.rtvQuantity}</span>
        ),
    },
    {
        field: 'totalFakeCount',
        headerName: 'Fake Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_FAKE_COUNT,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span className="p-1">{row.fakeQuantity}</span>
        ),
    },
    {
        field: 'expiredCount',
        headerName: 'Expired Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_EXPIRED_COUNT,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span className="p-1">{row?.expiredQuantity}</span>
        ),
    },
    {
        field: 'closedCount',
        headerName: 'Closed Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_CLOSED_COUNT,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) => (
            <span className="p-1">{row?.closedQuantity}</span>
        ),
    },
    {
        field: 'createdAt',
        headerName: 'Created date',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_CREATED_DATE,
        renderCell: (row: WareHouseInventoryOfProductSummaryListResponse) =>
            formatedDateTimeIntoIst(row?.createdAt),
    },
]

const InventoryListingWrapper = () => {
    const params = useParams()
    const wareHouseId = params.id

    const { items, isLoading } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetInventoriesOfWarehouseQuery(wareHouseId || ''),
    })

    // const inventoriesState: any = useSelector(
    //     (state: RootState) => state.listingPagination
    // )
    // const { page, rowsPerPage, searchValue } = inventoriesState
    // const { userData } = useSelector((state: RootState) => state?.auth)
    // const { items } = useGetCustomListingData({
    //     useEndPointHook: useGetInventoriesByBarcodeQuery({
    //         body: {
    //             limit: rowsPerPage,
    //             searchValue: searchValue,
    //             params: ['productGroupLabel', 'barcodeNumber'],
    //             page: page,
    //             filterBy: [
    //                 {
    //                     fieldName: 'companyId',
    //                     value: userData?.companyId as string,
    //                 },
    //                 {
    //                     fieldName: 'wareHouseId',
    //                     value: wareHouseId,
    //                 },
    //             ],
    //             dateFilter: {},
    //             orderBy: 'createdAt',
    //             orderByValue: -1,
    //             isPaginationRequired: true,
    //         },
    //         warehouseId: wareHouseId as string,
    //         status: barcodeStatusEnum.atWarehouse,
    //     }),
    // })

    return (
        <InventoryListing
            columns={columns}
            rows={items || []}
            isTableLoading={isLoading}
        />
    )
}

export default InventoryListingWrapper
