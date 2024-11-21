// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import BatchOrderListingFilterWrapper, {
    BatchFormInitialValuesFilterWithLabel,
} from './BatchOrderListingFilter/BatchOrderListingFilterWrapper'

// |-- Redux --|
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { Chip, Stack } from '@mui/material'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    selectedRows: any[]
    setSelectedRows: (ele: any) => any
    onClick: () => void
    setFilter: React.Dispatch<
        React.SetStateAction<BatchFormInitialValuesFilterWithLabel>
    >
    filter: BatchFormInitialValuesFilterWithLabel
}

const CreateBatchOrderListing = ({
    columns,
    rows,
    selectedRows,
    setSelectedRows,
    onClick,
    setFilter,
    filter,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)
    const createBatchState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } = createBatchState
    const handleReset = () => {
        setFilter((prev) => ({
            ...prev,
            isUrgentOrder: { fieldName: '', value: '', label: '' },
            schemeId: { fieldName: '', value: '', label: '' },
            orderStatus: { fieldName: '', value: '', label: '' },
            districtId: { fieldName: '', value: '', label: '' },
            tehsilId: { fieldName: '', value: '', label: '' },
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
            callBackFrom: { fieldName: '', value: '', label: '' },
            callBackTo: { fieldName: '', value: '', label: '' },
            callCenterManagerId: { fieldName: '', value: '', label: '' },
        }))
    }

    const filterShow = (filter: BatchFormInitialValuesFilterWithLabel) => {
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
        <div className="px-4 h-[calc(100vh-150px)]">
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Create Batches </ATMPageHeading>
                {isAuthorized(
                    UserModuleNameTypes.ACTION_BATCH_ORDER_CREATE_BATCH_CREATE_BATCH
                ) && (
                    <ATMLoadingButton
                        disabled={!selectedRows.length}
                        loadingText="Saving..."
                        onClick={onClick}
                        className="bg-primary-main text-white flex items-center py-1 px-2 rounded w-60"
                    >
                        Create Selected Order Batch
                    </ATMLoadingButton>
                )}
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
                <ATMTableHeader
                    searchValue={searchValue}
                    placeholder="Order No..."
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
                    <BatchOrderListingFilterWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                        setFilter={setFilter}
                        filter={filter}
                    />
                )}

                <div className="grow overflow-auto">
                    <ATMTable
                        isCheckbox
                        extraClasses="w-[200%]"
                        columns={columns}
                        rows={rows}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        isLoading={isTableLoading}
                    />
                </div>

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

export default CreateBatchOrderListing
