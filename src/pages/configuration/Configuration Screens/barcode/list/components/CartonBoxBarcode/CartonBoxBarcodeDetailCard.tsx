
import { BiCheck } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";



type BarcodeCardProps = {
  barcodeList?: barcodecardType[];
  selectedCartonBoxBarcodes?: barcodecardType[];
  onCartonBoxBarcodeSelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    barcode: barcodecardType,
    isBarcodeSeleted: boolean
  ) => void;
  onBarcodeClick: () => void;
};

export type barcodecardType ={
  _id?:string
  label:String
  barcodenumber:String
  count?:string
}
const CartonBoxBarcodeDetailCard = ({
  barcodeList,
  selectedCartonBoxBarcodes,
  onCartonBoxBarcodeSelect,
  onBarcodeClick,
}: BarcodeCardProps) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5 py-3 px-3">
      {barcodeList?.map(
        (barcode: barcodecardType, barcodeIndex: number) => {
          const isBarcodeSeleted =
            selectedCartonBoxBarcodes?.findIndex(
              (selected) => selected._id === barcode._id
            ) !== -1;
          return (
            <div
              key={barcode._id}
              onClick={() => {
              //  onBarcodeClick &&
                onBarcodeClick() 
              }}
              className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer ${
                false ? " border-red-500" : "border-slate-200"
              }`}
            >
              {/*Checkbox */}
              <button
                onClick={(e) =>{
                  // onCartonBoxBarcodeSelect && 
                  onCartonBoxBarcodeSelect(e, barcode, isBarcodeSeleted)}
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
                  ${isBarcodeSeleted ? "bg-green-500 text-white" : "bg-white"}
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
                  <div className="text-[12px] text-slate-500">Barcode No.</div>
                  <div>{barcode?.barcodenumber} </div>
                </div>
                <div>
                  <HiDotsVertical />
                </div>
              </div>
              <div className="flex">
                <div className="d-flex text-primary-main font-medium flex-col grow flex">
                  {barcode?.label}
                </div>
                {barcode?.count && (
                <div className=" d-flex text-primary-main font-medium grow flex flex-col items-end">
               count: {barcode?.count}
                </div>
                  )}
              </div>
              
            </div>
          );
        }
      )}
    </div>
  );
};

export default CartonBoxBarcodeDetailCard;
