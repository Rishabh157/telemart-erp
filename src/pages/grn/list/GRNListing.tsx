import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/GRNSlice";
import { AppDispatch, RootState } from "src/redux/store";

type Props = {
  columns: any[];
  rows: any[];
};

const GRNListing = ({ columns, rows }: Props) => {
  const [selectedRows, setSelectedRows] = useState([])

  const dispatch = useDispatch<AppDispatch>();
  const grnState: any = useSelector((state: RootState) => state.grn);
  // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const { page, rowsPerPage } = grnState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Configuration",
      path: "/dashboard",
    },
    {
      label: "Goods Received Note",
    },
  ];

  return (
    <div className="px-4 h-full pt-3  ">
      {/* Breadcrumbs */}
      <div className="h-[30px]">
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      </div>
      {/* Page Header */}
      <div className="flex justify-between items-center h-[45px]">
        <ATMPageHeading> GRN </ATMPageHeading>
      </div>

      <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
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
        <ATMTable columns={columns} rows={rows}
           isCheckbox={true}
           selectedRows={selectedRows}
           onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
           extraClasses='max-h-[calc(100%-150px)] overflow-auto' />
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

export default GRNListing;
