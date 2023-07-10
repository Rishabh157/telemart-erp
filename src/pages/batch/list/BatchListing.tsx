/// ==============================================
// Filename:BatchListing.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
//import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { useAddBatchMutation } from 'src/services/BatchService'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/BatchSlice'
import { AppDispatch, RootState } from 'src/redux/store'


// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    //setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const BatchListing = ({ columns, rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [selectedRows, setSelectedRows] = useState([])
    //const [showDropdown, setShowDropdown] = useState(false)
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addBatch] = useAddBatchMutation()

    const batchState: any = useSelector((state: RootState) => state.batch)

    const { page, rowsPerPage, searchValue, isTableLoading } = batchState

    const submit = () => {
        setApiStatus(false)
        setTimeout(() => {
            addBatch({}).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Batch added successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    return (
        <div className="px-4 h-[calc(100vh-55px)] ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Batch</ATMPageHeading>
                <button
                    onClick={() =>
                        showConfirmationDialog({
                            title: 'Add Batch ',
                            text: 'Do you want to Add Batch ?',
                            showCancelButton: true,
                            next: (res: any) => {
                                return res.isConfirmed ? submit() : null
                            },
                        })
                    }
                    className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                        apiStatus ? 'opacity-50' : ''
                    }`}
                    disabled={apiStatus}
                >
                    {' '}
                    Add Batch{' '}
                </button>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={rows.length}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                   // isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
                />

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        isLoading={isTableLoading}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        // setShowDropdown={setShowDropdown}
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

export default BatchListing
