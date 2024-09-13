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

const tabs: tabsProps[] = [
    {
        label: 'Amazon',
        icon: MdOutbond,
        path: 'amazon',
        name: UserModuleNameTypes.ACTION_AMAZON_ORDER_TAB,
    },
    {
        label: 'Flipkart',
        icon: MdOutbond,
        path: 'flipkart',
        name: UserModuleNameTypes.ACTION_FLIPKART_ORDER_TAB,
    },
]

const ViewEcomOrder = () => {
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
        navigate(`/ecom-orders/${allowedTabs[0]?.path}`)
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
            label: 'Ecom Orders',
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
                    <div className="w-[100%] border-r border-l rounded-r h-full overflow-x-scroll">
                        <TabScrollable
                            tabs={allowedTabs}
                            active={activeTabIndex}
                            navBtnContainerClassName="bg-red-500 z-50"
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

export default ViewEcomOrder
