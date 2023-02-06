// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/barcodeSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useState } from "react";
import { BarcodeListResponse } from "src/models";
import { IconType } from "react-icons";
import { MdOutbond } from "react-icons/md";
import BarcodeDetailsCard from "./components/BarcodeDetailsCard/BarcodeDetailsCard";
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

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

export type Tabs = {
  label: string;
  icon: IconType;
  active?: boolean;
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
  //   const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("Barcode Group");

  const { page, rowsPerPage } = barcodeState;

  return (
    <div className="px-4 h-full flex flex-col gap-3">
      {/* Page Header */}
      <div className="flex justify-between items-center h-[55px]">
        <ATMPageHeading> Barcode </ATMPageHeading>
        <button
          onClick={() => {
            navigate("add-dealer");
          }}
          className="bg-primary-main text-white rounded py-1 px-3"
        >
          + Add Barcode
        </button>
      </div>

      {/* Tabs */}
      <div className="flex shadow rounded h-[45px] items-center gap-3 bg-white w-full overflow-auto px-3 ">
        {tabs.map((tab, tabIndex) => {
          const { label } = tab;
          return (
            <button
              type="button"
              onClick={() => setActiveTab(label)}
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
          page={page}
          rowCount={rows.length}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          isFilter
          //   onFilterClick={() => setIsFilterOpen(true)}
        />

        {/* Barcode Detail Cards */}
        <div className="grow overflow-auto  ">
          <BarcodeDetailsCard
            barcodeList={rows}
            selectedBarcodes={selectedBarcodes}
            onBarcodeSelect={onBarcodeSelect}
            onBarcodeClick={(barcode)=> {onBarcodeClick(barcode)}}
          />
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-300">
          <ATMPagination
            page={page}
            rowCount={rows.length}
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
