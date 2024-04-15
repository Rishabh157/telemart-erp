// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const VendorsListing = ({ columns, rows }: Props) => {
    // state
    const dispatch = useDispatch<AppDispatch>()
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        listingPaginationState

    const navigate = useNavigate()

    return (
        <div className="px-4 h-[calc(100vh-55px)]">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Vendors </ATMPageHeading>
                {isAuthorized(UserModuleNameTypes.ACTION_VENDOR_ADD) && (
                    <button
                        onClick={() => {
                            navigate('add-vendor')
                        }}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        {' '}
                        + Add Vendor{' '}
                    </button>
                )}
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
                />

                {/* Table */}
                <div className={`grow overflow-auto `}>
                    <ATMTable
                        isLoading={isTableLoading}
                        columns={columns}
                        rows={rows}
                    />
                </div>

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        onRowsPerPageChange={(newValue) => alert(newValue)}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default VendorsListing
