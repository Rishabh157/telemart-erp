/// ==============================================
// Filename:InventoryListing.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ActionAuthHOC from 'src/ActionAuthHoc'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    UserModuleNameTypes,
    UserModuleOtherActionTypes,
} from 'src/models/userAccess/UserAccess.model'
// import TabScrollable from 'src/components/utilsComponent/TabScrollable'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/inventorySlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    tabs: {
        label: string
        icon: IconType
        path: string
    }[]
}

const InventoryListing = ({ columns, rows, tabs }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const inventoryState: any = useSelector(
        (state: RootState) => state.inventory
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        inventoryState
    const navigate = useNavigate()

    return (
        <>
            <div className="h-[calc(100vh-100px)] px-4">
                {/* Page Header */}
                <div className="flex justify-between items-center h-[78px]  p-1">
                    <ATMPageHeading> Inventories </ATMPageHeading>
                    <ActionAuthHOC
                        moduleName={UserModuleNameTypes.wareHouse}
                        actionName={
                            UserModuleOtherActionTypes.tabWarehouseInventoryAdd
                        }
                        component={
                            <button
                                type="button"
                                onClick={() => navigate('inward-inventory/add')}
                                className="bg-primary-main text-white rounded py-1 px-3"
                            >
                                + Inward Inventory
                            </button>
                        }
                    />
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
        </>
    )
}

export default InventoryListing
