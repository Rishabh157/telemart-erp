// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import InventoryFlowListing from './InventoryFlowListing'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// |-- Redux --|
import { useGetBarcodeFlowQuery } from 'src/services/InventoryFlowService'
import { RootState } from 'src/redux/store'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const InventoryFlowListingWrapper = () => {
    useUnmountCleanup()

    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPaginationState
    const { userData } = useGetLocalStorage()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetBarcodeFlowQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['barcodeNumber', 'productGroupLabel'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    return (
        <SideNavLayout>
            <InventoryFlowListing
                items={items || []}
                onBarcodeClick={() => {}}
            />
        </SideNavLayout>
    )
}

export default InventoryFlowListingWrapper
