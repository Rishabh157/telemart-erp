import React, { useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { VendorsListResponse } from "src/models";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/vendorSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  useGetPaginationVendorsQuery,
  useGetVendorsQuery,
} from "src/services/VendorServices";
import VendorsListing from "./VendorsListing";

const columns: columnTypes[] = [
  {
    field: "vendorCode",
    headerName: "Vendor Code",
    flex: "flex-[1_1_0%]",
    renderCell: (row: VendorsListResponse) => <span> {row.vendorCode} </span>,
  },
  {
    field: "vendorName",
    headerName: "Vendor Name",
    flex: "flex-[1_1_0%]",
  },
  {
    field: "mobile",
    headerName: "Phone",
    flex: "flex-[1_1_0%]",
  },
  {
    field: "district",
    headerName: "District",
    flex: "flex-[1_1_0%]",
    renderCell: (row: VendorsListResponse) => <span> {row.district} </span>,
  },
  {
    field: "state",
    headerName: "State",
    flex: "flex-[1_1_0%]",
    renderCell: (row: VendorsListResponse) => <span> {row.state} </span>,
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
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "1",
  },

  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "2",
  },
  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "3",
  },

  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "4",
  },

  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "5",
  },
  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "6",
  },
  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "7",
  },

  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "8",
  },
  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "9",
  },

  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "10",
  },
  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "11",
  },

  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "12",
  },
  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "13",
  },

  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "14",
  },
  {
    vendorName: "Drink Stop",
    vendorCode: "54864864",
    state: "M.P.",
    mobile: "1234456",
    district: "Indore",
    _id: "15",
  },
];

const VendorsListingWrapper = () => {
  const vendorState: any = useSelector((state: RootState) => state.vendor);
  const { page, rowsPerPage, searchValue } = vendorState;

  const dispatch = useDispatch<AppDispatch>();

  const { data, isFetching, isLoading } = useGetPaginationVendorsQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: ["dealerName", "dealerCode", "mobile"],
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: {
      start_date: "",
      end_date: "",
      dateFilterKey: "",
    },
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data || []));
      dispatch(setTotalItems(data?.totalItems || 4));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  return (
    <SideNavLayout>
      <VendorsListing columns={columns} rows={rows} />
    </SideNavLayout>
  );
};

export default VendorsListingWrapper;
