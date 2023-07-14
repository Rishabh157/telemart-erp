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
    MdCallReceived,
    MdOutlineBorderColor,
    MdPermMedia,
    MdWeb,
} from 'react-icons/md'
import { IoCallOutline } from 'react-icons/io5'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiBox, BiPurchaseTagAlt } from 'react-icons/bi'
import { IconType } from 'react-icons'
import { TfiLayoutMediaOverlayAlt2 } from 'react-icons/tfi'
import { UserModuleNameTypes } from './models/userAccess/UserAccess.model'
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
        name: 'Dashboard',
    },

    {
        label: 'Vendors',
        icon: HiOutlineTruck,
        path: '/vendors',
        name: UserModuleNameTypes.vendor,
    },
    {
        label: 'Dealers',
        icon: FaRegHandshake,
        path: '/dealers',
        name: UserModuleNameTypes.dealer,
    },
    {
        label: 'Dealers-ratio',
        icon: TfiLayoutMediaOverlayAlt2,
        path: '/dealers-ratio',
        name: 'DealerRatio',
    },
    {
        label: 'Users',
        icon: FiUsers,
        path: '/users',
        name: UserModuleNameTypes.user,
    },
    {
        label: 'Warehouse',
        icon: TbBuildingWarehouse,
        path: '/warehouse',
        name: UserModuleNameTypes.wareHouse,
    },

    {
        label: 'Sale Order',
        icon: CgNotes,
        path: '/sale-order',
        name: UserModuleNameTypes.saleOrder,
    },

    {
        label: 'ASR',
        icon: CiMemoPad,
        path: '/asr',
        name: UserModuleNameTypes.asr,
    },
    {
        label: 'PO',
        icon: BiPurchaseTagAlt,
        path: '/purchase-order',
        name: UserModuleNameTypes.purchaseOrder,
    },
    {
        label: 'GRN',
        icon: CiStickyNote,
        path: '/grn',
        name: UserModuleNameTypes.grn,
    },
    // {
    //     label: 'Inventory Management',
    //     icon: TfiLayoutMediaOverlayAlt2,
    //     path: '/inventory-management',
    //     name: 'InventoryManagement'
    // },
    {
        label: 'Inquiry',
        icon: MdCallReceived,
        path: '/inquiry',
        name: UserModuleNameTypes.inquiry,
    },
    {
        label: 'Orders',
        icon: MdOutlineBorderColor,
        path: '/orders',
        name: UserModuleNameTypes.order,
    },
    {
        label: 'Call',
        icon: IoCallOutline,
        path: '/call',
        name: UserModuleNameTypes.callerPage,
    },
    {
        label: 'Configurations',
        icon: AiOutlineSetting,
        path: '/configurations/attributes',
        name: UserModuleNameTypes.configuration,
    },
    {
        label: 'Media',
        icon: MdPermMedia,
        path: '/media/channel-group',
        name: UserModuleNameTypes.media,
    },
    {
        label: 'Assets',
        icon: BiBox,
        path: '/assets/assets-management',
        name: UserModuleNameTypes.assets,
    },

    {
        label: 'Dispositions',
        icon: AiOutlineSetting,
        path: '/dispositions/disposition-one    ',
        name: UserModuleNameTypes.disposition,
    },
    {
        label: 'All Website',
        icon: MdWeb,
        path: '/all-websites/website',
        name: UserModuleNameTypes.allWebsite,
    },
]
