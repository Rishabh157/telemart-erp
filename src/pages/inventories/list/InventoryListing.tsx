import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/inventorySlice'
import { AppDispatch, RootState } from 'src/redux/store'

type Props = {
    columns: any[]
    rows: any[]
}

const InventoryListing = ({ columns, rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const inventoryState: any = useSelector(
        (state: RootState) => state.inventory
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, searchValue } = inventoryState
    const navigate = useNavigate()

    return (
        <div className="px-4 h-[calc(100vh-55px)] overflow-auto ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[55px]">
                <ATMPageHeading> Inventories </ATMPageHeading>
                <button
                    type="button"
                    onClick={() => navigate('inward-inventory')}
                    className="bg-primary-main text-white rounded py-1 px-3"
                >
                    + Inward Inventory
                </button>
            </div>

            <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={rows.length}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => {
                        dispatch(setSearchValue(newValue))
                    }}
                    isFilter
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
                        extraClasses="max-h-[calc(100%-150px)] overflow-auto"
                    />
                </div>

                {/* Pagination */}

                <div className="h-[90px] flex items-center justify-end border-t border-slate-300">
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

export default InventoryListing
