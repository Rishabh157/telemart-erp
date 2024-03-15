/// ==============================================
// Filename:index.tsx
// Type: Index Component
// Last Updated: MARCH 14, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'
import {
    Outlet,
    useLocation,
    // useNavigate,
} from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
// import OrderListing from './all/moneybackTab/MoneybackListingWrapper'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
interface tabsProps {
    label: string
    icon: IconType
    path: string
    name?: string
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
}

const ViewRequest = () => {
    const tabs: tabsProps[] = [
        {
            label: 'Moneyback',
            icon: MdOutbond,
            path: 'moneyback',
            // name: UserModuleNameTypes.ACTION_ORDER_ALL_TAB_LIST,
        },
        // {
        //     label: 'Product Replacement',
        //     icon: MdOutbond,
        //     path: 'product-replacement',
        //     // name: UserModuleNameTypes.ACTION_ORDER_FRESH_ORDER_TAB_LIST,
        // },
        // {
        //     label: 'House Arrest',
        //     icon: MdOutbond,
        //     path: 'house-arrest',
        //     // name: UserModuleNameTypes.ACTION_ORDER_APPROVAL_TAB_LIST,
        // },
    ]

    const [activeTabIndex, setActiveTab] = useState<number>(0)
    const [activelabel, setActiveTabLabel] = useState<string>()
    const {
        search,
        // pathname
    } = useLocation()
    const queryParams = new URLSearchParams(search)
    // const navigate = useNavigate()
    // Access specific query parameters by their names
    const activeTab: keyof typeof statusProps | string | null =
        queryParams.get('orderStatus')
    const allowedTabs = tabs
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)
    // useEffect(() => {
    //     if (!activeTab) return
    //     // const navigate = useNavigate()
    //     // useEffect(() => {
    //     //     if (!activeTab) return

    //     navigate(`${pathname}?orderStatus=${activeTab}`)

    //     //eslint-disable-next-line
    // }, [activeTab])

    // const breadcrumbs: BreadcrumbType[] = [
    //     {
    //         label: 'Request',
    //         path: '/request',
    //     },
    //     {
    //         label: `${activelabel ? activelabel : 'ALL'}`,
    //     },
    // ]

    // useEffect(() => {
    //     if (!activeTab) return

    //     let activeIndex = allowedTabs?.findIndex(
    //         (tab: tabsProps) => tab.path.split('=')[1] === activeTab
    //     )
    //     activeIndex = activeIndex < 0 ? 0 : activeIndex
    //     setActiveTab(activeIndex)
    //     const labelTab: string = allowedTabs[activeIndex]?.label || ''
    //     setActiveTabLabel(labelTab)
    // }, [activeTab, allowedTabs])

    // const getStatus = (status: keyof typeof statusProps) => {
    //     return statusProps[status] || ''
    // }

    return (
        <SideNavLayout>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex  h-[calc(100%)] bg-white">
                    {/* Right Section */}
                    <div className="w-[100%] border-b border-r border-l rounded-r h-full overflow-x-scroll">
                        {/* <div className='bg-stone-400 w-[100%]  overflow-x-scroll flex gap-x-4 items-center h-[35px]'> */}
                        {/* <div className="h-[40px] border flex gap-x-4 items-center bg-stone-400  shadow rounded w-[100%] overflow-auto"> */}
                        <TabScrollable
                            tabs={allowedTabs}
                            active={activeTabIndex}
                            navBtnContainerClassName="bg-red-500"
                        />
                        {/* </div> */}
                        {/* <div className="py-2 px-4">
                            <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                        </div> */}

                        {/* Children */}
                        <div className="h-[calc(100%-155px)] pt-4">
                            <div className="h-full overflow-auto">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default ViewRequest
