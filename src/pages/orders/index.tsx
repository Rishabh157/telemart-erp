// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'
import { Outlet, useNavigate } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

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

const tabs: tabsProps[] = [
    {
        label: 'Overview',
        icon: MdOutbond,
        path: '/overview',
        name: UserModuleNameTypes.ACTION_OVERVIEW_ORDER_TAB_LIST,
    },
    {
        label: 'Global Order Search',
        icon: MdOutbond,
        path: '/global-search',
        name: UserModuleNameTypes.ACTION_GLOBAL_ORDER_TAB_LIST,
    },
    {
        label: 'Fresh Order',
        icon: MdOutbond,
        path: '/fresh',
        name: UserModuleNameTypes.ACTION_FRESH_ORDER_TAB_LIST,
    },
    {
        label: 'Assign Order',
        icon: MdOutbond,
        path: '/assign',
        name: UserModuleNameTypes.ACTION_ASSIGN_ORDER_TAB_LIST,
    },
    {
        label: 'Prepaid Order',
        icon: MdOutbond,
        path: '/prepaid',
        name: UserModuleNameTypes.ACTION_PREPAID_ORDER_TAB_LIST,
    },
    {
        label: 'Delivered',
        icon: MdOutbond,
        path: '/delivered',
        name: UserModuleNameTypes.ACTION_DELIVERED_ORDER_TAB_LIST,
    },
    {
        label: 'Door Cancelled',
        icon: MdOutbond,
        path: '/doorCancelled',
        name: UserModuleNameTypes.ACTION_DOORCANCELLED_ORDER_TAB_LIST,
    },
    {
        label: 'Hold',
        icon: MdOutbond,
        path: '/hold',
        name: UserModuleNameTypes.ACTION_HOLD_ORDER_TAB_LIST,
    },
    {
        label: 'PSC',
        icon: MdOutbond,
        path: '/psc',
        name: UserModuleNameTypes.ACTION_PSC_ORDER_TAB_LIST,
    },
    {
        label: 'UNA',
        icon: MdOutbond,
        path: '/una',
        name: UserModuleNameTypes.ACTION_ORDER_UNA_TAB_LIST,
    },
    {
        label: 'PND',
        icon: MdOutbond,
        path: '/pnd',
        name: UserModuleNameTypes.ACTION_PND_ORDER_TAB_LIST,
    },
    {
        label: 'Urgent',
        icon: MdOutbond,
        path: '/urgent',
        name: UserModuleNameTypes.ACTION_URGENT_ORDER_TAB_LIST,
    },
    {
        label: 'Non Actions',
        icon: MdOutbond,
        path: '/non-action',
        name: UserModuleNameTypes.ACTION_NON_ACTION_ORDER_TAB_LIST,
    },
    {
        label: 'Inquiry',
        icon: MdOutbond,
        path: '/inquiry',
        name: UserModuleNameTypes.ACTION_INQUIRY_ORDER_TAB_LIST,
    },
    {
        label: 'Complaint',
        icon: MdOutbond,
        path: '/complaint',
        name: UserModuleNameTypes.ACTION_ORDER_NON_ACTION_TAB_LIST,
    },
    {
        label: 'Reattempt',
        icon: MdOutbond,
        path: '/reattempt',
        name: UserModuleNameTypes.ACTION_REATTEMPT_ORDER_TAB_LIST,
    },
    {
        label: 'All',
        icon: MdOutbond,
        path: '/all',
        name: UserModuleNameTypes.ACTION_ALL_ORDER_TAB_LIST,
    },
]

const ViewOrder = () => {
    const [activeTabIndex, setActiveTab] = useState<number>(0)
    const [activeTabLabel, setActiveTabLabel] = useState<string>()
    const [activePath, setActiveTabPath] = useState<string>('')

    const navigate = useNavigate()

    // Access specific query parameters by their names
    const activeTab = window.location.pathname.split('/')[2]

    const allowedTabs = tabs
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)

    useEffect(() => {
        const allowedTabs = tabs?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        navigate(`/orders${allowedTabs[0]?.path}`)
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!activeTab) return

        let activeIndex = allowedTabs?.findIndex(
            (tab: tabsProps) => tab?.path?.replace('/', '') === activeTab
        )

        activeIndex = activeIndex < 0 ? 0 : activeIndex

        setActiveTab(activeIndex)
        const labelTab: string = allowedTabs[activeIndex]?.label || ''
        const activePath: string = allowedTabs[activeIndex]?.path || ''
        setActiveTabLabel(labelTab)
        setActiveTabPath(activePath)
    }, [activeTab, allowedTabs])

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Orders',
            path: `${activePath?.replace('/', '')}`,
        },
        {
            label: `${activeTabLabel}`,
        },
    ]

    return (
        <SideNavLayout>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex h-[calc(100%)] bg-white">
                    {/* Tab Section */}
                    <div className="w-[100%] border-b border-r border-l rounded-r h-full overflow-x-scroll">
                        <TabScrollable
                            tabs={allowedTabs}
                            active={activeTabIndex}
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
