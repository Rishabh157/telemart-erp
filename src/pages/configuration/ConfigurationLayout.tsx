import React, { useState } from 'react'
import Header from 'src/components/UI/Header/Header'
import ConfigurationSideBar from './configurationSideBar/ConfigurationSideBar';

type Props = {
    children?: React.ReactNode | string;
}

const ConfigurationLayout = ({
    children,
}: Props
) => {

    const [isShowSideNav, setIsShowSideNav] = useState(true);


    return (
        <div className='w-screen h-screen' >
            {/* Header */}
            <div className='h-[70px] ' >
                <Header setIsShowSideNav={(newValue) => setIsShowSideNav(newValue)} isShowSideNav={isShowSideNav} />
            </div>

            <div className='h-[calc(100%-70px)] w-screen flex'>

                <div className={`transition-all duration-[600ms] h-full ${isShowSideNav ? 'w-[270px]' : 'w-[60px] '} `} >
                    <ConfigurationSideBar isShowSideNav={isShowSideNav} />
                </div>

                <div className={`h-full bg-slate-50 px-4  transition-all duration-[600ms] ${isShowSideNav ? "w-[calc(100vw-270px)]" : "w-[calc(100vw-60px)]"} `}>
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

export default ConfigurationLayout
