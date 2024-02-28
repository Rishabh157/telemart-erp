/// ==============================================
// Filename:index.tsx
// Type: Index Component
// Last Updated: July 4, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useLocation,
    //  useNavigate 
    } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import {
    UserModuleNameTypes,
    UserModuleOrderTabsTypes,
} from 'src/models/userAccess/UserAccess.model'
import { RootState } from 'src/redux/store'
import { showAllowedTabs } from 'src/userAccess/getAuthorizedModules'
import OrderListing from './all/OrderListing'
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
    nonAction = 'NON_ACTION',
}

const ViewOrder = () => {
    const tabs: tabsProps[] = [
        {
            label: 'All',
            icon: MdOutbond,
            path: '?orderStatus=all',
            name: UserModuleOrderTabsTypes.orderAllTab,
        },
        {
            label: 'Fresh Order',
            icon: MdOutbond,
            path: '?orderStatus=fresh',
            name: UserModuleOrderTabsTypes.orderFreshTab,
        },
        {
            label: 'Order Approval',
            icon: MdOutbond,
            path: '?orderStatus=approved',
            name: UserModuleOrderTabsTypes.orderApprovedTab,
        },
        {
            label: 'Delivered',
            icon: MdOutbond,
            path: '?orderStatus=delivered',
            name: UserModuleOrderTabsTypes.orderDeliveredTab,
        },
        {
            label: 'Door Cancelled',
            icon: MdOutbond,
            path: '?orderStatus=doorCancelled',
            name: UserModuleOrderTabsTypes.orderDoorCancelledTab,
        },
        {
            label: 'Hold',
            icon: MdOutbond,
            path: '?orderStatus=hold',
            name: UserModuleOrderTabsTypes.orderHoldTab,
        },
        {
            label: 'PSC',
            icon: MdOutbond,
            path: '?orderStatus=psc',
            name: UserModuleOrderTabsTypes.orderPscTab,
        },
        {
            label: 'UNA',
            icon: MdOutbond,
            path: '?orderStatus=una',
            name: UserModuleOrderTabsTypes.orderUnaTab,
        },
        {
            label: 'PND',
            icon: MdOutbond,
            path: '?orderStatus=pnd',
            name: UserModuleOrderTabsTypes.orderPndTab,
        },
        {
            label: 'Urgent',
            icon: MdOutbond,
            path: '?orderStatus=urgent',
            name: UserModuleOrderTabsTypes.orderUrgentTab,
        },
        {
            label: 'Non Actions',
            icon: MdOutbond,
            path: '?orderStatus=non-action',
            name: UserModuleOrderTabsTypes.orderNonActionTab,
        },
        {
            label: 'Global Order Search',
            icon: MdOutbond,
            path: '?orderStatus=global-search',
            name: UserModuleOrderTabsTypes.orderNonActionTab,
        },
    ]
    const { userData } = useSelector((state: RootState) => state?.auth)

    const [activeTabIndex, setActiveTab] = useState<number>(0)
    const [activelabel, setActiveTabLabel] = useState<string>()
    const { search, 
        // state, pathname 
    } = useLocation()
    const queryParams = new URLSearchParams(search)

    // Access specific query parameters by their names
    const activeTab: keyof typeof statusProps | string | null =
        queryParams.get('orderStatus')
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (!activeTab) return

    //     navigate(`${pathname}?orderStatus=${activeTab}`, {
    //         state: state,
    //     })
    //     return () => {
    //         if (state !== null)
    //             navigate(`${pathname}`, {
    //                 state: state,
    //             })
    //     }
    //     //eslint-disable-next-line
    // }, [activeTab])

    const allowedTabs = showAllowedTabs(
        checkUserAccess,
        UserModuleNameTypes.order,
        tabs,
        userData?.userRole || 'ADMIN'
    )
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
                                tabName={allowedTabs[activeTabIndex].name}
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
