/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:OutwardWarehouseTransferListing.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'


// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'


// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/warehouseTransferSlice'
import { AppDispatch, RootState } from 'src/redux/store'
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const OutwardWarehouseTransferListing = ({
    columns,
    rows,
    setShowDropdown,
}: Props) => {
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const dispatch = useDispatch<AppDispatch>()
    const WarehouseTransferState: any = useSelector(
        (state: RootState) => state.warehouseTransfer
    )
    // const { pathname } = useLocation()
    // const path = pathname.split('/')[1]
    // const isDealerPath = path === 'dealers'
    // const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } =
        WarehouseTransferState
    useEffect(() => {
        return () => {
            dispatch(setSearchValue(''))
        }
    }, [])
    return (
        <div
            className={`px-4 
             h-[calc(100vh-55px)]
            `}
        >
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Warehouse Transfer </ATMPageHeading>
                {/* <ActionAuthHOC
                    moduleName={
                        isDealerPath
                            ? UserModuleNameTypes.dealer
                            : UserModuleNameTypes.WarehouseTransfer
                    }
                    actionName={
                        isDealerPath
                            ? UserModuleAddActionTypes.dealerSalesOrderAdd
                            : UserModuleActionTypes.Add
                    }
                    component={
                        <button
                            onClick={() => navigate('add')}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + warehouse-transfer
                        </button>
                    }
                /> */}
            </div>

            <div
                className={` border flex flex-col  rounded bg-white h-[calc(100%-75px)] `}
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

export default OutwardWarehouseTransferListing
