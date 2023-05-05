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
import { useState } from "react";
import { IconType } from "react-icons";
import { MdOutbond } from "react-icons/md";
import { CartonBoxBarcodeListResponse } from "src/models/CartonBoxBarcode.model";
import CartonBoxBarcodeDetailCard from "./CartonBoxBarcodeDetailCard";
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
  rows: any[];
  selectedCartonBoxBarcodes: CartonBoxBarcodeListResponse[];
  onCartonBoxBarcodeSelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    barcode: CartonBoxBarcodeListResponse,
    isBarcodeSeleted: boolean
  ) => void;
  onBarcodeClick: (barcode: CartonBoxBarcodeListResponse) => void;
  setActiveStage: React.Dispatch<React.SetStateAction<string>>;
};

export type Tabs = {
  label: string;
  icon: IconType;
  active?: boolean;
  component?: any;
};

const tabs: Tabs[] = [
  {
    label: "Product Barcode",
    icon: MdOutbond,
  },
  {
    label: "Carton Box Barcode",
    icon: MdOutbond,
  },
  {
    label: "Barcode Group",
    icon: MdOutbond,
  },
];

const CartonBoxBarcodeListing = ({
  rows,
  selectedCartonBoxBarcodes,
  onCartonBoxBarcodeSelect,
  onBarcodeClick,
  setActiveStage,
}: Props) => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartonBoxBarcodeState: any = useSelector(
    (state: RootState) => state.barcode
  );
  //  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("Carton Box Barcode");

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

      {/* Tabs */}
      <div className="flex shadow rounded h-[45px] items-center gap-3 bg-white w-full overflow-auto px-3 ">
        {tabs.map((tab, tabIndex) => {
          const { label } = tab;
          return (
            <button
              type="button"
              onClick={() =>{ setActiveTab(label); setActiveStage(label)}}
              key={tabIndex}
              className={`flex items-center gap-2 px-4 h-[calc(100%-14px)] rounded transition-all duration-500 ${
                activeTab === label
                  ? "bg-slate-100 text-primary-main "
                  : "text-slate-500"
              }`}
            >
              <div>
                {" "}
                <tab.icon className="text-xl" />{" "}
              </div>
              <div className="font-medium"> {label} </div>
            </button>
          );
        })}
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
