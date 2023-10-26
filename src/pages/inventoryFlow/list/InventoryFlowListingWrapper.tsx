/// ==============================================
// Filename:InventoryFlowListingWrapper.tsx
// Type: List Component
// Last Updated: OCTOBER 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import InventoryFlowListing from './InventoryFlowListing'

// |-- Redux --|
import { useGetBarcodeFlowQuery } from 'src/services/InventoryFlowService'
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/InventoryFlowSlice'

const InventoryFlowListingWrapper = () => {
    const inventoryFlow: any = useSelector(
        (state: RootState) => state.inventoryFlow
    )
    const { page, rowsPerPage, searchValue, items } = inventoryFlow
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetBarcodeFlowQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['barcodeNumber', 'productGroupLabel'],
        page: page,
        filterBy: [],
        dateFilter: {
            // start_date: '23-10-2023',
            // end_date: '25-10-2023',
            //     dateFilterKey: "",
        },
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
    }, [isLoading, isFetching, data, dispatch])

    return (
        <>
            <SideNavLayout>
                <InventoryFlowListing
                    items={items || []}
                    onBarcodeClick={() => {}}
                />
            </SideNavLayout>
        </>
    )
}

export default InventoryFlowListingWrapper
