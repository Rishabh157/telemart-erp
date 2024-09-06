// |-- External Dependencies --|
import { BiCheck } from 'react-icons/bi'
// import { HiDotsVertical } from 'react-icons/hi'
import { BarcodeListResponseType } from 'src/models'

// |-- Types --|
type BarcodeCardProps = {
    barcodeList: BarcodeListResponseType[]
    selectedBarcodes: BarcodeListResponseType[]
    onBarcodeSelect: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        barcode: BarcodeListResponseType,
        isBarcodeSeleted: boolean
    ) => void
    onBarcodeClick: (barcode: BarcodeListResponseType) => void
}

const BarcodeDetailsCard = ({
    barcodeList,
    selectedBarcodes,
    onBarcodeSelect,
    onBarcodeClick,
}: BarcodeCardProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 py-3 px-3">
            {barcodeList.map(
                (barcode: BarcodeListResponseType, barcodeIndex: number) => {
                    const isBarcodeSeleted =
                        selectedBarcodes.findIndex(
                            (selected) => selected._id === barcode._id
                        ) !== -1
                    return (
                        <div
                            key={barcode?._id}
                            onClick={() => {
                                onBarcodeClick(barcode)
                            }}
                            className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer ${
                                barcode?.isUsed
                                    ? ' border-red-500'
                                    : 'border-slate-200'
                            }`}
                        >
                            {/*Checkbox */}
                            <button
                                onClick={(e) =>
                                    onBarcodeSelect(
                                        e,
                                        barcode,
                                        isBarcodeSeleted
                                    )
                                }
                                className={`
                  flex 
                  justify-center 
                  items-center 
                  h-5 
                  w-5 
                  rounded-full 
                  border 
                  border-slate-400 
                  shadow 
                  font-bold
                  absolute 
                  -right-2 
                  -top-2
                  ${isBarcodeSeleted ? 'bg-green-500 text-white' : 'bg-white'}
                  `}
                            >
                                {isBarcodeSeleted && <BiCheck />}
                            </button>

                            <div className="flex justify-between">
                                <div>
                                    {/* Used Chip */}
                                    {false && (
                                        <span className="text-white bg-red-500 px-2 text-[11px] rounded-full inline-flex items-center py-[1px] font-medium">
                                            Used
                                        </span>
                                    )}
                                    <div className="text-[10px] text-slate-500">
                                        Barcode No. 
                                    </div>
                                    <div>{barcode?.barcodeNumber} </div>
                                   
                                    <div className="text-[10px] text-slate-500 mt-2">
                                        Upper Barcode No. 
                                    </div>
                                    <div>{barcode?.upperBarcodeNumber} </div>
                                </div>
                                {/* <div>
                                    <HiDotsVertical />
                                </div> */}
                            </div>

                            <div className="text-primary-main font-medium grow flex items-end">
                                {barcode?.productGroupLabel}
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    )
}

export default BarcodeDetailsCard
