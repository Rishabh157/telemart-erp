// |-- Built-in Dependencies --|
import { Chip, Stack } from '@mui/material'
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
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
import OutwardGpoOrderFilterFormWrapper from './Filters/OutwardGpoOrderFilterFormWrapper'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    setFilter: React.Dispatch<
        React.SetStateAction<FormInitialValuesFilterWithLabel>
    >
    filter: FormInitialValuesFilterWithLabel
}

type LabelValuePair = {
    fieldName: string
    label: string
    value: any
}

// Define the type for FormInitialValuesFilter
type FormInitialValuesFilterWithLabel = {
    orderStatus: LabelValuePair
    startDate: LabelValuePair
    endDate: LabelValuePair
    startTime: LabelValuePair
    endTime: LabelValuePair
}

const OutwardGpoOrdersTabListing = ({
    columns,
    rows,
    setFilter,
    filter,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)
    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, isTableLoading, searchValue } =
        outwardCustomerState

    const handleReset = () => {
        setFilter((prev) => ({
            ...prev,
            startDate: { fieldName: '', value: '', label: '' },
            endDate: { fieldName: '', value: '', label: '' },
            startTime: { fieldName: '', value: '', label: '' },
            endTime: { fieldName: '', value: '', label: '' },
            orderStatus: { fieldName: '', value: '', label: '' },
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
        <div className="h-[calc(100vh-350px)] bg-white">
            <div className="flex flex-col h-[calc(100%)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    rowCount={rows.length}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    searchValue={searchValue}
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
                    <OutwardGpoOrderFilterFormWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                        filter={filter}
                        setFilter={setFilter}
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
                        extraClasses="max-h-[calc(100%-10px)] overflow-auto"
                        isLoading={isTableLoading}
                    />
                </div>

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={rows.length}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default OutwardGpoOrdersTabListing
