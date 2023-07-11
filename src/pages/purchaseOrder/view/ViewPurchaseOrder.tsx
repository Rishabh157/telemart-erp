/// ==============================================
// Filename:ViewPurchaseOrder.tsx
// Type: View Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

// |-- Types --|'
type Props = {
    items: any
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Purchase Order',
        path: '/purchase-order',
    },
    {
        label: 'View',
    },
]

const ViewPurchaseOrder = ({ items }: Props) => {
    return (
        <div className=" px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1 ">
                    <ATMPageHeading>Purchase Order</ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium pl-2">
                            {' '}
                            All Details{' '}
                        </div>
                        {/* BUTTON - Add SO */}
                        <div></div>
                    </div>

                    {/* PO Details */}
                    <div className="grow py-8 px-3 ">
                        <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                            PO Details
                        </div>
                        <div className="grid grid-cols-3 gap-3 pl-6 py-6 border border-l-2">
                            <h1 className="text-gray-900">PO Code </h1>
                            <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                            <p className="text-slate-600">{items?.poCode}</p>

                            <h1 className="text-gray-900">Vendor </h1>
                            <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                            <p className="text-slate-600">
                                {items?.vendorLabel}
                            </p>

                            <h1 className="text-gray-900">Warehouse </h1>
                            <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                            <p className="text-slate-600">
                                {items?.warehouseLabel}
                            </p>
                        </div>
                    </div>

                    {/*  Item Details  */}
                    <div className="grow py-8 px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                            Items Details
                        </div>
                        <div className="grid grid-cols-3 gap-3 pl-6 py-6 border border-l-2">
                            <h1 className="text-gray-900">Item Name </h1>
                            <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                            <p className="text-slate-600">
                                {items?.purchaseOrder?.itemName}
                            </p>

                            <h1 className="text-gray-900">Rate</h1>
                            <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                            <p className="text-slate-600">
                                {items?.purchaseOrder?.rate?.toString()}
                            </p>

                            <h1 className="text-gray-900">Quantity </h1>
                            <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                            <p className="text-slate-600">
                                {items?.purchaseOrder?.quantity?.toString()}
                            </p>

                            <h1 className="text-gray-900">
                                Est. Receiving Date
                            </h1>
                            <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                            <p className="text-slate-600">
                                {items?.purchaseOrder?.estReceivingDate}
                            </p>
                        </div>
                    </div>

                    {/*  Approval  */}

                    <div className="grow px-3 py-8">
                        <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                            Approval Details
                        </div>
                        {items?.approval?.map((item: any) => (
                            <div className="grid grid-cols-3 gap-2 pl-6 py-6 border border-l-2">
                                <h1 className="text-gray-800">
                                    Approval Level{' '}
                                </h1>
                                <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                                <p className="text-slate-600">
                                    {item?.approvalLevel}
                                </p>

                                <h1 className="text-gray-800">Approval By</h1>
                                <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                                <p className="text-slate-600">
                                    {item?.approvalByName}
                                </p>

                                <h1 className="text-gray-800">
                                    Approval Time{' '}
                                </h1>
                                <p className=" col-span-1">
                                            {' '}
                                            -{' '}
                                        </p>
                                <p className="text-slate-600">{item?.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPurchaseOrder
