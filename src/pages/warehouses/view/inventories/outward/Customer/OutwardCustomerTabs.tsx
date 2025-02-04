// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import OutwardCustomerTabListFilterFormDialogWrapper from './outwardCustomerTabFilter/OutwardCustomerTabListFilterFormDialogWrapper'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { handleValidNumberForSearch } from 'src/utils/methods/numberMethods'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    orderSearchValue?: string
    onChangeOrderSearchValue?: (newValue: string) => void
    barcodeSearchValue?: string
    onChangeBarcodeSearchValue?: (newValue: string) => void
}

const OutwardCustomerTabs = ({
    columns,
    rows,
    orderSearchValue,
    barcodeSearchValue,
    onChangeOrderSearchValue = () => {},
    onChangeBarcodeSearchValue = () => {},
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const [isOpenFilterFormDialog, setIsOpenFilterFormDialog] =
        useState<boolean>(false)

    const outwardCustomerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, isTableLoading, searchValue,totalItems } =
        outwardCustomerState

    return (
        <div className=" h-[calc(100vh-150px)]  bg-white ">
            <div className="border flex flex-col h-[calc(100%)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    searchValue={searchValue}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    isAnotherSearch
                    anotherSearchValue={orderSearchValue}
                    anotherSearchPlaceholder="Order No.."
                    onAnotherSearch={(newValue) => {
                        handleValidNumberForSearch(newValue) &&
                            onChangeOrderSearchValue(newValue)
                    }}
                    isAnotherSearchTwo
                    anotherSearchTwoValue={barcodeSearchValue}
                    anotherSearchTwoPlaceholder="Barcode No.."
                    onAnotherSearchTwo={(newValue) => {
                        handleValidNumberForSearch(newValue) &&
                            onChangeBarcodeSearchValue(newValue)
                    }}
                    isFilter
                    onFilterClick={() => setIsOpenFilterFormDialog(true)}
                />

                {isOpenFilterFormDialog && (
                    <OutwardCustomerTabListFilterFormDialogWrapper
                        open
                        onClose={() => setIsOpenFilterFormDialog(false)}
                    />
                )}

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

export default OutwardCustomerTabs
