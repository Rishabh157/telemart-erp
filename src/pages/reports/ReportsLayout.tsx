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

const ReportsNavigation: NavItemType[] = [
    {
        label: 'Agent Details',
        icon: CgWebsite,
        path: 'agent-details/agent-hierarchy',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'All Orders',
        icon: CgWebsite,
        path: 'all-orders',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Carriers',
        icon: CgWebsite,
        path: 'carriers',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Dealer',
        icon: CgWebsite,
        path: 'dealer',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Dispatch',
        icon: CgWebsite,
        path: 'dispatch',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Distribution Master',
        icon: CgWebsite,
        path: 'distribution-master',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'FCP',
        icon: CgWebsite,
        path: 'fcp',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'FCP Details',
        icon: CgWebsite,
        path: 'fcp-details',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'NDR',
        icon: CgWebsite,
        path: 'ndr',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Order Details',
        icon: CgWebsite,
        path: 'order-details',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Order Reports',
        icon: CgWebsite,
        path: 'order-reports',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Others',
        icon: CgWebsite,
        path: 'others',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Sales Report',
        icon: CgWebsite,
        path: 'sales-report',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Scm Report',
        icon: CgWebsite,
        path: 'scm-report',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Stock',
        icon: CgWebsite,
        path: 'stock',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Stock Report',
        icon: CgWebsite,
        path: 'stock-report',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'System Report',
        icon: CgWebsite,
        path: 'system-report',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
    },
    {
        label: 'Warehouse Put Away',
        icon: CgWebsite,
        path: 'warehouse-put-away',
        name: ""
        // name: UserModuleNameTypes.NAV_Reports
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
