// |-- External Dependencies --|
import { RxDashboard } from 'react-icons/rx'
import { FiUsers, FiPhoneCall } from 'react-icons/fi'
import { TbBuildingWarehouse, TbCloudDataConnection } from 'react-icons/tb'
import { HiOutlineTruck } from 'react-icons/hi'
import { FaRegHandshake, FaSitemap } from 'react-icons/fa'
import { CiMemoPad, CiStickyNote } from 'react-icons/ci'
import { CgNotes } from 'react-icons/cg'
import {
    MdOutlineBorderColor,
    MdPermMedia,
    MdWeb,
    MdOutlineBatchPrediction,
    MdOutlineLocalOffer,
    MdOutlineInventory,
} from 'react-icons/md'
import { IoCallOutline } from 'react-icons/io5'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiBox, BiPurchaseTagAlt, BiTestTube } from 'react-icons/bi'
import { IconType } from 'react-icons'
import { TfiLayoutMediaOverlayAlt2 } from 'react-icons/tfi'
import { TiFlowSwitch } from 'react-icons/ti'
import { RiCustomerServiceLine } from 'react-icons/ri'
import { GrCompliance, GrMultiple } from 'react-icons/gr'
import { GiRadarCrossSection } from 'react-icons/gi'
import { IoIosGitPullRequest } from 'react-icons/io'
import { RiPagesLine } from 'react-icons/ri'
import { UserModuleNameTypes } from './utils/mediaJson/userAccess'

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
        label: 'Dealers Inventory',
        icon: MdOutlineInventory,
        path: '/dealers-inventory',
        name: UserModuleNameTypes.NAV_DEALERS_INVENTORY,
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
        label: 'Mapping',
        icon: FaSitemap,
        path: '/mapping',
        name: UserModuleNameTypes.NAV_MULTI_MAPPING,
    },
    {
        label: 'Dealer To Dealer',
        icon: TbCloudDataConnection,
        path: '/dealer-to-dealer',
        name: UserModuleNameTypes.NAV_DEALER_TO_DEALER,
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
    {
        label: 'Multi Order Search',
        icon: GrMultiple,
        path: '/multi-order-search',
        name: UserModuleNameTypes.NAV_MUILTI_ORDER_SEARCH,
    },
    {
        label: 'Orders',
        icon: MdOutlineBorderColor,
        path: '/orders',
        name: UserModuleNameTypes.NAV_ORDER,
    },
    {
        label: 'Order Cancel Request',
        icon: FiPhoneCall,
        path: '/order-cancel-request',
        name: UserModuleNameTypes.NAV_ORDER_CANCEL_REQUEST,
    },
    {
        label: 'Batch',
        icon: MdOutlineBatchPrediction,
        path: '/batch',
        name: UserModuleNameTypes.NAV_BATCH_ORDER,
    },
    {
        label: 'Offer Apply NDR',
        icon: MdOutlineLocalOffer,
        path: '/offer-apply-ndr',
        name: UserModuleNameTypes.NAV_OFFER_APPLIED_NDR,
    },
    {
        label: 'Ecom Orders',
        icon: MdOutlineBorderColor,
        path: '/ecom-orders',
        name: UserModuleNameTypes.NAV_ORDER,
    },
    {
        label: 'Complaint',
        icon: GrCompliance,
        path: '/complain',
        name: UserModuleNameTypes.NAV_COMPLAINT,
    },
    {
        label: 'Call',
        icon: IoCallOutline,
        path: '/call',
        name: UserModuleNameTypes.NAV_CALL,
    },
    {
        label: 'Customer Complaint',
        icon: RiCustomerServiceLine,
        path: '/customer-complain',
        name: UserModuleNameTypes.NAV_CUSTOMER_COMPLAIN,
    },
    {
        label: 'WH First Call',
        icon: FiPhoneCall,
        path: '/warehouse-first-call-orders',
        // http://localhost:3000/calling-outcall?phone=9006666665&username=admin2 -> for dialar page
        name: UserModuleNameTypes.ACTION_WAREHOUSE_FIRST_CALL_ORDERS_TAB_LIST,
    },
    {
        label: 'Request',
        icon: IoIosGitPullRequest,
        path: '/request',
        name: UserModuleNameTypes.NAV_REQUEST,
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
        label: 'Page Master',
        icon: RiPagesLine,
        path: '/page-master/create-order',
        name: UserModuleNameTypes.NAV_PAGE_MASTER,
    },
    {
        label: 'Assets',
        icon: BiBox,
        path: '/assets/assets-request',
        name: UserModuleNameTypes.NAV_ASSETS,
    },
    {
        label: 'Dispositions',
        icon: GiRadarCrossSection,
        path: '/dispositions/disposition-one',
        name: UserModuleNameTypes.NAV_DISPOSITION,
    },
    {
        label: 'All Website',
        icon: MdWeb,
        path: '/all-websites/website',
        name: UserModuleNameTypes.NAV_ALL_WEBSITE,
    },
    {
        label: 'Reports',
        icon: MdWeb,
        path: '/reports/agent-details',
        name: UserModuleNameTypes.NAV_ALL_WEBSITE,
    },
]
