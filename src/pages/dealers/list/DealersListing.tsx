// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import FilterDialogWarpper from '../components/FilterDialog/FilterDialogWarpper'
import MainLayout from 'src/components/layouts/MainLayout/MainLayout'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const DealersListing = ({ columns, rows, setShowDropdown }: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const dealerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        dealerState

    return (
        <MainLayout>
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Dealers </ATMPageHeading>
                {isAuthorized(UserModuleNameTypes.ACTION_DEALER_ADD) && (
                    <button
                        onClick={() => {
                            navigate('add-dealer')
                        }}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Add Dealers
                    </button>
                )}
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
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
                    onFilterClick={() => setIsFilterOpen(true)}
                    onSearch={(newValue) => {
                        dispatch(setSearchValue(newValue))
                    }}
                />

                {/* Table */}
                <div className={`grow overflow-auto `}>
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        setShowDropdown={setShowDropdown}
                        isLoading={isTableLoading}
                    />
                </div>

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        onRowsPerPageChange={(newValue) => alert(newValue)}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>

            {isFilterOpen && (
                <FilterDialogWarpper onClose={() => setIsFilterOpen(false)} />
            )}
        </MainLayout>
    )
}

export default DealersListing
