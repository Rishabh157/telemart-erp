// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { useNavigate, useParams } from 'react-router-dom'

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
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { showToast } from 'src/utils'
import { useAddCourierReturnExcelSheetMutation } from 'src/services/CourierReturnService'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const CourierReturnabsListingTabs = ({ columns, rows }: Props) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { id: warehouseId } = useParams()

    const [addCourierReturnExcelSheet] = useAddCourierReturnExcelSheetMutation()
    const inwardRequestState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])
    const { page, rowsPerPage, isTableLoading, searchValue } =
        inwardRequestState

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files[0]) {
            const file = files[0]
            // Create a new FormData instance
            const formData = new FormData()
            // Append the file
            formData.append('file', file)
            addCourierReturnExcelSheet({ warehouseId, body: formData })
                .then((res: any) => {
                    if ('data' in res) {
                        showToast('success', 'added successfully')
                    }
                })
                .catch((err: any) => {
                    console.error('error', err)
                })
        }
    }

    return (
        // <div className="px-4 h-full flex flex-col gap-2 w-full">
        <div className=" h-[calc(100vh-200px)]  bg-white ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Courier Return </ATMPageHeading>

                <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange} // Assuming addExcelFile can handle the file input change event
                />

                <div className="flex gap-x-4">
                    {isAuthorized(
                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_BULK_UPLOAD
                    ) && (
                        <button
                            onClick={() => fileInputRef?.current?.click()}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + Bulk Upload
                        </button>
                    )}

                    {isAuthorized(
                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_ADD
                    ) && (
                        <button
                            onClick={() => navigate('add')}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + Add
                        </button>
                    )}
                </div>
            </div>

            <div className="border flex flex-col h-[calc(100%)] rounded bg-white">
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
                    // isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
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
                        extraClasses="max-h-[calc(100%-150px)] overflow-auto"
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

export default CourierReturnabsListingTabs
