/// ==============================================
// Filename:DidManagementListing.tsx
// Type: List Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ActionAuthHOC from 'src/ActionAuthHoc'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/media/didManagementSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |--Types--|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const DidManagementListing = ({ columns, rows, setShowDropdown }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const didManagementState: any = useSelector(
        (state: RootState) => state.didManagement
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, isTableLoading } = didManagementState
    const navigate = useNavigate()
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Media',
            path: '/dashboard',
        },
        {
            label: 'Did',
        },
    ]

    return (
        <div className="px-4 h-full pt-3 ">
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> DID Management </ATMPageHeading>
                <ActionAuthHOC
                    moduleName={UserModuleNameTypes.didManagement}
                    actionName={UserModuleActionTypes.Add}
                    Component={
                        <button
                            type="button"
                            onClick={() => navigate('add')}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + Add DID
                        </button>
                    }
                />
            </div>

            <div className="border flex flex-col h-[calc(100%-85px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onSearch={(value) => dispatch(setSearchValue(value))}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    isFilter
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
                        extraClasses="h-full overflow-auto"
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

export default DidManagementListing
