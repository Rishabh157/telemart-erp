import React, { useState } from 'react'
import Header from '../../UI/Header/Header';
import VerticalNavBar from '../../UI/VerticalNavBar/VerticalNavBar'

interface SideNavLayoutPropTypes {
    children: React.ReactNode | string;
}

const SideNavLayout = ({
    children
}: SideNavLayoutPropTypes
) => {

    const [isShowSideNav, setIsShowSideNav] = useState(true);


    return (
        <div className='w-screen h-screen' >
            {/* Header */}
            <div className='h-[70px] ' >
                <Header setIsShowSideNav={(newValue) => setIsShowSideNav(newValue)} isShowSideNav={isShowSideNav} />
            </div>

            <div className='h-[calc(100vh-70px)] w-screen flex'>

                <div className={`transition-all duration-[600ms] h-full ${isShowSideNav ? 'w-[270px]' : 'w-[60px] '} `} >
                    <VerticalNavBar isShowSideNav={isShowSideNav} />
                </div>

                <div className={`h-[calc(100vh-70px)] bg-slate-50 px-4  transition-all duration-[600ms] ${isShowSideNav ? "w-[calc(100vw-270px)]" : "w-[calc(100vw-60px)]"} `}>
                    {children}
                </div>
            </div>

            <div className='absolute bottom-0 left-0'>
                <input
                    onChange={(e) => document.documentElement.style.setProperty('--primary-main', e.target.value)}
                    type="color"
                    className='w-[100px] border border-slate-200 rounded '
                />
            </div>
        </div>
    )
}

export default SideNavLayout
