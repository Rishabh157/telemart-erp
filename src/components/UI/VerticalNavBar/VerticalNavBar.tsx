/// ==============================================
// Filename:VeritcalNavBar.tsx
// Type: Utils Component
// Last Updated: JULY 20, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
// |-- Internal Dependencies --|
import { NavItemType } from 'src/navigation'
import { AlertText } from 'src/pages/callerpage/components/constants'

// |-- Redux --|
import { setDeviceId, setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState } from 'src/redux/store'

import { isAuthorized } from 'src/utils/authorization'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// |-- Types --|
type Props = {
    toggleCollapse: () => void
    isCollapsed: boolean
    navigation: NavItemType[]
    isPathEqualtoNavItem?: (navItem: any) => boolean
}

const VerticalNavBar = ({
    toggleCollapse,
    isCollapsed,
    navigation,
    isPathEqualtoNavItem = (navItem) => false,
}: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    let pathLocal = location?.pathname?.split("/")?.[1];
    const deviceIditem = localStorage.getItem('device-id') || ''
    const { userData } = useGetLocalStorage();

    useEffect(() => {
        dispatch(setDeviceId(deviceIditem))
    }, [deviceIditem, dispatch])
    const { customized } = useSelector(
        (state: RootState) => state?.auth
    )

    useEffect(() => {
        if (customized) {
            window.addEventListener('beforeunload', handleBeforeUnload)
        }
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [customized])

    const handleBeforeUnload = (e: any) => {
        e.preventDefault()
        const message = AlertText

        e.returnValue = message
        return message
    }
    const getNavigate = (path: string) => {
        if (pathLocal === "configurations") {
            navigate(`/configurations/${path}`);
            return;
        }
        if (pathLocal === "sales&marketing") {
            navigate(`/sales&marketing/${path}`);
            return;
        }
        if (pathLocal === "welcome") {
            navigate(`/${pathLocal}`);
        }
        navigate(`${path}`);
    };



    React.useEffect(() => {
        // Check if the function has been executed before
        console.log(userData, "configurations")
        const hasExecuted = localStorage.getItem("hasExecuted");
        if (userData?.userRole === "ADMIN") {
            return;
        }
        if (hasExecuted) {
            return; // Exit early if the function has been executed
        }
        for (const nav of navigation) {
            const isValue = isAuthorized(nav?.name as keyof typeof UserModuleNameTypes);
            if (isValue) {
                getNavigate(nav.path as string);
                localStorage.setItem("hasExecuted", "true");
                break;
            }
        }
        return () => {
            console.log("herer")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCheckNavigate = (name: string) => {
        if (
            name === UserModuleNameTypes.NAV_CONFIGURATION
            || name === UserModuleNameTypes.NAV_DISPOSITION ||
            name === UserModuleNameTypes.NAV_MEDIA ||
            name === UserModuleNameTypes.NAV_ASSETS ||
            name === UserModuleNameTypes.NAV_ALL_WEBSITE
        ) {
            localStorage.removeItem("hasExecuted");
        }
    };

    return (
        <div className="h-full  overflow-auto bg-white ">
            {/* Logo & Menu Icon */}

            <div
                className={`flex px-3 py-2 items-center  bg-white sticky top-0 ${isCollapsed ? 'justify-between' : 'justify-between'
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
                        className={`h-[1.5px] w-5 bg-slate-500 transition-all duration-500    ${!isCollapsed &&
                            'origin-top-left translate-x-[1.5px]  rotate-45 -mt-3'
                            }`}
                    ></div>
                    {isCollapsed && (
                        <div className={`h-[1.5px] w-5 bg-slate-500  `}> </div>
                    )}
                    <div
                        className={`h-[1.5px] w-5 bg-slate-500 transition-all duration-500  ${!isCollapsed &&
                            'origin-top-left translate-y-2  -rotate-45 '
                            }`}
                    ></div>
                </div>

            </div>

            {/* Navigations */}
            <div className="px-3 py-5 flex flex-col gap-1">
                {navigation
                    ?.filter((permissionRoute: NavItemType) => {
                        return isAuthorized(permissionRoute?.name as keyof typeof UserModuleNameTypes);
                    })
                    .map((navItem, navIndex) => {
                        return (
                            <div
                                key={navIndex}
                                onClick={() => {
                                    getCheckNavigate(navItem.name as string);
                                    if (customized) {
                                        const confirmValue: boolean =
                                            window.confirm(AlertText)
                                        if (confirmValue) {
                                            dispatch(setFieldCustomized(false))
                                            navItem.path && navigate(navItem.path);
                                        }
                                    } else {
                                        navItem.path && navigate(navItem.path);
                                    }
                                }}
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
                ${isPathEqualtoNavItem(navItem)
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
