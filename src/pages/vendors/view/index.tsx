import React, { useState, useEffect } from "react";
import ViewLayout from "src/components/layouts/ViewLayout/ViewLayout";
import { BiBlock, BiMessageDetail } from "react-icons/bi";
import { AiOutlineRise } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import VendorInfoCard from "../components/vendorInfoCard/VendorInfoCard";
import ListItemCard from "../components/listItemCard/ListItemCard";
// import { useParams } from "react-router-dom";
import { BreadcrumbType } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import { useGetVendorsQuery } from "src/services/VendorServices";
import { useDispatch, useSelector } from "react-redux";
import { setAllItems } from "src/redux/slices/vendorSlice";
import { RootState } from "src/redux/store";

const tabsData = [
  {
    label: "General Information",
    icon: BsArrowRepeat,
    path: "general-information",
  },
  {
    label: "PO",
    icon: AiOutlineRise,
    path: "purchase-order",
  },
  {
    label: "Warehouse",
    icon: MdOutlinePeopleAlt,
    path: "warehouse",
  },
  {
    label: "RTV's",
    icon: MdOutlinePeopleAlt,
    path: "return-to-vendor",
  },
  {
    label: "Ledger",
    icon: MdOutlinePeopleAlt,
    path: "ledger",
  },
  {
    label: "Activity",
    icon: MdOutlinePeopleAlt,
    path: "activities",
  },
];

const actionIcons = [
  {
    icon: BiMessageDetail,
    onClick: () => {
      alert("Msg");
    },
    label: "Message",
  },
  {
    icon: BiBlock,
    onClick: () => {
      alert("Block");
    },
    label: "Block",
  },
];

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Vendors",
    path: "/vendors",
  },
  {
    label: "Current Vendor",
  },
];

const ViewVendor = () => {
  //   const { vendorId } = useParams();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { allItems }: any = useSelector((state: RootState) => state?.vendor);

  const { data, isLoading, isFetching } = useGetVendorsQuery("");
  const listData = allItems?.map((ele: any) => {
    return {
      vendorName: ele?.companyName,
      _id: ele?._id,
      mobile: ele?.registrationAddress?.phone,
    };
  });
  useEffect(() => {
    dispatch(setAllItems(data?.data));
  }, [dispatch, data, isLoading, isFetching]);
  return (
    <ViewLayout
      infoCard={
        <VendorInfoCard
          vendorData={{
            isActive: true,
            vendorName: "Himanshu",
            mobile: "8574859685",
          }}
          actionIcons={actionIcons}
        />
      }
      listData={listData}
      tabs={tabsData}
      renderListItem={(item: any) => (
        <ListItemCard item={item} key={item._id} />
      )}
      searchValue={searchValue}
      onSearch={(value) => setSearchValue(value)}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default ViewVendor;
