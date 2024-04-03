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
    // setOrderNumberSearch,
    // setComplaintNumberSearch,
} from 'src/redux/slices/OfferAppliedNdrSlice'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const OfferAppliedNdrListing = ({ columns, rows, setShowDropdown }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const offerAppliedNdrState: any = useSelector(
        (state: RootState) => state.offerAppliedNdr
    )
    const [selectedRows, setSelectedRows] = useState([])
    const {
        page,
        rowsPerPage,
        totalItems,
        searchValue,
        isTableLoading,
        // orderNumberSearch,
        // complaintNumberSearch,
    } = offerAppliedNdrState

    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Offer Apply NDR </ATMPageHeading>
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
                    // isAnotherSearch
                    // anotherSearchValue={orderNumberSearch}
                    // anotherSearchPlaceholder="Order No..."
                    // onAnotherSearch={(newValue) => {
                    //     dispatch(setOrderNumberSearch(newValue))
                    // }}
                    // isAnotherSearchTwo
                    // anotherSearchTwoValue={complaintNumberSearch}
                    // anotherSearchTwoPlaceholder="Complaint No..."
                    // onAnotherSearchTwo={(newValue) => {
                    //     dispatch(setComplaintNumberSearch(newValue))
                    // }}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    // isFilter
                    // onFilterClick={() => {}}
                />

                {/* Table */}
                <div className="grow overflow-auto h-full ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
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
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default OfferAppliedNdrListing
