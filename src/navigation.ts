import { RxDashboard } from 'react-icons/rx'
import { FiUsers } from 'react-icons/fi'
import { TbBuildingWarehouse } from 'react-icons/tb'
import { HiOutlineTruck } from 'react-icons/hi'
import { FaRegHandshake } from 'react-icons/fa'
import { CiBoxes } from 'react-icons/ci'
import { CgNotes } from 'react-icons/cg'
import { MdOutlineBorderColor, MdPermMedia, MdWeb } from 'react-icons/md'
import { GrCompliance, GrNotes } from 'react-icons/gr'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiPurchaseTagAlt } from 'react-icons/bi'
import { IconType } from 'react-icons'
import { TfiLayoutMediaOverlayAlt2 } from 'react-icons/tfi'

export type NavItemType = {
    label: string
    path: string
    icon: IconType
}

export const navigation: NavItemType[] = [
    {
        label: 'Dashboard',
        icon: RxDashboard,
        path: '/dashboard',
    },

    {
        label: 'Vendors',
        icon: HiOutlineTruck,
        path: '/vendors',
    },
    {
        label: 'Dealers',
        icon: FaRegHandshake,
        path: '/dealers',
    },
    {
        label: 'Users',
        icon: FiUsers,
        path: '/users',
    },
    {
        label: 'Warehouse',
        icon: TbBuildingWarehouse,
        path: '/warehouse',
    },
    {
        label: 'Inventories',
        icon: CiBoxes,
        path: '/inventories',
    },
    {
        label: 'Sale Order',
        icon: CgNotes,
        path: '/sale-order',
    },
    {
        label: 'Outward Request',
        icon: IoDocumentTextOutline,
        path: '/outward-request',
    },
    {
        label: 'ASR',
        icon: GrCompliance,
        path: '/asr',
    },
    {
        label: 'PO',
        icon: BiPurchaseTagAlt,
        path: '/purchase-order',
    },
    {
        label: 'GRN',
        icon: GrNotes,
        path: '/grn',
    },
    {
        label: 'Scheme',
        icon: TfiLayoutMediaOverlayAlt2,
        path: '/scheme',
    },
    {
        label: 'Batch',
        icon: TfiLayoutMediaOverlayAlt2,
        path: '/batch',
    },
    {
        label: 'Orders',
        icon: MdOutlineBorderColor,
        path: '/orders',
    },
    {
        label: 'Configurations',
        icon: AiOutlineSetting,
        path: '/configurations/attributes',
    },
    {
        label: 'Media',
        icon: MdPermMedia,
        path: '/media/channel-group',
    },
    {
        label: 'Assets',
        icon: MdPermMedia,
        path: '/assets/assets-management',
    },

    {
        label: 'Dispositions',
        icon: AiOutlineSetting,
        path: '/dispositions/disposition-one    ',
    },
    {
        label: 'All Website',
        icon: MdWeb,
        path: '/all-websites/website',
    },
]
