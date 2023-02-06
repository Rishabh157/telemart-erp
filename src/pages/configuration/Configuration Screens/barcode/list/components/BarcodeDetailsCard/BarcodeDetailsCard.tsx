import { BiCheck } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { BarcodeListResponse } from "src/models";

type BarcodeCardProps = {
  barcodeList: BarcodeListResponse[];
  selectedBarcodes: BarcodeListResponse[];
  onBarcodeSelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    barcode: BarcodeListResponse,
    isBarcodeSeleted: boolean
  ) => void;
  onBarcodeClick: (barcode: BarcodeListResponse) => void;
};

const BarcodeDetailsCard = ({
  barcodeList,
  selectedBarcodes,
  onBarcodeSelect,
  onBarcodeClick,
}: BarcodeCardProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  gap-5 py-3 px-3">
      {barcodeList.map((barcode: BarcodeListResponse, barcodeIndex: number) => {
        const isBarcodeSeleted =
          selectedBarcodes.findIndex(
            (selected) => selected._id === barcode._id
          ) !== -1;
        return (
          <div
            key={barcode._id}
            onClick={() => {onBarcodeClick(barcode)}}
            className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer ${
              barcode.is_used ? " border-red-500" : "border-slate-200"
            }`}
          >
            {/*Checkbox */}
            <button
              onClick={(e) => onBarcodeSelect(e, barcode, isBarcodeSeleted)}
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
                {barcode.is_used && (
                  <span className="text-white bg-red-500 px-2 text-[11px] rounded-full inline-flex items-center py-[1px] font-medium">
                    Used
                  </span>
                )}
                <div className="text-[12px] text-slate-500">Barcode No.</div>
                <div> 123456789 </div>
              </div>
              <div>
                <HiDotsVertical />
              </div>
            </div>

            <div className="text-primary-main font-medium grow flex items-end">
              Product Name
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarcodeDetailsCard;
