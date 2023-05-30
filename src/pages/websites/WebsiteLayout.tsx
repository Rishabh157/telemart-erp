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
import { TbAppsFilled } from 'react-icons/tb'
// import { FaObjectGroup } from 'react-icons/fa'
// import { HiOutlineReceiptTax } from 'react-icons/hi'
// import { CgOrganisation } from 'react-icons/cg'
// import { CiBarcode, CiLocationOn } from 'react-icons/ci'
// import { GrLanguage } from 'react-icons/gr'
// import { TbBinaryTree2 } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'

const websitesNavigation: NavItemType[] = [
    {
        label: 'Websites',
        icon: TbAppsFilled,
        path: '/all-websites/website',
    },
    {
        label: 'Websites-blog',
        icon: TbAppsFilled,
        path: '/all-websites/website-blog',
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

    const currentPath = `/all-website/${location.pathname?.split('/')[2]}`

    return (
        <div className="flex h-screen w-screen relative">
            {/* Side Navigation Bar */}
            <div
                className={`border-r border-slate-300 h-full transition-all duration-500   ${
                    isCollapsed ? 'w-[50px]' : 'min-w-[250px]'
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
                <div className="h-[55px] border-b border-slate-300  ">
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
