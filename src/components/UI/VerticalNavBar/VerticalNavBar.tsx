/// ==============================================
// Filename:VeritcalNavBar.tsx
// Type: Utils Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'

// |-- Internal Dependencies --|
import { NavItemType } from 'src/navigation'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState } from 'src/redux/store'
import {
    allWebsiteModule,
    assetModules,
    configurationModules,
    dispositionModule,
    isCheckAuthorizedModule,
    mediaModules,
} from 'src/userAccess/getAuthorizedModules'

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
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    //const { userData } = useSelector((state: RootState) => state?.auth)
    // const userAccessSiedeBar =

    const { customized, userData } = useSelector(
        (state: RootState) => state?.auth
    )
    const AlertText =
        'Your changes have not been saved. To stay on the page so that you can save your changes, click Cancel.'
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

    const getDefaultRouteFunction = (name: string, path: string) => {
        let currentModules: string[] = []
        let userRole = userData?.userRole

        if (userRole === 'ADMIN') {
            return path
        }
        switch (name) {
            case UserModuleNameTypes.configuration:
                currentModules = configurationModules
                break
            case UserModuleNameTypes.assets:
                currentModules = assetModules
                break
            case UserModuleNameTypes.disposition:
                currentModules = dispositionModule
                break
            case UserModuleNameTypes.allWebsite:
                currentModules = allWebsiteModule
                break
            case UserModuleNameTypes.media:
                currentModules = mediaModules
                break
            default:
                break
        }
        let isEditDeleteViewAccess = checkUserAccess?.modules?.filter(
            (mod: any) => {
                return currentModules.includes(mod?.moduleName)
            }
        )
        let moduleAction = isEditDeleteViewAccess[0]?.moduleAction
        let paginationRoute = moduleAction?.find(
            (ele: any) => ele?.actionName === UserModuleActionTypes.List
        )?.actionUrl
        return paginationRoute || path
    }
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
                {navigation
                    ?.filter((permissionRoute: NavItemType) => {
                        return userData?.userRole === 'ADMIN'
                            ? true
                            : isCheckAuthorizedModule(
                                  checkUserAccess,
                                  permissionRoute.name as string
                              )
                    })
                    .map((navItem, navIndex) => {
                        return (
                            <div
                                key={navIndex}
                                onClick={() => {
                                    if (customized) {
                                        const confirmValue: boolean =
                                            window.confirm(AlertText)
                                        if (confirmValue) {
                                            dispatch(setFieldCustomized(false))
                                            navigate(
                                                getDefaultRouteFunction(
                                                    navItem.name as string,
                                                    navItem.path
                                                )
                                            )
                                        }
                                    } else {
                                        navigate(
                                            getDefaultRouteFunction(
                                                navItem.name as string,
                                                navItem.path
                                            )
                                        )
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
