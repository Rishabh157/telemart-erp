// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'
import { Outlet, useNavigate } from 'react-router-dom'

import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

interface tabsProps {
    label: string
    icon: IconType
    path: string
    name: string
}

const ViewSlot = () => {
    const tabs: tabsProps[] = [
        {
            label: 'Slot Definition',
            icon: MdOutbond,
            path: '/media/slot/defination',
            name: UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_DEFINATION_LIST,
        },
        {
            label: 'Slots',
            icon: MdOutbond,
            path: '/media/slot/run-slots',
            name: UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_SLOTS_RUN_LIST,
        },
    ]

    const [activeTabIndex, setActiveTab] = useState<number>()
    const navigate = useNavigate()
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
        const activeTabIndex = window.location.pathname.split('/')[3]
        let activeIndex = allowedTabs?.findIndex(
            (tab: tabsProps) => tab.path.split('/')[3] === activeTabIndex
        )
        activeIndex = activeIndex < 0 ? 0 : activeIndex
        setActiveTab(activeIndex)
    }, [allowedTabs])

    return (
        <>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex  h-[calc(100%)] bg-white">
                    {/* Right Section */}
                    <div className="w-[100%] border-b border-r border-l rounded-r h-full ">
                        <div className="h-[40px] border flex gap-x-4 items-center   shadow rounded ">
                            <TabScrollable
                                tabs={allowedTabs}
                                active={activeTabIndex}
                                navBtnContainerClassName="bg-red-500"
                            />
                        </div>

                        {/* Children */}
                        <div className="h-[calc(100vh-155px)] w-full ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewSlot
