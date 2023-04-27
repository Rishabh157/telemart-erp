import React, { useEffect, useState } from "react";
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
  useDeleteVendorMutation,
  useGetPaginationVendorsQuery,
  // useGetVendorsQuery,
} from "src/services/VendorServices";
import VendorsListing from "./VendorsListing";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { showToast } from "src/utils";

const VendorsListingWrapper = () => {
  const navigate = useNavigate();
  const vendorState: any = useSelector((state: RootState) => state.vendor);
  const { page, rowsPerPage, searchValue, items } = vendorState;
  const [currentId, setCurrentId] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [deleteVendor] = useDeleteVendorMutation();

  const dispatch = useDispatch<AppDispatch>();

  const columns: columnTypes[] = [
    {
      field: "vendorCode",
      headerName: "Vendor Code",
      flex: "flex-[1_1_0%]",
      renderCell: (row: VendorsListResponse) => <span> {row.vendorCode} </span>,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: VendorsListResponse) => (
        <span> {row.companyName} </span>
      ),
    },
    {
      field: "companyType",
      headerName: "Company Type",
      flex: "flex-[1_1_0%]",
      renderCell: (row: VendorsListResponse) => (
        <span> {row.companyType} </span>
      ),
    },
    {
      field: "district",
      headerName: "District",
      flex: "flex-[1_1_0%]",
      renderCell: (row: VendorsListResponse) => (
        <span> {row?.registrationDistrictName} </span>
      ),
    },
    {
      field: "state",
      headerName: "State",
      flex: "flex-[1_1_0%]",
      renderCell: (row: VendorsListResponse) => (
        <span> {row?.registrationStateName} </span>
      ),
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
                  navigate(`${currentId}/general-information`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                View
              </button>
              <button
                onClick={() => {
                  navigate(`/vendors/edit-vendor/${currentId}`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  showConfirmationDialog({
                    title: "Delete vendor",
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
  const { data, isFetching, isLoading } = useGetPaginationVendorsQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: ["companyType", "ownerShipType", "vendorCode", "companyName"],
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
    deleteVendor(currentId).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Vendor deleted successfully!");
        } else {
          showToast("error", res?.data?.message);
        }
      } else {
        showToast("error", "Something went wrong, Please try again later");
      }
    });
  };
  return (
    <SideNavLayout>
      <VendorsListing columns={columns} rows={items} />
    </SideNavLayout>
  );
};

export default VendorsListingWrapper;
