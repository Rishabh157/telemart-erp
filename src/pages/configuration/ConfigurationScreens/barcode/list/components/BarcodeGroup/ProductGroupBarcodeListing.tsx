
import React from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/ListingPaginationSlice'
import { ProductBarcodeGroupResponse } from 'src/models'
import ProductGroupDetailCard from './ProductGroupDetailCard'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    rows: any[]
    selectedProductGroupcodes: ProductBarcodeGroupResponse[]
    onProductGroupcodeSelect: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        barcode: ProductBarcodeGroupResponse,
        isBarcodeSeleted: boolean
    ) => void
    onBarcodeClick: (barcode: ProductBarcodeGroupResponse) => void
}

const ProductGroupListing = ({
    rows,
    selectedProductGroupcodes,
    onProductGroupcodeSelect,
    onBarcodeClick,
}: Props) => {
    // Hooks
    const dispatch = useDispatch<AppDispatch>()
    const ProductGroupcodeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, totalItems, searchValue } = ProductGroupcodeState

    return (
        <div className="px-4  h-[calc(100%-55px)] flex flex-col gap-3 pt-4">
            <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">
                {/* Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onFilterClick={() => {}}
                    // isFilter
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

                {/* Barcode Detail Cards */}
                <div className="grow overflow-auto bg ">
                    <ProductGroupDetailCard
                        cardBoxBarcodeList={rows}
                        selectedProductGroupBarcodes={selectedProductGroupcodes}
                        onProductGroupBarcodeSelect={onProductGroupcodeSelect}
                        onBarcodeClick={(barcode) => {
                            onBarcodeClick(barcode)
                        }}
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

            {/* {isFilterOpen && (
        <FilterDialogWarpper onClose={() => setIsFilterOpen(false)} />
      )} */}
        </div>
    )
}

export default ProductGroupListing
