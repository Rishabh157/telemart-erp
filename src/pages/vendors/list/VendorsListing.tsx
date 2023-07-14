/// ==============================================
// Filename:VendorListing.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

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

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/vendorSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import ActionAuthHOC from 'src/ActionAuthHoc'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const VendorsListing = ({ columns, rows, setShowDropdown }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const vendorState: any = useSelector((state: RootState) => state.vendor)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        vendorState
    return (
        <div className="px-4 h-[calc(100vh-55px)]">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Vendors </ATMPageHeading>
                <ActionAuthHOC
                    moduleName="VENDOR"
                    actionName="ADD"
                    component={
                        <button
                            onClick={() => {
                                navigate('add-vendor')
                            }}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            {' '}
                            + Add Vendor{' '}
                        </button>
                    }
                />
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/*Table Header */}

                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    isFilter
                    onFilterClick={() => setIsFilterOpen(true)}
                />

                {/* Table */}
                <div className={`grow overflow-auto `}>
                    <ATMTable
                        isLoading={isTableLoading}
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        setShowDropdown={setShowDropdown}
                        // onRowClick={(row: VendorsListResponse) =>
                        //   navigate(`${row._id}/general-information`)
                        // }
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
        </div>
    )
}

export default VendorsListing
