// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import {
    useGetBatchesOrderQuery,
    useAddBatchesMutation,
} from 'src/services/CreateBatchServices'
// import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/CreateBatchOrderSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import AssignBatchesListing from './AssignBatchesListing'
import { showToast } from 'src/utils'

const AssigneBatchesListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [selectedRows, setSelectedRows] = useState([])
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    // const [currentId, setCurrentId] = useState<string>('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    // const [isFlowDialogShow, setIsFlowDialogShow] = useState<boolean>(false)
    const [addBatch] = useAddBatchesMutation()

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
        searchValue: searchValue,
        params: ['batchNumber', 'createdByLabel'],
        page: page,
        filterBy: [
            // {
            //     fieldName: 'orderNumber',
            //     value: [searchValue],
            // },
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

 
    const handleBatchSubmit = () => {
        setApiStatus(true)

        setTimeout(() => {
            addBatch({
                orders: selectedRows?.map((ele: any) => ele?._id),
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    return (
        <AssignBatchesListing
            // columns={columns}
            rows={items}
            apiStatus={apiStatus}
            setShowDropdown={setShowDropdown}
            selectedRows={selectedRows}
            setSelectedRows={(ele) => setSelectedRows(ele)}
            handleSubmit={() => handleBatchSubmit()}
        />
    )
}

export default AssigneBatchesListingWrapper
