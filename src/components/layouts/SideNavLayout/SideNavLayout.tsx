// |-- Built-in Dependencies --|
import { ReactNode, useContext } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

// |-- Internal Dependencies --|
import { navigation } from 'src/navigation'
import Header from '../../UI/Header/Header'
import VerticalNavBar from '../../UI/VerticalNavBar/VerticalNavBar'

// |-- Redux --|
import { setIsCollapsed } from 'src/redux/slices/SideNavLayout'
import { AppDispatch, RootState } from 'src/redux/store'
import { ThemeContext } from 'src/App'
import classNames from 'classnames'

// |-- Types --|
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
    const { theme } = useContext(ThemeContext)
    
    return (
        <div
            className={classNames('flex h-screen w-screen', {
                'bg-invert': theme === 'black',
            })}
        >
            <div
                className={classNames(
                    'border-r border-slate-300 h-full transition-all duration-500 ease-in-out bg-white',
                    {
                        'min-w-[50px] w-[50px]': isCollapsed,
                        'min-w-[250px] w-[250px]': !isCollapsed,
                    }
                )}
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
                className={classNames('h-full', {
                    'min-w-[calc(100vw-50px)]': isCollapsed,
                    'min-w-[calc(100vw-250px)]': !isCollapsed,
                })}
            >
                <div className="h-[45px] border-b border-slate-300 bg-white">
                    <Header />
                </div>
                <div className="grow w-full overflow-auto bg-slate-50 bg-transparent-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SideNavLayout
