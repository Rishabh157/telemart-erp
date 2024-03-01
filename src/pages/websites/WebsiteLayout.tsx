/// ==============================================
// Filename:WebsiteLayout.tsx
// Type: Layout Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { NavItemType } from 'src/navigation'
import {
    BiChevronsLeft,
    // BiCategory,
    // BiCheckboxSquare,
    // BiCategoryAlt,
} from 'react-icons/bi'
// import { MdOutlineCategory } from 'react-icons/md'
// import { BsBox, BsBoxes, BsBoxFill } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'
// import { FaObjectGroup } from 'react-icons/fa'
// import { HiOutlineReceiptTax } from 'react-icons/hi'
// import { CgOrganisation } from 'react-icons/cg'
// import { CiBarcode, CiLocationOn } from 'react-icons/ci'
import { RiPagesLine } from 'react-icons/ri'
import { TbBrandBlogger } from 'react-icons/tb'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { ThemeContext } from 'src/App'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const websitesNavigation: NavItemType[] = [
    {
        label: 'Websites',
        icon: CgWebsite,
        path: 'website',
        name: UserModuleNameTypes.NAV_WEBSITES,
    },
    {
        label: 'Website Blog',
        icon: TbBrandBlogger,
        path: 'website-blog',
        name: UserModuleNameTypes.NAV_WEBSITES_BLOG,
    },
    {
        label: 'Websites Page',
        icon: RiPagesLine,
        path: 'website-page',
        name: UserModuleNameTypes.NAV_WEBSITES_PAGES,
    },

    {
        label: 'Websites Tags',
        icon: RiPagesLine,
        path: 'website-tags',
        name: UserModuleNameTypes.NAV_WEBSITES_TAGS,
    },
]

type Props = {
    children?: React.ReactNode | string
}

const WebsitesLayout = ({ children }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev)
    }

    const location = useLocation()
    const navigate = useNavigate()

    const currentPath = `${location.pathname?.split('/')[2]}`
    const { theme } = React.useContext(ThemeContext)
    return (
        <div
            className={`flex h-screen w-screen relative ${
                theme === 'black' ? 'bg-invert' : ''
            }`}
        >
            {/* Side Navigation Bar */}
            <div
                className={`border-r border-slate-300 h-full transition-all duration-500 ease-in-out   bg-white  ${
                    isCollapsed
                        ? 'min-w-[50px] w-[50px]'
                        : 'min-w-[250px] w-[250px]'
                }`}
            >
                <VerticalNavBar
                    toggleCollapse={toggleCollapse}
                    isCollapsed={isCollapsed}
                    navigation={websitesNavigation}
                    isPathEqualtoNavItem={(navItem: any) =>
                        navItem.path === currentPath
                    }
                />
            </div>

            <div className="h-full grow ">
                {/* Header */}
                <div className="h-[55px] border-b border-slate-300 bg-white ">
                    <Header />
                </div>

                <div className="h-[calc(100%-55px)]  w-full overflow-auto bg-slate-50 ">
                    <Outlet />
                </div>
            </div>

            {/* BUTTON - Back to main menu */}
            <button
                type="button"
                onClick={() => navigate('/welcome')}
                className={`bg-primary-main absolute bottom-0 left-0 text-white py-1 flex px-3 gap-4 w-[250px] items-center text-sm ${
                    isCollapsed ? 'w-[50px]' : 'min-w-[250px]'
                }`}
            >
                <BiChevronsLeft className="text-2xl" />{' '}
                {!isCollapsed && <div> BACK TO MAIN MENU </div>}
            </button>
        </div>
    )
}

export default WebsitesLayout
