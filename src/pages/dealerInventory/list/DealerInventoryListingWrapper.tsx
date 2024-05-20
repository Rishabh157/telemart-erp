// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetDealersInventoryQuery } from 'src/services/BarcodeService'

// |-- Redux --|
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { DealersInventoryListResponse } from 'src/models/Barcode.model'
import { RootState } from 'src/redux/store'
import DealerInventoryListing from './DealerInventoryListing'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

const DealerInventoryListingWrapper = () => {
    // Hooks
    useUnmountCleanup()

    const dealerInventoryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue, selectedDealer } =
        dealerInventoryState

    // pagination api
    const { items } = useGetCustomListingData<DealersInventoryListResponse[]>({
        useEndPointHook: useGetDealersInventoryQuery(
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
        ),
    })
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
