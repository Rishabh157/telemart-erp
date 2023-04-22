import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ASRListResponse } from "src/models/ASR.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import ASRListing from "./ASRListing";
import { useDeleteAsrMutation, useGetAsrQuery } from "src/services/AsrService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/ASRSlice";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { showToast } from "src/utils";

const ASRListingWrapper = () => {
  const navigate = useNavigate();
  const AsrState: any = useSelector((state: RootState) => state.asr);
  const [deleteAsr] = useDeleteAsrMutation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const columns: columnTypes[] = [
    {
      field: "itemName",
      headerName: "Item Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: ASRListResponse) => (
        <span>
          {row.asrDetails?.map((ele) => {
            return (
              <>
                <span>{ele?.productName}</span>
                {", "}
              </>
            );
          })}
        </span>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: ASRListResponse) => {
        return (
          <>
            {" "}
            <span>
              {row.asrDetails?.map((ele) => {
                return (
                  <>
                    <span>{ele?.quantity}</span>
                    {", "}
                  </>
                );
              })}
            </span>
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: "flex-[0.5_0.5_0%]",
      renderCell: (row: any) => (
        <div className="relative">
          <button
            onClick={() => {
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
                  navigate(`/configurations/asr/${currentId}`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  showConfirmationDialog({
                    title: "Delete ARS",
                    text: "Do you want to delete",
                    showCancelButton: true,
                    next: (res) => {
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
          )}
        </div>
      ),
      align: "end",
    },
  ];
  const { page, rowsPerPage, searchValue, items } = AsrState;

  const dispatch = useDispatch<AppDispatch>();
  // // const navigate = useNavigate();
  const { data, isFetching, isLoading } = useGetAsrQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: ["asrDetails.productName"],
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

  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      dispatch(setTotalItems(data?.totalItem || 4));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  const handleDelete = () => {
    setShowDropdown(false);
    deleteAsr(currentId).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Asr deleted successfully!");
        } else {
          showToast("error", res?.data?.message);
        }
      } else {
        showToast("error", "Something went wrong, Please try again later");
      }
    });
  };
  return (
    <>
      <ConfigurationLayout>
        <ASRListing columns={columns} rows={items} />
      </ConfigurationLayout>
    </>
  );
};

export default ASRListingWrapper;
