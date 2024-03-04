/// ==============================================
// Filename:index.tsx
// Type: Index Component
// Last Updated: MARCH 1, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'
import {
    useLocation,
    //  useNavigate
} from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import OrderListing from './all/OrderListing'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
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
    'non-action' = 'NON_ACTION',
}

const ViewOrder = () => {
    const tabs: tabsProps[] = [
        {
            label: 'All',
            icon: MdOutbond,
            path: '?orderStatus=all',
            name: UserModuleNameTypes.ACTION_ORDER_ALL_TAB_LIST,
        },
        {
            label: 'Fresh Order',
            icon: MdOutbond,
            path: '?orderStatus=fresh',
            name: UserModuleNameTypes.ACTION_ORDER_FRESH_ORDER_TAB_LIST,
        },
        {
            label: 'Order Approval',
            icon: MdOutbond,
            path: '?orderStatus=approved',
            name: UserModuleNameTypes.ACTION_ORDER_APPROVAL_TAB_LIST,
        },
        {
            label: 'Delivered',
            icon: MdOutbond,
            path: '?orderStatus=delivered',
            name: UserModuleNameTypes.ACTION_ORDER_DELIVERED_TAB_LIST,
        },
        {
            label: 'Door Cancelled',
            icon: MdOutbond,
            path: '?orderStatus=doorCancelled',
            name: UserModuleNameTypes.ACTION_ORDER_DOOR_CANCELLED_LIST,
        },
        {
            label: 'Hold',
            icon: MdOutbond,
            path: '?orderStatus=hold',
            name: UserModuleNameTypes.ACTION_ORDER_HOLD_TAB_LIST,
        },
        {
            label: 'PSC',
            icon: MdOutbond,
            path: '?orderStatus=psc',
            name: UserModuleNameTypes.ACTION_ORDER_PSC_TAB_LIST,
        },
        {
            label: 'UNA',
            icon: MdOutbond,
            path: '?orderStatus=una',
            name: UserModuleNameTypes.ACTION_ORDER_UNA_TAB_LIST,
        },
        {
            label: 'PND',
            icon: MdOutbond,
            path: '?orderStatus=pnd',
            name: UserModuleNameTypes.ACTION_ORDER_PND_TAB_LIST,
        },
        {
            label: 'Urgent',
            icon: MdOutbond,
            path: '?orderStatus=urgent',
            name: UserModuleNameTypes.ACTION_ORDER_URGENT_TAB_LIST,
        },
        {
            label: 'Non Actions',
            icon: MdOutbond,
            path: '?orderStatus=non-action',
            name: UserModuleNameTypes.ACTION_ORDER_NON_ACTION_TAB_LIST,
        },
        {
            label: 'Global Order Search',
            icon: MdOutbond,
            path: '?orderStatus=global-search',
            name: UserModuleNameTypes.ACTION_ORDER_GLOBAL_ORDER_SEARCH_TAB,
        },
        {
            label: 'Inquiry',
            icon: MdOutbond,
            path: '?orderStatus=inquiry',
            name: UserModuleNameTypes.ACTION_ORDER_GLOBAL_ORDER_SEARCH_TAB,
        },
    ]

    const [activeTabIndex, setActiveTab] = useState<number>(0)
    const [activelabel, setActiveTabLabel] = useState<string>()
    const { search } = useLocation()
    const queryParams = new URLSearchParams(search)

    // Access specific query parameters by their names
    const activeTab: keyof typeof statusProps | string | null =
        queryParams.get('orderStatus')
    const allowedTabs = tabs
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Orders',
            path: '/orders?orderStatus=all',
        },
        {
            label: `${activelabel ? activelabel : 'ALL'}`,
        },
    ]
    useEffect(() => {
        if (!activeTab) return

        let activeIndex = allowedTabs?.findIndex(
            (tab: tabsProps) => tab.path.split('=')[1] === activeTab
        )
        activeIndex = activeIndex < 0 ? 0 : activeIndex
        setActiveTab(activeIndex)
        const labelTab: string = allowedTabs[activeIndex]?.label || ''
        setActiveTabLabel(labelTab)
    }, [activeTab, allowedTabs])

    const getStatus = (status: keyof typeof statusProps) => {
        return statusProps[status] || ''
    }

    return (
        <SideNavLayout>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex  h-[calc(100%)] bg-white">
                    {/* Right Section */}
                    <div className="w-[100%] border-b border-r border-l rounded-r h-full ">
                        <div className="h-[40px] border flex gap-x-4 items-center bg-stone-400  shadow rounded ">
                            <TabScrollable
                                tabs={allowedTabs}
                                active={activeTabIndex}
                                navBtnContainerClassName="bg-red-500"
                            />
                        </div>
                        <div className="py-2 px-4">
                            <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                        </div>

                        {/* Children */}
                        <div className="h-[calc(100vh-155px)] w-full ">
                            <OrderListing
                                tabName={allowedTabs[activeTabIndex]?.name}
                                orderStatus={activeTab as string}
                                currentStatus={getStatus(
                                    activeTab as keyof typeof statusProps
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default ViewOrder
