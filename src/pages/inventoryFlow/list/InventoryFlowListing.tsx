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
} from 'src/redux/slices/ListingPaginationSlice'
import { HiDotsVertical } from 'react-icons/hi'
import {
    BarcodeFlowListResponse,
    BarcodeFlowDataListResponsee,
} from 'src/models'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
// import { barcodeStatusEnum } from 'src/utils/constants/enums'

// |-- Types --|
type Props = {
    items: BarcodeFlowListResponse[] | any
    onBarcodeClick: (barcode: any) => void
}

const InventoryFlowListing = ({ items, onBarcodeClick }: Props) => {
    // state
    const [isFlowDialogShow, setIsFlowDialogShow] = useState<boolean>(false)
    const [selectedFlowItem, setSelectedFlowItem] = useState<
        BarcodeFlowDataListResponsee[]
    >([])
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } =
        listingPaginationState

    const dispatch = useDispatch<AppDispatch>()

    // const showBarcodeStatusText = (
    //     status: string,
    //     wareHouseLabel: string,
    //     companyLabel: string
    // ) => {
    //     switch (status) {
    //         case barcodeStatusEnum.atWarehouse:
    //             return `Barcode is Inwarding in ${capitalizeFirstLetter(
    //                 wareHouseLabel
    //             )} warehouse of ${capitalizeFirstLetter(companyLabel)} company`
    //         case barcodeStatusEnum.atDealerWarehouse:
    //             return `Barcode is in dealer ${capitalizeFirstLetter(
    //                 wareHouseLabel
    //             )} warehouse`
    //         case barcodeStatusEnum.inTransit:
    //             return 'Barcode is in In Transit'
    //         case barcodeStatusEnum.delivered:
    //             return 'Barcode is delivered'
    //         case barcodeStatusEnum.rtv:
    //             return 'Barcode is in return to vendor'
    //         case barcodeStatusEnum.wtc:
    //             return `Barcode is transfer to ${capitalizeFirstLetter(
    //                 companyLabel
    //             )} company`
    //         case barcodeStatusEnum.wts:
    //             return `Barcode is in warehouse and go to Sample`
    //         case barcodeStatusEnum.wtw:
    //             return 'Barcode is WTW outward'
    //         default:
    //             return `Barcode is created in ${capitalizeFirstLetter(
    //                 companyLabel
    //             )} company`
    //     }
    // }

    return (
        <div className="px-4 h-[calc(100vh-55px)]  ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Inventory Barcode Flow </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/*Table Header */}
                <ATMTableHeader
                    // isDateFilter
                    page={page}
                    searchValue={searchValue}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={items}
                    onRowsPerPageChange={(newValue) =>
                        dispatch(setRowsPerPage(newValue))
                    }
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
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
                                                {barcode?.data[
                                                    barcode?.data?.length - 1
                                                ]?.status === ''
                                                    ? 'Created'
                                                    : barcode?.data[
                                                          barcode?.data
                                                              ?.length - 1
                                                      ]?.status}
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
                                                    {ele?.barcodeLog}
                                                    {/* {showBarcodeStatusText(
                                                        ele?.status,
                                                        ele?.wareHouseLabel ||
                                                            '',
                                                        ele?.companyLabel
                                                    )} */}
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
