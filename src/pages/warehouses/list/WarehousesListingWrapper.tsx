import React, { useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { WarehousesListResponse } from "src/models/Warehouse.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/vendorSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetVendorsQuery } from "src/services/VendorServices";
import WarehouseListing from "./WarehousesListing";

const columns: columnTypes[] = [
    {
        field: "warehouseCode",
        headerName: "Warehouse Code",
        flex: "flex-[1_1_0%]",
        renderCell: (row: WarehousesListResponse) => <span> {row.warehouseCode} </span>,
    },
    {
        field: "warehouseName",
        headerName: "Warehouse Name",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: WarehousesListResponse) => {
            return <span> {row.warehouseName} </span>;
        },
    },
    {
        field: "country",
        headerName: "Country",
        flex: "flex-[1_1_0%]",
        renderCell: (row: WarehousesListResponse) => (
            <span> {row.country} </span>
        ),
    },
    {
        field: "state",
        headerName: "State",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: WarehousesListResponse) => {
            return <span> {row.state} </span>;
        },
    },
    {
        field: "district",
        headerName: "District",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: WarehousesListResponse) => {
            return <span> {row.district} </span>;
        },
    },
    {
        field: "pincode",
        headerName: "Pincode",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: WarehousesListResponse) => {
            return <span> {row.pincode} </span>;
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
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 1
    },
    {
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 2
    }, {
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 3
    },
    {
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 4
    }, {
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 5
    },
    {
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 6
    }, {
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 7

    },
    {
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 8
    }, {
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 9
    },
    {
        warehouseName: "Drink Stop",
        warehouseCode: "54864864",
        country: "India",
        district: "Indore",
        state: "MP",
        pincode: "452001",
        _id : 10

    }, 
];

const DealersListingWrapper = () => {
  const vendorState: any = useSelector((state: RootState) => state.vendor);

  const { page, rowsPerPage } = vendorState;

  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();
  const { data, isFetching, isLoading } = useGetVendorsQuery({
    limit: rowsPerPage,
    searchValue: "",
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
    <>
      <SideNavLayout>
        <div className="px-4 h-[calc(100vh-55px)]">
          <WarehouseListing columns={columns} rows={rows} />
        </div>
      </SideNavLayout>
    </>
  );
};

export default DealersListingWrapper;
