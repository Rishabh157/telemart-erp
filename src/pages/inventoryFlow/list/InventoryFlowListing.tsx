/// ==============================================
// Filename:InventoryFlowListing.tsx
// Type: List Component
// Last Updated: OCTOBER 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import Timeline from 'rsuite/Timeline'
import 'rsuite/dist/rsuite-no-reset.min.css'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { AppDispatch, RootState } from 'src/redux/store'
import { capitalizeFirstLetter } from 'src/components/utilsComponent/capitalizeFirstLetter'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'

// |-- Redux --|
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/InventoryFlowSlice'
import { HiDotsVertical } from 'react-icons/hi'
import {
    BarcodeFlowListResponse,
    BarcodeFlowDataListResponsee,
} from 'src/models'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'

// |-- Types --|
type Props = {
    items: BarcodeFlowListResponse[]
    onBarcodeClick: (barcode: any) => void
}

enum BarcodeStatusEnum {
    atWarehouse = 'AT_WAREHOUSE',
    atDealerWarehouse = 'AT_DEALER_WAREHOUSE',
    inTransit = 'IN_TRANSIT',
    delivered = 'DELIVERED',
    rtv = 'RTV',
    wtc = 'WTC',
    wts = 'WTS',
    wtw = 'WTW',
}

const InventoryFlowListing = ({
    // columns,
    items,
    onBarcodeClick,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const [isFlowDialogShow, setIsFlowDialogShow] = useState<boolean>(false)
    const [selectedFlowItem, setSelectedFlowItem] = useState<
        BarcodeFlowDataListResponsee[]
    >([])

    const inventoryFlowState: any = useSelector(
        (state: RootState) => state.inventoryFlow
    )

    const { page, rowsPerPage, searchValue, isTableLoading, totalItems } =
        inventoryFlowState

    const showBarcodeStatusText = (status: string, wareHouseLabel: string) => {
        switch (status) {
            case BarcodeStatusEnum.atWarehouse:
                return `Barcode is in (${wareHouseLabel}) warehouse`
            case BarcodeStatusEnum.atDealerWarehouse:
                return `Barcode is in dealer warehouse (${wareHouseLabel})`
            case BarcodeStatusEnum.inTransit:
                return 'Barcode is in Transit'
            case BarcodeStatusEnum.delivered:
                return 'Barcode is delivered'
            case BarcodeStatusEnum.rtv:
                return 'Barcode is in return to vendor'
            case BarcodeStatusEnum.wtc:
                return 'Barcode is warehouse to company'
            case BarcodeStatusEnum.wts:
                return `Barcode is in warehouse and go to Sample`
            case BarcodeStatusEnum.wtw:
                return 'Barcode is warehouse to warehouse'
            default:
                return 'Barcode is created'
        }
    }

    return (
        <div className="px-4 h-[calc(100vh-55px)]  ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Inventory Barcode Flow </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    isDateFilter
                    page={page}
                    searchValue={searchValue}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={items}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    // onFilterClick={() => setIsFilterOpen(true)}
                />

                {/* Table */}
                <div className="h-[calc(100%-75px)]">
                    {!isTableLoading ? (
                        <div className="grid grid-cols-3 gap-4 overflow-auto p-4  ">
                            {items?.map(
                                (
                                    barcode: BarcodeFlowListResponse,
                                    ind: number
                                ) => (
                                    <div
                                        key={ind}
                                        className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer`}
                                        onClick={onBarcodeClick}
                                    >
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="text-[12px] text-slate-500">
                                                    Barcode No.
                                                </div>
                                                <div>
                                                    {barcode?.barcodeNumber}
                                                </div>
                                            </div>
                                            <div>
                                                <HiDotsVertical
                                                    onClick={() => {
                                                        setIsFlowDialogShow(
                                                            true
                                                        )
                                                        setSelectedFlowItem(
                                                            barcode?.data
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-x-2 text-[13px] text-slate-500n font-medium">
                                            <div className="bg-[#00dd56] text-[#ffffff] px-[2px] py-[1px] rounded">
                                                Current Status
                                            </div>
                                            {' : '}
                                            <div className="">
                                                {
                                                    barcode?.data[
                                                        barcode?.data?.length -
                                                            1
                                                    ]?.status
                                                }
                                            </div>
                                        </div>

                                        <div className="text-primary-main font-medium grow flex items-center">
                                            {capitalizeFirstLetter(
                                                barcode?.productGroupLabel || ''
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-[calc(100%-75px)]">
                            <h1 className="text-[23px]">
                                <CircularProgress size={30} />
                            </h1>
                        </div>
                    )}
                </div>

                {/* Flow Of Barcode */}
                <DialogLogBox
                    maxWidth="sm"
                    isOpen={isFlowDialogShow}
                    handleClose={() => {
                        setIsFlowDialogShow(false)
                        setSelectedFlowItem([])
                    }}
                    component={
                        <div className="py-4  px-4">
                            {/* <ATMPageHeading>Flow 12000002</ATMPageHeading> */}
                            <div className="flex justify-center">
                                <Timeline>
                                    {selectedFlowItem.map(
                                        (
                                            ele: BarcodeFlowDataListResponsee,
                                            ind: number
                                        ) => (
                                            <Timeline.Item key={ind}>
                                                <div className="text-[14px] text-gray-600">
                                                    {formatedDateTimeIntoIst(
                                                        ele?.createdAt
                                                    )}
                                                </div>
                                                <div className="font-semibold text-[16px]">
                                                    {showBarcodeStatusText(
                                                        ele?.status,
                                                        ele?.wareHouseLabel ||
                                                            ''
                                                    )}
                                                </div>
                                            </Timeline.Item>
                                        )
                                    )}
                                </Timeline>
                            </div>
                        </div>
                    }
                />

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={items}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default InventoryFlowListing
