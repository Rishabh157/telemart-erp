/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { IconType } from 'react-icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { RxLapTimer } from 'react-icons/rx'
// import { isAuthorized } from 'src/utils/authorization'
// import AccessDenied from 'src/utils/AccessDenied'
// import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
// import { FaTicketSimple } from 'react-icons/fa6'
// import { useGetChangeRequestByIdQuery } from 'src/services/ChangeRequestServices'
// import { UserModuleNameTypes } from 'src/models/UserAccess/UserAccess.model'

type Props = {}

export const inquiriesEditTabs: {
    label: string
    icon: IconType
    path: string
    moduleName?: string
    actionName?: string
}[] = [
    {
        label: 'SCHEME TO DEALER',
        icon: FaUser,
        path: 'scheme-to-dealer',
        // moduleName:
        //     UserModuleNameTypes.ACTION_CHANGE_REQUEST_SINGLE_VIEW_TICKET_DETAILS,
    },
    {
        label: 'DEALER TO SCHEME',
        icon: RxLapTimer,
        path: 'dealer-to-scheme',
        // moduleName:
        //     UserModuleNameTypes.ACTION_CHANGE_REQUEST_SINGLE_VIEW_TIME_LOGS,
    },
]

const MappingTabsLayout = (props: Props) => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]

    const navigate = useNavigate()

    const currentPath = location.pathname.split('/')[3]

    return (
        <SideNavLayout>
            <div className="flex flex-col gap-2 pt-3 h-full">
                {inquiriesEditTabs?.length && (
                    <div className="flex gap-3 items-center  mx-4  border-b border-slate-400 bg-white">
                        {inquiriesEditTabs?.map((tab: any, index: any) => {
                            return (
                                <div key={index}>
                                    <button
                                        type="button"
                                        onClick={() => navigate(tab.path)}
                                        className={`h-full px-5 pb-2 flex gap-2 border-b-[3px]  items-center hover:text-primary-main font-medium text-sm transition-all
        ${
            currentPath === tab.path?.split('/')[0]
                ? 'text-primary-main   border-primary-main'
                : 'text-gray-700 border-white'
        }
         `}
                                    >
                                        <div className=" text-lg  ">
                                            <tab.icon />
                                        </div>
                                        {tab.label}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
                <div className="grow overflow-auto ">
                    <Outlet />
                </div>
            </div>
        </SideNavLayout>
    )
}

export default MappingTabsLayout
