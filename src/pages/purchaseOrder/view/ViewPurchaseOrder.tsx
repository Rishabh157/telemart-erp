// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { GRNListResponse } from 'src/models'
import { PurchaseOrderListResponse } from 'src/models/PurchaseOrder.model'
import GRNListing from 'src/pages/grn/list/GRNListing'

// |-- Types --|'
type Props = {
    items: PurchaseOrderListResponse
    grnitems: any
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

const GRNColumns: columnTypes[] = [
    {
        field: 'poCode',
        headerName: 'PO Code',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: GRNListResponse) => <span> {row.poCode} </span>,
    },
    {
        field: 'itemName',
        headerName: 'Item Name',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: GRNListResponse) => {
            return <span> {row?.itemName} </span>
        },
    },
    {
        field: 'receivingQuantity',
        headerName: 'Received Qnty.',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: GRNListResponse) => {
            return <span> {row?.receivedQuantity} </span>
        },
    },
    {
        field: 'goodQuantity',
        headerName: 'Good Qnty.',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: GRNListResponse) => {
            return <span> {row.goodQuantity} </span>
        },
    },
    {
        field: 'defectiveQuantity',
        headerName: 'Defective Qnty.',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: GRNListResponse) => {
            return <span> {row.defectiveQuantity} </span>
        },
    },
]

const ViewPurchaseOrder = ({ items, grnitems }: Props) => {
    useUnmountCleanup()
    return (
        <div className=" px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div >
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
                            <h1 className="text-gray-600  font-semibold">
                                PO Code{' '}
                            </h1>
                            <p className=" col-span-1"> - </p>
                            <p className="text-slate-600">{items?.poCode}</p>

                            <h1 className="text-gray-600  font-semibold">
                                Vendor{' '}
                            </h1>
                            <p className=" col-span-1"> - </p>
                            <p className="text-slate-600">
                                {items?.vendorLabel}
                            </p>

                            <h1 className="text-gray-600  font-semibold">
                                Warehouse{' '}
                            </h1>
                            <p className=" col-span-1"> - </p>
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
                            <h1 className="text-gray-600  font-semibold">
                                Item Name{' '}
                            </h1>
                            <p className=" col-span-1"> - </p>
                            <p className="text-slate-600">
                                {items?.purchaseOrder?.itemName}
                            </p>

                            <h1 className="text-gray-600  font-semibold">
                                Rate
                            </h1>
                            <p className=" col-span-1"> - </p>
                            <p className="text-slate-600">
                                {items?.purchaseOrder?.rate?.toString()}
                            </p>

                            <h1 className="text-gray-600  font-semibold">
                                Quantity{' '}
                            </h1>
                            <p className=" col-span-1"> - </p>
                            <p className="text-slate-600">
                                {items?.purchaseOrder?.quantity?.toString()}
                            </p>

                            <h1 className="text-gray-600  font-semibold">
                                Est. Receiving Date
                            </h1>
                            <p className=" col-span-1"> - </p>
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
                        {items?.approval?.map((item) => (
                            <div
                                className="grid grid-cols-3 gap-2 pl-6 py-6 border border-l-2"
                                key={item?._id}
                            >
                                <h1 className="text-gray-600  font-semibold">
                                    Approval Level
                                </h1>
                                <p className=" col-span-1"> - </p>
                                <p className="text-slate-600">
                                    {item?.approvalLevel}
                                </p>

                                <h1 className="text-gray-600  font-semibold">
                                    Approval By
                                </h1>
                                <p className=" col-span-1"> - </p>
                                <p className="text-slate-600">
                                    {item?.approvalByName}
                                </p>

                                <h1 className="text-gray-600  font-semibold">
                                    Approval Time
                                </h1>
                                <p className=" col-span-1"> - </p>
                                <p className="text-slate-600">
                                    {item?.time}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main">
                            GRN Details
                        </div>
                    </div>
                    {/*Table Header */}
                    <div className="flex flex-col gap-y-5">
                        <div className=" h-[80%]">
                            <GRNListing columns={GRNColumns} rows={grnitems} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPurchaseOrder
