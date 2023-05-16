import React, { useState } from 'react'
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { NavItemType } from 'src/navigation'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiChevronsLeft } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'

const configurationNavigation: NavItemType[] = [
    {
        label: 'Attributes',
        icon: AiOutlineSetting,
        path: '/configurations/attributes',
    },
    {
        label: 'Attributes Group',
        icon: AiOutlineSetting,
        path: '/configurations/attributes-group',
    },
    {
        label: 'Product Category',
        icon: AiOutlineSetting,
        path: '/configurations/product-category',
    },
    {
        label: 'Product Sub Category',
        icon: AiOutlineSetting,
        path: '/configurations/product-sub-category',
    },
    {
        label: 'Product Group',
        icon: AiOutlineSetting,
        path: '/configurations/product-group',
    },
    {
        label: 'Item',
        icon: AiOutlineSetting,
        path: '/configurations/item',
    },
    {
        label: 'Products',
        icon: AiOutlineSetting,
        path: '/configurations/products',
    },
    {
        label: 'Carton Box',
        icon: AiOutlineSetting,
        path: '/configurations/carton-box',
    },
    {
        label: 'Taxes',
        icon: AiOutlineSetting,
        path: '/configurations/taxes',
    },
    {
        label: 'Company',
        icon: AiOutlineSetting,
        path: '/configurations/company',
    },
    {
        label: 'Barcode',
        icon: AiOutlineSetting,
        path: '/configurations/barcode',
    },
    {
        label: 'Location',
        icon: AiOutlineSetting,
        path: '/configurations/location',
    },
    {
        label: 'Language',
        icon: AiOutlineSetting,
        path: '/configurations/language',
    },
    {
        label: 'Dealers Category',
        icon: AiOutlineSetting,
        path: '/configurations/dealers-category',
    },
    {
        label: 'Hierarchy (Org..*)',
        icon: AiOutlineSetting,
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
                    navigation={configurationNavigation}
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
                className="bg-primary-main absolute bottom-0 left-0 text-white py-1 flex px-3 gap-4 w-[250px] items-center text-sm "
            >
                <BiChevronsLeft className="text-2xl" /> BACK TO MAIN MENU
            </button>
        </div>
    )
}

export default ConfigurationLayout
