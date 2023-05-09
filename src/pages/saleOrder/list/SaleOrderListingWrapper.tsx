import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { SaleOrderListResponse } from "src/models/SaleOrder.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/saleOrderSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetPaginationSaleOrderQuery } from "src/services/SalesOrderService";
import SaleOrderListing from "./SaleOrderListing";

const SaleOrderListingWrapper = () => {
  const salesOrderState: any = useSelector(
    (state: RootState) => state.saleOrder
  );
  const dispatch = useDispatch<AppDispatch>();
  const { page, rowsPerPage, searchValue, items } = salesOrderState; 
    

  const { data, isFetching, isLoading } = useGetPaginationSaleOrderQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: ["soNumber", "dealer"],
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: {},
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });
  //console.log(data)
  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      dispatch(setTotalItems(data?.totalItems || 4));
    } else {
      dispatch(setIsTableLoading(true));
    }
  }, [isLoading, isFetching, data, dispatch]);

  const columns: columnTypes[] = [
    {
      field: "soNumber",
      headerName: "So Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row: SaleOrderListResponse) => <span> {row?.soNumber} </span>,
    },
    {
      field: "dealer",
      headerName: "Dealer",
      flex: "flex-[1_1_0%]",
      renderCell: (row: SaleOrderListResponse) => <span> {row?.dealerLabel} </span>,
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: SaleOrderListResponse) => {
        return <span> {row?.warehouseLabel} </span>;
      },
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

 

  return (
    <>
      <SideNavLayout>
        <SaleOrderListing columns={columns} rows={items} />
      </SideNavLayout>
    </>
  );
};

export default SaleOrderListingWrapper;
