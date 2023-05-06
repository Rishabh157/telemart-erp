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
} from "src/redux/slices/barcodeSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { BarcodeListResponse } from "src/models";
import BarcodeDetailsCard from "./components/BarcodeDetailsCard/BarcodeDetailsCard";

type Props = {
  rows: any[];
  selectedBarcodes: BarcodeListResponse[];
  onBarcodeSelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    barcode: BarcodeListResponse,
    isBarcodeSeleted: boolean
  ) => void;
  onBarcodeClick: (barcode: BarcodeListResponse) => void;
};

const BarcodeListing = ({
  rows,
  selectedBarcodes,
  onBarcodeSelect,
  onBarcodeClick,
}: Props) => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const barcodeState: any = useSelector((state: RootState) => state.barcode);

  const { page, rowsPerPage, totalItems, searchValue } = barcodeState;

  return (
    <div className="px-4 h-full flex flex-col gap-3">
      {/* Page Header */}
      <div className="flex justify-between items-center h-[55px]">
        <ATMPageHeading> Barcode </ATMPageHeading>
        <button
          onClick={() => {
            navigate("add");
          }}
          className="bg-primary-main text-white rounded py-1 px-3"
        >
          + Add Barcode
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
          <BarcodeDetailsCard
            barcodeList={rows}
            selectedBarcodes={selectedBarcodes}
            onBarcodeSelect={onBarcodeSelect}
            onBarcodeClick={(barcode) => {
              onBarcodeClick(barcode);
            }}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end border-t border-slate-300">
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

export default BarcodeListing;
