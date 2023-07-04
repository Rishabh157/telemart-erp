import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { BsArrowRepeat } from 'react-icons/bs'
import { Outlet } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'

type Props = {}
interface tabsProps {
    label: string
    icon: IconType
    path: string
}
const tabs = [
    {
        label: 'Inventories',
        icon: BsArrowRepeat,
        path: 'inventories',
    },
    {
        label: 'Outward Inventories',
        icon: BsArrowRepeat,
        path: 'outward-inventories/dealer',
    },
    {
        label: 'Inward Inventories',
        icon: BsArrowRepeat,
        path: 'inward-inventories/dealer',
    },
    {
        label: 'Warehouse Details',
        icon: BsArrowRepeat,
        path: 'warehouse-details',
    },
]
const ViewInventories = (props: Props) => {
    const [activeTab, setActiveTab] = useState<number>()
    useEffect(() => {
        const activeTab = window.location.pathname.split('/')[4]
        let activeIndex = tabs?.findIndex(
            (tab: tabsProps) => tab.path.split('/')[0] === activeTab
        )
        activeIndex = activeIndex < 0 ? 0 : activeIndex
        setActiveTab(activeIndex)
    }, [])
    return (
        <SideNavLayout>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex  h-[calc(100%)] bg-white">
                    {/* Right Section */}
                    <div className="w-[100%] border-b border-r border-l rounded-r h-full ">
                        <div className="h-[40px] border flex gap-x-4 items-center bg-stone-300 sticky top-0  shadow rounded ">
                            <TabScrollable tabs={tabs} active={activeTab} navBtnContainerClassName="bg-red-500"/>
                        </div>

                        {/* Children */}
                        <div className="h-[calc(100%-55px)] w-full ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default ViewInventories
