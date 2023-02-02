import React from "react";
import { IconType } from "react-icons";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutbond } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { OutwardRequestListResponse } from "src/models/OutwardRequest.model";
// import {
//   setIsTableLoading,
//   setItems,
//   setTotalItems,
// } from "src/redux/slices/OutwardRequestSlice";
// import { AppDispatch, RootState } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import OutwardRequestListing from "./OutwardRequestListing";

export type Tabs = {
  label: string;
  icon: IconType;
  active?: boolean;
}

const columns: columnTypes[] = [
  {
    field: "productName",
    headerName: "Product Name",
    flex: "flex-[1_1_0%]",
    renderCell: (row: OutwardRequestListResponse) => (
      <span className="text-primary-main "> {row.productName} </span>
    ),
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: "flex-[1_1_0%]",
    renderCell: (row: OutwardRequestListResponse) => <span> {row.quantity} </span>,
  },
  {
    field: "address",
    headerName: "Address",
    flex: "flex-[1.5_1.5_0%]",
    renderCell: (row: OutwardRequestListResponse) => {
      return <span className="text-primary-main "> {row.address} </span>;
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
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },

  {
    productName: "Slim24",
    quantity: "1000",
    address: "123 Warehouse, Indore",
    mobile: "8574859685",
  },
  
];

const tabs : Tabs[] = [
  {
    label: "Dealer",
    icon: MdOutbond,
  },
  {
    label: "Customer",
    icon: MdOutbond,
  },
  {
    label: "RTV",
    icon: MdOutbond,
  },
  {
    label: "Warehouse",
    icon: MdOutbond,
  },
  {
    label: "Sample",
    icon: MdOutbond,
  },
  {
    label: "E-comm",
    icon: MdOutbond,
  },
  {
    label: "Replacements/Repackaging",
    icon: MdOutbond,
  },
  

]

const OutwardRequestListingWrapper = () => {
  // const vendorState: any = useSelector((state: RootState) => state.vendor);

  // const {  page, rowsPerPage } = vendorState;

  // const dispatch = useDispatch<AppDispatch>();
  // // const navigate = useNavigate();
  // const { data, isFetching, isLoading } = useGetVendorsQuery({
  //   limit: rowsPerPage,
  //   searchValue: "",
  //   params: ["quantityName", "quantityCode", "mobile"],
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
        <OutwardRequestListing columns={columns} rows={rows} tabs={tabs} />
      </SideNavLayout>
    </>
  );
};

export default OutwardRequestListingWrapper;
