// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
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
import { BarcodeFlowListResponse, BarcodeFlowDataListResponsee } from 'src/models'
import { ATMDateTimeDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'
import { FaRegEye } from "react-icons/fa";
import { ATMFullScreenLoader } from 'src/components/UI/atoms/ATMDisplay/ATMLoader'

// |-- Types --|
type Props = {
    items: BarcodeFlowListResponse[] | any
    onBarcodeClick: (barcode: any) => void
}

const InventoryFlowListing = ({ items, onBarcodeClick }: Props) => {

    // state
    const [isFlowDialogShow, setIsFlowDialogShow] = useState<boolean>(false)
    const [selectedFlowItem, setSelectedFlowItem] = useState<BarcodeFlowDataListResponsee[]>([])
    const dispatch = useDispatch<AppDispatch>()

    const listingPaginationState: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, totalItems, searchValue, isTableLoading } = listingPaginationState



    return (
        <div className="px-4 h-[calc(100vh-55px)]">

            {isTableLoading && <ATMFullScreenLoader />}

            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Barcode Flow </ATMPageHeading>
            </div>

            <div className="border flex flex-col rounded bg-white h-[calc(100%-75px)]">
                {/*Table Header */}
                <ATMTableHeader
                    page={page}
                    searchValue={searchValue}
                    rowCount={totalItems}
                    rowsPerPage={rowsPerPage}
                    rows={items}
                    onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

                {/* Table */}
                <div className="h-[calc(100%-75px)] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-4 p-4">
                        {items?.map((barcode: BarcodeFlowListResponse) => (
                            <div
                                key={barcode?._id}
                                className='group flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2'
                                onClick={onBarcodeClick}
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-[12px] text-slate-500">
                                            Barcode No.
                                        </div>
                                        <div className='text-sm font-semibold'>
                                            {barcode?.barcodeNumber}
                                        </div>
                                    </div>

                                    <div
                                        className='absolute right-2 top-2 cursor-pointer group-hover:visible invisible p-1.5 rounded-full text-primary-30 bg-primary-90 border hover:border-primary-main'
                                        onClick={() => {
                                            setIsFlowDialogShow(true)
                                            setSelectedFlowItem(barcode?.data)
                                        }}
                                    >
                                        <FaRegEye className="size-[0.75rem]" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-x-2 text-slate-500n font-medium">
                                    <div className="bg-green-600 text-[#ffffff] text-xs px-2 py-1 rounded">
                                        Current Status
                                    </div>
                                    {' : '}
                                    <div className='text-xs'>
                                        {barcode?.data[barcode?.data?.length - 1]?.status === ''
                                            ? 'Created'
                                            : barcode?.data[
                                                barcode?.data
                                                    ?.length - 1
                                            ]?.status}
                                    </div>
                                </div>

                                <div className="text-primary-main text-sm font-medium grow flex items-center">
                                    {capitalizeFirstLetter(barcode?.productGroupLabel || '')}
                                </div>
                            </div>
                        )
                        )}
                    </div>
                </div>

                {/* Dialog Barcode Flow */}
                <DialogLogBox
                    maxWidth="sm"
                    isOpen={isFlowDialogShow}
                    handleClose={() => {
                        setIsFlowDialogShow(false)
                        setSelectedFlowItem([])
                    }}
                    component={
                        <div className="py-4 px-4 flex justify-center">
                            <Timeline>
                                {selectedFlowItem?.map((barcode: BarcodeFlowDataListResponsee) => (
                                    <Timeline.Item key={barcode?._id}>
                                        <div className="text-gray-600">
                                            <ATMDateTimeDisplay createdAt={barcode?.createdAt} />
                                        </div>
                                        <div className="text-xs font-semibold">
                                            {barcode?.barcodeLog}
                                        </div>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
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
