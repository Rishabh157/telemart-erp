// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetDealersInventoryQuery } from 'src/services/BarcodeService'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/dealerInventorySlice'
import DealerInventoryListing from './DealerInventoryListing'
import { DealersInventoryListResponse } from 'src/models/Barcode.model'

const DealerInventoryListingWrapper = () => {
    // Hooks
    const dispatch = useDispatch<AppDispatch>()

    const dealerInventoryState: any = useSelector(
        (state: RootState) => state.dealerInventory
    )

    const { page, rowsPerPage, searchValue, items, selectedDealer } =
        dealerInventoryState

    const { data, isLoading, isFetching } = useGetDealersInventoryQuery(
        {
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['productGroupLabel'],
            page: page,
            filterBy: [
                {
                    fieldName: 'dealerId',
                    value: selectedDealer,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        },
        {
            skip: !selectedDealer,
        }
    )

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])

    const columns: columnTypes[] = [
        {
            field: 'productGroupLabel',
            headerName: 'Product Group',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersInventoryListResponse) => (
                <span>{row?.firstDocument?.productGroupLabel}</span>
            ),
        },
        {
            field: 'count',
            headerName: 'Count',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersInventoryListResponse) => (
                <span>{row?.count}</span>
            ),
        },
        {
            field: 'wareHouseLabel',
            headerName: 'Warehouse',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersInventoryListResponse) => (
                <span>{row?.firstDocument?.wareHouseLabel}</span>
            ),
        },
    ]

    return (
        <SideNavLayout>
            <DealerInventoryListing columns={columns} rows={items} />
        </SideNavLayout>
    )
}

export default DealerInventoryListingWrapper
