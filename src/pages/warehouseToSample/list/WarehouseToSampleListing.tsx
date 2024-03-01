/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:WarehouseToSampleListing.tsx
// Type: List Component
// Last Updated: OCTOBER 12, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/warehouseTransferSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const WarehouseToSampleListing = ({
    columns,
    rows,
    setShowDropdown,
}: Props) => {
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const dispatch = useDispatch<AppDispatch>()
    const WarehouseTransferState: any = useSelector(
        (state: RootState) => state.warehouseTransfer
    )
    const { pathname } = useLocation()
    const path = pathname.split('/')[1]
    const navigate = useNavigate()
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
            className={`px-4 ${path === 'dealers'
                    ? 'h-[calc(100vh-185px)]'
                    : 'h-[calc(100vh-55px)]'
                }`}
        >
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Warehouse To Sample Transfer </ATMPageHeading>
                {isAuthorized(UserModuleNameTypes.ACTION_WAREHOUSE_TO_SAMPLE_ADD) &&
                    <button
                        onClick={() => navigate('/warehouse-to-sample/add')}
                        className="bg-primary-main text-white round ed py-1 px-3"
                    >
                        + Add Sample
                    </button>
                }
            </div>

            <div
                className={` border flex flex-col  rounded bg-white ${path === 'dealers'
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

export default WarehouseToSampleListing
