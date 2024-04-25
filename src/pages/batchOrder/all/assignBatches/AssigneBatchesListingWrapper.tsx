// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { useGetBatchesOrderQuery } from 'src/services/BatchesServices'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import AssignBatchesListing from './AssignBatchesListing'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const AssigneBatchesListingWrapper = () => {
    useUnmountCleanup()
    const createBatchOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue } = createBatchOrderState

    // pagination api
    const { items } = useGetCustomListingData<any>({
        useEndPointHook: useGetBatchesOrderQuery({
            limit: rowsPerPage,
            searchValue: '',
            params: ['batchNumber', 'createdByLabel'],
            page: page,
            filterBy: [
                {
                    fieldName: 'batchNumber',
                    value: [searchValue],
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    return (
        <AssignBatchesListing
            // columns={columns}
            rows={items}
        />
    )
}

export default AssigneBatchesListingWrapper
