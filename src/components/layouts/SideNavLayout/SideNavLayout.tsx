// import React, { useState } from 'react'
// import Header from '../../UI/Header/Header';
// import VerticalNavBar from '../../UI/VerticalNavBar/VerticalNavBar'

// interface SideNavLayoutPropTypes {
//     children: React.ReactNode | string;
// }

// const SideNavLayout = ({
//     children
// }: SideNavLayoutPropTypes
// ) => {

//     const [isShowSideNav, setIsShowSideNav] = useState(true);


//     return (
//         <div className='w-screen h-screen' >
//             {/* Header */}
//             <div className='h-[70px] ' >
//                 <Header setIsShowSideNav={(newValue) => setIsShowSideNav(newValue)} isShowSideNav={isShowSideNav} />
//             </div>

//             <div className='h-[calc(100vh-70px)] w-screen flex'>

//                 <div className={`transition-all duration-[600ms] h-full ${isShowSideNav ? 'w-[270px]' : 'w-[60px] '} `} >
//                     <VerticalNavBar isShowSideNav={isShowSideNav} />
//                 </div>

//                 <div className={`h-[calc(100vh-70px)] bg-slate-50 px-4  transition-all duration-[600ms] ${isShowSideNav ? "w-[calc(100vw-270px)]" : "w-[calc(100vw-60px)]"} `}>
//                     {children}
//                 </div>
//             </div>

//             <div className='absolute bottom-0 left-0'>
//                 <input
//                     onChange={(e) => document.documentElement.style.setProperty('--primary-main', e.target.value)}
//                     type="color"
//                     className='w-[100px] border border-slate-200 rounded '
//                 />
//             </div>
//         </div>
//     )
// }

// export default SideNavLayout


import React, { ReactNode, useState } from 'react'
import Header from '../../UI/Header/Header';
import VerticalNavBar from '../../UI/VerticalNavBar/VerticalNavBar'

type Props = {
    children: ReactNode
}

const SideNavLayout = ({
    children
}: Props) => {

    const [isCollapsed , setIsCollapsed] = useState(false)
    const toggleCollapse = ()=> {
        setIsCollapsed(prev=> !prev)
    }

  return (
    <div className='flex h-screen w-screen' >

        {/* Side Navigation Bar */}
    <div className={`border-r border-slate-300 h-full transition-all duration-500   ${isCollapsed ? "w-[50px]" : "w-[250px]"}`} >
        <VerticalNavBar toggleCollapse = {toggleCollapse} isCollapsed= {isCollapsed} />
    </div>

    <div className='h-full grow ' >

        {/* Header */}
        <div className='h-[55px] border-b border-slate-300  ' >
            <Header/>
         </div>

         <div className='h-[calc(100%-55px)]  w-full overflow-auto bg-slate-50 ' >
               {children}
         </div>
    </div>
  </div>
  )
}

export default SideNavLayout
