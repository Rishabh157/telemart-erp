import React, { ReactNode, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { navigation } from 'src/navigation';
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

    const location= useLocation()

    const currentPath = `/${location.pathname?.split("/")[1]}`

  return (
    <div className='flex h-screen w-screen' >

        {/* Side Navigation Bar */}
    <div className={`border-r border-slate-300 h-full transition-all duration-500   ${isCollapsed ? "w-[50px]" : "min-w-[250px]"}`} >
        <VerticalNavBar toggleCollapse = {toggleCollapse} isCollapsed= {isCollapsed} navigation={navigation} 
        isPathEqualtoNavItem= {(navItem:any)=> navItem.path === currentPath}
        />
    </div>

    <div className='h-full grow' >

        {/* Header */}
        <div className='h-[55px] border-b border-slate-300  ' >
            <Header/>
         </div>

         <div className='max-h-[calc(100%-55px)] w-full overflow-auto bg-slate-50 ' >
               {children}
         </div>
    </div>
  </div>
  )
}

export default SideNavLayout
