import React, { useEffect, useState } from 'react'
import { MdOutbond } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { Tabs } from 'src/models/common/paginationType'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
import { RootState } from 'src/redux/store'
import { showAllowedTabs } from 'src/userAccess/getAuthorizedModules'

type Props = {}

const tabs: Tabs[] = [
    {
        label: 'Dealer',
        icon: MdOutbond,
        path: 'dealer',
        name: 'TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER',
    },
    {
        label: 'Customer',
        icon: MdOutbond,
        path: 'customer',
        name: 'TAB_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER',
    },
    {
        label: 'RTV',
        icon: MdOutbond,
        path: 'rtv',
        name: 'TAB_WAREHOUSE_INWARD_INVENTORIES_RTV',
    },
    {
        label: 'Warehouse',
        icon: MdOutbond,
        path: 'warehoue',
        name: 'TAB_WAREHOUSE_INWARD_INVENTORIES_WAREHOUSE',
    },
    {
        label: 'Sample',
        icon: MdOutbond,
        path: 'sample',
        name: 'TAB_WAREHOUSE_INWARD_INVENTORIES_SAMPLE',
    },
    {
        label: 'E-comm',
        icon: MdOutbond,
        path: 'ecom',
        name: 'TAB_WAREHOUSE_INWARD_INVENTORIES_E_Commerce',
    },
    {
        label: 'Replacements/Repackaging',
        icon: MdOutbond,
        path: 'replacement',
        name: 'TAB_WAREHOUSE_INWARD_INVENTORIES_REPLACEMENTS',
    },
]
const InwardsTabs = (props: Props) => {
    const [activeTab, setActiveTab] = useState(0)

    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )

    const allowedTabs = showAllowedTabs(
        checkUserAccess,
        UserModuleNameTypes.wareHouse,
        tabs
    )
    useEffect(() => {
        const activeTabIndex = window.location.pathname.split('/')[5]
        const tabindex = allowedTabs.findIndex(
            (tab: any) => tab.path === activeTabIndex
        )

        setActiveTab(tabindex)
    }, [allowedTabs])

    return (
        <div className="w-full flex h-[calc(100vh-95px)] bg-white">
            {/* Right Section */}
            <div className="w-[100%] border-b border-r border-l rounded-r h-full p-1  ">
                <div className="py-1">
                    <div className="h-[40px] border flex gap-x-4 items-center bg-orange-300    shadow rounded  ">
                        <TabScrollable tabs={allowedTabs} active={activeTab} />
                    </div>
                </div>

                {/* Children */}
                <div className="h-[calc(100vh-150px)] w-full ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default InwardsTabs
