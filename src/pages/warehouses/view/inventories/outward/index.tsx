import React, { useEffect, useState } from 'react'
import { MdOutbond } from 'react-icons/md'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import AccessDenied from 'src/AccessDenied'
import TabScrollable from 'src/components/utilsComponent/TabScrollable'
import { Tabs } from 'src/models/common/paginationType'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { RootState } from 'src/redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetWareHouseByIdQuery } from 'src/services/WareHouseService'
import { WarehousesListResponse } from 'src/models'

type Props = {}

const OutwardTabs = (props: Props) => {

    const tabs: Tabs[] = [
        {
            label: 'Status',
            icon: MdOutbond,
            path: 'warehouse-status',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_STATUS,
        },
        {
            label: 'Dealer',
            icon: MdOutbond,
            path: 'dealer',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_DEALER,
        },
        {
            label: 'Customer',
            icon: MdOutbond,
            path: 'customer',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER,
        },
        {
            label: 'RTV',
            icon: MdOutbond,
            path: 'rtv',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_RTV,
        },
        {
            label: 'Warehouse',
            icon: MdOutbond,
            path: 'warehoue',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_WAREHOUSE,
        },
        {
            label: 'Sample',
            icon: MdOutbond,
            path: 'sample',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_SAMPLE,
        },
        {
            label: 'E-comm',
            icon: MdOutbond,
            path: 'ecom',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE,
        },
        {
            label: 'Company',
            icon: MdOutbond,
            path: 'company',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_COMPANY,
        },
        {
            label: 'Gpo',
            icon: MdOutbond,
            path: 'gpo',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_GPO,
        },
        {
            label: 'Shipyaari Orders',
            icon: MdOutbond,
            path: 'shipyaari-orders',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_SHIPYAARI_ORDERS,
        },
        {
            label: 'Manual Mapping',
            icon: MdOutbond,
            path: 'manual-mapping',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_MANUAL_MAPPING,
        },
        {
            label: 'Maersk Orders',
            icon: MdOutbond,
            path: 'maersk-orders',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_MAERSK_ORDERS,
        },
        {
            label: 'Other Couriers',
            icon: MdOutbond,
            path: 'other-courier',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS,
        },
    
        {
            label: 'Status Mark',
            icon: MdOutbond,
            path: 'status-mark',
            name: UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_OTHER_COURIER_ORDERS,
        },
    ]

    const params = useParams()
    const id: any = params.id

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { items } = useGetDataByIdCustomQuery<WarehousesListResponse>({
        useEndPointHook: useGetWareHouseByIdQuery(id),
    })

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(0)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { pathname } = useLocation()

    const allowedTabs = tabs
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)

    useEffect(() => {
        const activeTabIndex = window.location.pathname.split('/')[5]
        const tabindex = allowedTabs.findIndex(
            (tab: any) => tab.path === activeTabIndex
        )
        setActiveTab(tabindex)
    }, [allowedTabs])

    React.useEffect(() => {
        localStorage.removeItem('hasExecuted')
        if (userData?.userRole === 'ADMIN') {
            return
        }
        const hasExecuted = localStorage.getItem('hasExecuted')

        if (hasExecuted) {
            return // Exit early if the function has been executed
        }

        const activeTabIndex = window.location.pathname.split('/')[5]

        const findPath = tabs?.find((ele: any) => activeTabIndex === ele?.path)

        for (const nav of tabs as any) {
            const isRefPath = isAuthorized(
                findPath?.name as keyof typeof UserModuleNameTypes
            )
            const isValue = isAuthorized(
                nav?.name as keyof typeof UserModuleNameTypes
            )
            localStorage.setItem('hasExecuted', 'true')
            if (isRefPath) {
                navigate(`${pathname}`)
                break
            } else {
                if (isValue) {
                    navigate(nav?.path)
                    break
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tabsRender = tabs?.some((nav: any) => {
        return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
    })


    // Filter tabs based on isDefault value
    // const filteredTabs = items?.isDefault ? allowedTabs : allowedTabs?.filter((tab: Tabs) => tab?.path !== 'ecom')
    // console.log('filteredTabs: ', filteredTabs);

    return (
        <div className="w-full flex  h-[calc(100vh-95px)] bg-white">
            {/* Right Section */}
            {tabsRender ? (
                <div className="w-[100%]   rounded-r h-full p-1  ">
                    <div className="py-1">
                        <div className="h-[40px] border flex gap-x-4 items-center bg-orange-300    shadow rounded  ">
                            <TabScrollable
                                tabs={allowedTabs}
                                // Show all tabs if items.isDefault is true // Exclude 'ecom' tab if items.isDefault is false
                                active={activeTab}
                            />
                        </div>
                    </div>

                    {/* Children */}
                    <div className="h-[calc(100vh-150px)] w-full ">
                        <Outlet />
                    </div>
                </div>
            ) : (
                <AccessDenied />
            )}
        </div>
    )
}

export default OutwardTabs
