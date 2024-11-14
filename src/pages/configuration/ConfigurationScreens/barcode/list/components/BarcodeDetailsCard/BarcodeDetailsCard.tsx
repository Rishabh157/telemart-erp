import { useState } from 'react';
// import { BiCheck } from 'react-icons/bi';
import { FaRegCopy } from "react-icons/fa6";
import { LuCopyCheck } from "react-icons/lu";


// import { IoCopy } from 'react-icons/io5';
import { BarcodeListResponseType } from 'src/models';
import { useBarcode } from '@createnextapp/react-barcode'

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

    function Barcode({ value }: { value: string }) {
        const { inputRef } = useBarcode({
            value,
            options: {
                displayValue: false,
                background: 'rgb(241 245 249)',
            },
        })

        return <canvas ref={inputRef} className="h-[30px]" />
    }

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
        <div className="grid grid-cols-4 gap-5 mt-2 py-3 px-3">
            {barcodeList.map((barcode: BarcodeListResponseType) => {
                return (
                    <div
                        key={barcode?.barcodeNumber}
                        className={`flex flex-col gap-x-4 rounded shadow-md relative border-[1px] border-gray-400 w-full 
                            py-4 px-4 group transition-transform transform hover:scale-105 hover:shadow-lg
                             ${barcode?.isUsed ? 'border-red-500' : 'border-slate-200'}`}
                    >
                        <div className="relative flex justify-end items-center opacity-0 transition-all invisible group-hover:opacity-100 group-hover:visible">
                            {copiedBarcode !== barcode?.barcodeNumber ?
                                <FaRegCopy
                                    title="Copy Barcode"
                                    className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
                                    size={20}
                                    onClick={() => handleCopyText(barcode?.barcodeNumber)}
                                /> : <LuCopyCheck size={20} className="cursor-pointer text-blue-500 hover:text-blue-700 transition" />
                            }
                            <span className='text-xs pl-1'>{copiedBarcode === barcode?.barcodeNumber ? 'Copied!' : 'Copy'} Barcode</span>
                        </div>

                        <p className="flex justify-center font-normal text-[0.6rem] tracking-[.25em]">
                            LODLSDLLSDLSLD
                        </p>

                        <Barcode value={barcode?.barcodeNumber} />
                        <div className="w-full flex justify-center p-0 tracking-[.25em] text-[0.6rem] ">
                            {barcode?.barcodeNumber}
                        </div>
                    </div>

                    // <div
                    //     key={barcode?._id}
                    //     onClick={() => onBarcodeClick(barcode)}
                    //     className={`flex flex-col gap-3 shadow-md rounded-lg border relative p-5 bg-white transition-transform transform hover:scale-105 hover:shadow-lg ${barcode?.isUsed ? "border-red-500" : "border-gray-200"}`}
                    // >
                    //     {/* Barcode Number */}
                    //     <div className="flex justify-between items-center mb-4">
                    //         <div>
                    //             <div className="text-xs font-semibold text-gray-500">Barcode No.</div>
                    //             <div className="text-xl font-bold text-gray-800 ">
                    //                 <div className='w-full bg-red-300 '>
                    //                     <Barcode value={barcode?.barcodeNumber} />
                    //                 </div>
                    //                 {barcode?.barcodeNumber}
                    //             </div>
                    //         </div>
                    //         <div className="relative">
                    //             <IoCopy
                    //                 title="Copy Barcode"
                    //                 className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
                    //                 size={20}
                    //                 onClick={() => handleCopyText(barcode?.barcodeNumber)}
                    //             />
                    //             {copiedBarcode === barcode?.barcodeNumber && (
                    //                 <div className="absolute left-8 top-0 bg-black text-white text-xs rounded-md px-2 py-1 shadow-md">
                    //                     Copied!
                    //                 </div>
                    //             )}
                    //         </div>
                    //     </div>

                    //     {/* Status and Upper Barcode */}
                    //     <div className="mb-4">
                    //         <div className="text-xs text-gray-500">Status</div>
                    //         <div className="text-sm font-medium text-gray-700">{barcode?.status}</div>
                    //         <div className="mt-3">
                    //             <div className="text-xs text-gray-500">Upper Barcode No.</div>
                    //             <div className="text-sm font-medium text-gray-700">{barcode?.upperBarcodeNumber}</div>
                    //         </div>
                    //     </div>

                    //     {/* Product Label */}
                    //     <div className="text-blue-600 font-semibold text-base mt-auto">
                    //         {barcode?.productGroupLabel}
                    //     </div>

                    //     <div className='w-full bg-red-300 '>
                    //         <Barcode value={barcode?.barcodeNumber} />
                    //     </div>

                    // </div>



                    ////////////////////////////////////////
                    // <div
                    //     key={barcode?._id}
                    //     onClick={() => {
                    //         onBarcodeClick(barcode);
                    //     }}
                    //     className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer ${barcode?.isUsed ? 'border-red-500' : 'border-slate-200'
                    //         }`}
                    // >
                    //     {/*Checkbox */}
                    //     <button
                    //         onClick={(e) => onBarcodeSelect(e, barcode, isBarcodeSelected)}
                    //         className={`flex justify-center items-center h-5 w-5 rounded-full border border-slate-400 shadow font-bold absolute -right-2 -top-2 ${isBarcodeSelected ? 'bg-green-500 text-white' : 'bg-white'
                    //             }`}
                    //     >
                    //         {isBarcodeSelected && <BiCheck />}
                    //     </button>

                    //     <div className="flex justify-between">
                    //         <div>
                    //             <div className="text-[10px] text-slate-500">Barcode No.</div>
                    //             <div>{barcode?.status} </div>
                    //             <div>{barcode?.barcodeNumber} </div>

                    //             <div className="relative">
                    //                 <IoCopy
                    //                     title="copy"
                    //                     className="cursor-pointer text-blue-500"
                    //                     size={16}
                    //                     onClick={() => handleCopyText(barcode?.barcodeNumber)}
                    //                 />
                    //                 {copiedBarcode === barcode?.barcodeNumber && (
                    //                     <div className="absolute left-6 top-0 bg-black text-white text-xs rounded-md px-2 py-1">
                    //                         Copied!
                    //                     </div>
                    //                 )}
                    //             </div>

                    //             <div className="text-[10px] text-slate-500 mt-2">
                    //                 Upper Barcode No.
                    //             </div>
                    //             <div>{barcode?.upperBarcodeNumber} </div>
                    //         </div>
                    //     </div>

                    //     <div className="text-primary-main font-medium grow flex items-end">
                    //         {barcode?.productGroupLabel}
                    //     </div>
                    // </div>
                );
            })}
        </div>
    );
};

export default BarcodeDetailsCard;
