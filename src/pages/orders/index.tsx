/// ==============================================
// Filename:index.tsx
// Type: Index Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { BiBlock, BiMessageDetail } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
//import { IconType } from 'react-icons'
import { MdOutbond } from 'react-icons/md'


// |-- Internal Dependencies --|
import ViewLayout from 'src/components/layouts/ViewLayout/ViewLayout'
import { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'

// |-- Redux --|
import {  setSearchValue } from 'src/redux/slices/orderSlice'
import { RootState, AppDispatch } from 'src/redux/store'

const tabsData: any = [
	{
			label: 'All',
			icon: MdOutbond,
			path:'all'
	},
	{
			label: 'Fresh Order',
			icon: MdOutbond,
			// path:'dealer'
	},
	{
			label: 'Order Approval',
			icon: MdOutbond,
			path:'approved-orders'
	},
	{
			label: 'Delivered',
			icon: MdOutbond,
			// path:'/dealer'
	},
	{
			label: 'Door Canceled',
			icon: MdOutbond,
			// path:'/dealer'
	},
	{
			label: 'Hold',
			icon: MdOutbond,
			// path:'/dealer'
	},
	{
			label: 'PSC',
			icon: MdOutbond,
			// path:'/dealer'
	},
	{
			label: 'UNA',
			icon: MdOutbond,
			// path:'/dealer'
	},
	{
			label: 'PND',
			icon: MdOutbond,
			// path:'/dealer'
	},
	{
			label: 'Urgent',
			icon: MdOutbond,
			// path:'/dealer'
	},
	{
			label: 'Non Actions',
			icon: MdOutbond,
			// path:'/dealer'
	},
]

const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Orders',
        path: '/orders',
    },
    {
        label: 'Current Order',
    },
]

const ViewOrder = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const orderState: any = useSelector((state: RootState) => state.order)
    const { page, rowsPerPage, items } = orderState
    const { searchValue }: any = useSelector((state: RootState) => state.order)
    
    return (
        <ViewLayout           
            tabs={tabsData} 
            leftbar={false}
            breadcrumbs={breadcrumbs}
        />
    )
}

export default ViewOrder
