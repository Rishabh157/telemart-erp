// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { BsPersonHeart } from 'react-icons/bs'
import { BiChevronsLeft, BiCategory } from 'react-icons/bi'
import { DiDart } from 'react-icons/di'
import { FaTape } from 'react-icons/fa'
import { SiGoogletagmanager } from 'react-icons/si'
import { MdEmojiEvents, MdMonitor, MdViewTimeline } from 'react-icons/md'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
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
        path: 'channel-group',
        name: UserModuleNameTypes.NAV_CHANNEL_GROUP,
    },
    {
        label: 'Channel Category',
        icon: BiCategory,
        path: 'channel-category',
        name: UserModuleNameTypes.NAV_CHANNEL_CATEGORY,
    },
    {
        label: 'Channel Management',
        icon: SiGoogletagmanager,
        path: 'channel',
        name: UserModuleNameTypes.NAV_CHANNEL_MANAGEMENT,
    },
    {
        label: 'DID Management',
        icon: DiDart,
        path: 'did',
        name: UserModuleNameTypes.NAV_DID_MANAGEMENT,
    },
    {
        label: 'Artist',
        icon: BsPersonHeart,
        path: 'artist',
        name: UserModuleNameTypes.NAV_ARTIST,
    },
    {
        label: 'Tape Management',
        icon: FaTape,
        path: 'tape',
        name: UserModuleNameTypes.NAV_TAPE_MANAGEMENT,
    },
    {
        label: 'Competitor',
        icon: MdEmojiEvents,
        path: 'competitor',
        name: UserModuleNameTypes.NAV_COMPETITOR,
    },
    {
        label: 'Slot Management',
        icon: MdViewTimeline,
        path: 'slot',
        name: UserModuleNameTypes.NAV_SLOT_MANAGEMENT,
    },
    {
        label: 'Create Order',
        icon: MdViewTimeline,
        path: 'create-order',
        name: UserModuleNameTypes.NAV_CREATE_ORDER,
    },
    {
        label: 'Dealer Ndr',
        icon: MdViewTimeline,
        path: 'dealer-ndrcalling?phone=9009648665&username=rishabh.gour',
        // ?phone={{PHONENUMBER}}&user={{USERLOGIN}}&postalcode={{postalcode}}&verve=111&dstphone={{dnis}}&campaignId={{CAMPNAME}}
        name: UserModuleNameTypes.NAV_DEALER_NDR,
    },
    {
        label: 'Inbound',
        icon: MdViewTimeline,
        path: 'caller-page?phone=9009648665&username=rishabh.gour&campaign=DHUANDHAAR&didnumber=6629300&calltype=inbound',
        name: UserModuleNameTypes.NAV_INBOUND,
    },
    {
        label: 'Customer Page',
        icon: MdViewTimeline,
        path: 'customer-care?phone=9009648665&username=rishabh.gour&campaign=DHUANDHAAR&didnumber=6629300&calltype=inbound',
        // https://out.onetelemart.com:445/calling/default.aspx?phone={{PHONENUMBER}}\&userlogin={{USERLOGIN}}\&postalcode=111\&dstphone={{dnis}}\&campaignId={{CAMPNAME}}
        name: UserModuleNameTypes.NAV_CUSTOMER_PAGE,
    },
    {
        label: 'Courier NDR',
        icon: MdViewTimeline,
        path: 'courier-ndr?phone=9009648665&username=rishabh.gour&postalcode=461220&verve=111&dstphone=7898787897&campaignId=DHUANADAAR',
        name: UserModuleNameTypes.NAV_INBOUND,
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
                className={`border-r border-slate-300 h-full transition-all duration-500 ease-in-out bg-white ${
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

            <div className="h-full grow">
                {/* Header */}
                <div className="h-[45px] border-b border-slate-300 bg-white ">
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
