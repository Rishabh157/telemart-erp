// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import ATMExportButton from 'src/components/UI/atoms/ATMExportButton/ATMExportButton'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { showToast } from 'src/utils'

// |-- Redux --|
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useAddFlipkartOrderSheetMutation, useUpdateEcomOrderSheetMutation } from 'src/services/EcomOrdersMasterService'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

type Props = {
    columns: columnTypes[]
    rows: any[]
}

const orderDataFields = [
    "order_item_id", 
    "order_id", 
    "fulfilment_source", 
    "fulfilment_type", 
    "order_date", 
    "order_approval_date", 
    "order_item_status", 
    "sku", 
    "fsn", 
    "label", 
    "productCode", 
    "product_title", 
    "quantity", 
    "pickup_logistics_partner", 
    "itemPrice", 
    "delivery_tracking_id", 
    "forward_logistics_form", 
    "forward_logistics_form_no", 
    "order_cancellation_date", 
    "cancellation_reason", 
    "cancellation_sub_reason", 
    "order_return_approval_date", 
    "return_id", 
    "return_reason", 
    "return_sub_reason", 
    "procurement_dispatch_sla", 
    "dispatch_after_date", 
    "dispatch_by_date", 
    "order_ready_for_dispatch_on_date", 
    "dispatched_date", 
    "dispatch_sla_breached", 
    "seller_pickup_reattempts", 
    "delivery_sla", 
    "deliver_by_date", 
    "order_delivery_date", 
    "delivery_sla_breached", 
    "order_service_completion_date", 
    "service_by_date", 
    "service_completion_sla", 
    "service_sla_breached"
  ];
  

const FlipkartOrderListing = ({ columns, rows }: Props) => {

    // Hooks
    const dispatch = useDispatch<AppDispatch>()

    const amazonOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } = amazonOrderState

    // Sheet Upload API
    const [addFlipkartOrderShhet] = useAddFlipkartOrderSheetMutation()
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
            // formData.append('courierCode', selectedCourier)

            addFlipkartOrderShhet(formData)
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
                    <ATMPageHeading>Flipkart Orders</ATMPageHeading>
                </div>

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
                        UserModuleNameTypes.ACTION_FLIPKART_ORDER_IMPORT_SHEET_BUTTON
                    ) && (
                        <>
                            <ATMExportButton
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
                            <ATMExportButton
                                isLoading={false}
                                headers={orderDataFields}
                                fileName=""
                                btnName="Import sample"
                                btnType='UPLOAD'
                                loadingText="..."
                                className='py-2 mt-[5px] h-[36px]'
                               onClick={(done)=>done()}
                            />
                            </>
                        )}

                    {isAuthorized(
                        UserModuleNameTypes.ACTION_FLIPKART_ORDER_UPDATE_ORDER_SHEET_BUTTON
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

export default FlipkartOrderListing
