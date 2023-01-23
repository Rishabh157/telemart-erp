import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/outwardRequestSlice";
import { AppDispatch, RootState } from "src/redux/store";
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
  columns: any[];
  rows: any[];
};

const OutwardRequestListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const outwardRequestState: any = useSelector((state: RootState) => state.outwardRequest);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { page, rowsPerPage } = outwardRequestState;

  return (
    <div className="px-4 h-full  ">
      {/* Page Header */}
      <div className="flex justify-between items-center h-[55px]">
        <ATMPageHeading> Outward Requests </ATMPageHeading>
        <button className="bg-primary-main text-white rounded py-1 px-3">
          {" "}
          + Assign Courier{" "}
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
    </div>
  );
};

export default OutwardRequestListing;
