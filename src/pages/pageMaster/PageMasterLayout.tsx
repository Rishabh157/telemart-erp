// |-- Built-in Dependencies --|
import React, { useContext, useState } from 'react'

// |-- External Dependencies --|
import { NavItemType } from 'src/navigation'
import { MdViewTimeline } from 'react-icons/md'
import { BiChevronsLeft } from 'react-icons/bi'
// |-- Internal Dependencies --|
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { ThemeContext } from 'src/App'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const configurationNavigation: NavItemType[] = [
    {
        label: 'Create Order',
        icon: MdViewTimeline,
        path: 'create-order',
        name: UserModuleNameTypes.NAV_CREATE_ORDER,
    },
    {
        label: 'Dealer Ndr',
        icon: MdViewTimeline,
        path: '/dealer-ndrcalling?phone=9009648665&username=test',
        // ?phone={{PHONENUMBER}}&user={{USERLOGIN}}&postalcode={{postalcode}}&verve=111&dstphone={{dnis}}&campaignId={{CAMPNAME}}
        name: UserModuleNameTypes.NAV_DEALER_NDR_PAGE,
    },
    {
        label: 'Sales',
        icon: MdViewTimeline,
        path: '/caller-page?phone=9009648665&username=test&campaign=DHUANDHAAR&didnumber=+914035279009&calltype=inbound&companyCode=SKYTEL',
        name: UserModuleNameTypes.NAV_SALES_PAGE,
    },
    {
        label: 'Customer Care',
        icon: MdViewTimeline,
        path: '/customer-care?phone=9009648665&username=test&campaign=DHUANDHAAR&didnumber=+914035279009&calltype=inbound&companyCode=SKYTEL',
        // https://out.onetelemart.com:445/calling/default.aspx?phone={{PHONENUMBER}}\&userlogin={{USERLOGIN}}\&postalcode=111\&dstphone={{dnis}}\&campaignId={{CAMPNAME}}
        name: UserModuleNameTypes.NAV_CUSTOMER_CARE_PAGE,
    },
    {
        label: 'Courier NDR',
        icon: MdViewTimeline,
        path: '/courier-ndr?phone=9009648665&username=test&postalcode=461220&verve=111&dstphone=7898787897&campaignId=DHUANADAAR&companyCode=SKYTEL',
        name: UserModuleNameTypes.NAV_COURIER_NDR_PAGE,
    },
    {
        label: 'GPO Out Call',
        icon: MdViewTimeline,
        path: '/calling-outcall?phone=9009648665&username=test',
        name: UserModuleNameTypes.NAV_COURIER_NDR_PAGE,
    },
]

type Props = {
    children?: React.ReactNode | string
}

const PageMasterLayout = ({ children }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev)
    }

    const location = useLocation()
    const navigate = useNavigate()

    const currentPath = `${location.pathname?.split('/')[2]}`
    const { theme } = useContext(ThemeContext)

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
                    navigation={configurationNavigation}
                    isPathEqualtoNavItem={(navItem: any) =>
                        navItem.path === currentPath
                    }
                />
            </div>

            <div className="h-full grow ">
                {/* Header */}
                <div className="h-[55px] border-b border-slate-300  bg-white">
                    <Header />
                </div>

                <div className="h-[calc(100%-55px)]  w-full overflow-auto bg-slate-50 bg-transparent-body ">
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

export default PageMasterLayout
