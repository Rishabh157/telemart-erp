/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:SaleOrderListing.tsx
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
    UserModuleAddActionTypes,
} from 'src/models/userAccess/UserAccess.model'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/saleOrderSlice'
import { AppDispatch, RootState } from 'src/redux/store'
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const SaleOrderListing = ({ columns, rows, setShowDropdown }: Props) => {
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const dispatch = useDispatch<AppDispatch>()
    const saleOrderState: any = useSelector(
        (state: RootState) => state.saleOrder
    )
    const { pathname } = useLocation()
    const path = pathname.split('/')[1]
    const isDealerPath = path === 'dealers'
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } =
        saleOrderState
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
                <ATMPageHeading> Sale Orders </ATMPageHeading>
                <ActionAuthHOC
                    moduleName={
                        isDealerPath
                            ? UserModuleNameTypes.dealer
                            : UserModuleNameTypes.saleOrder
                    }
                    actionName={
                        isDealerPath
                            ? UserModuleAddActionTypes.dealerSalesOrderAdd
                            : UserModuleActionTypes.Add
                    }
                    component={
                        <button
                            onClick={() => navigate('add-sale-order')}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + Add Sale Order
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
                <div className="grow overflow-auto">
                    <ATMTable
                        isLoading={isTableLoading}
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="h-full overflow-auto"
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

export default SaleOrderListing
