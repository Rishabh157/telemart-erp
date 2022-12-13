import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigation } from '../../../navigation'
import { useState } from 'react'
import { MdOutlineChevronRight, MdOutlineExpandMore } from 'react-icons/md'
import { IconType } from 'react-icons'

type NavItemType = {
    label: string,
    path: string,
    icon: IconType,
    children?: any
}

type VerticalNavBarPropTypes = {
    isShowSideNav: boolean;
}

const VerticalNavBar = ({
    isShowSideNav
}: VerticalNavBarPropTypes
) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [isExpanded, setIsExpanded] = useState({
        index: -1
    });
    const [isNestedNavItemExpanded, setIsNestedNavItemExpanded] = useState({
        index: -1
    })


    return (
        <div
            className={`w-full h-full border-r border-slate-100 shadow-lg px-3 py-6 `} >
            <ul className='w-full flex flex-col gap-3 h-full overflow-hidden hover:overflow-auto' >
                {
                    navigation.map((navItem: NavItemType, index) => {
                        return (
                            <div key={index} className='relative'   >
                                <li
                                    onClick={() => {
                                        navItem.children ? setIsExpanded(prev => prev.index === index ? { index: -1 } : { index: index }) : navigate(navItem.path);
                                    }}
                                    className={`relative text-sm flex gap-3 items-center font-semibold px-2 py-2 cursor-pointer rounded hover:bg-slate-200 hover:text-primary-main ${`/${location.pathname.split('/')[1]}` === navItem.path ? 'bg-slate-200 text-primary-main' : 'text-slate-500'}`}
                                >

                                    {/* Icon */}
                                    {<navItem.icon className='text-2xl' />}

                                    {/* Label */}

                                    {isShowSideNav && navItem.label}
                                    {
                                        navItem.children && isShowSideNav ?
                                            (
                                                (isExpanded.index === index) ?
                                                    (<MdOutlineExpandMore className='text-xl absolute right-0' />)
                                                    :
                                                    (< MdOutlineChevronRight className='text-xl absolute right-0 ' />)
                                            )
                                            : null
                                    }
                                </li>

                                {
                                    navItem?.children?.length && (isExpanded.index === index) &&
                                    <div className='px-4 animate-[fade_0.4s_ease-in-out]'>
                                        {
                                            navItem.children?.map((navChild: NavItemType, navChildIndex: number) => {
                                                return (

                                                    <div key={navChildIndex} >

                                                        <li

                                                            onClick={() => {
                                                                navChild.children ? setIsNestedNavItemExpanded(prev => prev.index === navChildIndex ? { index: -1 } : { index: navChildIndex }) : navigate(navChild.path);
                                                            }}
                                                            className={`relative text-[13.5px] flex gap-3 items-center font-semibold px-2 py-2 cursor-pointer rounded hover:bg-slate-200 hover:text-primary-main ${`/${location.pathname.split('/')[1]}` === navChild.path ? 'bg-slate-200 text-primary-main' : 'text-slate-500'}`}
                                                        >

                                                            {/* Icon */}
                                                            {<navChild.icon className='text-lg' />}

                                                            {/* Label */}
                                                            {isShowSideNav && navChild.label}
                                                            {
                                                                navChild.children ?
                                                                    (
                                                                        (isNestedNavItemExpanded.index === navChildIndex) ?
                                                                            (<MdOutlineExpandMore className='text-xl absolute right-0' />)
                                                                            :
                                                                            (< MdOutlineChevronRight className='text-xl absolute right-0 ' />)
                                                                    )
                                                                    : null
                                                            }

                                                        </li>

                                                        {
                                                            navChild?.children?.length && (isNestedNavItemExpanded.index === navChildIndex) &&
                                                            <div className='px-4 animate-[fade_0.4s_ease-in-out]'>
                                                                {
                                                                    navChild?.children?.map((navNestedChild: NavItemType, navNestedChildIndex: number) => {
                                                                        return (

                                                                            <div key={navNestedChildIndex} >

                                                                                <li

                                                                                    onClick={() => {
                                                                                        navNestedChild.children ? setIsNestedNavItemExpanded(prev => prev.index === navNestedChildIndex ? { index: -1 } : { index: navNestedChildIndex }) : navigate(navNestedChild.path);
                                                                                    }}
                                                                                    className={`relative text-[13.5px] flex gap-3 items-center font-semibold px-2 py-2 cursor-pointer rounded hover:bg-slate-200 hover:text-primary-main ${`/${location.pathname.split('/')[1]}` === navNestedChild.path ? 'bg-slate-200 text-primary-main' : 'text-slate-500'}`}
                                                                                >

                                                                                    {/* Icon */}
                                                                                    {<navNestedChild.icon className='text-lg' />}

                                                                                    {/* Label */}
                                                                                    {isShowSideNav && navNestedChild.label}

                                                                                </li>

                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        }

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }

                            </div>

                        )
                    })
                }
            </ul>
        </div>
    )
}

export default VerticalNavBar
