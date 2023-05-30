import React, { useState } from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import DispositionTwoListingWrapper from './dispositionCaller/dispositionTwo/list/DispositionTwoListingWrapper'
import DispositionThreeListingWrapper from './dispositionCaller/dispositionThree/list/DispositionThreeListingWrapper'
import { IconType } from 'react-icons'
import { BiPhoneCall } from 'react-icons/bi'

import InitialCallOneListingWrapper from './icInitialCaller/dispositionOne/list/InitialCallOneListingWrapper'
import InitialCallTwoListingWrapper from './icInitialCaller/dispositionTwo/list/InitialCallTwoListingWrapper'
import InitialCallThreeListingWrapper from './icInitialCaller/dispositionThree/list/InitialCallThreeListingWrapper'

export type Tabs = {
    label: string
    icon: IconType
    active?: boolean
    index: number
}

const Disposition = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const tabs: Tabs[] = [
        {
            index: 0,
            label: 'Caller',
            icon: BiPhoneCall,
        },
        {
            label: 'IC Initial Caller',
            icon: BiPhoneCall,
            index: 1,
        },
    ]

    return (
        <SideNavLayout>
            <div className="flex shadow rounded h-[45px] items-center gap-3 bg-gray-300 w-full overflow-auto px-3 ">
                {tabs.map((tab, tabIndex) => {
                    const { label, index } = tab
                    return (
                        <button
                            type="button"
                            onClick={() => {
                                setActiveTabIndex(index)
                            }}
                            key={tabIndex}
                            className={`flex items-center gap-2 px-4 h-[calc(100%-14px)] rounded transition-all duration-500 ${
                                activeTabIndex === index
                                    ? 'bg-slate-100 text-primary-main '
                                    : 'text-slate-500'
                            }`}
                        >
                            <div>
                                {' '}
                                <tab.icon className="text-xl" />{' '}
                            </div>
                            <div className="font-medium"> {label} </div>
                        </button>
                    )
                })}
            </div>
            {activeTabIndex === 0 ? (
                <div className=" h-full grid grid-cols-3  gap-4  p-3 overflow-auto">
                    {/* Country */}
                    {/* <div className=" h-full">
                        <DispositionOneListingWrapper />
                    </div> */}

                    {/* State */}
                    <div className=" h-full ">
                        <DispositionTwoListingWrapper />
                    </div>
                    <div className=" h-full ">
                        <DispositionThreeListingWrapper />
                    </div>
                </div>
            ) : (
                <div className=" h-full grid grid-cols-3  gap-4  p-3 overflow-auto">
                    {/* Country */}
                    <div className=" h-full">
                        <InitialCallOneListingWrapper />
                    </div>

                    {/* State */}
                    <div className=" h-full ">
                        <InitialCallTwoListingWrapper />
                    </div>
                    <div className=" h-full ">
                        <InitialCallThreeListingWrapper />
                    </div>
                </div>
            )}
        </SideNavLayout>
    )
}

export default Disposition
