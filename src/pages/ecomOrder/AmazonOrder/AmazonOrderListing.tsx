// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMExportButton from 'src/components/UI/atoms/ATMExportButton/ATMExportButton'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { showToast } from 'src/utils'

// |-- Redux --|
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useAddAmzoneOrderSheetMutation, useUpdateEcomOrderSheetMutation } from 'src/services/EcomOrdersMasterService'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

type Props = {
    columns: columnTypes[]
    rows: any[]
}

const AmazonOrderListing = ({ columns, rows }: Props) => {

    // Hooks
    const dispatch = useDispatch<AppDispatch>()

    const amazonOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } = amazonOrderState

    // Sheet Upload API
    const [addAmazonOrderSheet] = useAddAmzoneOrderSheetMutation()
    // Update Order Status API 
    const [updateStatusOrder] = useUpdateEcomOrderSheetMutation()

    const fileInputUploadSheetRef = React.useRef<HTMLInputElement>(null)
    const fileInputUpdateStatusSheetRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files[0]) {
            const file = files[0]

            // Create a new FormData instance
            const formData = new FormData()
            // Append the file
            formData.append('file', file)

            addAmazonOrderSheet(formData)
                .then((res: any) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'imported successfully')
                        } else {
                            showToast('error', res?.data?.message)
                        }
                    } else {
                        showToast('error', res?.error?.data?.message)
                    }
                })
                .catch((err: any) => {
                    console.error('err', err?.error);
                })
        }
    }

    const handleUpdateStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files[0]) {
            const file = files[0]

            // Create a new FormData instance
            const formData = new FormData()
            // Append the file
            formData.append('file', file)

            updateStatusOrder(formData)
                .then((res: any) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'Updated successfully')
                        } else {
                            showToast('error', res?.data?.message)
                        }
                    } else {
                        showToast('error', res?.error?.data?.message)
                    }
                })
                .catch((err: any) => {
                    console.error('err', err?.error);
                })
        }
    }

    return (
        <div className="px-4 h-[calc(100vh-150px)]">

            <div className='flex justify-between'>
                <div className="flex justify-between items-center h-[45px]">
                    <ATMPageHeading>Amazon Orders</ATMPageHeading>
                </div>

                {/* For Upload File */}
                <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    ref={fileInputUploadSheetRef}
                    className="hidden"
                    onChange={handleFileChange} // Assuming addExcelFile can handle the file input change event
                />

                {/* For Update Status */}
                <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    ref={fileInputUpdateStatusSheetRef}
                    className="hidden"
                    onChange={handleUpdateStatus} // Assuming addExcelFile can handle the file input change event
                />

                <div className="flex justify-between gap-x-2 items-center h-[45px]">
                    {isAuthorized(
                        UserModuleNameTypes.ACTION_AMAZON_ORDER_IMPORT_SHEET_BUTTON
                    ) && (
                            < ATMExportButton
                                isLoading={false}
                                headers={[]}
                                fileName=""
                                btnName="Import"
                                btnType='UPLOAD'
                                loadingText="..."
                                className='py-2 mt-[5px] h-[36px]'
                                // disabled={!selectedCourier ? true : false}
                                onImport={() => {
                                    fileInputUploadSheetRef?.current?.click()
                                }}
                            />
                        )}

                    {isAuthorized(
                        UserModuleNameTypes.ACTION_AMAZON_ORDER_UPDATE_ORDER_SHEET_BUTTON
                    ) && (
                            <ATMExportButton
                                isLoading={false}
                                headers={[]}
                                fileName=""
                                btnName="Update Status"
                                btnType='UPLOAD'
                                loadingText="..."
                                className='py-2 mt-[5px] h-[36px]'
                                // disabled={!selectedCourier ? true : false}
                                onImport={() => {
                                    fileInputUpdateStatusSheetRef?.current?.click()
                                }}
                            />
                        )}
                </div>
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    isRefresh
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) =>
                        dispatch(setSearchValue(newValue))
                    }
                />

                {/* Table */}
                <div className="overflow-auto grow">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        isLoading={isTableLoading}
                    />
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

export default AmazonOrderListing
