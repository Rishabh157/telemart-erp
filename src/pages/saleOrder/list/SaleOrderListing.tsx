import React, { useState } from 'react'

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
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import SalesOrderFilterWrapper, {
    SalesOrderFormInitialValuesFilterWithLabel,
} from './filter/SalesOrderFilterWrapper'
import { Chip, Stack } from '@mui/material'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
    setFilter: React.Dispatch<
        React.SetStateAction<SalesOrderFormInitialValuesFilterWithLabel>
    >
    filter: SalesOrderFormInitialValuesFilterWithLabel
}

const SaleOrderListing = ({
    columns,
    rows,
    setShowDropdown,
    filter,
    setFilter,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const saleOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { pathname } = useLocation()
    const path = pathname.split('/')[1]
    const isDealerPath = path === 'dealers'
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } =
        saleOrderState
    const handleReset = () => {
        setFilter((prev) => ({
            ...prev,
            dealerId: { fieldName: '', value: '', label: '' },
            status: { fieldName: '', value: '', label: '' },
            invoiceNumber: { fieldName: '', value: '', label: '' },
            IRNStatus: { fieldName: '', value: '', label: '' },
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
        }))
    }

    const filterShow = (filter: SalesOrderFormInitialValuesFilterWithLabel) => {
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
        <div className="px-4 h-[calc(100vh-55px)]">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Sale Orders </ATMPageHeading>
                {isAuthorized(
                    isDealerPath
                        ? UserModuleNameTypes.ACTION_DEALER_DEALER_SALE_ORDER_ADD
                        : UserModuleNameTypes.ACTION_SALE_ORDER_ADD
                ) && (
                    <button
                        onClick={() => navigate('add-sale-order')}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Add Sale Order
                    </button>
                )}
            </div>

            <div className="border flex flex-col  rounded bg-white h-[calc(100%-75px)]">
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
                    isFilter
                    onFilterClick={() => setIsOpenFilterFormDialog(true)}
                    isFilterRemover
                    onFilterRemoverClick={handleReset}
                    filterShow={filterShow(filter)}
                />
                {isOpenFilterFormDialog && (
                    <SalesOrderFilterWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                        setFilter={setFilter}
                        filter={filter}
                    />
                )}
                {/* Table */}
                <div className="grow overflow-auto">
                    <ATMTable
                        isLoading={isTableLoading}
                        columns={columns}
                        rows={rows}
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

export default SaleOrderListing
