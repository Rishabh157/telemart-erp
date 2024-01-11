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
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
import { ThemeContext } from 'src/App'

const configurationNavigation: NavItemType[] = [
    {
        label: 'Attributes',
        icon: TbAppsFilled,
        path: '/configurations/attributes',
        name: UserModuleNameTypes.attribute,
    },
    {
        label: 'Attributes Group',
        icon: FaObjectGroup,
        path: '/configurations/attributes-group',
        name: UserModuleNameTypes.attributeGroup,
    },
    {
        label: 'Product Category',
        icon: BiCategory,
        path: '/configurations/product-category',
        name: UserModuleNameTypes.productCategory,
    },
    {
        label: 'Product Sub Category',
        icon: MdOutlineCategory,
        path: '/configurations/product-sub-category',
        name: UserModuleNameTypes.productSubCategory,
    },
    {
        label: 'Product Group',
        icon: BsBoxes,
        path: '/configurations/product-group',
        name: UserModuleNameTypes.productGroup,
    },
    {
        label: 'Scheme',
        icon: TfiLayoutMediaOverlayAlt2,
        path: '/configurations/scheme',
        name: UserModuleNameTypes.scheme,
    },
    {
        label: 'Item',
        icon: BiCheckboxSquare,
        path: '/configurations/item',
        name: UserModuleNameTypes.item,
    },
    {
        label: 'Products',
        icon: BsBox,
        path: '/configurations/products',
        name: UserModuleNameTypes.product,
    },
    {
        label: 'Carton Box',
        icon: BsBoxSeam,
        path: '/configurations/carton-box',
        name: UserModuleNameTypes.cartonBox,
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
        name: UserModuleNameTypes.company,
    },
    {
        label: 'Company Branch',
        icon: CgOrganisation,
        path: '/configurations/company-branch',
        name: UserModuleNameTypes.company,
    },
    {
        label: 'Barcode',
        icon: CiBarcode,
        path: '/configurations/barcode',
        name: UserModuleNameTypes.barcode,
    },
    {
        label: 'Location',
        icon: CiLocationOn,
        path: '/configurations/location',
        name: UserModuleNameTypes.locations,
    },
    {
        label: 'Language',
        icon: CiFaceSmile,
        path: '/configurations/language',
        name: UserModuleNameTypes.language,
    },
    {
        label: 'Dealers Category',
        icon: BiCategoryAlt,
        path: '/configurations/dealers-category',
        name: UserModuleNameTypes.dealerCategory,
    },
     {
        label: 'Call Center',
        icon: BiCategoryAlt,
        path: '/configurations/callcenter-master',
        name: UserModuleNameTypes.callCenterMaster,
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
