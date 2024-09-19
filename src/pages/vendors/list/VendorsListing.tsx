// |-- Built-in Dependencies --|
import React, { useState } from 'react'

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
import VendorListingFilterWrapper, { VendorListFilterFormValues } from './VendorListingFilter/VendorListingFilterWrapper'
import { Chip, Stack } from '@mui/material'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setFilter: React.Dispatch<React.SetStateAction<VendorListFilterFormValues>>
    filter: VendorListFilterFormValues
}

const VendorsListing = ({
    columns,
    rows,
    setFilter,
    filter,
}: Props) => {
    // state
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        listingPaginationState

    // Filter Reset
    const handleReset = () => {
        setFilter((prev) => ({
            ...prev,
            companyType: { fieldName: '', value: '', label: '' },
            stateId: { fieldName: '', value: '', label: '' },
            districtId: { fieldName: '', value: '', label: '' },
        }))
    }

    // For Showing UI Filter Applied 
    const filterShow = (filter: VendorListFilterFormValues) => {
        return (
            <span className="capitalize">
                <Stack direction="row" spacing={1}>
                    {Object.entries(filter).map(([key, value], index) => {
                        return value.value ? (
                            <Chip
                                key={index}
                                label={`${value.fieldName}: ${value.label}`}
                                color="primary"
                                variant="outlined"
                                size="small"
                            />
                        ) : null
                    })}
                </Stack>
            </span>
        )
    }

    return (
        <div className="px-4 h-[calc(100vh-45px)]">
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
                    isFilter
                    onFilterClick={() => {
                        setIsOpenFilterFormDialog(true)
                    }}
                    isFilterRemover
                    onFilterRemoverClick={handleReset}
                    filterShow={filterShow(filter)}
                />

                {isOpenFilterFormDialog && (
                    <VendorListingFilterWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                        setFilter={setFilter}
                        filter={filter}
                    />
                )}

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
