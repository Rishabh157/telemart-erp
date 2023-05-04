import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { TbBuildingWarehouse } from "react-icons/tb";
import { HiOutlineTruck } from "react-icons/hi";
import { FaRegHandshake } from "react-icons/fa";
import { CiBoxes } from "react-icons/ci";
import { CgNotes } from "react-icons/cg";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import { IconType } from "react-icons";

export type NavItemType = {
  label: string;
  path: string;
  icon: IconType;
};

export const navigation: NavItemType[] = [
  {
    label: "Dashboard",
    icon: RxDashboard,
    path: "/dashboard",
  },

  {
    label: "Vendors",
    icon: HiOutlineTruck,
    path: "/vendors",
  },
  {
    label: "Dealers",
    icon: FaRegHandshake,
    path: "/dealers",
  },
  {
    label: "Users",
    icon: FiUsers,
    path: "/users",
  },
  {
    label: "Warehouse",
    icon: TbBuildingWarehouse,
    path: "/warehouse",
  },
  {
    label: "Inventories",
    icon: CiBoxes,
    path: "/inventories",
  },
  {
    label: "Sale Order",
    icon: CgNotes,
    path: "/sale-order",
  },
  {
    label: "Outward Request",
    icon: IoDocumentTextOutline,
    path: "/outward-request",
  },
  {
    label: "Configurations",
    icon: AiOutlineSetting,
    path: "/configurations/attributes",
  },
  {
    label: "ASR",
    icon: AiOutlineSetting,
    path: "/asr",
  },
  {
    label: "GRN",
    icon: AiOutlineSetting,
    path: "/grn",
  },
  {
    label: "Scheme",
    icon: AiOutlineSetting,
    path: "/scheme",
  },
];
