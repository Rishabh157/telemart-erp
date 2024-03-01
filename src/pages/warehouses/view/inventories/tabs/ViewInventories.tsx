import { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { BsArrowRepeat } from 'react-icons/bs'
import { Outlet } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'

import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

type Props = {}
interface tabsProps {
    label: string
    icon: IconType
    path: string
}

const ViewInventories = (props: Props) => {
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
    const [activeTab, setActiveTab] = useState<number>()

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
    }, [activeTab, allowedTabs])
    return (
        <SideNavLayout>
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
        </SideNavLayout>
    )
}

export default ViewInventories
