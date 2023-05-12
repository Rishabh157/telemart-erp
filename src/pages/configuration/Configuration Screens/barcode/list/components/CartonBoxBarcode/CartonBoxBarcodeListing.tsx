// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/CartonBoxBarcodeSlice";
import { AppDispatch, RootState } from "src/redux/store";
import CartonBoxBarcodeDetailCard from "./CartonBoxBarcodeDetailCard";
import { useNavigate } from "react-router-dom";

type Props = {
  rows: any[];
  selectedCartonBoxBarcodes:barcodecardType[];
  onCartonBoxBarcodeSelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    barcode: barcodecardType,
    isBarcodeSeleted: boolean
  ) => void;
  onBarcodeClick?: () => void;
};
export type barcodecardType ={
  _id?:string
  label:String
  barcodenumber:String
  count?:string
}

const CartonBoxBarcodeListing = ({
  rows,
  selectedCartonBoxBarcodes,
  onCartonBoxBarcodeSelect,
  onBarcodeClick,
}: Props) => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();
  const cartonBoxBarcodeState: any = useSelector(
    (state: RootState) => state.cartonBoxBarcode
  );

  //  const [isFilterOpen, setIsFilterOpen] = useState(false);
const datas=cartonBoxBarcodeState?.items?.map((ele:any )=>{
  return{
    _id:ele._id,
    label:ele.cartonboxLabel,
    barcodenumber:ele.barcodeNumber,
    count:ele.count
  }

})

  const { page, rowsPerPage, totalItems, searchValue } = cartonBoxBarcodeState;
  const navigate=useNavigate()

  return (
    <div className="px-4 h-full flex flex-col gap-3">
      {/* Page Header */}

      <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">
        {/* Header */}
        <ATMTableHeader
          searchValue={searchValue}
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          isFilter
          onSearch={(newValue) => dispatch(setSearchValue(newValue))}
        />

        {/* Barcode Detail Cards */}
        <div className="grow overflow-auto  ">
          <CartonBoxBarcodeDetailCard
            barcodeList={datas}
            selectedCartonBoxBarcodes={selectedCartonBoxBarcodes}
            onCartonBoxBarcodeSelect={onCartonBoxBarcodeSelect}
            onBarcodeClick={() =>navigate("/configurations/barcode/carton-box-items" ,{state:{barcodeNumber
              :cartonBoxBarcodeState?.items[0].barcodeNumber
            }}) }
          />
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-300">
          <ATMPagination
            page={page}
            rowCount={totalItems}
            rows={rows}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
          />
        </div>
      </div>

      {/* {isFilterOpen && (
        <FilterDialogWarpper onClose={() => setIsFilterOpen(false)} />
      )} */}
    </div>
  );
};

export default CartonBoxBarcodeListing;
