import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import InwardInventory from "./InwardInventory";

type Props = {};

const InwardInventoryWrapper = (props: Props) => {
  return (
    <SideNavLayout>
      <InwardInventory />
    </SideNavLayout>
  );
};

export default InwardInventoryWrapper;
