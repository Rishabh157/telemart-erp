import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { InventoryListResponse } from "src/models/Inventory.model";
// import {
//   setIsTableLoading,
//   setItems,
//   setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, RootState } from "src/redux/store";
import InventoryListing from "./InventoryListing";

const columns: columnTypes[] = [
  {
    field: "productName",
    headerName: "Product Name",
    flex: "flex-[1_1_0%]",
    renderCell: (row: InventoryListResponse) => (
      <span> {row.productName} </span>
    ),
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: "flex-[1_1_0%]",
    renderCell: (row: InventoryListResponse) => <span> {row.quantity} </span>,
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
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 1
  },

  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 2
  },
  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 3
  },

  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 4
  },
  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 5
  },

  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 6
  },
  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 6
  },

  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 7
  },
  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 8
  },

  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 9
  },
  {
    productName: "Alcoban",
    quantity: "1000",
    email: "him@gmail.com",
    mobile: "8574859685",
    _id : 10
  }, 
];

const InventoryListingWrapper = () => {
  // const vendorState: any = useSelector((state: RootState) => state.vendor);

  // const {  page, rowsPerPage } = vendorState;

  // const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();
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
        <InventoryListing columns={columns} rows={rows} />
      </SideNavLayout>
    </>
  );
};

export default InventoryListingWrapper;
