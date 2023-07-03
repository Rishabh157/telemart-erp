/// ==============================================
// Filename:index.tsx
// Type: Index Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'

// |-- Internal Dependencies --|
import ViewLayout from 'src/components/layouts/ViewLayout/ViewLayout'
import { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'

const tabsData: any = [
    {
        label: 'All',
        icon: MdOutbond,
        path: 'all',
    },
    {
        label: 'Fresh Order',
        icon: MdOutbond,
        path: 'fresh-orders',
    },
    {
        label: 'Order Approval',
        icon: MdOutbond,
        path: 'approved-orders',
    },
    {
        label: 'Delivered',
        icon: MdOutbond,
        path: 'delivered',
    },
    {
        label: 'Door Cancled',
        icon: MdOutbond,
        path: 'door-cancled',
    },
    {
        label: 'Hold',
        icon: MdOutbond,
        path: 'hold',
    },
    {
        label: 'PSC',
        icon: MdOutbond,
        path: 'psc',
    },
    {
        label: 'UNA',
        icon: MdOutbond,
        path: 'una',
    },
    {
        label: 'PND',
        icon: MdOutbond,
        path: 'pnd',
    },
    {
        label: 'Urgent',
        icon: MdOutbond,
        path: 'urgent',
    },
    {
        label: 'Non Actions',
        icon: MdOutbond,
        path: 'non-actions',
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
    return (
        <ViewLayout tabs={tabsData} leftbar={false} breadcrumbs={breadcrumbs} />
    )
}

export default ViewOrder
