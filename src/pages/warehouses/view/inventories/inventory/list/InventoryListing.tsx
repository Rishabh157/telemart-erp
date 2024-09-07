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

import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
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
    isTableLoading: boolean
}

const InventoryListing = ({ columns, rows, isTableLoading }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const inventoryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, searchValue } =
        inventoryState
    const navigate = useNavigate()

    return (
        <div className="h-[calc(100vh-100px)] px-4">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[78px]  p-1">
                <ATMPageHeading> Inventories </ATMPageHeading>
                <div className="flex gap-x-4">
                    {isAuthorized(
                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_FILL_CARTON_BOX
                    ) && (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate('inward-inventory/cartonbox')
                                }
                                className="bg-primary-main text-white rounded py-1 px-3"
                            >
                                Craete New Carton Box
                            </button>
                        )}

                    {isAuthorized(
                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_ADD
                    ) && (
                            <button
                                type="button"
                                onClick={() => navigate('inward-inventory/add')}
                                className="bg-primary-main text-white rounded py-1 px-3"
                            >
                                + Inward Inventory
                            </button>
                        )}
                </div>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white ">
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
                    onSearch={(newValue) => {
                        dispatch(setSearchValue(newValue))
                    }}
                //  isFilter
                />

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
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
                        rowCount={totalItems}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) =>
                            dispatch(setPage(newPage))
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default InventoryListing
