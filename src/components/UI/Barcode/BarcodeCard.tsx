import React from 'react'
import { IoRemoveCircle } from 'react-icons/io5'

type BarcodeCardTypes = {
    barcodeNumber: string
    productGroupLabel: string
    handleRemoveBarcode?: () => void
}

const BarcodeCard = ({
    barcodeNumber,
    productGroupLabel,
    handleRemoveBarcode,
}: BarcodeCardTypes) => {
    return (
        <div className="flex flex-col gap-2 my-4 shadow rounded-lg relative p-2">
            <div className="flex justify-between">
                <div>
                    <div className="text-[12px] text-slate-500">
                        Barcode No.
                    </div>
                    <div>{barcodeNumber}</div>
                </div>
                <div className="absolute -top-2 -right-2 cursor-    ointer">
                    <IoRemoveCircle
                        fill="red"
                        size={20}
                        onClick={handleRemoveBarcode}
                    />
                </div>
            </div>

            <div className="text-primary-main font-medium grow flex items-end">
                {productGroupLabel || ''}
            </div>
        </div>
    )
}

export default BarcodeCard
