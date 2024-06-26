/* eslint-disable @typescript-eslint/no-unused-expressions */
// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import AssignedOrderListFilterFormDialogWrapper, {
    FormInitialValuesFilterWithLabel,
} from './assignedOrderFilter/AssignedOrderListFilterFormDialogWrapper'
import { statusProps } from 'src/pages/orders'
import { OrderListResponse } from 'src/models'
import { Chip, Stack } from '@mui/material'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
    setFilter: React.Dispatch<
        React.SetStateAction<FormInitialValuesFilterWithLabel>
    >
    filter: FormInitialValuesFilterWithLabel
}

const WarehouseAssignedOrdersListing = ({
    columns,
    rows,
    setShowDropdown,
    setFilter,
    filter,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)
    const warehouseAssignedOrdersState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        warehouseAssignedOrdersState

    const getBackGroundColorByStatus = (row: OrderListResponse) => {
        if (row?.firstCallState === 'LANGUAGEBARRIER') {
            return 'bg-green-200'
        }
        switch (row?.status) {
            case statusProps.pnd:
                return 'bg-amber-200'
            case statusProps.urgent:
                return 'bg-rose-300'
            default:
        }
    }
    const handleReset = () => {
        setFilter((prev) => ({
            ...prev,
            schemeId: { fieldName: '', value: '', label: '' },
            orderType: { fieldName: '', value: '', label: '' },
            stateId: { fieldName: '', value: '', label: '' },
            districtId: { fieldName: '', value: '', label: '' },
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
            callBackFrom: { fieldName: '', value: '', label: '' },
            callBackTo: { fieldName: '', value: '', label: '' },
            callCenterManagerId: { fieldName: '', value: '', label: '' },
            languageBarrier: { fieldName: '', value: '', label: '' },
            isPnd: { fieldName: '', value: '', label: '' },
        }))
    }

    const filterShow = (filter: FormInitialValuesFilterWithLabel) => {
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
        <div className="px-4 h-[calc(100vh-55px)] bg-white ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Warehouse First Call Orders </ATMPageHeading>
                {/* Legends */}
                <div className="flex p-4 gap-x-3 ">
                    <span>language Barrier</span>
                    <span className=" rounded h-[20px] w-[20px] bg-green-200"></span>

                    <span>PND</span>
                    <span className=" rounded h-[20px] w-[20px] bg-amber-300"></span>

                    <span>Urgent</span>
                    <span className=" rounded h-[20px] w-[20px] bg-rose-300"></span>
                </div>
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
                    <AssignedOrderListFilterFormDialogWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                        setFilter={setFilter}
                        filter={filter}
                    />
                )}

                {/* Table */}
                <div className="grow overflow-auto h-full ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        rowClassName="px-2  py-2"
                        setShowDropdown={setShowDropdown}
                        // extraClasses="h-full overflow-auto"
                        isLoading={isTableLoading}
                        rowExtraClasses={(row: OrderListResponse) => {
                            return getBackGroundColorByStatus(row)
                        }}
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

export default WarehouseAssignedOrdersListing
