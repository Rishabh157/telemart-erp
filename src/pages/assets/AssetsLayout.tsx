// |-- Built-in Dependencies --|
import React, { useContext, useState } from 'react'

// |-- External Dependencies --|
import { NavItemType } from 'src/navigation'
import { BiChevronsLeft } from 'react-icons/bi'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineWebAsset, MdShareLocation } from 'react-icons/md'
import { TbCategory2, TbLayoutDistributeHorizontal } from 'react-icons/tb'
import { CiLocationOn } from 'react-icons/ci'

// |-- Internal Dependencies --|
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { ThemeContext } from 'src/App'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const asstesNavigation: NavItemType[] = [
    {
        label: 'Assets Request ',
        icon: MdOutlineWebAsset,
        path: 'assets-request',
        name: UserModuleNameTypes.NAV_ASSETS_REQUEST,
    },
    {
        label: 'Assets Category ',
        icon: TbCategory2,
        path: 'assets-category',
        name: UserModuleNameTypes.NAV_ASSETS_CATEGORY,
    },
    {
        label: 'Assets Location ',
        icon: CiLocationOn,
        path: 'assets-location',
        name: UserModuleNameTypes.NAV_ASSETS_LOCATION,
    },
    {
        label: 'Assets Relocation',
        icon: MdShareLocation,
        path: 'assets-relocation',
        name: UserModuleNameTypes.NAV_ASSETS_RELOCATION,
    },
    {
        label: 'Assets Allocation',
        icon: TbLayoutDistributeHorizontal,
        path: 'assets-allocation',
        name: UserModuleNameTypes.NAV_ASSETS_ALLOCATION,
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

    const currentPath = `${location.pathname?.split('/')[2]}`
    // const bgColorLocal = localStorage.getItem('themeColor') as string
    // const bgColor = JSON.parse(bgColorLocal) as string | null
    const { theme } = useContext(ThemeContext)

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
                <div className="h-[45px] border-b border-slate-300 bg-white  ">
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
