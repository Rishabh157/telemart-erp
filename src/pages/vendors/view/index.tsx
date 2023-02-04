import React, { useState } from "react";
import ViewLayout from "src/components/layouts/ViewLayout/ViewLayout";
import { BiBlock, BiMessageDetail } from "react-icons/bi";
import { AiOutlineRise } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import VendorInfoCard from "../components/vendorInfoCard/VendorInfoCard";
import ListItemCard from "../components/listItemCard/ListItemCard";
// import { useParams } from "react-router-dom";
import { BreadcrumbType } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";

const tabsData = [
  {
    label: "Orders",
    icon: BsArrowRepeat,
    path: "orders",
  },
  {
    label: "Activities",
    icon: AiOutlineRise,
    path: "activities",
  },
  {
    label: "Delivery Boys",
    icon: MdOutlinePeopleAlt,
    path: "delivery-boys",
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

const listData = Array(12)
  .fill("Vendor")
  .map((ele, index) => {
    return {
      vendorName: ele + " " + (index + 1),
      _id: `${index + 1}`,
      mobile: "7485968578",
    };
  });

const ViewVendor = () => {
//   const { vendorId } = useParams();
  const [searchValue, setSearchValue] = useState("");

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
