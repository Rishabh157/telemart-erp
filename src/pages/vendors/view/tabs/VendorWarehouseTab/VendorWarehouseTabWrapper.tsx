import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { WarehousesListResponse } from "src/models";
import WarehouseListing from "src/pages/warehouses/list/WarehousesListing";

const columns: columnTypes[] = [
  {
    field: "warehouseCode",
    headerName: "Warehouse Code",
    flex: "flex-[1_1_0%]",
    renderCell: (row: WarehousesListResponse) => (
      <span> {row.warehouseCode} </span>
    ),
  },
  {
    field: "warehouseName",
    headerName: "Warehouse Name",
    flex: "flex-[1.5_1.5_0%]",
    renderCell: (row: WarehousesListResponse) => {
      return <span className="text-primary-main "> {row.warehouseName} </span>;
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: "flex-[1_1_0%]",
    renderCell: (row: WarehousesListResponse) => (
      <span className="text-primary-main "> {row.country} </span>
    ),
  },
  {
    field: "state",
    headerName: "State",
    flex: "flex-[1.5_1.5_0%]",
    renderCell: (row: WarehousesListResponse) => {
      return <span className="text-primary-main "> {row.state} </span>;
    },
  },
  {
    field: "district",
    headerName: "District",
    flex: "flex-[1.5_1.5_0%]",
    renderCell: (row: WarehousesListResponse) => {
      return <span className="text-primary-main "> {row.district} </span>;
    },
  },
  {
    field: "pincode",
    headerName: "Pincode",
    flex: "flex-[1.5_1.5_0%]",
    renderCell: (row: WarehousesListResponse) => {
      return <span className="text-primary-main "> {row.pincode} </span>;
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
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
  {
    warehouseName: "Drink Stop",
    warehouseCode: "54864864",
    country: "India",
    district: "Indore",
    state: "MP",
    pincode: "452001",
  },
];

type Props = {};

const VendorWarehouseTabWrapper = (props: Props) => {
  return (
    <div className="px-2 h-full shadow rounded border " >
      <WarehouseListing columns={columns} rows={rows} />
    </div>
  );
};

export default VendorWarehouseTabWrapper;
