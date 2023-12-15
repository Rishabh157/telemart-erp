/// ==============================================
// Filename:AssetsLayout.tsx
// Type: Layout Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useContext, useState } from 'react'

// |-- External Dependencies --|
import { NavItemType } from 'src/navigation'
import { BiChevronsLeft } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineWebAsset, MdShareLocation } from 'react-icons/md'
import { TbCategory2, TbLayoutDistributeHorizontal } from 'react-icons/tb'
import { CiLocationOn } from 'react-icons/ci'

// |-- Internal Dependencies --|
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
import { ThemeContext } from 'src/App'

const asstesNavigation: NavItemType[] = [
    {
        label: 'Assets Request ',
        icon: MdOutlineWebAsset,
        path: '/assets/assets-management',
        name: UserModuleNameTypes.assetRequest,
    },
    {
        label: 'Assets Category ',
        icon: TbCategory2,
        path: '/assets/assets-category',
        name: UserModuleNameTypes.assetCategory,
    },
    {
        label: 'Assets Location ',
        icon: CiLocationOn,
        path: '/assets/assets-location',
        name: UserModuleNameTypes.assetLocation,
    },
    {
        label: 'Assets Relocation',
        icon: MdShareLocation,
        path: '/assets/assets-relocation',
        name: UserModuleNameTypes.assetRelocation,
    },
    {
        label: 'Assets Allocation',
        icon: TbLayoutDistributeHorizontal,
        path: '/assets/assets-allocation',
        name: UserModuleNameTypes.assetAllocation,
    },
]

type Props = {
    children?: React.ReactNode | string
}

const AsstesLayout = ({ children }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev)
    }

    const location = useLocation()
    const navigate = useNavigate()

    const currentPath = `/assets/${location.pathname?.split('/')[2]}`
    // const bgColorLocal = localStorage.getItem('themeColor') as string
    // const bgColor = JSON.parse(bgColorLocal) as string | null
    const { theme } = useContext(ThemeContext);

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
                    navigation={asstesNavigation}
                    isPathEqualtoNavItem={(navItem: any) =>
                        navItem.path === currentPath
                    }
                />
            </div>

            <div className="h-full grow ">
                {/* Header */}
                <div className="h-[55px] border-b border-slate-300 bg-white  ">
                    <Header />
                </div>

                <div className="h-[calc(100%-55px)]  w-full overflow-auto bg-slate-50 bg-transparent-body ">
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

export default AsstesLayout
