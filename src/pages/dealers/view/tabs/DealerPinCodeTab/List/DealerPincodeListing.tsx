/// ==============================================
// Filename:ListDealerPincodeTabWrapper.tsx
// Type: Tab List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { useUploadDealerPincodeMutation } from 'src/services/FilePickerServices'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const DealerPincodeListing = ({ columns, rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const params = useParams()
    const dealerId: any = params.dealerId
    const pincodeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData }: any = useSelector((state: RootState) => state.auth)
    // const {userData}
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        pincodeState
    const [uploadDealerPincode] = useUploadDealerPincodeMutation()
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files[0]) {
            const file = files[0]
            // Create a new FormData instance
            const formData = new FormData()
            // Append the file
            formData.append('data', file)
            uploadDealerPincode({ userId: userData?.userId, body: formData })
                .then((res: any) => {
                    if ('data' in res) {
                        showToast('success', 'Import successfully')
                    }
                })
                .catch((err: any) => {
                    console.error('error', err)
                })
        }
    }
    return (
        <div className="px-4 h-[calc(100vh-195px)] ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Pincode</ATMPageHeading>
                <div className='gap-1 flex'>
                <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange} // Assuming addExcelFile can handle the file input change event
                />
                   {isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_DEALER_PINCODE_BULK_UPLOAD
                    ) && (
                        <button
                            onClick={() => fileInputRef?.current?.click()}
                            className="bg-primary-main text-white rounded py-1 px-3"
                        >
                            + Bulk Upload
                        </button>
                    )}
                {isAuthorized(
                    UserModuleNameTypes.ACTION_DEALER_DEALER_PINCODE_ADD
                ) && (
                    <button
                        onClick={() =>
                            navigate('/dealers/' + dealerId + '/pincode/add')
                        }
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        {' '}
                        + Add Pincode{' '}
                    </button>
                )}
                </div>
            </div>

            <div className="border flex flex-col h-[calc(100%-35px)] rounded bg-white">
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
                    isFilter
                    // onFilterClick={() => setIsFilterOpen(true)}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
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
                        extraClasses="h-full overflow-auto"
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

export default DealerPincodeListing
