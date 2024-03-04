import { useEffect, useState } from 'react'
import { MdOutbond } from 'react-icons/md'
import { Outlet } from 'react-router-dom'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { Tabs } from 'src/models/common/paginationType'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

type Props = {}

const tabs: Tabs[] = [
    {
        label: 'Dealer',
        icon: MdOutbond,
        path: 'dealer',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_DEALER,
    },
    {
        label: 'Customer',
        icon: MdOutbond,
        path: 'customer',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER,
    },

    {
        label: 'Warehouse',
        icon: MdOutbond,
        path: 'warehoue',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_WAREHOUSE,
    },
    {
        label: 'Sample',
        icon: MdOutbond,
        path: 'sample',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_SAMPLE,
    },
    {
        label: 'E-comm',
        icon: MdOutbond,
        path: 'ecom',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_INWARD_INVENTORIES_E_COMMERCE,
    },

    {
        label: 'Company',
        icon: MdOutbond,
        path: 'company',
        name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COMPANY,
    },
]
const InwardsTabs = (props: Props) => {
    const [activeTab, setActiveTab] = useState(0)

    const allowedTabs = tabs
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)

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
                    <div className="h-[40px] border flex gap-x-4 items-center    shadow rounded  ">
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
