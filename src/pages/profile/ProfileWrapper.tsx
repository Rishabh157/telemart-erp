import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import Profile from "./Profile";
import { MdOutbond } from "react-icons/md";
import { Tabs } from "../outwardRequest/list/OutwardRequestListingWrapper";

type Props = {};
const tabs: Tabs[] = [
  {
    label: "My Profile",
    icon: MdOutbond,
  },
  {
    label: "Change Password",
    icon: MdOutbond,
  },
];
const ProfileWrappper = (props: Props) => {
  return (
    <>
      <SideNavLayout>
        <Profile tabs={tabs} />
      </SideNavLayout>
    </>
  );
};

export default ProfileWrappper;
