// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/CartonBoxBarcodeSlice";
import { AppDispatch, RootState } from "src/redux/store";

import { CartonBoxBarcodeListResponse } from "src/models/CartonBoxBarcode.model";
import CartonBoxBarcodeDetailCard from "./CartonBoxBarcodeDetailCard";

type Props = {
  rows: any[];
  selectedCartonBoxBarcodes: CartonBoxBarcodeListResponse[];
  onCartonBoxBarcodeSelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    barcode: CartonBoxBarcodeListResponse,
    isBarcodeSeleted: boolean
  ) => void;
  onBarcodeClick: (barcode: CartonBoxBarcodeListResponse) => void;
};

const CartonBoxBarcodeListing = ({
  rows,
  selectedCartonBoxBarcodes,
  onCartonBoxBarcodeSelect,
  onBarcodeClick,
}: Props) => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartonBoxBarcodeState: any = useSelector(
    (state: RootState) => state.cartonBoxBarcode
  );
  //  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { page, rowsPerPage, totalItems, searchValue } = cartonBoxBarcodeState;

  return (
    <div className="px-4 h-full flex flex-col gap-3">
      {/* Page Header */}
      <div className="flex justify-between items-center h-[55px]">
        <ATMPageHeading> Barcode </ATMPageHeading>
        <button
          onClick={() => {
            navigate("/configurations/barcode/carton-box/add");
          }}
          className="bg-primary-main text-white rounded py-1 px-3"
        >
          + Add Carton BoxBarcode
        </button>
      </div>

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
            cardBoxBarcodeList={rows}
            selectedCartonBoxBarcodes={selectedCartonBoxBarcodes}
            onCartonBoxBarcodeSelect={onCartonBoxBarcodeSelect}
            onBarcodeClick={(barcode) => {
              onBarcodeClick(barcode);
            }}
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
