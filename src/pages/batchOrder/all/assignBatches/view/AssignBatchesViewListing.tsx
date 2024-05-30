// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
// import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
// import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
// import {
//     setFilterValue,
//     setPage,
//     setRowsPerPage,
//     setSearchValue,
// } from 'src/redux/slices/ListingPaginationSlice'
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    // apiStatus: boolean
    selectedRows: any[]
    setSelectedRows: (ele: any) => any
    // handleSubmit: () => void
}

const AssignBatchesViewListing = ({
    columns,
    rows = [],
    selectedRows,
    setSelectedRows,
}: Props) => {
    // const dispatch = useDispatch<AppDispatch>()
    const createBatchState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { searchValue, isTableLoading } = createBatchState

    console.log('searchValue: ', searchValue)
    return (
        <div className="px-4 h-[calc(100vh-150px)]">
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Assign Orders </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
                {/* <ATMTableHeader
                    // searchValue={searchValue}
                    placeholder="Order No..."
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows || []}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    // onSearch={(newValue) => {
                    //     dispatch(setSearchValue(newValue))
                    // }}
                    onFilterDispatch={() => dispatch(setFilterValue([]))}
                /> */}

                <div className="grow overflow-auto">
                    <ATMTable
                        extraClasses="w-[200%]"
                        columns={columns}
                        rows={rows || []}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        isLoading={isTableLoading}
                    />
                </div>

                {/* <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div> */}
            </div>
        </div>
    )
}

export default AssignBatchesViewListing
