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

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const DealerBalanceRequestListing = ({ columns, rows }: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const state: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } = state

    return (
        <div className="h-[calc(100vh-60px)] px-4">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]  p-1">
                <ATMPageHeading>Dealer Balance Request</ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white ">
                {/*Table Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

                {/* Table */}
                <div className="grow overflow-auto">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        extraClasses="max-h-[calc(100%-150px)] overflow-auto"
                        isLoading={isTableLoading}
                    />
                </div>

                {/* Pagination */}
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

export default DealerBalanceRequestListing
