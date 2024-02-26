/// ==============================================
// Filename:MediaLayout.tsx
// Type: Layout Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { BsPersonHeart } from 'react-icons/bs'
import { BiChevronsLeft, BiCategory } from 'react-icons/bi'
import { DiDart } from 'react-icons/di'
import { FaTape } from 'react-icons/fa'
import { SiGoogletagmanager } from 'react-icons/si'
import { MdEmojiEvents, MdMonitor, MdViewTimeline } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
// import { AiOutlineSetting } from 'react-icons/ai's

// |-- Internal Dependencies --|
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { NavItemType } from 'src/navigation'
import { ThemeContext } from 'src/App'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const mediaNavigation: NavItemType[] = [
    {
        label: 'Channel Group',
        icon: MdMonitor,
        path: '/media/channel-group',
        name: UserModuleNameTypes.NAV_CHANNEL_GROUP,
    },
    {
        label: 'Channel Category',
        icon: BiCategory,
        path: '/media/channel-category',
        name: UserModuleNameTypes.NAV_CHANNEL_CATEGORY,
    },
    {
        label: 'Channel Management',
        icon: SiGoogletagmanager,
        path: '/media/channel',
        name: UserModuleNameTypes.NAV_CHANNEL_MANAGEMENT,
    },
    {
        label: 'DID Management',
        icon: DiDart,
        path: '/media/did',
        name: UserModuleNameTypes.NAV_DID_MANAGEMENT,
    },
    {
        label: 'Artist',
        icon: BsPersonHeart,
        path: '/media/artist',
        name: UserModuleNameTypes.NAV_ARTIST,
    },
    {
        label: 'Tape Management',
        icon: FaTape,
        path: '/media/tape',
        name: UserModuleNameTypes.NAV_TAPE_MANAGEMENT,
    },
    {
        label: 'Competitor',
        icon: MdEmojiEvents,
        path: '/media/competitor',
        name: UserModuleNameTypes.NAV_COMPETITOR,
    },
    {
        label: 'Slot Management',
        icon: MdViewTimeline,
        path: '/media/slot',
        name: UserModuleNameTypes.NAV_SLOT_MANAGEMENT,
    },
    {
        label: 'Inbound',
        icon: MdViewTimeline,
        path: '/media/caller-page?phone=9009648665&username=rishabh.gour&campaign=DHUANDHAAR&didnumber=6629300&calltype=inbound',
        name: 'INBOUND',
    },
    {
        label: 'Customer Page',
        icon: MdViewTimeline,
        path: '/media/customer-page?phone=9009648665&username=rishabh.gour&campaign=DHUANDHAAR&didnumber=6629300&calltype=inbound',
        name: 'INBOUND',
    },
]

type Props = {
    children?: React.ReactNode | string
}

const MediaLayout = ({ children }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev)
    }

    const location = useLocation()
    const navigate = useNavigate()

    const currentPath = `/media/${location.pathname?.split('/')[2]}`
    const { theme } = React.useContext(ThemeContext);

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
                    navigation={mediaNavigation}
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

                <div className="h-[calc(100%-55px)]  w-full overflow-auto bg-slate-50  bg-transparent-body">
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

export default MediaLayout
