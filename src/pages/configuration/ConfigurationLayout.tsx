import React, { useState } from 'react'
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { NavItemType } from 'src/navigation'
import {
    BiChevronsLeft,
    BiCategory,
    BiCheckboxSquare,
    BiCategoryAlt,
} from 'react-icons/bi'
import { MdOutlineCategory } from 'react-icons/md'
import { BsBox, BsBoxes, BsBoxFill } from 'react-icons/bs'
import { TbAppsFilled } from 'react-icons/tb'
import { FaObjectGroup } from 'react-icons/fa'
import { HiOutlineReceiptTax } from 'react-icons/hi'
import { CgOrganisation } from 'react-icons/cg'
import { CiBarcode, CiLocationOn } from 'react-icons/ci'
import { GrLanguage } from 'react-icons/gr'
import { TbBinaryTree2 } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'

const configurationNavigation: NavItemType[] = [
    {
        label: 'Attributes',
        icon: TbAppsFilled,
        path: '/configurations/attributes',
    },
    {
        label: 'Attributes Group',
        icon: FaObjectGroup,
        path: '/configurations/attributes-group',
    },
    {
        label: 'Product Category',
        icon: BiCategory,
        path: '/configurations/product-category',
    },
    {
        label: 'Product Sub Category',
        icon: MdOutlineCategory,
        path: '/configurations/product-sub-category',
    },
    {
        label: 'Product Group',
        icon: BsBoxes,
        path: '/configurations/product-group',
    },
    {
        label: 'Item',
        icon: BiCheckboxSquare,
        path: '/configurations/item',
    },
    {
        label: 'Products',
        icon: BsBox,
        path: '/configurations/products',
    },
    {
        label: 'Carton Box',
        icon: BsBoxFill,
        path: '/configurations/carton-box',
    },
    {
        label: 'Taxes',
        icon: HiOutlineReceiptTax,
        path: '/configurations/taxes',
    },
    {
        label: 'Company',
        icon: CgOrganisation,
        path: '/configurations/company',
    },
    {
        label: 'Barcode',
        icon: CiBarcode,
        path: '/configurations/barcode',
    },
    {
        label: 'Location',
        icon: CiLocationOn,
        path: '/configurations/location',
    },
    {
        label: 'Language',
        icon: GrLanguage,
        path: '/configurations/language',
    },
    {
        label: 'Dealers Category',
        icon: BiCategoryAlt,
        path: '/configurations/dealers-category',
    },
    // {
    //     label: 'Disposition One',
    //     icon: AiOutlineSetting,
    //     path: '/configurations/disposition-one',
    // },
    // {
    //     label: 'Disposition Two',
    //     icon: AiOutlineSetting,
    //     path: '/configurations/disposition-two',
    // },
    {
        label: 'Hierarchy (Org..*)',
        icon: TbBinaryTree2,
        path: '/configurations/hierarchy',
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
    const bgColorLocal = localStorage.getItem('themeColor') as string
    const bgColor = JSON.parse(bgColorLocal) as string | null

    return (
        <div
        className={`flex h-screen w-screen relative ${
            bgColor === 'black' ? 'bg-invert' : ''
        }`}
    >
            {/* Side Navigation Bar */}
            <div
                className={`border-r border-slate-300 h-full transition-all duration-500   ${
                    isCollapsed ? 'w-[50px]' : 'min-w-[250px]'
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
