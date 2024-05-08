// |-- Built-in Dependencies --|
import { useState } from 'react'

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

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
}

const PrefrenceCourierListing = ({ columns, rows }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [selectedRows, setSelectedRows] = useState([])
    const attributesState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
        attributesState
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Configuration',
            path: '/dashboard',
        },
        {
            label: 'Preference Courier',
        },
    ]

    return (
        <div className="px-4 h-full pt-3">
            {/* Breadcrumbs */}
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Preference Courier </ATMPageHeading>
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
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
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

export default PrefrenceCourierListing
