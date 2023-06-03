import React, { useState } from 'react'
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { NavItemType } from 'src/navigation'
import { BsPersonHeart } from 'react-icons/bs'
import { BiChevronsLeft, BiCategory } from 'react-icons/bi'
import { DiDart } from 'react-icons/di'
import { FaTape } from 'react-icons/fa'
import { GrChannel } from 'react-icons/gr'
import { SiGoogletagmanager } from 'react-icons/si'
import { MdEmojiEvents, MdViewTimeline, MdAnalytics } from 'react-icons/md'
import { TiFlowMerge } from 'react-icons/ti'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSetting } from 'react-icons/ai'

const mediaNavigation: NavItemType[] = [
    {
        label: 'Channel Group',
        icon: GrChannel,
        path: '/media/channel-group',
    },
    {
        label: 'Channel Category',
        icon: BiCategory,
        path: '/media/channel-category',
    },
    {
        label: 'Channel Management',
        icon: SiGoogletagmanager,
        path: '/media/channel',
    },
    {
        label: 'DID Management',
        icon: DiDart,
        path: '/media/did',
    },
    {
        label: 'Artist',
        icon: BsPersonHeart,
        path: '/media/artist',
    },
    {
        label: 'Tape Management',
        icon: FaTape,
        path: '/media/tape',
    },
    {
        label: 'Competitor Management',
        icon: MdEmojiEvents,
        path: '/media/competitor',
    },
    {
        label: 'Slot Management',
        icon: MdViewTimeline,
        path: '/media/slot',
    },
    {
        label: 'Analysis',
        icon: MdAnalytics,
        path: '/media/analysis',
    },

    {
        label: 'Flow',
        icon: TiFlowMerge,
        path: '/media/flow',
    },
    {
        label: 'Inbound',
        icon: AiOutlineSetting,
        path: '/media/inbound',
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
                    navigation={mediaNavigation}
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

export default MediaLayout
