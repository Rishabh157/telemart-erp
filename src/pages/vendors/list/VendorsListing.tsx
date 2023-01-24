import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/vendorSlice";
import { AppDispatch, RootState } from "src/redux/store";
import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
  columns: any[];
  rows: any[];
};

const VendorsListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const vendorState: any = useSelector((state: RootState) => state.vendor);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const { page, rowsPerPage } = vendorState;

  const tableMaxHeight =  `max-h-[calc(100% - ${(document.getElementById("bottom-pagination")?.offsetHeight || 0)  + (document.getElementById("table-header")?.offsetHeight || 0) }px)]`;
  
  console.log(tableMaxHeight)

  return (
    <div className="px-4 h-[calc(100vh-55px)]">
      {/* Page Header */}
      <div className="flex justify-between items-center h-[55px]">
        <ATMPageHeading> Vendors </ATMPageHeading>
        <button
          onClick={() => {
            navigate("add-vendor");
          }}
          className="bg-primary-main text-white rounded py-1 px-3"
        >
          {" "}
          + Add Vendor{" "}
        </button>
      </div>

      <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">
        {/*Table Header */}
        <div id="table-header" >
          <ATMTableHeader
            page={page}
            rowCount={rows.length}
            rowsPerPage={rowsPerPage}
            rows={rows}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
            isFilter
            onFilterClick={() => setIsFilterOpen(true)}
          />
        </div>

        {/* Table */}
        <div className={`overflow-auto `}>
          <ATMTable columns={columns} rows={rows} />
        </div>

        {/* Pagination */}
        <div
          id="bottom-pagination"
          className="h-[90px] flex items-center justify-end border-t border-slate-300"
        >
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
        <FilterDialogWarpper onClose={() => setIsFilterOpen(false)} />
      )}
    </div>
  );
};

export default VendorsListing;
