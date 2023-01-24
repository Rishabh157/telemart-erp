import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/dealerSlice";
import { AppDispatch, RootState } from "src/redux/store";
import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
  columns: any[];
  rows: any[];
};

const DealersListing = ({ columns, rows }: Props) => {

  const navigate= useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const dealerState: any = useSelector((state: RootState) => state.dealer);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { page, rowsPerPage } = dealerState;

  return (
    <div className="px-4 h-[calc(100vh-55px)]  ">
      {/* Page Header */}
      <div className="flex justify-between items-center h-[55px]">
        <ATMPageHeading> Dealers </ATMPageHeading>
        <button 
        onClick={()=> {navigate("add-dealer")}}
        className="bg-primary-main text-white rounded py-1 px-3"
        >
          + Add Dealers
        </button>
      </div>

      <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">

        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={rows.length}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          isFilter
          onFilterClick={() => setIsFilterOpen(true)}
        />

        {/* Table */}
        <div className="grow overflow-auto  ">
          <ATMTable columns={columns} rows={rows} />
        </div>

        {/* Pagination */}
        <div className="h-[90px] flex items-center justify-end border-t border-slate-300">
          <ATMPagination
            page={page}
            rowCount={rows.length}
            rows={rows}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
          />
        </div>
      </div>

      {isFilterOpen && (
       <FilterDialogWarpper
       onClose={()=> setIsFilterOpen(false)}
       />
      )}
    </div>
  );
};

export default DealersListing;
