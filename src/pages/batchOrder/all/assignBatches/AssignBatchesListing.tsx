// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { MdOutlineAssignmentReturn } from 'react-icons/md'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import { BatchesListResponseTypes } from 'src/models/Batches.model'

// |-- Redux --|
import {
    setFilterValue,
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/CreateBatchOrderSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    columns?: any[]
    rows: any[]
}

const AssignBatchesListing = ({ columns, rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const createBatchState: any = useSelector(
        (state: RootState) => state.createBatch
    )
    const navigate = useNavigate()

    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        isTableLoading,
        totalItems,
    } = createBatchState

    return (
        <div className="px-4 h-[calc(100vh-110px)]">
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Batches </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
                <ATMTableHeader
                    searchValue={searchValue}
                    placeholder="Batch No..."
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
                    // isFilter
                    // isRefresh
                    onFilterDispatch={() => dispatch(setFilterValue([]))}
                />

                {/* Table */}
                <div className="h-[calc(100%-110px)] overflow-auto ">
                    {!isTableLoading ? (
                        <div className="grid grid-cols-3 gap-4 p-4">
                            {items?.map(
                                (
                                    batch: BatchesListResponseTypes,
                                    ind: number
                                ) => (
                                    <div
                                        key={ind}
                                        className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 group`}
                                        onClick={() => {}}
                                    >
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="text-[12px] text-slate-500">
                                                    Batch No.
                                                </div>
                                                <div>{batch?.batchNumber}</div>
                                            </div>
                                            <div className="transition-all opacity-0 group-hover:opacity-100 hover:text-slate-500">
                                                <MdOutlineAssignmentReturn
                                                    className="cursor-pointer"
                                                    size={23}
                                                    onClick={() => {
                                                        navigate(
                                                            `${batch?._id}`
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-1">
                                            <div className="text-[12px] text-slate-500">
                                                Number Of Orders In This Batch.
                                            </div>
                                            <div>{batch?.orders?.length}</div>
                                        </div>

                                        <div className="mt-1">
                                            <div className="text-[12px] text-slate-500">
                                                Created By
                                            </div>
                                            <div>
                                                {capitalizeFirstLetter(
                                                    batch?.batchCreatedByLabel ||
                                                        ''
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-[calc(100%-75px)]">
                            <h1 className="text-[23px]">
                                <CircularProgress size={30} />
                            </h1>
                        </div>
                    )}
                </div>

                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={items}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default AssignBatchesListing
