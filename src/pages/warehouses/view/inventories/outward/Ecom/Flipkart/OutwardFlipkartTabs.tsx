// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'

// |-- Redux --|
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'

type Props = {
    columns: columnTypes[]
    rows: any[]
}

const OutwardFlipkartTabs = ({ columns, rows }: Props) => {

    // Hooks
    const dispatch = useDispatch<AppDispatch>()

    const amazonOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } = amazonOrderState

    return (
        <div className="border flex flex-col h-[calc(100%-10px)] rounded bg-white">
            {/*Table Header */}
            <ATMTableHeader
                searchValue={searchValue}
                page={page}
                rowCount={totalItems}
                rowsPerPage={rowsPerPage}
                rows={rows}
                isRefresh
                onRowsPerPageChange={(newValue) =>
                    dispatch(setRowsPerPage(newValue))
                }
                onSearch={(newValue) =>
                    dispatch(setSearchValue(newValue))
                }
            />

            {/* Table */}
            <div className="overflow-auto grow z-0">
                <ATMTable
                    extraClasses='h-full'
                    columns={columns}
                    rows={rows}
                    isLoading={isTableLoading}
                    headerClassName='z-0'
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
    )
}

export default OutwardFlipkartTabs
