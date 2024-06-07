// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'
import { Outlet } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
// import { isAuthorized } from 'src/utils/authorization'

interface tabsProps {
    label: string
    icon: IconType
    path: string
    name: string
}

export enum statusProps {
    all = 'ALL',
    fresh = 'FRESH',
    prepaid = 'PREPAID',
    delivered = 'DELIVERED',
    doorCancelled = 'DOORCANCELLED',
    hold = 'HOLD',
    psc = 'PSC',
    una = 'UNA',
    pnd = 'PND',
    urgent = 'URGENT',
    inquiry = 'INQUIRY',
    'non-action' = 'NON_ACTION',
    reattempt = 'REATTEMPT',
    deliveryOutOfNetwork = 'DELIVERYOUTOFNETWORK',
    intransit = 'INTRANSIT',
    ndr = 'NDR',
}

const ViewOrder = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const tabs: tabsProps[] = [
        {
            label: 'Overview',
            icon: MdOutbond,
            path: 'overview',
            name: UserModuleNameTypes.ACTION_ORDER_OVERVIEW_TAB,
        },
        {
            label: 'Global Order Search',
            icon: MdOutbond,
            path: 'global-search',
            name: UserModuleNameTypes.ACTION_ORDER_GLOBAL_ORDER_SEARCH_TAB,
        },
        {
            label: 'Fresh Order',
            icon: MdOutbond,
            path: 'fresh',
            name: UserModuleNameTypes.ACTION_ORDER_FRESH_ORDER_TAB_LIST,
        },
        {
            label: 'Assign Order',
            icon: MdOutbond,
            path: 'assign',
            name: UserModuleNameTypes.ACTION_ORDER_ASSIGN_ORDER_TAB_LIST,
        },
        {
            label: 'Prepaid Order',
            icon: MdOutbond,
            path: 'prepaid',
            name: UserModuleNameTypes.ACTION_ORDER_PREPAID_ORDER_TAB_LIST,
        },
        {
            label: 'Delivered',
            icon: MdOutbond,
            path: 'delivered',
            name: UserModuleNameTypes.ACTION_ORDER_DELIVERED_TAB_LIST,
        },
        {
            label: 'Door Cancelled',
            icon: MdOutbond,
            path: 'doorCancelled',
            name: UserModuleNameTypes.ACTION_ORDER_DOOR_CANCELLED_LIST,
        },
        {
            label: 'Hold',
            icon: MdOutbond,
            path: 'hold',
            name: UserModuleNameTypes.ACTION_ORDER_HOLD_TAB_LIST,
        },
        {
            label: 'PSC',
            icon: MdOutbond,
            path: 'psc',
            name: UserModuleNameTypes.ACTION_ORDER_PSC_TAB_LIST,
        },
        {
            label: 'UNA',
            icon: MdOutbond,
            path: 'una',
            name: UserModuleNameTypes.ACTION_ORDER_UNA_TAB_LIST,
        },
        {
            label: 'PND',
            icon: MdOutbond,
            path: 'pnd',
            name: UserModuleNameTypes.ACTION_ORDER_PND_TAB_LIST,
        },
        {
            label: 'Urgent',
            icon: MdOutbond,
            path: 'urgent',
            name: UserModuleNameTypes.ACTION_ORDER_URGENT_TAB_LIST,
        },
        {
            label: 'Non Actions',
            icon: MdOutbond,
            path: 'non-action',
            name: UserModuleNameTypes.ACTION_ORDER_NON_ACTION_TAB_LIST,
        },
        {
            label: 'Inquiry',
            icon: MdOutbond,
            path: 'inquiry',
            name: UserModuleNameTypes.ACTION_ORDER_INQUIRY_TAB,
        },
        {
            label: 'Complaint',
            icon: MdOutbond,
            path: 'complaint',
            name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_TAB,
        },
        {
            label: 'Reattempt',
            icon: MdOutbond,
            path: 'reattempt',
            name: UserModuleNameTypes.ACTION_ORDER_REATTEMPT_TAB,
        },
        {
            label: 'All',
            icon: MdOutbond,
            path: 'all',
            name: UserModuleNameTypes.ACTION_ORDER_ALL_TAB_LIST,
        },
    ]

    const [activeTab, setActiveTab] = useState(0)
    // const [activelabel, setActiveTabLabel] = useState<string>()
    // const [activeTabIndex, setActiveTab] = useState<number>(0)

    // Access specific query parameters by their names
    // const activeTab: keyof typeof statusProps | string | null =
    //     queryParams.get('orderStatus')

    // const allowedTabs = tabs
    // ?.filter((nav) => {
    //     return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
    // })
    // ?.map((tab) => tab)

    useEffect(() => {
        const activeTabIndex = window.location.pathname?.split('/')?.[2]
        const tabindex = tabs.findIndex((tab) => tab.path === activeTabIndex)
        setActiveTab(tabindex)
    }, [tabs])

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Orders',
            path: 'overview',
        },
        {
            label: 'All',
        },
    ]

    return (
        <SideNavLayout>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex  h-[calc(100%)] bg-white">
                    {/* Tab Section */}
                    <div className="w-[100%] border-b border-r border-l rounded-r h-full overflow-x-scroll">
                        <TabScrollable
                            tabs={tabs}
                            active={activeTab}
                            navBtnContainerClassName="bg-red-500"
                        />
                        {/* Breadcrumb */}
                        <div className="py-2 px-4">
                            <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                        </div>

                        {/* Children */}
                        <div className="h-[calc(100vh-155px)] w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default ViewOrder
