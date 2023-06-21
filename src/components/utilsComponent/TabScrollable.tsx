import React from 'react'
import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'
import { Tabs, Tab } from 'react-tabs-scrollable'
import 'react-tabs-scrollable/dist/rts.css'
type Props = {
    tabs: {
        label: string
        icon: IconType
        path: string
    }[]
}
const TabScrollable: React.FC<Props> = ({ tabs }) => {
    // define state with initial value to let the tabs start with that value
    const [activeTab, setActiveTab] = React.useState(0)
    const navigate = useNavigate()

    // define a onClick function to bind the value on tab click
    const onTabClick = (e: any, index: number) => {
        navigate(tabs[index].path)
        setActiveTab(index)
    }
    const tabsArray = [...tabs]
    return (
        <>
            <Tabs
                activeTab={activeTab}
                onTabClick={onTabClick}
                navBtnClassName={'text-[30px]'}
                // rightBtnIcon={<FaChevronCircleRight size={26} fill="blue" />}
                // leftBtnIcon={<FaChevronCircleLeft size={26} fill="blue" />}
                rightBtnIcon={<span className="select-none">&#x22D9; </span>}
                leftBtnIcon={<span className="select-none">&#x22D8; </span>}
                leftNavBtnClassName={
                    'bg-inherit border-0 hover:bg-white p-0 m-0  font-bold'
                }
                navBtnContainerClassName={''}
                hideNavBtns={false}
            >
                {/* generating an array to loop through it  */}
                {tabsArray.map((item) => (
                    <Tab key={item.label} className="">
                        <div className="flex p-0 m-0 font-semibold">
                            <div className=" text-sm mr-2 mt-1">
                                <item.icon />
                            </div>
                            <div className="text-sm">{item.label}</div>
                        </div>
                    </Tab>
                ))}
            </Tabs>

            {/* {tabsArray.map((item, index) => (
                <TabScreen
                    key={item.label}
                    activeTab={activeTab}
                    index={index}
                    // You can add animation with adding a custom class
                    className="some-animation-class"
                >
                    TabScreen {item.label}
                </TabScreen>
            ))} */}
        </>
    )
}

export default TabScrollable
