import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { InventoryListResponse } from 'src/models/Inventory.model'
// import {
//   setIsTableLoading,
//   setItems,
//   setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, RootState } from "src/redux/store";
import InventoryListing from './InventoryListing'
import { useGetPaginationInventoriesQuery } from 'src/services/InventoriesService'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/inventorySlice'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const columns: columnTypes[] = [
    {
        field: 'productName',
        headerName: 'Product Group Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: InventoryListResponse) => (
            <span> {row.productGroupName} </span>
        ),
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: InventoryListResponse) => (
            <span className="p-1"> {row.count} </span>
        ),
    },
    {
        field: 'warehouse',
        headerName: 'Warehouse',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: InventoryListResponse) => (
            <span> {row.wareHouse} </span>
        ),
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 'flex-[0.5_0.5_0%]',
        renderCell: (row: any) => (
            <ActionPopup
                handleOnAction={() => {
                    // setShowDropdown(!showDropdown)
                    // setCurrentId(row?._id)
                }}
            >
                <></>
            </ActionPopup>
        ),
        align: 'end',
    },
]

const InventoryListingWrapper = () => {
    const inventoriesState: any = useSelector(
        (state: RootState) => state.inventory
    )

    const { page, rowsPerPage, searchValue, items } = inventoriesState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationInventoriesQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['productGroupName'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
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
            <SideNavLayout>
                <div className="h-full">
                    <InventoryListing columns={columns} rows={items} />
                </div>
            </SideNavLayout>
        </>
    )
}

export default InventoryListingWrapper
