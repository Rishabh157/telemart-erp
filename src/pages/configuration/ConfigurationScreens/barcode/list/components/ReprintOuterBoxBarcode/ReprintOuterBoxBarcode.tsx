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
import ReprintProductGroupDetailCard from './ReprintProductGroupDetailCard'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { useGetReprintOuterBoxBarcodeQuery } from 'src/services/BarcodeService'

export type ReprintOuterboxBarcodeListResponse = {
    _id: string
    serialNo: number
    outerBoxNumber: string
    innerBarcodes: string[]
    createdBy: string
    batchNumber: string
    productId: string
    isDeleted: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    __v: number
    productLabel: string
}

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

const ReprintOuterBoxBarcode = ({
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

    // pagination api
    const { items } = useGetCustomListingData<
        ReprintOuterboxBarcodeListResponse[]
    >({
        useEndPointHook: useGetReprintOuterBoxBarcodeQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: [
                'serialNo',
                'outerBoxNumber',
                'createdBy',
                'batchNumber',
                'productLabel',
            ],
            page: page,
            filterBy: [],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

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
                <div className="grow overflow-auto">
                    <ReprintProductGroupDetailCard
                        cardBoxBarcodeList={items as any}
                        selectedProductGroupBarcodes={selectedProductGroupcodes}
                        onProductGroupBarcodeSelect={onProductGroupcodeSelect}
                        onBarcodeClick={(barcode: any) => {
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
        </div>
    )
}

export default ReprintOuterBoxBarcode
