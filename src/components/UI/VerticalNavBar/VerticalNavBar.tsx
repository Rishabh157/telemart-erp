import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigation } from '../../../navigation'
import { useState } from 'react'
import { MdOutlineChevronRight, MdOutlineExpandMore } from 'react-icons/md'


type VerticalNavBarPropTypes = {
    isShowSideNav: boolean;
}

const VerticalNavBar = ({
    isShowSideNav
}: VerticalNavBarPropTypes
) => {

    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = `/${location.pathname.split('/')[1]}`

    const [isNavItemExpanded, setIsNavItemExpanded] = useState({
        navItemIndex: -1,
        childNavItemIndex: -1,
    });

    const onNavItemClick = (isChildren: boolean, index: number, path: string) => {
        isChildren ?
            setIsNavItemExpanded(prev => {
                return (
                    prev.navItemIndex === index ?
                        {
                            ...prev,
                            navItemIndex: -1
                        }
                        :
                        {
                            ...prev,
                            navItemIndex: index
                        }
                )

            })
            : navigate(path)
    }

    const onChildNavItemClick = (isChildren: boolean, index: number, path: string) => {
        isChildren ?
            setIsNavItemExpanded(prev => {
                return (
                    prev.childNavItemIndex === index ?
                        {
                            ...prev,
                            childNavItemIndex: -1
                        }
                        :
                        {
                            ...prev,
                            childNavItemIndex: index
                        }
                )

            })
            : navigate(path)
    }

    return (
        <nav
            className={`w-full h-full border-r border-slate-100 shadow-lg  py-6 `}
        >
            <ul className='w-full h-full overflow-hidden hover:overflow-auto flex flex-col gap-2 px-3 ' >
                {
                    navigation.map((navItem, navItemIndex) => {
                        return (
                            <div key={navItemIndex}  >

                                <li

                                    onClick={() => { onNavItemClick(navItem?.children?.length ? true : false, navItemIndex, navItem.path) }}
                                    className={`p-2 transition-all hover:bg-slate-100 rounded cursor-pointer flex items-center gap-2 text-[16px] relative ${currentPath === navItem.path ? 'bg-slate-100 text-primary-main' : 'text-slate-500'} `}
                                >
                                    <span className='text-xl' > <navItem.icon /> </span>
                                    {
                                        isShowSideNav &&
                                        <span className='' > {navItem.label} </span>
                                    }
                                    {
                                        navItem.children && isShowSideNav && (
                                            isNavItemExpanded.navItemIndex === navItemIndex ?
                                                (< span className='absolute right-1'> <MdOutlineExpandMore className='text-xl' /> </span>)
                                                :
                                                (< span className='absolute right-1'> <MdOutlineChevronRight className='text-xl' /> </span>)
                                        )
                                    }
                                </li>

                                {
                                    isNavItemExpanded.navItemIndex === navItemIndex && (
                                        <ul className='w-full flex flex-col gap-2 px-3 pt-2 animate-[fade_0.4s_ease-in-out]  ' >
                                            {
                                                navItem.children?.map((childNavItem, childNavItemIndex) => {
                                                    return (
                                                        <div key={childNavItemIndex} >

                                                            <li

                                                                onClick={() => onChildNavItemClick(childNavItem?.children?.length ? true : false, childNavItemIndex, childNavItem.path)}
                                                                className={`p-2 transition-all hover:bg-slate-100 rounded cursor-pointer flex items-center gap-2 text-[16px] relative ${currentPath === childNavItem.path ? 'bg-slate-100 text-primary-main' : 'text-slate-500'} `}
                                                            >
                                                                <span className='text-lg' > <childNavItem.icon /> </span>
                                                                <span className='text-sm' > {childNavItem.label} </span>

                                                                {
                                                                    childNavItem.children && (
                                                                        isNavItemExpanded.childNavItemIndex === childNavItemIndex ?
                                                                            (< span className='absolute right-1'> <MdOutlineExpandMore className='text-xl' /> </span>)
                                                                            :
                                                                            (< span className='absolute right-1'> <MdOutlineChevronRight className='text-xl' /> </span>)
                                                                    )
                                                                }

                                                            </li>

                                                            {
                                                                isNavItemExpanded.childNavItemIndex === childNavItemIndex && (
                                                                    <ul className='w-full flex flex-col gap-2 px-3 pt-2 animate-[fade_0.4s_ease-in-out] ' >
                                                                        {
                                                                            childNavItem.children?.map((child, childIndex) => {
                                                                                return (
                                                                                    <li

                                                                                        onClick={() => navigate(child.path)}
                                                                                        className={`p-2 transition-all hover:bg-slate-100 rounded cursor-pointer flex items-center gap-2 text-[16px] relative ${currentPath === child.path ? 'bg-slate-100 text-primary-main' : 'text-slate-500'} `}
                                                                                    >
                                                                                        <span className='text-lg' > <child.icon /> </span>
                                                                                        <span className='text-sm' > {child.label} </span>

                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }

                                                                    </ul>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }

                                        </ul>
                                    )
                                }

                            </div>
                        )
                    })
                }


            </ul>
        </nav >
    )
}

export default VerticalNavBar
