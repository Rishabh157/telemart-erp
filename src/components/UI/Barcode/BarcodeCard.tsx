import React from 'react';
import { IoRemoveCircle, IoCopy } from 'react-icons/io5';

type BarcodeCardTypes = {
    barcodeNumber: string;
    productGroupLabel: string;
    isRemoveBarcode?: boolean;
    handleRemoveBarcode?: () => void;
};

const BarcodeCard = ({
    barcodeNumber,
    productGroupLabel,
    isRemoveBarcode = false,
    handleRemoveBarcode,
}: BarcodeCardTypes) => {
    
    const handleCopyText = () => {
        navigator.clipboard.writeText(barcodeNumber)
            .then(() => {
                alert('Barcode copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className="flex flex-col gap-2 my-4 shadow rounded-lg relative p-2">
            <div className="flex justify-between">
                <div>
                    <div className="text-[10px] text-slate-500">
                        Barcode No.
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="cursor-pointer">
                            {barcodeNumber}
                        </div>
                        {/* Copy Icon next to Barcode */}
                        <IoCopy
                            className="cursor-pointer text-slate-500"
                            size={16}
                            onClick={handleCopyText}
                        />
                    </div>
                </div>
                {!isRemoveBarcode && (
                    <div className="absolute -top-2 -right-2 cursor-pointer">
                        <IoRemoveCircle
                            fill="red"
                            size={20}
                            onClick={handleRemoveBarcode}
                        />
                    </div>
                )}
            </div>

            <div className="text-primary-main font-medium grow flex items-end">
                {productGroupLabel || ''}
            </div>
        </div>
    );
};

export default BarcodeCard;
