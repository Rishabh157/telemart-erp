import React, { useState } from 'react'
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
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
import { useLocation, useNavigate } from 'react-router-dom'

const websitesNavigation: NavItemType[] = [
    {
        label: 'Websites',
        icon: CgWebsite,
        path: '/all-websites/website',
    },
    {
        label: 'Website Blog',
        icon: TbBrandBlogger,
        path: '/all-websites/website-blog',
    },
    {
        label: 'Websites Page',
        icon: RiPagesLine,
        path: '/all-websites/website-page',
    },
    // {
    //     label: 'Influencers Management',
    //     icon: RiPagesLine,
    //     path: '/all-websites/influencers-management'
    // },
    {
        label: 'Websites Tags',
        icon: RiPagesLine,
        path: '/all-websites/website-tags',
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

    const currentPath = `/all-websites/${location.pathname?.split('/')[2]}`
    const bgColorLocal = localStorage.getItem('themeColor') as string
    const bgColor = JSON.parse(bgColorLocal) as string | null
    return (
        <div
            className={`flex h-screen w-screen relative ${
                bgColor === 'black' ? 'bg-invert' : ''
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
                    {children}
                </div>
            </div>

            {/* BUTTON - Back to main menu */}
            <button
                type="button"
                onClick={() => navigate('/dashboard')}
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
