import React, { useEffect, useState } from 'react'
import { MdOutbond } from 'react-icons/md'
import { Outlet, useLocation } from 'react-router-dom'
import AccessDenied from 'src/AccessDenied'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { Tabs } from 'src/models/common/paginationType'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { RootState } from 'src/redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type Props = {}

const OutwardEcomOrderTab = (props: Props) => {

    const tabs: Tabs[] = [
        {
            label: 'Amazon',
            icon: MdOutbond,
            path: 'amazon',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_DEALER,
        },
        {
            label: 'Flipkart',
            icon: MdOutbond,
            path: 'flipkart',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER,
        },
    ]

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
        const activeTabIndex = window.location.pathname.split('/')[6]
        const tabindex = allowedTabs.findIndex(
            (tab: any) => tab.path === activeTabIndex
        )
        setActiveTab(tabindex)
    }, [allowedTabs])

    React.useEffect(() => {
        localStorage.removeItem('hasExecuted')
        if (userData?.userRole === 'ADMIN') {
            return
        }
        const hasExecuted = localStorage.getItem('hasExecuted')

        if (hasExecuted) {
            return // Exit early if the function has been executed
        }
        const activeTabIndex = window.location.pathname.split('/')[6]
        const findPath = tabs?.find((ele: any) => activeTabIndex === ele?.path)
        for (const nav of tabs as any) {
            const isRefPath = isAuthorized(
                findPath?.name as keyof typeof UserModuleNameTypes
            )
            const isValue = isAuthorized(
                nav?.name as keyof typeof UserModuleNameTypes
            )
            localStorage.setItem('hasExecuted', 'true')
            if (isRefPath) {
                navigate(`${pathname}`)
                break
            } else {
                if (isValue) {
                    navigate(nav?.path)
                    break
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tabsRender = tabs?.some((nav: any) => {
        return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
    })

    return (
        <div className="w-full flex h-[calc(100vh-95px)] bg-white">
            {/* Right Section */}
            {tabsRender ? (
                <div className="w-[100%] rounded-r h-full p-1">
                    <div className="py-1 z-50">
                        <div className="h-[40px] border flex gap-x-4 items-center bg-orange-300 shadow rounded">
                            <TabScrollable
                                tabs={allowedTabs}
                                active={activeTab}
                            />
                        </div>
                    </div>

                    {/* Children */}
                    <div className="h-[calc(100vh-75px)] w-full z-0">
                        <Outlet />
                    </div>
                </div>
            ) : (
                <AccessDenied />
            )}
        </div>
    )
}

export default OutwardEcomOrderTab
