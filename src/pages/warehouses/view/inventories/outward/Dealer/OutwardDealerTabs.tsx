// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { Chip, Stack } from '@mui/material'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import OutwardGpoOrderFilterFormWrapper from '../GpoOrders/Filters/OutwardGpoOrderFilterFormWrapper'

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

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    filter: FormInitialValuesFilterWithLabel
    setFilter: React.Dispatch<React.SetStateAction<FormInitialValuesFilterWithLabel>>
}

const OutwardDealerTabs = ({ columns, rows, filter, setFilter }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const outwardRequestState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] = useState({
        isFilterOpen: false,
        isMenifest: false,
    })
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, isTableLoading ,totalItems} = outwardRequestState



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

 

    useEffect(() => {
        return () => {
            setIsOpenFilterFormDialog({
                isFilterOpen: false,
                isMenifest: false,
            })
        }
    }, [])

    return (
        // <div className="px-4 h-full flex flex-col gap-2 w-full">
        <div className=" h-[calc(100vh-160px)]  bg-white ">
            <div className="border flex flex-col h-[calc(100%)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    isFilter
                    onFilterClick={() => {
                        setIsOpenFilterFormDialog((prev) => ({
                            ...prev,
                            isFilterOpen: true,
                        }))
                        // setIsRedirect(false)
                    }}
                    isFilterRemover
                    onFilterRemoverClick={handleReset}
                    filterShow={filterShow(filter)}
                // isFilter
                // onFilterClick={() => setIsFilterOpen(true)}
                />

                <OutwardGpoOrderFilterFormWrapper
                    open={isOpenFilterFormDialog}
                    filter={filter}
                    setFilter={setFilter}
                    onClose={() => {
                        setIsOpenFilterFormDialog((prev) => ({
                            ...prev,
                            isFilterOpen: false,
                        }))
                     
                    }}
                />

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}

                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="overflow-auto"
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

export default OutwardDealerTabs
