// |-- Built-in Dependencies --|
// import React, { useState, useEffect } from 'react'
// import { IconType } from 'react-icons'

// |-- External Dependencies --|
// import { MdOutbond } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Internal Dependencies --|
import { useGetOrderDashboardDataQuery } from 'src/services/OrderService'
import { AiOutlineRight } from 'react-icons/ai'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'

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
    reattempt = 'REATTEMPT',
    deliveryOutOfNetwork = 'DELIVERYOUTOFNETWORK',
    intransit = 'INTRANSIT',
    ndr = 'NDR',
}

type CardPropType = {
    value: any
    label: any
    path: string
    className: string
    labelSmall?: string
    valueSmall?: string
    pathSmall?: string
}

const InfoCard = ({
    value,
    label,
    path,
    className,
    labelSmall,
    valueSmall,
    pathSmall,
}: CardPropType) => {
    const navigate = useNavigate()

    return (
        <div
            className={`rounded-lg shadow-lg p-6 border border-slate-400 ${className} flex justify-between`}
        >
            <div>
                <h3 className="text-sm text-white font-medium">{label}</h3>
                <p className="text-4xl text-white font-semibold pt-2">
                    {value}
                </p>
                <button
                    onClick={() => {
                        navigate(`/orders${path}`)
                    }}
                    className="flex text-base text-white  pt-2 "
                >
                    <div> MORE INFO </div>
                    <div className="pt-1 pl-2 ">
                        <AiOutlineRight />
                    </div>
                </button>
            </div>

            {/* {labelSmall && (
                <div>
                    <h3 className="text-sm text-white font-medium">
                        {labelSmall}
                    </h3>
                    <p className="text-4xl text-white font-semibold pt-2">
                        {valueSmall}
                    </p>
                    <button
                        onClick={() => {
                            // navigate(`/${pathSmall}`)
                        }}
                        className="flex text-base text-white  pt-2 "
                    >
                        <div>MORE INFO </div>
                        <div className="pt-1 pl-2 ">
                            <AiOutlineRight />
                        </div>
                    </button>
                </div>
            )} */}
        </div>
    )
}

const OrderDashboard = () => {
    // Order History
    const { items } = useGetCustomListingData({
        useEndPointHook: useGetOrderDashboardDataQuery(''),
    })

    console.log('DashboardData', items)

    // const tabs: tabsProps[] = [
    //     {
    //         label: 'Overview',
    //         icon: MdOutbond,
    //         path: '?orderStatus=overview',
    //         name: UserModuleNameTypes.ACTION_ORDER_GLOBAL_ORDER_SEARCH_TAB,
    //     },
    //     {
    //         label: 'Global Order Search',
    //         icon: MdOutbond,
    //         path: '?orderStatus=global-search',
    //         name: UserModuleNameTypes.ACTION_ORDER_GLOBAL_ORDER_SEARCH_TAB,
    //     },
    //     {
    //         label: 'Fresh Order',
    //         icon: MdOutbond,
    //         path: '?orderStatus=fresh',
    //         name: UserModuleNameTypes.ACTION_ORDER_FRESH_ORDER_TAB_LIST,
    //     },
    //     {
    //         label: 'Assign Order',
    //         icon: MdOutbond,
    //         path: '?orderStatus=assign',
    //         name: UserModuleNameTypes.ACTION_ORDER_ASSIGN_ORDER_TAB_LIST,
    //     },
    //     {
    //         label: 'Order Approval',
    //         icon: MdOutbond,
    //         path: '?orderStatus=approved',
    //         name: UserModuleNameTypes.ACTION_ORDER_APPROVAL_TAB_LIST,
    //     },
    //     {
    //         label: 'Delivered',
    //         icon: MdOutbond,
    //         path: '?orderStatus=delivered',
    //         name: UserModuleNameTypes.ACTION_ORDER_DELIVERED_TAB_LIST,
    //     },
    //     {
    //         label: 'Door Cancelled',
    //         icon: MdOutbond,
    //         path: '?orderStatus=doorCancelled',
    //         name: UserModuleNameTypes.ACTION_ORDER_DOOR_CANCELLED_LIST,
    //     },
    //     {
    //         label: 'Hold',
    //         icon: MdOutbond,
    //         path: '?orderStatus=hold',
    //         name: UserModuleNameTypes.ACTION_ORDER_HOLD_TAB_LIST,
    //     },
    //     {
    //         label: 'PSC',
    //         icon: MdOutbond,
    //         path: '?orderStatus=psc',
    //         name: UserModuleNameTypes.ACTION_ORDER_PSC_TAB_LIST,
    //     },
    //     {
    //         label: 'UNA',
    //         icon: MdOutbond,
    //         path: '?orderStatus=una',
    //         name: UserModuleNameTypes.ACTION_ORDER_UNA_TAB_LIST,
    //     },
    //     {
    //         label: 'PND',
    //         icon: MdOutbond,
    //         path: '?orderStatus=pnd',
    //         name: UserModuleNameTypes.ACTION_ORDER_PND_TAB_LIST,
    //     },
    //     {
    //         label: 'Urgent',
    //         icon: MdOutbond,
    //         path: '?orderStatus=urgent',
    //         name: UserModuleNameTypes.ACTION_ORDER_URGENT_TAB_LIST,
    //     },
    //     {
    //         label: 'Non Actions',
    //         icon: MdOutbond,
    //         path: '?orderStatus=non-action',
    //         name: UserModuleNameTypes.ACTION_ORDER_NON_ACTION_TAB_LIST,
    //     },
    //     {
    //         label: 'Inquiry',
    //         icon: MdOutbond,
    //         path: '?orderStatus=inquiry',
    //         name: UserModuleNameTypes.ACTION_ORDER_GLOBAL_ORDER_SEARCH_TAB,
    //     },

    //     {
    //         label: 'Complaint',
    //         icon: MdOutbond,
    //         path: '?orderStatus=complaint',
    //         name: UserModuleNameTypes.ACTION_ORDER_COMPAINT_TAB,
    //     },
    //     {
    //         label: 'Reattempt',
    //         icon: MdOutbond,
    //         path: '?orderStatus=reattempt',
    //         name: UserModuleNameTypes.ACTION_ORDER_REATTEMPT_TAB,
    //     },
    //     {
    //         label: 'All',
    //         icon: MdOutbond,
    //         path: '?orderStatus=all',
    //         name: UserModuleNameTypes.ACTION_ORDER_ALL_TAB_LIST,
    //     },
    // ]

    function getLabelColor(orderType: string) {
        switch (orderType) {
            case 'allOrders':
                return {
                    value: 0,
                    label: 'All Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-gray-400 text-gray-900',
                }
            case 'freshOrders':
                return {
                    value: 12,
                    label: 'Fresh Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-blue-400 text-white',
                }
            case 'prepaidOrders':
                return {
                    value: 0,
                    label: 'Prepaid Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-green-400 text-white',
                }
            case 'deliveredOrders':
                return {
                    value: 0,
                    label: 'Delivered Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-green-600 text-white',
                }
            case 'doorCancelledOrders':
                return {
                    value: 0,
                    label: 'Door Cancelled Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-red-400 text-white',
                }
            case 'holdOrders':
                return {
                    value: 5,
                    label: 'Hold Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-yellow-400 text-gray-900',
                }
            case 'pscOrders':
                return {
                    value: 0,
                    label: 'PSC Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-purple-400 text-white',
                }
            case 'unaOrders':
                return {
                    value: 0,
                    label: 'UNA Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-yellow-600 text-white',
                }
            case 'pndOrders':
                return {
                    value: 0,
                    label: 'PND Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-yellow-600 text-white',
                }
            case 'urgentOrders':
                return {
                    value: 0,
                    label: 'Urgent Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-red-600 text-white',
                }
            case 'nonActionOrders':
                return {
                    value: 0,
                    label: 'Non-Action Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-blue-600 text-white',
                }
            case 'rtoOrders':
                return {
                    value: 0,
                    label: 'RTO Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-gray-400 text-gray-900',
                }
            case 'inquiryOrders':
                return {
                    value: 0,
                    label: 'Inquiry Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-blue-600 text-white',
                }
            case 'reattemptOrders':
                return {
                    value: 0,
                    label: 'Reattempt Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-gray-600 text-white',
                }
            case 'deliveryOutOfNetworkOrders':
                return {
                    value: 0,
                    label: 'Delivery Out Of Network Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-blue-400 text-white',
                }
            case 'intransitOrders':
                return {
                    value: 0,
                    label: 'Intransit Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-red-400 text-white',
                }
            case 'ndrOrders':
                return {
                    value: 0,
                    label: 'NDR Orders',
                    path: '?orderStatus=all',
                    bgcolor: 'bg-green-600 text-white',
                }
            default:
                return {
                    value: 0,
                    label: '',
                    path: '?orderStatus=all',
                    bgcolor: '',
                }
        }
    }

    const dataArray = Object.entries(items).map(([key, value]) => ({
        [key]: value,
    }))

    console.log('data: ', dataArray)
    return (
        <SideNavLayout>
            <div className="h-[calc(100vh-55px)]">
                <div className="w-full flex  h-[calc(100%)] bg-white">
                    {/* Tab Section */}
                    <div className="w-[100%] border-b border-r p-4 border-l rounded-r h-full overflow-x-scroll">
                        {/* Children */}
                        <div className="grid grid-cols-4 gap-4">
                            {dataArray?.map((el) => {
                                const cardItems = getLabelColor(
                                    Object.keys(el)[0] as string
                                )
                                return (
                                    <InfoCard
                                        key={Object.keys(el)[0]}
                                        value={cardItems.value}
                                        label={cardItems.label}
                                        path={cardItems.path}
                                        className={`px-2 py-1 rounded-full ${cardItems.bgcolor}`}
                                        // labelSmall="LOL"
                                        // valueSmall="LOL"
                                        // pathSmall="LOL"
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default OrderDashboard
