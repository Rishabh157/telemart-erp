import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { BsArrowRepeat } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { UserModuleNameTypes, UserModuleWarehouseTabsTypes } from 'src/models/userAccess/UserAccess.model'
import { RootState } from 'src/redux/store'
import { showAllowedTabs } from 'src/userAccess/getAuthorizedModules'

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
            name: UserModuleWarehouseTabsTypes.warehouseDetails,
        },
        {
            label: 'Inventories',
            icon: BsArrowRepeat,
            path: 'inventories',
            name: UserModuleWarehouseTabsTypes.inventories,
        },
        {
            label: 'Outward Inventories',
            icon: BsArrowRepeat,
            path: 'outward-inventories/dealer',
            name: UserModuleWarehouseTabsTypes.outwardInventories,
        },
        {
            label: 'Inward Inventories',
            icon: BsArrowRepeat,
            path: 'inward-inventories/dealer',
            name: UserModuleWarehouseTabsTypes.inwardInventories,
        },
    ]
    const [activeTab, setActiveTab] = useState<number>()
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { userData } = useSelector((state: RootState) => state?.auth)

    const allowedTabs = showAllowedTabs(
        checkUserAccess,
        UserModuleNameTypes.wareHouse,
        tabs,
        userData?.userRole || 'ADMIN'
    )
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
