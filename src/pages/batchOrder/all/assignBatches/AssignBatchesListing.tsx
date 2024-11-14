// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { CgDetailsMore } from "react-icons/cg";

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
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import moment from 'moment'

// |-- Types --|
type Props = {
    columns?: any[]
    rows: any[]
}

interface InfoCardPropTypes {
    batchNumber: number
    bucketOders: number
    batchCreatedBy: string
    createdAt: string
    onClick: () => void
}

function BatchInfoCard({ batchNumber, bucketOders, batchCreatedBy, createdAt, onClick }: InfoCardPropTypes) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md border-[1px] border-gray-500 ">

            <div className="text-xs text-gray-500 mb-4 flex items-center gap-x-4 ">
                Batch Number : <span className="text-xl text-black font-semibold">{batchNumber}</span>
            </div>

            <div className="text-xs text-gray-500 mb-4 flex items-center gap-x-4 ">
                Created By : <span className="px-3 py-1 bg-gray-200 text-black font-semibold rounded-full text-xs">{batchCreatedBy}</span>
            </div>

            <div className="text-xs text-gray-500 mb-4 flex items-center gap-x-4 ">
                Orders Buckets : <span className="px-3 py-1 bg-gray-200 text-black font-semibold rounded-full text-xs">{bucketOders}</span>
            </div>


            <div className="text-xs text-gray-500 mb-4 flex gap-x-4">
                Create Date :
                <div className="py-0">
                    <div className="text-xs text-slate-700 font-medium">
                        {moment(createdAt).format('DD MMM YYYY')}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                        {moment(createdAt).format('hh:mm A')}
                    </div>
                </div>
            </div>

            <button onClick={onClick} className="w-full py-2 flex justify-center items-center gap-x-1 text-white bg-primary-main hover:bg-primary-hover rounded-md focus:outline-none">
                <span className="mr-2"><CgDetailsMore /></span> View
            </button>
        </div>
    );
}

const AssignBatchesListing = ({ columns, rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const createBatchState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const navigate = useNavigate()

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } =
        createBatchState

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
                        <div className="grid grid-cols-4 gap-4 p-4">
                            {rows?.map((batch: BatchesListResponseTypes) =>
                                <BatchInfoCard
                                    key={batch?._id}
                                    batchNumber={batch?.batchNumber}
                                    bucketOders={batch?.orders?.length}
                                    batchCreatedBy={capitalizeFirstLetter(batch?.batchCreatedByLabel)}
                                    createdAt={batch?.createdAt}
                                    onClick={() => navigate(`${batch?._id}`)}
                                />
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
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default AssignBatchesListing
