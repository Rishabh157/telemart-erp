import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/warehouseSlice";
import { AppDispatch, RootState } from "src/redux/store";
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
  columns: any[];
  rows: any[];
};

const WarehouseListing = ({ columns, rows }: Props) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const warehouseState: any = useSelector(
    (state: RootState) => state.warehouse
  );
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { page, rowsPerPage } = warehouseState;

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="flex justify-between items-center h-[55px]">
        <ATMPageHeading> Warehouse </ATMPageHeading>
        <button
          // onClick={() => navigate("/warehouse/add-warehouse")}
          className="bg-primary-main text-white rounded py-1 px-3"
        >
          {" "}
          + Add Warehouse{" "}
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
          // onFilterClick={() => setIsFilterOpen(true)}
        />

        {/* Table */}
        <div className="grow overflow-auto  ">
          <ATMTable
            columns={columns}
            rows={rows}
            isCheckbox={true}
            selectedRows={selectedRows}
            onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
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
       <FilterDialogWarpper
       onClose={()=> setIsFilterOpen(false)}
       />
      )} */}
    </div>
  );
};

export default WarehouseListing;
