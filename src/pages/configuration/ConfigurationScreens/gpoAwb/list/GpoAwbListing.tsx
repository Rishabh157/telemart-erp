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
import { useAddGpoAwbExcelSheetMutation } from 'src/services/GpoAwbServices'
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import { showToast } from 'src/utils'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const GpoAwbListing = ({
    columns,
    rows,
}: // addExcelFile,
Props) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useDispatch<AppDispatch>()
    const [addGpoAwbSheet] = useAddGpoAwbExcelSheetMutation()

    const TransportState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        TransportState
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Configuration',
            path: '/dashboard',
        },
        {
            label: 'GPO AWB',
        },
    ]

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files[0]) {
            const file = files[0]

            // Create a new FormData instance
            const formData = new FormData()
            // Append the file
            formData.append('file', file)

            addGpoAwbSheet(formData)
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
        <div className="px-4 h-full pt-3">
            {/* Breadcrumbs */}
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> GPO AWB </ATMPageHeading>
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
                    <button
                        onClick={() => fileInputRef?.current?.click()}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + ADD CSV
                    </button>
                )}
            </div>

            <div className="border flex flex-col h-[calc(100%-85px)] rounded bg-white">
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
                <div className="grow overflow-auto">
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
