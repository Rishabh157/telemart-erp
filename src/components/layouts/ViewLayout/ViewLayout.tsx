import React from 'react'
import SideNavLayout from '../SideNavLayout/SideNavLayout'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ATMInputAdormant from 'src/components/UI/atoms/ATMInputAdormant/ATMInputAdormant'
import { IconType } from 'react-icons'

type ViewLayoutPropTypes = {
    infoCard: React.ReactNode;
    actionIcons?: {
        icon: IconType;
        onClick: () => void;
    }[];
    listData?: any[];
    renderListItem: (item: any) => React.ReactNode;
    tabs: {
        label: string;
        icon: IconType
        path: string

    }[];
    searchValue: string;
    onSearch: (value: string) => void
}

const ViewLayout = ({
    infoCard,
    actionIcons,
    listData,
    renderListItem,
    tabs,
    searchValue,
    onSearch
}: ViewLayoutPropTypes
) => {
    const navigate = useNavigate()
    const location = useLocation()


    return (
        <>
            <SideNavLayout>
                <div className='h-full' >

                    <div className='w-full flex  h-[calc(100%)] bg-white  ' >

                        {/* Left Section Side Bar */}
                        <div className='w-[17%] h-full flex flex-col  border-b  border-l rounded-l  ' >

                            {/* Info Card */}
                            <div className='h-[150px] w-full' >
                                {infoCard}
                            </div>

                            {/* Action Icon */}
                            <div className='h-[35px] border-b border-t flex justify-center items-center' >
                                <div className='flex gap-4' >
                                    {
                                        actionIcons?.map((icon, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => { icon.onClick() }}
                                                    className='text-lg text-slate-500 cursor-pointer'
                                                >
                                                    <icon.icon />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className='h-[40px] px-3 border-b flex items-center' >
                                <ATMInputAdormant
                                    name=""
                                    value={searchValue}
                                    onChange={(e) => { onSearch(e.target.value) }}
                                    placeholder='Search here...'
                                    className='h-[37px] border-0'
                                    adormant={<BiSearchAlt2 className='text-slate-400 text-xl' />}
                                    adormantProps={{
                                        position: 'start',
                                        extraClasses: 'bg-white border-0 '

                                    }}
                                />
                            </div>

                            {/* List */}
                            <div className='h-[calc(100%-225px)] overflow-auto ' >
                                {
                                    listData?.map((item) => {
                                        return (
                                            renderListItem(item)
                                        )
                                    })
                                }
                            </div>

                        </div>

                        {/* Right Section */}
                        <div className='w-[calc(83%)] border-b border-r border-l rounded-r h-full'  >

                            {/* Tabs */}
                            <div className='h-[40px] border-b flex gap-4 items-center px-4 bg-white ' >

                                {
                                    tabs.map((tab, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => navigate(tab.path)}
                                                className={`h-full px-3 flex gap-2 items-center  cursor-pointer hover:text-primary-main 
                                                 ${location.pathname.split("/")[3] === tab.path ? 'border-b-2 border-primary-main text-primary-main' : "text-slate-500"}
                                                 `}
                                            >
                                                <div className=' text-lg  ' >
                                                    <tab.icon />
                                                </div>
                                                {tab.label}
                                            </div>

                                        )
                                    })
                                }
                            </div>

                            {/* Children */}
                            <div className='h-[calc(100%-40px)] bg-white' >
                                <Outlet />
                            </div>
                        </div>

                    </div>

                </div>
            </SideNavLayout>

        </>
    )
}

export default ViewLayout
