import React, { useContext, useState } from 'react'
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { NavItemType } from 'src/navigation'
import { BsPersonHeart } from 'react-icons/bs'
import { BiChevronsLeft } from 'react-icons/bi'
import { MdEmojiEvents } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { CiMonitor } from 'react-icons/ci'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
import { ThemeContext } from 'src/App'

const dispositionNavigation: NavItemType[] = [
    {
        label: 'Disposition One',
        icon: CiMonitor,
        path: '/dispositions/disposition-one',
        name: UserModuleNameTypes.dispositionOne,
    },
    {
        label: 'Disposition Two',
        icon: CiMonitor,
        path: '/dispositions/disposition-two',
        name: UserModuleNameTypes.dispositionTwo,
    },
    {
        label: 'Disposition Three',
        icon: CiMonitor,
        path: '/dispositions/disposition-three',
        name: UserModuleNameTypes.dispositionThree,
    },
    {
        label: 'IC-One',
        icon: BsPersonHeart,
        path: '/dispositions/initialcall-one',
        name: UserModuleNameTypes.initialCallerOne,
    },
    {
        label: 'IC-Two',
        icon: BsPersonHeart,
        path: '/dispositions/initialcall-two',
        name: UserModuleNameTypes.initialCallerTwo,
    },
    {
        label: 'IC-Three',
        icon: BsPersonHeart,
        path: '/dispositions/initialcall-three',
        name: UserModuleNameTypes.initialCallerThree,
    },
    {
        label: 'Disposition Complaint',
        icon: MdEmojiEvents,
        path: '/dispositions/disposition-complaint',
        name: UserModuleNameTypes.dispositionComplaint,
    },
]

type Props = {
    children?: React.ReactNode | string
}

const DispositionLayout = ({ children }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev)
    }

    const location = useLocation()
    const navigate = useNavigate()

    const currentPath = `/dispositions/${location.pathname?.split('/')[2]}`
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
                {' '}
                <VerticalNavBar
                    toggleCollapse={toggleCollapse}
                    isCollapsed={isCollapsed}
                    navigation={dispositionNavigation}
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

export default DispositionLayout
