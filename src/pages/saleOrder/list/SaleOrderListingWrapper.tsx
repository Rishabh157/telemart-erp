import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { SaleOrderListResponse } from "src/models/SaleOrder.model";
// import {
//   setIsTableLoading,
//   setItems,
//   setTotalItems,
// } from "src/redux/slices/saleOrderSlice";
// import { AppDispatch, RootState } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import SaleOrderListing from "./SaleOrderListing";

const columns: columnTypes[] = [
  {
    field: "soNumber",
    headerName: "SO Number",
    flex: "flex-[1_1_0%]",
    renderCell: (row: SaleOrderListResponse) => (
      <span className="text-primary-main "> {row.soNumber} </span>
    ),
  },
  {
    field: "dealer",
    headerName: "Dealer",
    flex: "flex-[1_1_0%]",
    renderCell: (row: SaleOrderListResponse) => <span> {row.dealer} </span>,
  },
  {
    field: "warehouse",
    headerName: "Warehouse",
    flex: "flex-[1.5_1.5_0%]",
    renderCell: (row: SaleOrderListResponse) => {
      return <span className="text-primary-main "> {row.warehouse} </span>;
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

const rows = [
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },

  {
    soNumber: "54864864",
    dealer: "Anuj joshi",
    warehouse: "Joshi's Warehouse",
    mobile: "8574859685",
  },
  
];

const SaleOrderListingWrapper = () => {
  // const vendorState: any = useSelector((state: RootState) => state.vendor);

  // const {  page, rowsPerPage } = vendorState;

  // const dispatch = useDispatch<AppDispatch>();
  // // const navigate = useNavigate();
  // const { data, isFetching, isLoading } = useGetVendorsQuery({
  //   limit: rowsPerPage,
  //   searchValue: "",
  //   params: ["dealerName", "dealerCode", "mobile"],
  //   page: page,
  //   filterBy: [
  //     {
  //       fieldName: "",
  //       value: [],
  //     },
  //   ],
  //   dateFilter: {
  //     start_date: "",
  //     end_date: "",
  //     dateFilterKey: "",
  //   },
  //   orderBy: "createdAt",
  //   orderByValue: -1,
  //   isPaginationRequired: true,
  // });

  // useEffect(() => {
  //   if (!isFetching && !isLoading) {
  //     dispatch(setIsTableLoading(false));
  //     dispatch(setItems(data || []));
  //     dispatch(setTotalItems(data?.totalItems || 4));
  //   } else {
  //     dispatch(setIsTableLoading(true));
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading, isFetching, data]);

  return (
    <>
      <SideNavLayout>
        <SaleOrderListing columns={columns} rows={rows} />
      </SideNavLayout>
    </>
  );
};

export default SaleOrderListingWrapper;
