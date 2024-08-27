// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'
import { Outlet, useNavigate } from 'react-router-dom'

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

const tabs: tabsProps[] = [
    {
        label: 'Agent Hierarchy',
        icon: MdOutbond,
        path: 'agent-hierarchy',
        name: UserModuleNameTypes.ACTION_OVERVIEW_ORDER_TAB_LIST,
    },
    {
        label: 'Agent Order Status',
        icon: MdOutbond,
        path: 'agent-order-status',
        name: UserModuleNameTypes.ACTION_GLOBAL_ORDER_TAB_LIST,
    },
    {
        label: 'Agent Wise Complaint',
        icon: MdOutbond,
        path: 'agent-wise-complaint',
        name: UserModuleNameTypes.ACTION_FRESH_ORDER_TAB_LIST,
    },
    {
        label: 'Agent Wise Enquiry',
        icon: MdOutbond,
        path: 'agent-wise-enquiry',
        name: UserModuleNameTypes.ACTION_ASSIGN_ORDER_TAB_LIST,
    },
    {
        label: 'Agent Wise Product',
        icon: MdOutbond,
        path: 'agent-wise-product',
        name: UserModuleNameTypes.ACTION_PREPAID_ORDER_TAB_LIST,
    },
    {
        label: 'Call Back',
        icon: MdOutbond,
        path: 'call-back',
        name: UserModuleNameTypes.ACTION_DELIVERED_ORDER_TAB_LIST,
    },
    {
        label: 'Day Wise Agent Performance',
        icon: MdOutbond,
        path: 'day-wise-agent-performance',
        name: UserModuleNameTypes.ACTION_DOORCANCELLED_ORDER_TAB_LIST,
    },
    {
        label: 'Detailed Performance',
        icon: MdOutbond,
        path: 'detailed-performance',
        name: UserModuleNameTypes.ACTION_HOLD_ORDER_TAB_LIST,
    },
    {
        label: 'FM/SCM Wise Performance',
        icon: MdOutbond,
        path: 'fm-scm-wise-performance',
        name: UserModuleNameTypes.ACTION_PSC_ORDER_TAB_LIST,
    },
    {
        label: 'Order VS Delivery Report',
        icon: MdOutbond,
        path: 'order-delivery-report',
        name: UserModuleNameTypes.ACTION_ORDER_UNA_TAB_LIST,
    },
    {
        label: 'Shift Wise Agent',
        icon: MdOutbond,
        path: 'shift-wise-agent',
        name: UserModuleNameTypes.ACTION_PND_ORDER_TAB_LIST,
    },
]

const AgentDetails = () => {
    const [activeTabIndex, setActiveTab] = useState<number>(0)
    const [activeTabLabel, setActiveTabLabel] = useState<string>()
    const [activePath, setActiveTabPath] = useState<string>('')

    const navigate = useNavigate()

    // Access specific query parameters by their names
    const activeTab = window.location.pathname.split('/')[3]

    const allowedTabs = tabs
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)

    useEffect(() => {
        const allowedTabs = tabs?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        navigate(`/reports/agent-details/${allowedTabs[0]?.path}`)
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
            label: 'Agent Details',
            path: `${activePath?.replace('/', '')}`,
        },
        {
            label: `${activeTabLabel}`,
        },
    ]

    return (

        <div className="h-[calc(100vh-55px)]">
            <div className="w-full flex  h-[calc(100%)] bg-white">
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
    )
}

export default AgentDetails
