/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:WarehouseToComapnyListing.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import ActionAuthHOC from 'src/ActionAuthHoc'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
    // UserModuleAddActionTypes,
} from 'src/models/userAccess/UserAccess.model'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/WarehouseToComapnySlice'
import { AppDispatch, RootState } from 'src/redux/store'
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const WarehouseToComapnyListing = ({
    columns,
    rows,
    setShowDropdown,
}: Props) => {
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const dispatch = useDispatch<AppDispatch>()
    const WarehouseToComapnyState: any = useSelector(
        (state: RootState) => state.warehouseToComapny
    )
    const { pathname } = useLocation()
    const path = pathname.split('/')[1]
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } =
        WarehouseToComapnyState
    useEffect(() => {
        return () => {
            dispatch(setSearchValue(''))
        }
    }, [])
    return (
        <div
            className={`px-4 ${
                path === 'dealers'
                    ? 'h-[calc(100vh-185px)]'
                    : 'h-[calc(100vh-55px)]'
            }`}
        >
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Warehouse Transfer </ATMPageHeading>
                <ActionAuthHOC
                    moduleName={UserModuleNameTypes.warehouseToCompanyTransfer}
                    actionName={UserModuleActionTypes.Add}
                    component={
                        <button
                            onClick={() => navigate('add')}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + warehouse-transfer
                        </button>
                    }
                />
            </div>

            <div
                className={` border flex flex-col  rounded bg-white ${
                    path === 'dealers'
                        ? 'h-[calc(100%-50px)]'
                        : 'h-[calc(100%-75px)]'
                }`}
            >
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
                    // isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
                />

                {/* Table */}
                <div className="grow">
                    <ATMTable
                        isLoading={isTableLoading}
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="h-full"
                        setShowDropdown={setShowDropdown}
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

export default WarehouseToComapnyListing
