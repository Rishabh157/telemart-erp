/// ==============================================
// Filename:InventoryListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect } from 'react'

// |-- External Dependencies --|
import { BsArrowRepeat } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

// import { useNavigate } from "react-router-dom";

// |-- Internal Dependencies --|
// import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WareHouseInventory } from 'src/models/Inventory.model'
import InventoryListing from './InventoryListing'
// import { useGetPaginationInventoriesQuery } from 'src/services/InventoriesService'

// |-- Redux --|
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/inventorySlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetInventoriesByBarcodeQuery } from 'src/services/BarcodeService'
// import TabScrollable from 'src/components/utilsComponent/TabScrollable'

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
        renderCell: (row: WareHouseInventory) => (
            <span>
                {' '}
                {format(
                    new Date(row.firstDocument?.createdAt),
                    'yyyy-MM-dd HH:mm'
                )}
            </span>
        ),
    },

    // {
    //     field: 'actions',
    //     headerName: 'Actions',
    //     flex: 'flex-[0.5_0.5_0%]',
    //     renderCell: (row: any) => (
    //         <ActionPopup
    //             handleOnAction={() => {
    //                 // setShowDropdown(!showDropdown)
    //                 // setCurrentId(row?._id)
    //             }}
    //         />

    //     ),
    //     align: 'end',
    // },
]

const tabs = [
    {
        label: 'Inventories',
        icon: BsArrowRepeat,
        path: 'inventories',
    },
    // {
    //     label: 'Outward Inventories',
    //     icon: BsArrowRepeat,
    //     path: 'inventories/outward-inventories',
    // },
    // {
    //     label: 'Inward Inventories',
    //     icon: BsArrowRepeat,
    //     path: 'inventories/inward-inventories',
    // },
]

const InventoryListingWrapper = () => {
    const inventoriesState: any = useSelector(
        (state: RootState) => state.inventory
    )
    const params = useParams()
    const wareHouseId = params.id
    const { page, rowsPerPage, searchValue, items } = inventoriesState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetInventoriesByBarcodeQuery({
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
        status: 'AT_WAREHOUSE',
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    return (
        <>
            <InventoryListing columns={columns} rows={items} tabs={tabs} />
        </>
    )
}

export default InventoryListingWrapper
