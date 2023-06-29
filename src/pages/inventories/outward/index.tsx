import React, { useEffect, useState } from 'react'
import { MdOutbond } from 'react-icons/md'
import { Outlet } from 'react-router-dom'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { Tabs } from 'src/models/common/paginationType'

type Props = {}

const tabs: Tabs[] = [
    {
        label: 'Dealer',
        icon: MdOutbond,
        path: 'dealer',
    },
    {
        label: 'Customer',
        icon: MdOutbond,
        path: 'customer',
    },
    {
        label: 'RTV',
        icon: MdOutbond,
        path: 'rtv',
    },
    {
        label: 'Warehouse',
        icon: MdOutbond,
        path: 'warehoue',
    },
    {
        label: 'Sample',
        icon: MdOutbond,
        path: 'sample',
    },
    {
        label: 'E-comm',
        icon: MdOutbond,
        path: 'ecom',
    },
    {
        label: 'Replacements/Repackaging',
        icon: MdOutbond,
        path: 'replacement',
    },
]
const OutwardTabs = (props: Props) => {
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        const activeTabIndex = window.location.pathname.split('/')[3]
        const tabindex = tabs.findIndex((tab) => tab.path === activeTabIndex)

        setActiveTab(tabindex)
    }, [])

    return (
        <div className="w-full flex  h-[calc(100%)] bg-white">
            {/* Right Section */}
            <div className="w-[100%] border-b border-r border-l rounded-r h-full p-1  ">
                <div className="py-1">
                    <div className="h-[40px] border flex gap-x-4 items-center bg-orange-300    shadow rounded  ">
                        <TabScrollable tabs={tabs} active={activeTab} />
                    </div>
                </div>

                {/* Children */}
                <div className="h-[calc(100%-95px)] w-full ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default OutwardTabs
