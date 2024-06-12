/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { BsArrowRepeat } from 'react-icons/bs'
import { Outlet, useLocation } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'

import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { RootState } from 'src/redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AccessDenied from 'src/AccessDenied'

type Props = {}
interface tabsProps {
    label: string
    icon: IconType
    path: string
}

const tabs = [
    {
        label: 'Warehouse Details',
        icon: BsArrowRepeat,
        path: 'warehouse-details',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_DETAILS,
    },
    {
        label: 'Inventories',
        icon: BsArrowRepeat,
        path: 'inventories',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INVENTORIES,
    },
    {
        label: 'Barcode Action',
        icon: BsArrowRepeat,
        path: 'barcode-action',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_BARCODE_ACTION,
    },
    {
        label: 'Outward Inventories',
        icon: BsArrowRepeat,
        path: 'outward-inventories/dealer',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES,
    },
    {
        label: 'Inward Inventories',
        icon: BsArrowRepeat,
        path: 'inward-inventories/dealer',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES,
    },
]
const ViewInventories = (props: Props) => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(0)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { pathname } = useLocation()

    const allowedTabs = tabs
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)

    useEffect(() => {
        const activeTab = window.location.pathname.split('/')[4]
        let activeIndex = allowedTabs?.findIndex(
            (tab: tabsProps) => tab.path.split('/')[0] === activeTab
        )
        activeIndex = activeIndex < 0 ? 0 : activeIndex
        setActiveTab(activeIndex)
    }, [activeTab])

    React.useEffect(() => {
        localStorage.removeItem('hasExecuted')
        if (userData?.userRole === 'ADMIN') {
            navigate(`${pathname}`)
            return
        }
        const hasExecuted = localStorage.getItem('hasExecuted')

        if (hasExecuted) {
            return // Exit early if the function has been executed
        }

        for (const nav of tabs as any) {
            const isValue = isAuthorized(
                nav?.name as keyof typeof UserModuleNameTypes
            )
            localStorage.setItem('hasExecuted', 'true')
            if (isValue) {
                navigate(`${pathname}`)
                // navigate(nav.path)
                break
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const tabsRender = tabs?.some((nav: any) => {
        return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
    })

    return (
        <SideNavLayout>
            {tabsRender ? (
                <div className="h-[calc(100vh-55px)]">
                    <div className="w-full flex  h-[calc(100%)] bg-white">
                        {/* Right Section */}
                        <div className="w-[100%] border-b border-r border-l rounded-r h-full ">
                            <div className="h-[40px] border flex gap-x-4 items-center bg-stone-400 sticky top-0  shadow rounded ">
                                <TabScrollable
                                    tabs={allowedTabs}
                                    active={activeTab}
                                    navBtnContainerClassName="bg-red-500"
                                />
                            </div>

                            {/* Children */}
                            <div className="h-[calc(100%-55px)] w-full ">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <AccessDenied />
            )}
        </SideNavLayout>
    )
}

export default ViewInventories
