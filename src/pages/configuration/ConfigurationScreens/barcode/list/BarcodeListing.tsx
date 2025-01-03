// |-- External Dependencies --|
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { setSearchValue } from 'src/redux/slices/ListingPaginationSlice'
import { BarcodeListResponseType } from 'src/models'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import { FaRegCopy } from 'react-icons/fa'
import { LuCopyCheck } from 'react-icons/lu'
import moment from 'moment'

// |-- Types --|
type Props = {
    items: BarcodeListResponseType
}

const BarcodeListing = ({ items }: Props) => {

    const [copiedBarcode, setCopiedBarcode] = useState<string | null>(null);

    const barcodeState: any = useSelector((state: RootState) => state.listingPagination)
    const { searchValue } = barcodeState

    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // copy for barcode
    const handleCopyText = (barcodeNumber: string) => {
        navigator.clipboard.writeText(barcodeNumber)
            .then(() => {
                setCopiedBarcode(barcodeNumber);
                setTimeout(() => setCopiedBarcode(null), 2000); // Tooltip disappears after 2 seconds
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className="px-4 h-[calc(100%-55px)] flex flex-col gap-3">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Barcode </ATMPageHeading>
                {isAuthorized(UserModuleNameTypes.ACTION_BARCODE_ADD) && (
                    <button
                        onClick={() => navigate('add')}
                        className="bg-primary-main text-white rounded py-1 px-3"
                    >
                        + Add Barcode
                    </button>
                )}
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/* Header */}
                <ATMTableHeader
                    searchValue={searchValue}
                    rows={[]}
                    isHiddenPagination
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                />

                {/* <div className="grow overflow-auto"> */}
                {items && (<div className={`flex text-xs flex-col gap-2 shadow rounded-lg border-[1.5px] p-2 border-slate-200`}>
                    <div className="flex justify-end">
                        <div>
                            {!items?.isUsed && (
                                <span className="text-white bg-red-500 px-2 text-[11px] rounded-full inline-flex items-center py-[1px] font-medium">
                                    Used
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className=" text-slate-500 w-28">
                            Vendor :-
                        </div>
                        <div className="text-primary-main font-medium w-full truncate grow flex items-end">
                            <span className='w-full truncate'
                                title={items?.vendorLabel}>
                                {items?.vendorLabel}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className=" text-slate-500 mr-6 w-34">
                            Product group :-
                        </div>
                        <div className="text-primary-main font-medium grow flex items-end">
                            {items?.productGroupLabel}{' '}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className=" text-slate-500 mr-5 w-34">
                            Upper items :-
                        </div>
                        <div className="text-primary-main font-medium grow flex items-end">
                            {items?.upperBarcodeNumber}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className=" text-slate-500 mr-10 w-34">
                            Lot Number :-
                        </div>
                        <div className="text-primary-main font-medium grow flex items-end">
                            {items?.lotNumber}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className=" text-slate-500 mr-14 w-34">
                            Barocde :-
                        </div>
                        <div className="relative group text-primary-main font-medium grow flex items-end">

                            <span className='bg-slate-300 font-semibold px-2 py-1 rounded'>{items?.barcodeNumber}</span>

                            <div className="relative flex left-3 -top-1 justify-end items-center opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                                {copiedBarcode !== items?.barcodeNumber ?
                                    <FaRegCopy
                                        title="Copy Barcode"
                                        size={14}
                                        className="cursor-pointer text-primary-main hover:text-blue-700 transition"
                                        onClick={() => handleCopyText(items?.barcodeNumber)}
                                    /> : <LuCopyCheck
                                        size={14}
                                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
                                    />
                                }
                                <span className='text-xs pl-1'>
                                    {copiedBarcode === items?.barcodeNumber ? 'Copied!' : 'Copy'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className=" text-slate-500 mr-7 w-34">
                            Created Date :-
                        </div>
                        <div className="text-primary-main font-medium grow flex items-end">
                            {moment(items?.createdAt).format('D/MM/YYYY hh:mm A')}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className=" text-slate-500 mr-8 w-34">
                            Expired Date :-
                        </div>
                        <div className="text-primary-main font-medium grow flex items-end">
                            {items?.expiryDate !== null ? (
                                <>
                                    {moment(items?.expiryDate).format('D/MM/YYYY')}
                                    {moment(items?.expiryDate).isBefore(moment()) && (
                                        <span className="ml-2 text-red-500 text-[10px] font-semibold">
                                            (Expired)
                                        </span>
                                    )}
                                </>
                            ) : (
                                'NA'
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className=" text-slate-500 mr-6 w-34">
                            Current Status :-
                        </div>
                        <div className='grow flex items-end'>
                            <span className='bg-slate-300 text-primary-main font-semibold px-2 py-1 rounded'>
                                {items?.status?.replaceAll('_', ' ') || '-'}
                            </span>
                        </div>
                    </div>
                </div>)
                }
                {/* </div> */}

                {/* Pagination */}
                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    {/* <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default BarcodeListing
