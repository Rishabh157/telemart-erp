/// ==============================================
// Filename:VendorWarehouseListing.tsx
// Type: Tab List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
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
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/VendorWarehouseSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
    AddpathName: string
}

const VendorWarehouseListing = ({
    columns,
    rows,
    setShowDropdown,
    AddpathName,
}: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const vendorWarehouseState: any = useSelector(
        (state: RootState) => state.vendorWarehouse
    )
    // const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        vendorWarehouseState

    const params: any = useParams()

    return (
        <div className="h-full">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Warehouse </ATMPageHeading>
                <ActionAuthHOC
                    moduleName={UserModuleNameTypes.vendor}
                    actionName={UserModuleOtherActionTypes.vendorWarehouseAdd}
                    component={
                        <button
                            onClick={() =>
                                navigate(`${AddpathName}`, {
                                    state: { params },
                                })
                            }
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            {' '}Add
                        </button>
                    }
                />
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
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
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    // isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
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

            {/* {isFilterOpen && (
       <FilterDialogWarpper
       onClose={()=> setIsFilterOpen(false)}
       />
      )} */}
        </div>
    )
}

export default VendorWarehouseListing
