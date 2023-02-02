import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMBreadCrumbs, { BreadcrumbType } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/productCategorySlice";
import { AppDispatch, RootState } from "src/redux/store";
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
  columns: any[];
  rows: any[];
};

const ProductCategoryListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const productCategoryState: any = useSelector((state: RootState) => state.productCategory);
  // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const { page, rowsPerPage } = productCategoryState;
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Home Page",
      path: "/dashboard",
    },
    {
      label: "Product Category",
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
        <ATMPageHeading> Product Categories </ATMPageHeading>
        <button className="bg-primary-main text-white rounded py-1 px-3">
          {" "}
          + Add Product Category{" "}
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

export default ProductCategoryListing;
