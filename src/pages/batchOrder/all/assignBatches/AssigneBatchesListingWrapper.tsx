// |-- Built-in Dependencies --|
import { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { useGetBatchesOrderQuery } from 'src/services/BatchesServices'
// import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/CreateBatchOrderSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import AssignBatchesListing from './AssignBatchesListing'

const AssigneBatchesListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()

    const createBatchOrderState: any = useSelector(
        (state: RootState) => state.createBatch
    )

    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        // totalItems,
        // isTableLoading,
    } = createBatchOrderState

    const { data, isLoading, isFetching } = useGetBatchesOrderQuery({
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
        <AssignBatchesListing
            // columns={columns}
            rows={items}
        />
    )
}

export default AssigneBatchesListingWrapper
