import React, { useState } from "react";
import ViewLayout from "src/components/layouts/ViewLayout/ViewLayout";
import { BiBlock, BiMessageDetail } from "react-icons/bi";
import { AiOutlineRise } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import DealerInfoCard from "../components/dealerInfoCard/DealerInfoCard";
import ListItemCard from "../components/listItemCard/ListItemCard";
// import { useParams } from "react-router-dom";
import { BreadcrumbType } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";

const tabsData = [
  {
    label: "General Information",
    icon: BsArrowRepeat,
    path: "general-information",
  },
  {
    label: "Warehouse",
    icon: MdOutlinePeopleAlt,
    path: "warehouse",
  },
  {
    label: "Sale Order",
    icon: AiOutlineRise,
    path: "sale-order",
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
    label: "Dealers",
    path: "/dealers",
  },
  {
    label: "Current Dealer",
  },
];

const listData = Array(12)
  .fill("Dealer")
  .map((ele, index) => {
    return {
      dealerName: ele + " " + (index + 1),
      _id: `${index + 1}`,
      mobile: "7485968578",
    };
  });

const ViewDealer = () => {
  //   const { vendorId } = useParams();
  const [searchValue, setSearchValue] = useState("");

  return (
    <ViewLayout
      infoCard={
        <DealerInfoCard
          dealerData={{
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

export default ViewDealer;
