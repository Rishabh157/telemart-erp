import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-123456ux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import ProductGroupListing from "./ProductGroupListing";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/123456ux/slices/vendorSlice";
// import { AppDispatch, RootState } from "src/123456ux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";

const columns: columnTypes[] = [
  {
    field: "productGroupName",
    headerName: "Group Name",
    flex: "flex-[1_1_0%]",
    renderCell: (row: any) => <span> {row.productGroupName} </span>,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: "flex-[0.5_0.5_0%]",
    renderCell: (row: any) => (
      <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
        {" "}
        <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{" "}
      </button>
    ),
    align: "end",
  },
];

const rows = [
  {
    productGroupName: "Group 1",
    _id: 1,
  },

  {
    productGroupName: "Group 2",
    _id: 2,
  },
  {
    productGroupName: "Group 3",
    _id: 3,
  },
];

const ProductGroupListingWrapper = () => {
  return (
    <>
      <ConfigurationLayout>
        <ProductGroupListing columns={columns} rows={rows} />
      </ConfigurationLayout>
    </>
  );
};

export default ProductGroupListingWrapper;
