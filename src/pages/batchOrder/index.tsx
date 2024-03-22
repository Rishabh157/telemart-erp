// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
// import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
// import { isAuthorized } from 'src/utils/authorization'
interface tabsProps {
    label: string
    icon: IconType
    path: string
    name?: string
}

// export enum statusProps {
//     moneyback = 'MONEYBACK',
//     productReplacement = 'PRODUCT-REPLACEMENT',
//     houseArrest = 'HOUSE-ARREST',
// }

const BatchOrderView = () => {
    const tabs: tabsProps[] = [
        {
            label: 'Create Batch',
            icon: MdOutbond,
            path: 'create-batch',
            name: UserModuleNameTypes.ACTION_BATCH_ORDER_CREATE_BATCH,
        },
        {
            label: 'View Batch',
            icon: MdOutbond,
            path: 'assign-batches',
            name: UserModuleNameTypes.ACTION_BATCH_ORDER_ASSIGN_BATCHES,
        },
    ]
    const [activeTabIndex, setActiveTab] = useState<number>(0)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activelabel, setActiveTabLabel] = useState<string>()
    const { pathname } = useLocation()

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
        navigate(`${allowedTabs[0]?.path}`)
        //eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (!activeTab) return

        navigate(`${pathname}`)

        //eslint-disable-next-line
    }, [activeTab])

    useEffect(() => {
        if (!activeTab) return

        let activeIndex = allowedTabs?.findIndex(
            (tab: tabsProps) => tab.path === activeTab
        )
        activeIndex = activeIndex < 0 ? 0 : activeIndex

        setActiveTab(activeIndex)
        const labelTab: string = allowedTabs[activeIndex]?.label || ''
        setActiveTabLabel(labelTab)
    }, [activeTab, allowedTabs])

    return (
        <SideNavLayout>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex  h-[calc(100%)] bg-white">
                    {/* Right Section */}
                    <div className="w-[100%] border-b border-r border-l rounded-r h-full overflow-x-scroll">
                        <TabScrollable
                            tabs={allowedTabs}
                            active={activeTabIndex}
                            navBtnContainerClassName="bg-red-500"
                        />
                        {/* <div className="py-2 px-4">
                            <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                        </div> */}
                        {/* Children */}
                        <div className="h-[calc(100%-30px)] pt-4">
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

export default BatchOrderView
