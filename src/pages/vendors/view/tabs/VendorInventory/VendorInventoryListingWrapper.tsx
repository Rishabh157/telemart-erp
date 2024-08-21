// |-- External Dependencies --|
import { BsArrowRepeat } from 'react-icons/bs'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WareHouseInventory } from 'src/models/Inventory.model'
import VendorInventoryListing from './VendorInventoryListing'
import { barcodeStatusEnum } from 'src/utils/constants/enums'

// |-- Redux --|
import { useParams } from 'react-router-dom'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { useGetVendorInventoriesByBarcodeQuery } from 'src/services/BarcodeService'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const columns: columnTypes[] = [
    {
        field: 'productName',
        headerName: 'Product Group Name',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_PRODUCT_GROUP_NAME,
        renderCell: (row: WareHouseInventory) => (
            <span> {row?.firstDocument?.productGroupLabel} </span>
        ),
    },
    {
        field: 'totalFreshCount',
        headerName: 'Fresh Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_FRESH_COUNT,
        renderCell: (row: WareHouseInventory) => (
            <span className="p-1"> {row.totalFreshCount} </span>
        ),
    },
    {
        field: 'totalDamageCount',
        headerName: 'Damage Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_DAMAGE_COUNT,
        renderCell: (row: WareHouseInventory) => (
            <span className="p-1"> {row.totalDamageCount} </span>
        ),
    },
    {
        field: 'totalMissingCount',
        headerName: 'Missing Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_MISSING_COUNT,
        renderCell: (row: WareHouseInventory) => (
            <span className="p-1"> {row.totalMissingCount} </span>
        ),
    },
    {
        field: 'totalRtvCount',
        headerName: 'RTV Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_RTV_COUNT,
        renderCell: (row: WareHouseInventory) => (
            <span className="p-1"> {row.totalRtvCount} </span>
        ),
    },
    {
        field: 'totalFakeCount',
        headerName: 'Fake Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_FAKE_COUNT,
        renderCell: (row: WareHouseInventory) => (
            <span className="p-1"> {row.totalFakeCount} </span>
        ),
    },
    {
        field: 'expiredCount',
        headerName: 'Expired Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_EXPIRED_COUNT,
        renderCell: (row: WareHouseInventory) => (
            <span className="p-1"> {row?.expiredCount} </span>
        ),
    },
    {
        field: 'closedCount',
        headerName: 'Closed Count',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_CLOSED_COUNT,
        renderCell: (row: WareHouseInventory) => (
            <span className="p-1"> {row?.closedCount} </span>
        ),
    },
    {
        field: 'createdAt',
        headerName: 'Created date',
        flex: 'flex-[1_1_0%]',
        name: UserModuleNameTypes.TAB_WAREHOUSE_WAREHOUSE_INVENTORIES_LIST_CREATED_DATE,
        renderCell: (row: WareHouseInventory) =>
            formatedDateTimeIntoIst(row?.firstDocument?.createdAt),
    },
]

const tabs = [
    {
        label: 'Inventories',
        icon: BsArrowRepeat,
        path: 'inventories',
    },
]

const VendorInventoryListingWrapper = () => {
    const inventoriesState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const params = useParams()
    const vendorId = params?.vendorId
    console.log('vendorId: ', vendorId)
    const { page, rowsPerPage, searchValue } = inventoriesState
    // const { userData } = useSelector((state: RootState) => state?.auth)
    const { items } = useGetCustomListingData({
        useEndPointHook: useGetVendorInventoriesByBarcodeQuery({
            body: {
                limit: rowsPerPage,
                searchValue: searchValue,
                params: ['productGroupLabel', 'barcodeNumber'],
                page: page,
                filterBy: [
                    // {
                    //     fieldName: 'companyId',
                    //     value: userData?.companyId as string,
                    // },
                    {
                        fieldName: 'vendorId',
                        value: vendorId,
                    },
                ],
                dateFilter: {},
                orderBy: 'createdAt',
                orderByValue: -1,
                isPaginationRequired: true,
            },
            vendorId: vendorId as string,
            status: barcodeStatusEnum.atWarehouse,
        }),
    })

    return <VendorInventoryListing columns={columns} rows={items} tabs={tabs} />
}

export default VendorInventoryListingWrapper
