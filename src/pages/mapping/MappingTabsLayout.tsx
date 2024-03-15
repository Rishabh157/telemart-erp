import { IconType } from 'react-icons'

import { FaUser } from 'react-icons/fa'

import { MdOutlineSchema } from 'react-icons/md'

import React, { useState, useEffect } from 'react'

import {
    useLocation,
    Outlet,
    useNavigate,
    // useNavigate,
} from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'

import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
interface tabsProps {
    label: string
    icon: IconType
    path: string
    name: string
}

const MappingTabsLayout = () => {
    const [activeTabIndex, setActiveTab] = useState<number>(0)
    const [activelabel, setActiveTabLabel] = useState<string>()
    const { pathname } = useLocation()

    const navigate = useNavigate()
    // Access specific query parameters by their names
    const activeTab = window.location.pathname.split('/')[2]
    const tabs: tabsProps[] = [
        {
            label: 'SCHEME TO DEALER',
            icon: FaUser,
            path: 'scheme-to-dealer',
            name: UserModuleNameTypes.ACTION_SCHEME_TO_DEALER_MAPPING_TAB,
        },
        {
            label: 'DEALER TO SCHEME',
            icon: MdOutlineSchema,
            path: 'dealer-to-scheme',
            name: UserModuleNameTypes.ACTION_DEALER_TO_SCHEME_MAPPING_TAB,
        },
    ]
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Mapping',
            path: '',
        },
        {
            label: `${activelabel}`,
        },
    ]

    const allowedTabs = tabs
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)
    useEffect(() => {
        if (!activeTab) return

        navigate(`${pathname}`)

        //eslint-disable-next-line
    }, [activeTab])

    useEffect(() => {
        if (!activeTab) return

        let activeIndex = allowedTabs?.findIndex(
            (tab: tabsProps) => tab.path === activeTab
        )
        activeIndex = activeIndex < 0 ? 0 : activeIndex

        setActiveTab(activeIndex)
        const labelTab: string = allowedTabs[activeIndex]?.label || ''
        setActiveTabLabel(labelTab)
    }, [activeTab, allowedTabs])

    return (
        <SideNavLayout>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex  h-[calc(100%)] bg-white">
                    {/* Right Section */}
                    <div className="w-[100%] border-b border-r border-l rounded-r h-full overflow-x-scroll">
                        <TabScrollable
                            tabs={allowedTabs}
                            active={activeTabIndex}
                            navBtnContainerClassName="bg-red-500"
                        />

                        <div className="py-2 px-4">
                            <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                        </div>

                        <div className="h-[calc(100vh-135px)] w-full ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default MappingTabsLayout
