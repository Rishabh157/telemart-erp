/// ==============================================
// Filename:TabScrollable.tsx
// Type: Utils Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'
import { Tabs, Tab } from 'react-tabs-scrollable'
import 'react-tabs-scrollable/dist/rts.css'

// |-- Types --|
type Props = {
    navBtnContainerClassName?: string
    active?: number
    setActiveTabHandle?: any
    tabs: {
        label: string
        icon: IconType
        path?: string
        name?: string
        onClick?: () => void
    }[]
}
const TabScrollable: React.FC<Props> = ({
    tabs,
    active = 0,
    navBtnContainerClassName = '',
}) => {
    // define state with initial value to let the tabs start with that value
    const [activeTab, setActiveTab] = React.useState<number>(0)
    const navigate = useNavigate()

    // define a onClick function to bind the value on tab click
    const onTabClick = (e: any, index: number) => {
        if (window.location.pathname.split('/')[1] === 'dealers') {
            const id = window.location.pathname.split('/')[2]
            navigate(`/dealers/${id}/${tabs[index]?.path as string}`)
            setActiveTab(index)
        } else if (window.location.pathname.split('/')[1] === 'orders') {
            // const id = window.location.pathname.split('/')[2]
            navigate(`/orders${tabs[index]?.path as string}`)
            setActiveTab(index)
        } else {
            navigate(tabs[index]?.path as string)
            setActiveTab(index)
        }
        // setActiveTabHandle(index)
    }
    React.useEffect(() => {
        setActiveTab(active)
    }, [active])

    const tabsArray = [...tabs]

    return (
        <>
            <Tabs
                showTabsScroll
                activeTab={activeTab as number}
                onTabClick={onTabClick}
                // navBtnContainerClassName='overflow-scroll w-[100%]'
                // navBtnClassName={'text-[30px] bg-black w-[100%] overflow-scroll'}
                // rightBtnIcon={<FaChevronCircleRight size={26} fill="blue" />}
                // leftBtnIcon={<FaChevronCircleLeft size={26} fill="blue" />}
                // rightBtnIcon={<span className="select-none">&#x22D9; </span>}
                // leftBtnIcon={<span className="select-none">&#x22D8; </span>}
                leftNavBtnClassName={
                    'bg-inherit border-0 hover:bg-white p-0 m-0 font-bold'
                }
                hideNavBtns={false}
            >
                {/* generating an array to loop through it  */}
                {tabsArray.map((item) => (
                    <Tab key={item.label} >
                        <div className="flex p-0 m-0 items-center font-semibold">
                            <div className=" text-xs mr-2 mt-1">
                                <item.icon />
                            </div>
                            <div className="text-xs">{item.label}</div>
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </>
    )
}

export default TabScrollable
