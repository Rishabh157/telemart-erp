// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetDealersInventoryQuery } from 'src/services/BarcodeService'

// |-- Redux --|
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import DealerInventoryListing from './DealerInventoryListing'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

type DealersInventoryListResponse = {
    count: number
    firstDocument: {
        _id: string
        productGroupId: string
        barcodeNumber: string
        outerBoxbarCodeNumber: string | null
        cartonBoxId: string | null
        barcodeGroupNumber: string
        lotNumber: string
        isUsed: boolean
        wareHouseId: string
        vendorId: string | null
        dealerId: string
        status: string
        companyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        productGroupLabel: string
        wareHouseLabel: string
    }
    productGroupId: string
}

const DealerInventoryListingWrapper = () => {
    // Hooks
    useUnmountCleanup()
    const dealerInventoryState: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, searchValue, selectedDealer } = dealerInventoryState

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
            headerName: 'Dealer Available Stock',
            flex: 'flex-[1_5_0%]',
            extraClasses: 'min-w-[200px]',
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
