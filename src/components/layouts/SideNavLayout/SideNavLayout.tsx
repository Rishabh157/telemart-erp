import React, { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { navigation } from 'src/navigation'
import { setIsCollapsed } from 'src/redux/slices/SideNavLayout'
import { AppDispatch, RootState } from 'src/redux/store'
import Header from '../../UI/Header/Header'
import VerticalNavBar from '../../UI/VerticalNavBar/VerticalNavBar'

type Props = {
    children: ReactNode
}

const SideNavLayout = ({ children }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const sideNavLayoutState: any = useSelector(
        (state: RootState) => state.sideNavLayout
    )

    const { isCollapsed } = sideNavLayoutState

    const toggleCollapse = () => {
        dispatch(setIsCollapsed(!isCollapsed))
    }

    const location = useLocation()

    const currentPath = `/${location.pathname?.split('/')[1]}`
    const bgColorLocal = localStorage.getItem('themeColor') as string
    const bgColor = JSON.parse(bgColorLocal) as string | null

    return (
        <div
            className={`flex h-screen w-screen ${
                bgColor === 'black' ? 'bg-invert' : ''
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
                    navigation={navigation}
                    isPathEqualtoNavItem={(navItem: any) =>
                        navItem.path === currentPath
                    }
                />
            </div>
            <div
                className={`h-full  ${
                    isCollapsed
                        ? 'min-w-[calc(100vw-50px)]'
                        : 'min-w-[calc(100vw-250px)]'
                }`}
            >
                {/* Header */}
                <div className="h-[55px] border-b border-slate-300 bg-white  ">
                    <Header />
                </div>

                <div className="grow w-full overflow-auto bg-slate-50  bg-transparent-body ">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SideNavLayout
