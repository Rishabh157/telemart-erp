import { MdSpaceDashboard } from 'react-icons/md'
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaWarehouse } from 'react-icons/fa'
import {  MdInventory } from 'react-icons/md'
import { FcDataConfiguration } from 'react-icons/fc'

import { IconType } from 'react-icons'

type NavItemType = {
  label: string,
  path: string,
  icon: IconType,
  children?: {
    label: string,
    path: string,
    icon: IconType,
    children?: {
      label: string,
      path: string,
      icon: IconType,
    }[]
  }[]
}

export const navigation: NavItemType[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    label: "Orders",
    path: "/orders",
    icon: RiShoppingBag3Fill,
  },
  {
    label: "Dealers",
    path: "/dealers",
    icon: BsFillPeopleFill,
  },
  {
    label: "Users",
    path: "/users",
    icon: BsFillPeopleFill,

  },
  {
    label: "Vendors",
    path: "/vendors",
    icon: BsFillPeopleFill,
  },
  {
    label: "Warehouses",
    path: "/warehouse",
    icon: FaWarehouse,
  },
  {
    label: "Inventories",
    path: "/inventories",
    icon: MdInventory,
  },
  {
    label: "Configuration",
    path: "/configuration/companies",
    icon: FcDataConfiguration,
   
  },
  {
    label: "Test",
    path: "/test",
    icon: BsFillPeopleFill,
  },


]
