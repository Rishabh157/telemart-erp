import { useState } from 'react';
import { FaRegCopy } from "react-icons/fa6";
import { LuCopyCheck } from "react-icons/lu";
import { BarcodeListResponseType } from 'src/models';
import moment from 'moment';

// |-- Types --|
type BarcodeCardProps = {
    barcodeList: BarcodeListResponseType[];
};

const BarcodeDetailsCard = ({ barcodeList }: BarcodeCardProps) => {
    const [copiedBarcode, setCopiedBarcode] = useState<string | null>(null);

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
        <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 py-3 px-3">
            {barcodeList.map((barcode: BarcodeListResponseType) => {
                const isExpired = moment(barcode?.expiryDate).isBefore(moment()) ? true : false
                return (
                    <div
                        key={barcode?._id}
                        className={`flex text-xs flex-col gap-2 shadow rounded-lg border-[1.5px] p-2 border-slate-200 ${isExpired && 'opacity-100'}`}
                    >
                        <div className="flex justify-end">
                            <div>
                                {!barcode?.isUsed && (
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
                                    title={barcode?.vendorLabel}>
                                    {barcode?.vendorLabel}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-slate-500 mr-6 w-34">
                                Product group :-
                            </div>
                            <div className="text-primary-main font-medium grow flex items-end">
                                {barcode?.productGroupLabel}{' '}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-slate-500 mr-5 w-34">
                                Upper Barcode :-
                            </div>
                            <div className="text-primary-main font-medium grow flex items-end">
                                {barcode?.upperBarcodeNumber}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-slate-500 mr-10 w-34">
                                Lot Number :-
                            </div>
                            <div className="text-primary-main font-medium grow flex items-end">
                                {barcode?.lotNumber}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className=" text-slate-500 mr-14 w-34">
                                Barocde :-
                            </div>
                            <div className="relative group text-primary-main font-medium grow flex items-end">

                                <span className='bg-slate-300 font-semibold px-2 py-1 rounded'>{barcode?.barcodeNumber}</span>

                                <div className="relative flex left-3 -top-1 justify-end items-center opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                                    {copiedBarcode !== barcode?.barcodeNumber ?
                                        <FaRegCopy
                                            title="Copy Barcode"
                                            className="cursor-pointer text-primary-main hover:text-blue-700 transition"
                                            size={14}
                                            onClick={() => handleCopyText(barcode?.barcodeNumber)}
                                        /> : <LuCopyCheck
                                            size={14}
                                            className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
                                        />
                                    }
                                    <span className='text-xs pl-1'>
                                        {copiedBarcode === barcode?.barcodeNumber ? 'Copied!' : 'Copy'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className=" text-slate-500 mr-7 w-34">
                                Created Date :-
                            </div>
                            <div className="text-primary-main font-medium grow flex items-end">
                                {moment(barcode?.createdAt).format('D/MM/YYYY hh:mm A')}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className=" text-slate-500 mr-8 w-34">
                                Expired Date :-
                            </div>
                            <div className="text-primary-main font-medium grow flex items-end">
                                {barcode?.expiryDate !== null ? (
                                    <>
                                        {moment(barcode?.expiryDate).format('D/MM/YYYY')}
                                        {moment(barcode?.expiryDate).isBefore(moment()) && (
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
                                    {barcode?.status?.replaceAll('_', ' ') || '-'}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BarcodeDetailsCard;
