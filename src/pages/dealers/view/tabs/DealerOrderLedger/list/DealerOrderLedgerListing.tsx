import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
    setFilterBy,
} from 'src/redux/slices/DealerLedgerSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// import FilterDialogWarpper from 'src/pages/dealers/components/FilterDialog/FilterDialogWarpper'

type Props = {
    columns: any[]
    rows: any[]
}

const DealerOrderLedgerListing = ({ columns, rows }: Props) => {
    // const [isFilterOpen, setIsFilterOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const dealerLedgerState: any = useSelector(
        (state: RootState) => state.dealerLedger
    )

    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        dealerLedgerState

    return (
        <div className="px-4 h-[calc(100vh-195px)] ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <div className="flex gap-6">
                    <ATMPageHeading>Order Ledger</ATMPageHeading>
                </div>
            </div>

            <div className="border flex flex-col h-[calc(100%-35px)]  rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    searchValue={searchValue}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    // isFilter
                    // isRefresh
                    isDateFilter
                    IsDaterFilterLoading={isTableLoading}
                    onSubmitDateHandler={(values) => {
                        dispatch(setFilterBy(values))
                    }}
                    // onFilterClick={() => setIsFilterOpen(true)}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="h-full overflow-auto"
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

            {/* {isFilterOpen && (
                <FilterDialogWarpper onClose={() => setIsFilterOpen(false)} />
            )} */}
        </div>
    )
}

export default DealerOrderLedgerListing
