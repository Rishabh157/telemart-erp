// |-- External Dependencies --|
import { BsArrowRepeat } from 'react-icons/bs'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WareHouseInventory } from 'src/models/Inventory.model'
import InventoryListing from './InventoryListing'
import { barcodeStatusEnum } from 'src/utils/constants/enums'

// |-- Redux --|
import { useParams } from 'react-router-dom'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { useGetInventoriesByBarcodeQuery } from 'src/services/BarcodeService'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'

const columns: columnTypes[] = [
    {
        field: 'productName',
        headerName: 'Product Group Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: WareHouseInventory) => (
            <span> {row?.firstDocument?.productGroupLabel} </span>
        ),
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 'flex-[1_1_0%]',

        renderCell: (row: WareHouseInventory) => (
            <span className="p-1"> {row.count} </span>
        ),
    },
    {
        field: 'warehouse',
        headerName: 'Warehouse',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: WareHouseInventory) => (
            <span> {row?.firstDocument?.wareHouseLabel} </span>
        ),
    },
    // {
    //     field: 'lotNumber',
    //     headerName: 'lotNumber',
    //     flex: 'flex-[1_1_0%]',
    //     renderCell: (row: WareHouseInventory) => (
    //         <span> {row?.firstDocument?.lotNumber} </span>
    //     ),
    // },
    // {
    //     field: 'outerBoxbarCodeNumber',
    //     headerName: 'outerbox code',
    //     flex: 'flex-[1_1_0%]',
    //     renderCell: (row: WareHouseInventory) => (
    //         <span> {row?.firstDocument?.outerBoxbarCodeNumber} </span>
    //     ),
    // },
    {
        field: 'status',
        headerName: 'status',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: WareHouseInventory) => (
            <span> {row?.firstDocument?.status} </span>
        ),
    },
    {
        field: 'date',
        headerName: 'created date',
        flex: 'flex-[1_1_0%]',
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

const InventoryListingWrapper = () => {
    const inventoriesState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const params = useParams()
    const wareHouseId = params.id
    const { page, rowsPerPage, searchValue } = inventoriesState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { items } = useGetCustomListingData({
        useEndPointHook: useGetInventoriesByBarcodeQuery({
            body: {
                limit: rowsPerPage,
                searchValue: searchValue,
                params: ['productGroupLabel', 'barcodeNumber'],
                page: page,
                filterBy: [
                    {
                        fieldName: 'companyId',
                        value: userData?.companyId as string,
                    },
                    {
                        fieldName: 'wareHouseId',
                        value: wareHouseId,
                    },
                ],
                dateFilter: {},
                orderBy: 'createdAt',
                orderByValue: -1,
                isPaginationRequired: true,
            },
            companyId: userData?.companyId as string,
            warehouseId: wareHouseId as string,
            status: barcodeStatusEnum.atWarehouse,
        }),
    })

    return <InventoryListing columns={columns} rows={items} tabs={tabs} />
}

export default InventoryListingWrapper
