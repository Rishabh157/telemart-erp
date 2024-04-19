// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
import {
    setFilterValue,
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    selectedRows: any[]
    setSelectedRows: (ele: any) => any
    onClick: () => void
}

const CreateBatchOrderListing = ({
    columns,
    rows,
    selectedRows,
    setSelectedRows,
    onClick,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const createBatchState: any = useSelector((state: RootState) => state.listingPagination)

    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        isTableLoading,
        totalItems,
    } = createBatchState

    return (
        <div className="px-4 h-[calc(100vh-150px)]">
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Create Batches </ATMPageHeading>
                {isAuthorized(
                    UserModuleNameTypes.ACTION_BATCH_ORDER_CREATE_BATCH_CREATE_BATCH
                ) && (
                        <ATMLoadingButton
                            disabled={!selectedRows.length}
                            loadingText="Saving..."
                            onClick={onClick}
                            className="bg-primary-main text-white flex items-center py-1 px-2 rounded w-60"
                        >
                            Create Selected Order Batch
                        </ATMLoadingButton>
                    )}
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
                <ATMTableHeader
                    searchValue={searchValue}
                    placeholder="Order No..."
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    // isFilter
                    // isRefresh
                    onFilterDispatch={() => dispatch(setFilterValue([]))}
                />

                <div className="grow overflow-auto">
                    <ATMTable
                        isCheckbox
                        extraClasses="w-[200%]"
                        columns={columns}
                        rows={items}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        isLoading={isTableLoading}
                    />
                </div>

                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={items}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateBatchOrderListing
