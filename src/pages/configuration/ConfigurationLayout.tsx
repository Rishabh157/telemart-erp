// |-- Built-in Dependencies --|
import React, { useContext, useState } from 'react'

// |-- External Dependencies --|
import { NavItemType } from 'src/navigation'
import {
    BiChevronsLeft,
    BiCategory,
    BiCheckboxSquare,
    BiCategoryAlt,
} from 'react-icons/bi'
import { MdOutlineCategory } from 'react-icons/md'
import { BsBox, BsBoxes, BsBoxSeam } from 'react-icons/bs'
import { TbAppsFilled } from 'react-icons/tb'
import { FaObjectGroup, FaLanguage } from 'react-icons/fa'
import { CgOrganisation } from 'react-icons/cg'
import { CiBarcode, CiFaceSmile, CiLocationOn } from 'react-icons/ci'
import { TbBinaryTree2 } from 'react-icons/tb'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { TfiLayoutMediaOverlayAlt2 } from 'react-icons/tfi'
import { PiHandTapBold } from 'react-icons/pi'
import { MdEmojiTransportation } from 'react-icons/md'

// |-- Internal Dependencies --|
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { ThemeContext } from 'src/App'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const configurationNavigation: NavItemType[] = [
    {
        label: 'Attributes',
        icon: TbAppsFilled,
        path: 'attributes',
        name: UserModuleNameTypes.NAV_ATTRIBUTE,
    },
    {
        label: 'Attributes Group',
        icon: FaObjectGroup,
        path: 'attributes-group',
        name: UserModuleNameTypes.NAV_ATTRIBUTE_GROUP,
    },
    {
        label: 'Product Category',
        icon: BiCategory,
        path: 'product-category',
        name: UserModuleNameTypes.NAV_PRODUCT_CATEGORY,
    },
    {
        label: 'Product Sub Category',
        icon: MdOutlineCategory,
        path: 'product-sub-category',
        name: UserModuleNameTypes.NAV_PRODUCT_SUB_CATEGORY,
    },
    {
        label: 'Product Group',
        icon: BsBoxes,
        path: 'product-group',
        name: UserModuleNameTypes.NAV_PRODUCT_GROUP,
    },
    {
        label: 'Scheme',
        icon: TfiLayoutMediaOverlayAlt2,
        path: 'scheme',
        name: UserModuleNameTypes.NAV_SCHEME,
    },
    {
        label: 'Item',
        icon: BiCheckboxSquare,
        path: 'item',
        name: UserModuleNameTypes.NAV_ITEMS,
    },
    {
        label: 'Products',
        icon: BsBox,
        path: 'products',
        name: UserModuleNameTypes.NAV_PRODUCTS,
    },
    {
        label: 'Carton Box',
        icon: BsBoxSeam,
        path: 'carton-box',
        name: UserModuleNameTypes.NAV_CARTON_BOX,
    },
    {
        label: 'Company',
        icon: CgOrganisation,
        path: 'company',
        name: UserModuleNameTypes.NAV_COMPANY,
    },
    {
        label: 'Company Branch',
        icon: CiFaceSmile,
        path: 'company-branch',
        name: UserModuleNameTypes.NAV_COMPANY_BRANCH,
    },
    {
        label: 'Barcode',
        icon: CiBarcode,
        path: 'barcode',
        name: UserModuleNameTypes.NAV_BARCODE,
    },
    // {
    //     label: 'Courier Preference',
    //     icon: CiLocationOn,
    //     path: 'courier-preference',
    //     name: UserModuleNameTypes.NAV_COURIER_PREFERENCE,
    // },
    {
        label: 'Courier Master',
        icon: CiLocationOn,
        path: 'courier',
        name: UserModuleNameTypes.NAV_COURIER_PREFERENCE,
    },
    {
        label: 'Transport',
        icon: MdEmojiTransportation,
        path: 'transport',
        name: UserModuleNameTypes.NAV_TRANSPORT,
    },
    {
        label: 'GPO AWB',
        icon: PiHandTapBold,
        path: 'gpo-awb',
        name: UserModuleNameTypes.NAV_GPO_AWB_NUMBER,
    },
    {
        label: 'Location',
        icon: CiLocationOn,
        path: 'location',
        name: UserModuleNameTypes.NAV_LOCATION,
    },
    {
        label: 'Language',
        icon: FaLanguage,
        path: 'language',
        name: UserModuleNameTypes.NAV_LANGUAGE,
    },
    {
        label: 'Dealers Category',
        icon: BiCategoryAlt,
        path: 'dealers-category',
        name: UserModuleNameTypes.NAV_DEALERS_CATEGORY,
    },
    {
        label: 'Call Center',
        icon: BiCategoryAlt,
        path: 'callcenter-master',
        name: UserModuleNameTypes.NAV_CALL_CENTER,
    },
    {
        label: 'Hierarchy (Org..*)',
        icon: TbBinaryTree2,
        path: 'hierarchy',
        name: 'HIERARCHY',
    },
]

type Props = {
    children?: React.ReactNode | string
}

const ConfigurationLayout = ({ children }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev)
    }

    const location = useLocation()
    const navigate = useNavigate()

    const currentPath = `${location.pathname?.split('/')[2]}`
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

export default ConfigurationLayout
