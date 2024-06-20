/// ==============================================
// Filename:ConfigurationCompanyListing.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfigurationCompanyListing = ({
    columns,
    rows,
    setShowDropdown,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const company: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])

    const navigate = useNavigate()

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        company

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Configuration',
            path: '/dashboard',
        },
        {
            label: 'Company',
        },
    ]

    return (
        <div className="px-4 h-full pt-3  ">
            {/* Breadcrumbs */}
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Company </ATMPageHeading>
                {isAuthorized(UserModuleNameTypes.ACTION_COMPANY_ADD) && (
                    <button
                        onClick={() => navigate('/configurations/company/add')}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        {' '}
                        + Add Company{' '}
                    </button>
                )}
            </div>

            <div className="border flex flex-col h-[calc(100%-85px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) => {
                        dispatch(setRowsPerPage(newValue))
                    }}
                    onSearch={(newValue) => {
                        dispatch(setSearchValue(newValue))
                    }}
                    // isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
                />

                {/* Table */}
                <div className="grow overflow-auto h-full ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        
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

export default ConfigurationCompanyListing
