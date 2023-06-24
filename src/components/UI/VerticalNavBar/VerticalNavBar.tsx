import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavItemType } from 'src/navigation'

type Props = {
    toggleCollapse: () => void
    isCollapsed: boolean
    navigation: NavItemType[]
    isPathEqualtoNavItem?: (navItem: any) => boolean
    bgColor?: any
    setBgColor?: any
}

const VerticalNavBar = ({
    toggleCollapse,
    isCollapsed,
    navigation,
    isPathEqualtoNavItem = (navItem) => false,
    bgColor,
    setBgColor,
}: Props) => {
    const navigate = useNavigate()
    return (
        <div className="h-full  overflow-auto bg-white ">
            {/* Logo & Menu Icon */}

            <div
                className={`flex px-3 py-2 items-center  bg-white sticky top-0 ${
                    isCollapsed ? 'justify-between' : 'justify-between'
                }`}
            >
                {/* Logo */}
                {!isCollapsed && (
                    <div className="font-semibold text-xl  ">
                        <img
                            src="/telemartLogo.png"
                            alt="Logo"
                            className="h-full w-[130px]"
                        />
                    </div>
                )}

                {/* Menu Icon */}
                <div
                    onClick={toggleCollapse}
                    className="flex flex-col gap-1 cursor-pointer p-1  "
                >
                    <div
                        className={`h-[1.5px] w-5 bg-slate-500 transition-all duration-500    ${
                            !isCollapsed &&
                            'origin-top-left translate-x-[1.5px]  rotate-45 -mt-3'
                        }`}
                    ></div>
                    {isCollapsed && (
                        <div className={`h-[1.5px] w-5 bg-slate-500  `}> </div>
                    )}
                    <div
                        className={`h-[1.5px] w-5 bg-slate-500 transition-all duration-500  ${
                            !isCollapsed &&
                            'origin-top-left translate-y-2  -rotate-45 '
                        }`}
                    ></div>
                </div>

                {/* <div onClick={toggleCollapse} className="text-xl text-slate-500">
            <FiMenu />
          </div> */}
            </div>

            {/* Navigations */}
            <div className="px-3 py-5 flex flex-col gap-1">
                {navigation?.map((navItem, navIndex) => {
                    return (
                        <div
                            key={navIndex}
                            onClick={() => navigate(navItem.path)}
                            className={`
                flex
                gap-3
                items-center 
                rounded 
                px-1
                py-2
                 
                cursor-pointer  
                hover:bg-sky-50 
                transition-all
                duration-500
                text-normal
                ${isCollapsed && 'justify-center'} 
                ${
                    isPathEqualtoNavItem(navItem)
                        ? 'bg-sky-50 text-sky-500 font-semibold'
                        : 'text-slate-500'
                } 
                `}
                        >
                            <div className="py-1">
                                <navItem.icon />
                            </div>
                            {!isCollapsed && (
                                <div className=""> {navItem.label} </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default VerticalNavBar
