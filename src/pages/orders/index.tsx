/// ==============================================
// Filename:index.tsx
// Type: Index Component
// Last Updated: July 4, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'
import { Outlet, useLocation } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
interface tabsProps {
    label: string
    icon: IconType
    path: string
}
const tabs: tabsProps[] = [
    {
        label: 'All',
        icon: MdOutbond,
        path: '?orderStaus=all',
    },
    {
        label: 'Fresh Order',
        icon: MdOutbond,
        path: '?orderStaus=fresh',
    },
    {
        label: 'Order Approval',
        icon: MdOutbond,
        path: '?orderStaus=approved',
    },
    {
        label: 'Delivered',
        icon: MdOutbond,
        path: '?orderStaus=delivered',
    },
    {
        label: 'Door Cancelled',
        icon: MdOutbond,
        path: '?orderStaus=doorCancelled',
    },
    {
        label: 'Hold',
        icon: MdOutbond,
        path: '?orderStaus=hold',
    },
    {
        label: 'PSC',
        icon: MdOutbond,
        path: '?orderStaus=psc',
    },
    {
        label: 'UNA',
        icon: MdOutbond,
        path: '?orderStaus=una',
    },
    {
        label: 'PND',
        icon: MdOutbond,
        path: '?orderStaus=pnd',
    },
    {
        label: 'Urgent',
        icon: MdOutbond,
        path: '?orderStaus=urgent',
    },
    {
        label: 'Non Actions',
        icon: MdOutbond,
        path: '?orderStaus=non-action',
    },
]

const ViewOrder = () => {
    const [activeTabIndex, setActiveTab] = useState<number>()
    const [activelabel, setActiveTabLabel] = useState<string>()
    const { search } = useLocation()
    // console.log(search, 'param')
    const activeTab = search.split('=')[1]
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Orders',
            path: '/orders?orderStaus=all',
        },
        {
            label: `${activelabel}`,
        },
    ]
    useEffect(() => {
        console.log(activeTab, 'activeTab')
        let activeIndex = tabs?.findIndex(
            (tab: tabsProps) => tab.path.split('=')[1] === activeTab
        )
        activeIndex = activeIndex < 0 ? 0 : activeIndex
        setActiveTab(activeIndex)
        const labelTab: string = tabs[activeIndex].label
        setActiveTabLabel(labelTab)
    }, [activeTab])
    return (
        <SideNavLayout>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex  h-[calc(100%)] bg-white">
                    {/* Right Section */}
                    <div className="w-[100%] border-b border-r border-l rounded-r h-full ">
                        <div className="h-[40px] border flex gap-x-4 items-center bg-stone-400  shadow rounded ">
                            <TabScrollable
                                tabs={tabs}
                                active={activeTabIndex}
                                navBtnContainerClassName="bg-red-500"
                            />
                        </div>
                        <div className="py-2 px-4">
                            <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                        </div>

                        {/* Children */}
                        <div className="h-[calc(100vh-155px)] w-full ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default ViewOrder
