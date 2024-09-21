// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setPage,
    setRowsPerPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { useAddGpoAwbExcelSheetMutation } from 'src/services/GpoAwbServices'

// |-- Redux --|
import ATMExportButton from 'src/components/UI/atoms/ATMExportButton/ATMExportButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetAwbCouriersQuery } from 'src/services/CourierMasterService'
import { showToast } from 'src/utils'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Configuration',
        path: '/dashboard',
    },
    {
        label: 'AWB Master',
    },
]

const GpoAwbListing = ({
    columns,
    rows,
}: // addExcelFile,
Props) => {
    const [selectedCourier, setSelectedCourier] = React.useState<string>('')

    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useDispatch<AppDispatch>()
    const [addGpoAwbSheet] = useAddGpoAwbExcelSheetMutation()

    const TransportState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        TransportState

    const { options: courierAwbOptions } = useCustomOptions({
        useEndPointHook: useGetAwbCouriersQuery(''),
        keyName: 'courierName',
        value: 'courierCode',
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files[0]) {
            const file = files[0]

            // Create a new FormData instance
            const formData = new FormData()
            // Append the file
            formData.append('file', file)
            formData.append('courierCode', selectedCourier)

            addGpoAwbSheet(formData)
                .then((res: any) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'added successfully')
                        } else {
                            showToast('error', res?.data?.message)
                        }
                    } else {
                        showToast('error', res?.error?.data?.message)
                    }
                })
                .catch((err: any) => {
                    console.error('err', err?.error)
                })
        }
    }

    const headers = ['awbNumber', 'orderNumber']

    return (
        <div className="px-4 h-full pt-3">
            {/* Breadcrumbs */}
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> AWB Master </ATMPageHeading>
                <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange} // Assuming addExcelFile can handle the file input change event
                />
                {isAuthorized(
                    UserModuleNameTypes.ACTION_GPO_AWB_NUMBER_ADD
                ) && (
                    <div className="flex gap-x-4 justify-end z-50">
                        <ATMSelectSearchable
                            name=""
                            label=""
                            value={selectedCourier}
                            // value={selectedCourier}
                            componentClass=""
                            selectLabel="Select Courier"
                            isLoading={false}
                            options={courierAwbOptions?.map((ele) => ({
                                label: ele?.label?.replaceAll('_', ' '),
                                value: ele?.label,
                            }))}
                            onChange={(e) => {
                                setSelectedCourier(e)
                            }}
                        />

                        <ATMExportButton
                            isLoading={false}
                            headers={[]}
                            fileName=""
                            btnName="Import AWB CSV"
                            btnType="UPLOAD"
                            loadingText="..."
                            className="py-2 mt-[5px] h-[36px]"
                            disabled={!selectedCourier ? true : false}
                            onImport={() => {
                                fileInputRef?.current?.click()
                            }}
                        />
                        <div
                            className="mt-1"
                            hidden={!selectedCourier.length ? true : false}
                        >
                            <ATMExportButton
                                data={[]}
                                isLoading={false}
                                headers={
                                    selectedCourier === 'GPO'
                                        ? ['awbNumber']
                                        : headers
                                }
                                fileName={selectedCourier}
                                onClick={(done) => {
                                    done()
                                }}
                                btnName="Download CSV"
                                btnType="DOWNLOAD"
                                loadingText="..."
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="border flex flex-col h-[calc(100%-85px)] rounded bg-white -z-0">
                {/*Table Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

                {/* Table */}
                <div className="grow overflow-auto -z-0">
                    <ATMTable
                        isLoading={isTableLoading}
                        columns={columns}
                        rows={rows}
                        extraClasses="h-full overflow-auto"
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

export default GpoAwbListing
