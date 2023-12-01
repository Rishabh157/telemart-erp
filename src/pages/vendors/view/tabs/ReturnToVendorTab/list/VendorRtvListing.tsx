/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:VendorRtvListing.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/returnToVendorSlice'
import { AppDispatch, RootState } from 'src/redux/store'
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const VendorRtvListing = ({ columns, rows }: Props) => {
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const dispatch = useDispatch<AppDispatch>()
    const saleOrderState: any = useSelector(
        (state: RootState) => state.returnToVendor
    )
    const { pathname } = useLocation()
    const path = pathname.split('/')[1]
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
            {/* <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Return To Vendor </ATMPageHeading>
                <AuthenticationHOC
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
                            onClick={() => navigate('/return-to-vendor/add')}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + Add Retrun To Vendor
                        </button>
                    }
                />
            </div> */}

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

export default VendorRtvListing
