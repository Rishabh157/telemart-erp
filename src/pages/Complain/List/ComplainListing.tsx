/// ==============================================
// Filename:CallListing.tsx
// Type: ADD Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
    setOrderNumberSearch,
    setComplaintNumberSearch,
} from 'src/redux/slices/ComplainSlice'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import ComplainListFilterFormDialogWrapper from './ComplainFilter/ComplainListFilterFormDialogWrapper'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const ComplainListing = ({ columns, rows, setShowDropdown }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const complainState: any = useSelector((state: RootState) => state.complain)
    const [selectedRows, setSelectedRows] = useState([])
    const {
        page,
        rowsPerPage,
        totalItems,
        searchValue,
        isTableLoading,
        orderNumberSearch,
        complaintNumberSearch,
    } = complainState
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)

    return (
        // <div className="px-4 h-full overflow-auto pt-3  bg-white ">
        <div className="px-4 h-[calc(100vh-55px)] bg-white ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Complaint </ATMPageHeading>
                {/* <button
                    type="button"
                    onClick={() => navigate('add')}
                    className="bg-primary-main text-white rounded py-1 px-3"
                >
                    + Add 
                </button> */}
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    searchValue={searchValue}
                    isAnotherSearch
                    anotherSearchValue={orderNumberSearch}
                    anotherSearchPlaceholder="Order No..."
                    onAnotherSearch={(newValue) => {
                        dispatch(setOrderNumberSearch(newValue))
                    }}
                    isAnotherSearchTwo
                    anotherSearchTwoValue={complaintNumberSearch}
                    anotherSearchTwoPlaceholder="Complaint No..."
                    onAnotherSearchTwo={(newValue) => {
                        dispatch(setComplaintNumberSearch(newValue))
                    }}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    onFilterClick={() => {
                        setIsOpenFilterFormDialog(true)
                    }}
                    isFilter
                    // isFilter
                />
                {isOpenFilterFormDialog && (
                    <ComplainListFilterFormDialogWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                    />
                )}

                {/* Table */}
                <div className="grow overflow-auto h-full ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        setShowDropdown={setShowDropdown}
                        // extraClasses="h-full overflow-auto"
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

export default ComplainListing
