// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { handleValidNumberForSearch } from 'src/utils/methods/numberMethods'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    selectedRows: any[]
    setSelectedRows: (ele: any) => any
    // apiStatus: boolean
    // handleSubmit: () => void
}

const UnAssignBatchesOrderListing = ({
    columns,
    rows = [],
    selectedRows,
    setSelectedRows,
}: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const createBatchState: any = useSelector((state: RootState) => state.listingPagination)

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } = createBatchState

    return (
        <div className="px-4 h-[calc(100vh-150px)]">
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Unassign Orders </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
                <ATMTableHeader
                    searchValue={searchValue}
                    placeholder="Order No..."
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows || []}
                    onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
                    onSearch={(newValue) => handleValidNumberForSearch(newValue) && dispatch(setSearchValue(newValue))}
                />

                <div className="grow overflow-auto">
                    <ATMTable
                        extraClasses="w-[200%]"
                        columns={columns}
                        rows={rows || []}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
                        isLoading={isTableLoading}
                    />
                </div>

                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default UnAssignBatchesOrderListing
