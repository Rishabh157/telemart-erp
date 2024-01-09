/// ==============================================
// Filename:UsersListing.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/NewUserSlice'
import AuthenticationHOC from 'src/AuthenticationHOC'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'
import UserListFilterFormDialogWrapper from './UserFilter/UserListFilterFormDialogWrapper'

// |-- Types --|
export type Props = {
    columns: any[]
    rows: any[] | []
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const UsersListing = ({ columns, rows, setShowDropdown }: Props) => {
    const newUserState: any = useSelector((state: RootState) => state.newUser)

    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        newUserState

    const dispatch = useDispatch<AppDispatch>()

    // Hooks
    const navigate = useNavigate()

    // States
    const [selectedRows, setSelectedRows] = useState([])
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)

    return (
        <div className="px-4 h-[calc(100vh-55px)]">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Users </ATMPageHeading>
                <AuthenticationHOC
                    moduleName={UserModuleNameTypes.user}
                    actionName={UserModuleActionTypes.Add}
                    component={
                        <button
                            onClick={() => navigate('add-user')}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            {' '}
                            + Add User{' '}
                        </button>
                    }
                />
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    searchValue={searchValue}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => {
                        dispatch(setSearchValue(newValue))
                    }}
                    isFilter
                    onFilterClick={() => {
                        setIsOpenFilterFormDialog(true)
                    }}
                />

                {isOpenFilterFormDialog && (
                    <UserListFilterFormDialogWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                    />
                )}

                {/* Table */}
                <div className="grow overflow-auto">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="h-full overflow-auto"
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
        </div>
    )
}

export default UsersListing
