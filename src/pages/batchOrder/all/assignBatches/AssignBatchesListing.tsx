// |-- Built-in Dependencies --|
import { CircularProgress } from '@mui/material'
import React from 'react'
import { HiDotsVertical } from 'react-icons/hi'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
// import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'

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
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
    selectedRows: any[]
    apiStatus: boolean
    setSelectedRows: (ele: any) => any
    handleSubmit: () => void
}

const AssignBatchesListing = ({
    columns,
    rows,
    setShowDropdown,
    selectedRows,
    setSelectedRows,
    apiStatus,
    handleSubmit,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const createBatchState: any = useSelector(
        (state: RootState) => state.createBatch
    )

    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        isTableLoading,
        totalItems,
    } = createBatchState

    return (
        <div className="px-4 h-[calc(100vh-150px)]">
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Assign Batches </ATMPageHeading>
                {/* {isAuthorized(UserModuleNameTypes.ACTION_HOUSE_ARREST_ADD) && ( */}
                <ATMLoadingButton
                    disabled={!selectedRows.length}
                    isLoading={apiStatus}
                    loadingText="Saving..."
                    onClick={() => {
                        handleSubmit()
                    }}
                    className="bg-primary-main text-white flex items-center py-1 px-4 rounded w-20"
                >
                    Save
                </ATMLoadingButton>
                {/* )} */}
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
                <div className="h-[calc(100%-75px)]">
                    {!isTableLoading ? (
                        <div className="grid grid-cols-3 gap-4 overflow-auto p-4  ">
                            {items?.map((batch: any, ind: number) => (
                                <div
                                    key={ind}
                                    className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer`}
                                    onClick={() => {}}
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="text-[12px] text-slate-500">
                                                Batch No.
                                            </div>
                                            <div>{batch?.batchNumber}</div>
                                        </div>
                                        <div>
                                            <HiDotsVertical
                                                onClick={() => {
                                                    // setIsFlowDialogShow(
                                                    //     true
                                                    // )
                                                    // setSelectedFlowItem(
                                                    //     batch?.data
                                                    // )
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
                                                batch?.batchCreatedByLabel || ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-[calc(100%-75px)]">
                            <h1 className="text-[23px]">
                                <CircularProgress size={30} />
                            </h1>
                        </div>
                    )}
                </div>

                {/* <div className="grow overflow-auto">
                    <ATMTable
                        isCheckbox
                        extraClasses="w-[200%]"
                        columns={columns}
                        rows={items}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        isLoading={isTableLoading}
                    />
                </div> */}

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
