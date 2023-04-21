import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { AttributesGroupListResponse } from "src/models/AttrbutesGroup.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, RootState } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import AttributesGroupListing from "./AttributesGroupListing";
import {
  useDeleteattributeGroupMutation,
  useGetAttributeGroupQuery,
} from "src/services/AttributeGroup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/attributesGroupSlice";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { showToast } from "src/utils";
import { Chip, Stack } from "@mui/material";

const AttributesGroupListingWrapper = () => {
  const navigate = useNavigate();
  const [deleteAttGroup] = useDeleteattributeGroupMutation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const columns: columnTypes[] = [
    {
      field: "groupeName",
      headerName: "Group Name",
      flex: "flex-[1_1_0%]",
      renderCell: (row: AttributesGroupListResponse) => (
        <span> {row.groupName} </span>
      ),
    },
    {
      field: "attributes",
      headerName: "Attributes ",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: AttributesGroupListResponse) => {
        const attribute = row.attributes?.map((ele) => {
          return ele.label;
        });
        return (
          <span>
            {" "}
            <Stack direction="row" spacing={1}>
              {attribute.map((ele, index) => {
                if (index < 9) {
                  return (
                    <Chip
                      label={ele}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  );
                }
                if (index === 10) {
                  return (
                    <Chip
                      label={"..."}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  );
                } else {
                  return null;
                }
              })}
            </Stack>{" "}
          </span>
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
                  navigate(`/configurations/attributes-group/${currentId}`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  showConfirmationDialog({
                    title: "Delete Attribute",
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
  const attributeGroupState: any = useSelector(
    (state: RootState) => state.attributesGroup
  );

  const { page, rowsPerPage, items, searchValue } = attributeGroupState;

  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();
  const { data, isFetching, isLoading } = useGetAttributeGroupQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: ["groupName", "attributes"],
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
      dispatch(setTotalItems(data?.totalItems || 4));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  const handleDelete = () => {
    setShowDropdown(false);
    deleteAttGroup(currentId).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Attribute group deleted successfully!");
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
        <AttributesGroupListing columns={columns} rows={items} />
      </ConfigurationLayout>
    </>
  );
};

export default AttributesGroupListingWrapper;
