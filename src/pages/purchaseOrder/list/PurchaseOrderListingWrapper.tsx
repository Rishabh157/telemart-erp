import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PurchaseOrderListResponse } from "src/models/PurchaseOrder.model";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import PurchaseOrderListing from "./PurchaseOrderListing";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useGetPurchaseOrderQuery } from "src/services/PurchaseOrderService";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/PurchaseOrderSlice";

import { HiDotsHorizontal } from "react-icons/hi";

const PurchaseOrderListingWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productOrderState: any = useSelector(
    (state: RootState) => state.purchaseOrder
  );
  const { page, rowsPerPage, searchValue, items } = productOrderState;
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentId, setCurrentId] = useState("");


  const { data, isLoading, isFetching } = useGetPurchaseOrderQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: ["poCode", "wareHouseId"],
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

  const columns: columnTypes[] = [
    {
      field: "poCode",
      headerName: "PO Code",
      flex: "flex-[1_1_0%]",
      renderCell: (row: PurchaseOrderListResponse) => (
        <span> {row.poCode} </span>
      ),
    },
    {
      field: "itemName",
      headerName: "Item Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PurchaseOrderListResponse) => {
        return <span> {row.purchaseOrder.itemName} </span>;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PurchaseOrderListResponse) => {
        return <span> {row.purchaseOrder.quantity} </span>;
      },
    },
    {
      field: "rate",
      headerName: "rate",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PurchaseOrderListResponse) => {
        return <span> {row.purchaseOrder.rate} </span>;
      },
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PurchaseOrderListResponse) => {
        return <span> {row.vendorLabel} </span>;
      },
    },
    {
      field: "Ware House",
      headerName: "warer house",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PurchaseOrderListResponse) => {
        return <span> {row.warehouseLabel} </span>;
      },
    },
    {
      field: "estimateDeliveryDate",
      headerName: "Est. Delivery Date",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: PurchaseOrderListResponse) => {
        return <span> {row.purchaseOrder.estReceivingDate} </span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: "flex-[0.5_0.5_0%]",
      renderCell: (row: any) => (
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
              setCurrentId(row?._id);
            }}
            className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
          >
            {" "}
            <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{" "}
          </button>
          {showDropdown && currentId === row?._id && (
            <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  navigate(`/purchase-order/view/${currentId}`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                View
              </button>
              
                <button
                  onClick={() => {
                    navigate("/grn/add", {
                      state: {
                        poCode: row?.poCode,
                        itemId: row?.purchaseOrder.itemId,
                        itemName: row?.purchaseOrder.itemName,
                        quantity: row?.purchaseOrder.quantity,
                        companyId: row?.companyId,
                      },
                    });
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Generate GRN
                </button>
              
              {row?.isEditable && row?.isEditable === true && (
                <button
                  onClick={() => {
                    navigate(`/purchase-order/edit/${currentId}`);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      ),
      align: "end",
    },
  ];

  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      dispatch(setTotalItems(data?.totalItem || 4));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data, dispatch]);

  return (
    <>
      <SideNavLayout>
        <PurchaseOrderListing
          columns={columns}
          rows={items}
          setShowDropdown={setShowDropdown}
        />
      </SideNavLayout>
    </>
  );
};

export default PurchaseOrderListingWrapper;
