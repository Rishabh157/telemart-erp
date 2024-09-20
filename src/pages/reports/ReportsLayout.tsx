// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { NavItemType } from 'src/navigation'
import {
    BiChevronsLeft,
} from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { ThemeContext } from 'src/App'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const ReportsNavigation: NavItemType[] = [
    {
        label: 'Agent Details',
        icon: CgWebsite,
        path: 'agent-details/agent-hierarchy',
        name: UserModuleNameTypes.NAV_AGENT_DETAILS_REPORTS
    },
    {
        label: 'All Orders',
        icon: CgWebsite,
        path: 'all-orders',
        name: UserModuleNameTypes.NAV_ALL_ORDERS_REPORTS
    },
    {
        label: 'Carriers',
        icon: CgWebsite,
        path: 'carriers',
        name: UserModuleNameTypes.NAV_CARRIERS_ORDERS_REPORTS
    },
    {
        label: 'Dealer',
        icon: CgWebsite,
        path: 'dealer',
        name: UserModuleNameTypes.NAV_DEALER_REPORTS
    },
    {
        label: 'Dispatch',
        icon: CgWebsite,
        path: 'dispatch',
        name: UserModuleNameTypes.NAV_DISPATCH_REPORTS
    },
    {
        label: 'Distribution Master',
        icon: CgWebsite,
        path: 'distribution-master',
        name: UserModuleNameTypes.NAV_DISTRIBUTION_REPORTS
    },
    {
        label: 'FCP',
        icon: CgWebsite,
        path: 'fcp',
        name: UserModuleNameTypes.NAV_FCP_REPORTS
    },
    {
        label: 'FCP Details',
        icon: CgWebsite,
        path: 'fcp-details',
        name: UserModuleNameTypes.NAV_FCP_DETAILS_REPORTS
    },
    {
        label: 'NDR',
        icon: CgWebsite,
        path: 'ndr',
        name: UserModuleNameTypes.NAV_NDR_REPORTS
    },
    {
        label: 'Order Details',
        icon: CgWebsite,
        path: 'order-details',
        name: UserModuleNameTypes.NAV_ORDER_DETAILS_REPORTS
    },
    {
        label: 'Order Reports',
        icon: CgWebsite,
        path: 'order-reports',
        name: UserModuleNameTypes.NAV_ORDER_REPORTS
    },
    {
        label: 'Others',
        icon: CgWebsite,
        path: 'others',
        name: UserModuleNameTypes.NAV_OTHER_REPORTS
    },
    {
        label: 'Sales Report',
        icon: CgWebsite,
        path: 'sales-report',
        name: UserModuleNameTypes.NAV_SALES_REPORTS
    },
    {
        label: 'Scm Report',
        icon: CgWebsite,
        path: 'scm-report',
        name: UserModuleNameTypes.NAV_SCM_REPORTS
    },
    {
        label: 'Stock',
        icon: CgWebsite,
        path: 'stock',
        name: UserModuleNameTypes.NAV_STOCK_REPORTS
    },
    {
        label: 'Stock Report',
        icon: CgWebsite,
        path: 'stock-report',
        name: UserModuleNameTypes.NAV_STOCK_REPORTS_REPORTS
    },
    {
        label: 'System Report',
        icon: CgWebsite,
        path: 'system-report',
        name: UserModuleNameTypes.NAV_SYSTEM_REPORTS
    },
    {
        label: 'Warehouse Put Away',
        icon: CgWebsite,
        path: 'warehouse-put-away',
        name: UserModuleNameTypes.NAV_WAREHOUSE_PUT_AWAY_REPORTS
    },
]

type Props = {
    children?: React.ReactNode | string
}

const ReportsLayout = ({ children }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev)
    }

    const location = useLocation()
    const navigate = useNavigate()

    const currentPath = `${location.pathname?.split('/')[2]}`
    const { theme } = React.useContext(ThemeContext)

    return (
        <div className={`flex h-screen w-screen relative ${theme === 'black' ? 'bg-invert' : ''}`}>
            {/* Side Navigation Bar */}
            <div
                className={`border-r border-slate-300 h-full transition-all duration-500 ease-in-out bg-white ${isCollapsed
                    ? 'min-w-[50px] w-[50px]'
                    : 'min-w-[250px] w-[250px]'
                    }`}
            >
                <VerticalNavBar
                    toggleCollapse={toggleCollapse}
                    isCollapsed={isCollapsed}
                    navigation={ReportsNavigation}
                    isPathEqualtoNavItem={(navItem: any) =>
                        navItem.path === currentPath
                    }
                />
            </div>

            <div className="h-full grow">
                {/* Header */}
                <div className="h-[45px] border-b border-slate-300 bg-white">
                    <Header />
                </div>

                <div className="h-[calc(100%-55px)] w-full overflow-auto bg-slate-50 bg-transparent-body">
                    <Outlet />
                </div>
            </div>

            {/* BUTTON - Back to main menu */}
            <button
                type="button"
                onClick={() => navigate('/welcome')}
                className={`bg-primary-main absolute bottom-0 left-0 text-white py-1 flex px-3 gap-4 w-[250px] items-center text-sm ${isCollapsed ? 'w-[50px]' : 'min-w-[250px]'
                    }`}
            >
                <BiChevronsLeft className="text-2xl" />{' '}
                {!isCollapsed && <div> BACK TO MAIN MENU </div>}
            </button>
        </div>
    )
}

export default ReportsLayout
