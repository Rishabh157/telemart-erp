import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage, setSearchValue } from "src/redux/slices/PurchaseOrderSlice";
import { AppDispatch, RootState } from "src/redux/store";
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
  columns: any[];
  rows: any[];
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

const PurchaseOrderListing = ({ columns, rows ,setShowDropdown}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRows, setSelectedRows] = useState([]);

  const purchaseOrderState: any = useSelector(
    (state: RootState) => state.purchaseOrder
  );
  // const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const navigate = useNavigate();

  const { page, rowsPerPage,searchValue } = purchaseOrderState;


  return (
    <div className="px-4 h-[calc(100vh-55px)] pt-3  ">      
      {/* Page Header */}
      <div className="flex justify-between items-center h-[55px]">
        <ATMPageHeading> Purchase Order </ATMPageHeading>
        <button
          onClick={() => navigate("/purchase-order/add")}
          className="bg-primary-main text-white rounded py-1 px-3"
        >
          + Add PO{" "}
        </button>
      </div>

      <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          searchValue={searchValue}
          rowCount={rows.length}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          isFilter
          onSearch={(newValue)=>dispatch(setSearchValue(newValue))}
          // onFilterClick={() => setIsFilterOpen(true)}
        />

        {/* Table */}
        <div className="grow overflow-auto  ">
        <ATMTable columns={columns} rows={rows}
           isCheckbox={true}
           selectedRows={selectedRows}
           onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
           extraClasses='max-h-full overflow-auto' 
           setShowDropdown={setShowDropdown}
           />
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

      {/* {isFilterOpen && (
       <FilterDialogWarpper
       onClose={()=> setIsFilterOpen(false)}
       />
      )} */}
    </div>
  );
};

export default PurchaseOrderListing;
