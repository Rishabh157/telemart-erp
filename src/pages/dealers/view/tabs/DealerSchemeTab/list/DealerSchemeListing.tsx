/// ==============================================
// Filename:DealerSchemeListing.tsx
// Type: List Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import ATMExportButton from 'src/components/UI/atoms/ATMExportButton/ATMExportButton'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'

// |-- Redux --|
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useUploadDealerSchemeMutation } from 'src/services/FilePickerServices'
import { showToast } from 'src/utils'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const DealerSchemeListing = ({ columns, rows }: Props) => {
    const params = useParams()
    const dealerId: any = params.dealerId
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch<AppDispatch>()
    const schemeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [uploadDealerPincode] = useUploadDealerSchemeMutation()
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
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        schemeState

    return (
        <div className="px-4 h-[calc(100vh-195px)] ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Schemes</ATMPageHeading>

                <div className='gap-1 flex'>
                    <input
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange} // Assuming addExcelFile can handle the file input change event
                    />

                    <ATMExportButton
                        isLoading={false}
                        headers={['DEALERCODE', 'PINCODE', 'SCHEMECODE']}
                        fileName="schemespincodes"
                        btnName="Sample Scheme"
                        btnType="DOWNLOAD"
                        loadingText="..."
                        className="py-3 h-[36px]"
                        onClick={(done) => done()}
                    />

                    {isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_DEALER_SCHEME_BULK_UPLOAD
                    ) && (
                            <button
                                onClick={() => fileInputRef?.current?.click()}
                                className="bg-primary-main text-white rounded py-1 px-3"
                            >
                                + Bulk Upload
                            </button>
                        )}
                    {isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_DEALER_SCHEME_ADD
                    ) && (
                            <button
                                onClick={() =>
                                    navigate('/dealers/' + dealerId + '/scheme/add')
                                }
                                className="bg-primary-main text-white rounded py-1 px-3"
                            >
                                {' '}
                                + Add Scheme{' '}
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
                    // isFilter
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

export default DealerSchemeListing
