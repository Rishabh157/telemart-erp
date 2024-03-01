/// ==============================================
// Filename:Navigatio'dealer'
// Type: Nave Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { RxDashboard } from 'react-icons/rx'
import { FiUsers } from 'react-icons/fi'
import { TbBuildingWarehouse } from 'react-icons/tb'
import { HiOutlineTruck } from 'react-icons/hi'
import { FaRegHandshake } from 'react-icons/fa'
import { CiMemoPad, CiStickyNote } from 'react-icons/ci'
import { CgNotes } from 'react-icons/cg'
import {
    // MdCallReceived,
    MdOutlineBorderColor,
    MdPermMedia,
    MdWeb,
} from 'react-icons/md'
import { IoCallOutline } from 'react-icons/io5'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiBox, BiPurchaseTagAlt, BiTestTube } from 'react-icons/bi'
import { IconType } from 'react-icons'
import { TfiLayoutMediaOverlayAlt2 } from 'react-icons/tfi'
import { TiFlowSwitch } from 'react-icons/ti'
import { RiCustomerServiceLine } from 'react-icons/ri'
import { UserModuleNameTypes } from './utils/mediaJson/userAccess'
//import { TfiLayoutMediaOverlayAlt2 } from 'react-icons/tfi'
//import { BsFillCalendarCheckFill } from 'react-icons/bs'

// |-- Types --|
export type NavItemType = {
    label: string
    path: string
    icon: IconType
    name: string
}

export const navigation: NavItemType[] = [
    {
        label: 'Dashboard',
        icon: RxDashboard,
        path: '/dashboard',
        name: UserModuleNameTypes.NAV_DASHBOARD,
    },
    {
        label: 'Vendors',
        icon: HiOutlineTruck,
        path: '/vendors',
        name: UserModuleNameTypes.NAV_VENDOR,
    },
    {
        label: 'Dealers',
        icon: FaRegHandshake,
        path: '/dealers',
        name: UserModuleNameTypes.NAV_DEALER,
    },
    {
        label: 'Dealers-ratio',
        icon: TfiLayoutMediaOverlayAlt2,
        path: '/dealers-ratio',
        name: UserModuleNameTypes.NAV_DELEAR_RATIO,
    },
    {
        label: 'Users',
        icon: FiUsers,
        path: '/users',
        name: UserModuleNameTypes.NAV_USER,
    },
    {
        label: 'Warehouse',
        icon: TbBuildingWarehouse,
        path: '/warehouse',
        name: UserModuleNameTypes.NAV_WAREHOUSE,
    },
    {
        label: 'ASR',
        icon: CiMemoPad,
        path: '/asr',
        name: UserModuleNameTypes.NAV_ASR,
    },
    {
        label: 'PO',
        icon: BiPurchaseTagAlt,
        path: '/purchase-order',
        name: UserModuleNameTypes.NAV_PURCHASE_ORDER,
    },
    {
        label: 'GRN',
        icon: CiStickyNote,
        path: '/grn',
        name: UserModuleNameTypes.NAV_GRN,
    },
    {
        label: 'Inventory Flow',
        icon: TiFlowSwitch,
        path: '/inventory-flow',
        name: UserModuleNameTypes.NAV_INVENTORY_FLOW,
    },
    {
        label: 'Sale Order',
        icon: CgNotes,
        path: '/sale-order',
        name: UserModuleNameTypes.NAV_SALE_ORDER,
    },
    {
        label: 'RTV Transfer',
        icon: FiUsers,
        path: '/return-to-vendor',
        name: UserModuleNameTypes.NAV_RETURN_TO_VENDOR, // check
    },
    // {
    //     label: 'Inventory Management',
    //     icon: TfiLayoutMediaOverlayAlt2,
    //     path: '/inventory-management',
    //     name: 'InventoryManagement',
    // },
    {
        label: 'Warehouse Transfer',
        icon: TbBuildingWarehouse,
        path: '/warehouse-transfer',
        name: UserModuleNameTypes.NAV_WAREHOUSE_TRANSFER,
    },
    {
        label: 'Sample Transfer',
        icon: BiTestTube,
        path: '/warehouse-to-sample',
        name: UserModuleNameTypes.NAV_WAREHOUSE_TO_SAMPLE,
    },
    {
        label: 'WTC Transfer',
        icon: TbBuildingWarehouse,
        path: '/warehouse-to-company',
        name: UserModuleNameTypes.NAV_WAREHOUSE_TO_COMPANY_TRANSFER,
    },
    // {
    //     label: 'Inquiry',
    //     icon: MdCallReceived,
    //     path: '/inquiry',
    //     name: UserModuleNameTypes.NAV_INQUIRY,
    // },
    {
        label: 'Orders',
        icon: MdOutlineBorderColor,
        path: '/orders',
        name: UserModuleNameTypes.NAV_ORDER,
    },
    {
        label: 'Call',
        icon: IoCallOutline,
        path: '/call',
        name: UserModuleNameTypes.NAV_CALL,
    },
    {
        label: 'Customer Complain',
        icon: RiCustomerServiceLine,
        path: '/customer-complain',
        name: UserModuleNameTypes.NAV_CUSTOMER_COMPLAIN,
    },
    {
        label: 'Configurations',
        icon: AiOutlineSetting,
        path: '/configurations/attributes',
        name: UserModuleNameTypes.NAV_CONFIGURATION,
    },
    {
        label: 'Media',
        icon: MdPermMedia,
        path: '/media/channel-group',
        name: UserModuleNameTypes.NAV_MEDIA,
    },
    {
        label: 'Assets',
        icon: BiBox,
        path: '/assets/assets-request',
        name: UserModuleNameTypes.NAV_ASSETS,
    },

    {
        label: 'Dispositions',
        icon: AiOutlineSetting,
        path: '/dispositions/disposition-one',
        name: UserModuleNameTypes.NAV_DISPOSITION,
    },
    {
        label: 'All Website',
        icon: MdWeb,
        path: '/all-websites/website',
        name: UserModuleNameTypes.NAV_ALL_WEBSITE,
    },
]
