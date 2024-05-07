// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import CartonBoxBarcodeDetailCard from './CartonBoxBarcodeDetailCard'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { useGetBarcodeByOuterBoxNumberQuery } from 'src/services/BarcodeService'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { BsPrinter } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

// |-- Types --|
export type barcodecardType = {
    _id?: string
    label: String
    barcodenumber: String
    count?: string
}

const CartonBoxBarcodeListing = () => {
    // Hooks
    const [searchValue, setSearchValue] = useState<string>('')
    const navigate = useNavigate()

    const cartonBoxBarcodeState: any = useSelector(
        (state: RootState) => state.cartonBoxBarcode
    )

    const { page, rowsPerPage, totalItems } = cartonBoxBarcodeState

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetBarcodeByOuterBoxNumberQuery(searchValue, {
            skip: !searchValue.length,
        }),
    })

    const datas = items?.map((ele: any, index: any) => {
        return {
            barcodenumber: ele.barcodeNumber,
            label: ele.cartonboxLabel,
        }
    })

    return (
        <div className="px-4  h-[calc(100%-55px)]  flex flex-col gap-3 pt-4">
            {/* Page Header */}

            <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white ">
                {/* Header */}

                <ATMTableHeader
                    searchValue={searchValue}
                    page={page}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={1 as any}
                    // rows={rows}
                    onRowsPerPageChange={(newValue) => {
                        // dispatch(setRowsPerPage(newValue))
                    }}
                    // isFilter
                    onSearch={(newValue) => {
                        // handleValidNumber(newValue) &&
                        setSearchValue(newValue)
                    }}
                />

                {/* Barcode Detail Cards */}
                <div className="grow overflow-auto  ">
                    <CartonBoxBarcodeDetailCard
                        barcodeList={datas as any}
                        onCartonBoxBarcodeSelect={() => {}}
                        onBarcodeClick={() => {}}
                    />
                </div>

                {datas?.length && (
                    <div className="flex justify-end">
                        <ATMLoadingButton
                            className="w-24"
                            onClick={(e) => {
                                e.stopPropagation()
                                if (items?.length) {
                                    navigate('/barcodes', {
                                        state: {
                                            path: '/configurations/barcode',
                                        },
                                    })
                                }
                                // setGroupId(barcode?._id)
                            }}
                        >
                            <div className="flex gap-2 items-center justify-center">
                                <BsPrinter className="text-xl" /> Print
                            </div>
                        </ATMLoadingButton>
                    </div>
                )}

                {/* Pagination */}
                {/* <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div> */}
            </div>

            {/* {isFilterOpen && (
        <FilterDialogWarpper onClose={() => setIsFilterOpen(false)} />
      )} */}
        </div>
    )
}

export default CartonBoxBarcodeListing
