import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMBreadCrumbs, { BreadcrumbType } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/productSlice";
import { AppDispatch, RootState } from "src/redux/store";
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
  columns: any[];
  rows: any[];
};

const ProductsListing = ({ columns, rows }: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const productsState: any = useSelector((state: RootState) => state.products);
  // const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const navigate = useNavigate()

  const { page, rowsPerPage } = productsState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Home Page",
      path: "/dashboard",
    },
    {
      label: "Product",
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
        <ATMPageHeading> Products  </ATMPageHeading>
        <button
        onClick={()=> navigate('/configurations/products/add')} 
         className="bg-primary-main text-white rounded py-1 px-3"
         >
          {" "}
          + Add Products {" "}
        </button>
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

      {/* {isFilterOpen && (
       <FilterDialogWarpper
       onClose={()=> setIsFilterOpen(false)}
       />
      )} */}
    </div>
  );
};

export default ProductsListing;
