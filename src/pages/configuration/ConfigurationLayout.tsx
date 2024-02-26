/// ==============================================
// Filename:ConfigurationLayout.tsx
// Type: Layout Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

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
import { FaObjectGroup } from 'react-icons/fa'
import { CgOrganisation } from 'react-icons/cg'
import { CiBarcode, CiFaceSmile, CiLocationOn } from 'react-icons/ci'
import { TbBinaryTree2 } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'
import { TfiLayoutMediaOverlayAlt2 } from 'react-icons/tfi'

// |-- Internal Dependencies --|
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { ThemeContext } from 'src/App'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const configurationNavigation: NavItemType[] = [
    {
        label: 'Attributes',
        icon: TbAppsFilled,
        path: '/configurations/attributes',
        name: UserModuleNameTypes.NAV_ATTRIBUTE,
    },
    {
        label: 'Attributes Group',
        icon: FaObjectGroup,
        path: '/configurations/attributes-group',
        name: UserModuleNameTypes.NAV_ATTRIBUTE_GROUP,
    },
    {
        label: 'Product Category',
        icon: BiCategory,
        path: '/configurations/product-category',
        name: UserModuleNameTypes.NAV_PRODUCT_CATEGORY,
    },
    {
        label: 'Product Sub Category',
        icon: MdOutlineCategory,
        path: '/configurations/product-sub-category',
        name: UserModuleNameTypes.NAV_PRODUCT_SUB_CATEGORY,
    },
    {
        label: 'Product Group',
        icon: BsBoxes,
        path: '/configurations/product-group',
        name: UserModuleNameTypes.NAV_PRODUCT_GROUP,
    },
    {
        label: 'Scheme',
        icon: TfiLayoutMediaOverlayAlt2,
        path: '/configurations/scheme',
        name: UserModuleNameTypes.NAV_SCHEME,
    },
    {
        label: 'Item',
        icon: BiCheckboxSquare,
        path: '/configurations/item',
        name: UserModuleNameTypes.NAV_ITEMS,
    },
    {
        label: 'Products',
        icon: BsBox,
        path: '/configurations/products',
        name: UserModuleNameTypes.NAV_PRODUCTS,
    },
    {
        label: 'Carton Box',
        icon: BsBoxSeam,
        path: '/configurations/carton-box',
        name: UserModuleNameTypes.NAV_CARTON_BOX,
    },
    // {
    //     label: 'Taxes',
    //     icon: HiOutlineReceiptTax,
    //     path: '/configurations/taxes',
    // },
    {
        label: 'Company',
        icon: CgOrganisation,
        path: '/configurations/company',
        name: UserModuleNameTypes.NAV_COMPANY,
    },
    {
        label: 'Company Branch',
        icon: CgOrganisation,
        path: '/configurations/company-branch',
        name: UserModuleNameTypes.NAV_COMPANY_BRANCH,
    },
    {
        label: 'Barcode',
        icon: CiBarcode,
        path: '/configurations/barcode',
        name: UserModuleNameTypes.NAV_BARCODE,
    },
    {
        label: 'Location',
        icon: CiLocationOn,
        path: '/configurations/location',
        name: UserModuleNameTypes.NAV_LOCATION,
    },
    {
        label: 'Language',
        icon: CiFaceSmile,
        path: '/configurations/language',
        name: UserModuleNameTypes.NAV_LANGUAGE,
    },
    {
        label: 'Dealers Category',
        icon: BiCategoryAlt,
        path: '/configurations/dealers-category',
        name: UserModuleNameTypes.NAV_DEALERS_CATEGORY,
    },
     {
        label: 'Call Center',
        icon: BiCategoryAlt,
        path: '/configurations/callcenter-master',
        name: UserModuleNameTypes.NAV_CALL_CENTER,
    },

    {
        label: 'Hierarchy (Org..*)',
        icon: TbBinaryTree2,
        path: '/configurations/hierarchy',
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

    const currentPath = `/configurations/${location.pathname?.split('/')[2]}`
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

export default ConfigurationLayout
