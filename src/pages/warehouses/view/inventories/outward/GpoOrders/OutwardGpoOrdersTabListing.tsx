// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Internal Dependencies --|
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    onDispatchClick: () => void
}

const OutwardGpoOrdersTabListing = ({
    columns,
    rows,
    onDispatchClick,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, isTableLoading, searchValue } =
        outwardCustomerState

    return (
        <div className=" h-[calc(100vh-150px)]  bg-white ">
            <div className="border flex flex-col h-[calc(100%)] rounded bg-white">
                {/*Table Header */}

                <ATMTableHeader
                    page={page}
                    rowCount={rows.length}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    searchValue={searchValue}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    children={
                        <ATMLoadingButton
                            // disabled={values.status ? false : true}
                            loadingText="Opening...."
                            onClick={onDispatchClick}
                            className="text-white flex items-center py-1 px-1 rounded w-28 bg-primary-main"
                        >
                            Dispatch
                        </ATMLoadingButton>
                    }
                    // isFilter
                    // onFilterClick={() => setIsOpenFilterFormDialog(true)}
                />

                {/* {isOpenFilterFormDialog && (
                    <OutwardCustomerTabListFilterFormDialogWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                    />
                )} */}

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="max-h-[calc(100%-150px)] overflow-auto"
                        isLoading={isTableLoading}
                    />
                </div>

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={rows.length}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default OutwardGpoOrdersTabListing
