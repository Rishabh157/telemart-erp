import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
//import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
//import { showToast } from "src/utils";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { SaleOrderListResponse } from "src/models/SaleOrder.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/saleOrderSlice";
import { AppDispatch, RootState } from "src/redux/store";
// import {
//   useDeleteSalesOrderMutation,
//   useGetSalesOrderByDealerIdQuery,
// } from "src/services/SalesOrderService";
import { useGetSalesOrderByDealerIdQuery } from "src/services/SalesOrderService";
import SaleOrderListing from "src/pages/saleOrder/list/SaleOrderListing";
import { useParams } from "react-router-dom";

type Props = {};

const DealerSaleOrderTabWrapper = (props: Props) => {
  const salesOrderState: any = useSelector(
    (state: RootState) => state.saleOrder
  );
  const params = useParams();
  const dealerId: any = params.dealerId;
  //alert(dealerId);
  const dispatch = useDispatch<AppDispatch>();
  // const { page, rowsPerPage, searchValue, items } = salesOrderState;
  const { items } = salesOrderState;
  //const navigate = useNavigate();
  //const [currentId, setCurrentId] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  //const [deleteSaleOrder] = useDeleteSalesOrderMutation();

  const { data, isFetching, isLoading } =
    useGetSalesOrderByDealerIdQuery(dealerId);

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

  // const handleDelete = () => {
  //   setShowDropdown(false);
  //   deleteSaleOrder(currentId).then((res) => {
  //     if ("data" in res) {
  //       if (res?.data?.status) {
  //         showToast("success", "Sale Order deleted successfully!");
  //       } else {
  //         showToast("error", res?.data?.message);
  //       }
  //     } else {
  //       showToast("error", "Something went wrong, Please try again later");
  //     }
  //   });
  // };

  const columns: columnTypes[] = [
    {
      field: "soNumber",
      headerName: "So Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row: SaleOrderListResponse) => (
        <span> {row?.soNumber} </span>
      ),
    },
    {
      field: "dealer",
      headerName: "Dealer",
      flex: "flex-[1_1_0%]",
      renderCell: (row: SaleOrderListResponse) => (
        <span> {row?.dealerLabel} </span>
      ),
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
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
              //setCurrentId(row?._id);
            }}
            className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
          >
            {" "}
            <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{" "}
          </button>
          {/* {showDropdown && currentId === row?._id && (
            <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  navigate(`/sale-order/edit-sale-order/${row?._id}`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  showConfirmationDialog({
                    title: "Delete SaleOrder",
                    text: "Do you want to delete SaleOrder?",
                    showCancelButton: true,
                    next: (res: any) => {
                      return res.isConfirmed
                        ? handleDelete()
                        : setShowDropdown(false);
                    },
                  });
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )} */}
        </div>
      ),
      align: "end",
    },
  ];

  return (
    <div className="px-2 h-full shadow rounded border ">
      <SaleOrderListing columns={columns} rows={items} />
    </div>
  );
};

export default DealerSaleOrderTabWrapper;
