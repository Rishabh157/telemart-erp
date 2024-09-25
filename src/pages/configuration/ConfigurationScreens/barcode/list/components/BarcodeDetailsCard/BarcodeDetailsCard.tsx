import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { IoCopy } from 'react-icons/io5';
import { BarcodeListResponseType } from 'src/models';

// |-- Types --|
type BarcodeCardProps = {
    barcodeList: BarcodeListResponseType[];
    selectedBarcodes: BarcodeListResponseType[];
    onBarcodeSelect: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        barcode: BarcodeListResponseType,
        isBarcodeSelected: boolean
    ) => void;
    onBarcodeClick: (barcode: BarcodeListResponseType) => void;
};

const BarcodeDetailsCard = ({
    barcodeList,
    selectedBarcodes,
    onBarcodeSelect,
    onBarcodeClick,
}: BarcodeCardProps) => {
    const [copiedBarcode, setCopiedBarcode] = useState<string | null>(null);

    const handleCopyText = (barcodeNumber: string) => {
        navigator.clipboard
            .writeText(barcodeNumber)
            .then(() => {
                setCopiedBarcode(barcodeNumber);
                setTimeout(() => setCopiedBarcode(null), 2000); // Tooltip disappears after 2 seconds
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-3 px-3">
            {barcodeList.map((barcode: BarcodeListResponseType, barcodeIndex: number) => {
                const isBarcodeSelected =
                    selectedBarcodes.findIndex(
                        (selected) => selected._id === barcode._id
                    ) !== -1;

                return (
                    <div
                        key={barcode?._id}
                        onClick={() => {
                            onBarcodeClick(barcode);
                        }}
                        className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer ${
                            barcode?.isUsed ? 'border-red-500' : 'border-slate-200'
                        }`}
                    >
                        {/*Checkbox */}
                        <button
                            onClick={(e) => onBarcodeSelect(e, barcode, isBarcodeSelected)}
                            className={`flex justify-center items-center h-5 w-5 rounded-full border border-slate-400 shadow font-bold absolute -right-2 -top-2 ${
                                isBarcodeSelected ? 'bg-green-500 text-white' : 'bg-white'
                            }`}
                        >
                            {isBarcodeSelected && <BiCheck />}
                        </button>

                        <div className="flex justify-between">
                            <div>
                                <div className="text-[10px] text-slate-500">Barcode No.</div>
                                <div>{barcode?.status} </div>
                                <div>{barcode?.barcodeNumber} </div>

                                <div className="relative">
                                    <IoCopy
                                        title="copy"
                                        className="cursor-pointer text-blue-500"
                                        size={16}
                                        onClick={() => handleCopyText(barcode?.barcodeNumber)}
                                    />
                                    {copiedBarcode === barcode?.barcodeNumber && (
                                        <div className="absolute left-6 top-0 bg-black text-white text-xs rounded-md px-2 py-1">
                                            Copied!
                                        </div>
                                    )}
                                </div>

                                <div className="text-[10px] text-slate-500 mt-2">
                                    Upper Barcode No.
                                </div>
                                <div>{barcode?.upperBarcodeNumber} </div>
                            </div>
                        </div>

                        <div className="text-primary-main font-medium grow flex items-end">
                            {barcode?.productGroupLabel}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BarcodeDetailsCard;
