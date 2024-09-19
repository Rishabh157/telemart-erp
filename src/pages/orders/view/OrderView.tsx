// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from '../../../components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from '../../../components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { OrderListResponse } from 'src/models'
import moment from 'moment'

// |-- Types --|
type Props = {
    items: OrderListResponse
    historyColumns: any
    orderHistory: any
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Order',
        path: '/orders',
    },
    {
        label: 'View Order',
    },
]

const OrderView = ({ items, historyColumns, orderHistory }: Props) => {
    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1 ">
                    <ATMPageHeading>All Order Details</ATMPageHeading>
                </div>

                {/* General Information */}
                <div className='bg-white shadow border p-4 rounded-lg'>
                    {/* Heading */}
                    <p className='border-l-[3px] border-fuchsia-600 px-2 py-1 font font-medium text-md bg-white text-fuchsia-600'>
                        General Information
                    </p>

                    {/* Border */}
                    {/* <p className='border-b border-slate-300 mt-2'>  </p> */}

                    {/* Information */}
                    <div className='grid grid-cols-12 md:gap-8 xs:gap-4 md:py-0 xs:py-4'>
                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Order Number
                                    </span>
                                    <span className='text-sm text-primary-main font-semibold'># {items?.orderNumber}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Call Type
                                    </span>
                                    <span className='text-sm font-bold uppercase'>{items?.callType}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Status
                                    </span>
                                    <span className='text-sm font-bold text-green-600 uppercase'>{items?.status}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Agent Name
                                    </span>
                                    <span className='text-sm font-bold capitalize'>{items?.agentName}</span>
                                </div>

                            </div>
                        </div>

                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        DID Number
                                    </span>
                                    <span className='text-sm font-bold'>{items?.didNo}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Campaign
                                    </span>
                                    <span className='text-sm font-bold'>{items?.campaign}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Mobile Number
                                    </span>
                                    <span className='text-sm font-bold'>{items?.mobileNo}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Alternate Number
                                    </span>
                                    <span className='text-sm font-bold'>{items?.alternateNo || '-'}</span>
                                </div>
                            </div>
                        </div>

                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Assigne To {items?.assignDealerId === null ? 'Warehouse' : 'Dealer'}
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {items?.assignDealerId === null ? items?.assignWarehouseLabel : `${items?.assignDealerLabel} + (${items?.assignDealerCode})`}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Customer Name
                                    </span>
                                    <span className='text-sm font-bold capitalize'>{items?.customerName || '-'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Customer Email
                                    </span>
                                    <span className='text-sm font-bold'>{items?.emailId || '-'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Whatsapp Number
                                    </span>
                                    <span className='text-sm font-bold'>{items?.whatsappNo || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards Tabs */}
                <div className="grid grid-cols-12 gap-6">

                    {/*  Address */}
                    <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>

                        {/* Heading */}
                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Address
                        </p>

                        <div className='flex flex-col gap-4 px-3 py-4'>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Full Address
                                </span>
                                <span
                                    className='text-sm font-semibold w-[70%] truncate'
                                    title={items?.autoFillingShippingAddress}
                                >
                                    {items?.autoFillingShippingAddress}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    State
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.stateLabel}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    District
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.districtLabel}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Tehsil
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.tehsilLabel}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Pincode
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.pincodeLabel}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Area
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.areaLabel}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    House Number
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.houseNumber || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Landmark
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.landmark || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Street Number
                                </span>
                                <span className='text-sm capitalize font-semibold'>
                                    {items?.streetNumber || '-'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Scheme Products & Price Details */}
                    <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>

                        {/* Heading */}
                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Scheme Products & Price Details
                        </p>

                        <div className='flex flex-col gap-4 px-3 py-4'>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Scheme Name
                                </span>
                                <span className='text-sm text-[#ce7909] font-semibold'>
                                    {items?.schemeName || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Scheme Quantity
                                </span>
                                <span className='text-sm text-primary-main font-semibold'>
                                    {items?.shcemeQuantity}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    HSN Code
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.hsnCode || '-'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Transaction ID
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.transactionId || 'NA'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Order Invoice
                                </span>
                                <span className='text-sm font-semibold'>
                                    {items?.orderInvoice ?
                                        <a className='text-primary-main hover:underline'
                                            href={`${items?.orderInvoice}`}
                                            target='_blank'
                                            rel="noreferrer"
                                        >
                                            PDF
                                        </a> : 'NA'
                                    }
                                </span>
                            </div>

                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Payment Mode
                                </span>
                                <span className='text-sm font-semibold text-green-500'>
                                    {items?.paymentMode}
                                </span>
                            </div>

                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Price
                                </span>
                                <span className='text-sm text-primary-main font-semibold'>
                                    &#x20B9; {items?.price || 0} /-
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Delivery Charges
                                </span>
                                <span className='text-sm text-primary-main font-semibold'>
                                    &#x20B9; {items?.deliveryCharges || 0} /-
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Total Amount
                                </span>
                                <span className='text-sm text-primary-main font-semibold'>
                                    &#x20B9; {items?.totalAmount || 0} /-
                                </span>
                            </div>
                        </div>
                    </div>


                    {/* Reason Of Order */}
                    <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>

                        {/* Heading */}
                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Delivery Details
                        </p>

                        <div className='flex flex-col gap-4 px-3 py-4'>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Preffered Time
                                </span>
                                <span className='text-sm text-primary-main font-semibold'>
                                    {items?.preffered_delivery_start_time?.replaceAll('_', ' ') + ' - ' + items?.preffered_delivery_end_time?.replaceAll('_', ' ')}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Preffered Date
                                </span>
                                <span className='text-sm text-primary-main font-semibold'>
                                    {moment(items?.preffered_delivery_date).format('DD-MM-YYYY') || '-'}
                                </span>
                            </div>

                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Delivery Time And Date
                                </span>
                                <span className='text-sm font-bold'>{items?.deliveryTimeAndDate || 'NA'}</span>
                            </div>

                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Type of Address
                                </span>
                                <span className='text-sm font-bold'>{items?.typeOfAddress || 'NA'}</span>
                            </div>

                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    AWB Number
                                </span>
                                <span className='text-sm font-bold'>{items?.awbNumber || 'NA'}</span>
                            </div>

                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Assigned  Courier
                                </span>
                                <span className='text-sm font-bold text-green-500'>{items?.orderAssignedToCourier || 'NA'}</span>
                            </div>

                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium text-sm'>
                                    Preship Cancelation Date
                                </span>
                                <span className='text-sm font-bold'>
                                    {items?.preShipCancelationDate ? items?.preShipCancelationDate : 'NA'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white shadow border p-4 rounded-lg mt-4'>
                    {/* Heading */}
                    <p className='border-l-[3px] border-orange-600 px-2 py-1 font font-medium text-md bg-white text-orange-600'>
                        Other Information
                    </p>

                    {/* Information */}
                    <div className='grid grid-cols-12 md:gap-8 xs:gap-4 md:py-0 xs:py-4'>
                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Disposition One
                                    </span>
                                    <span className='text-sm font-semibold capitalize'>{items?.dispositionLevelTwoLabel}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Disposition Two
                                    </span>
                                    <span className='text-sm font-bold capitalize'>{items?.dispositionLevelThreeLabel}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Age Group
                                    </span>
                                    <span className='text-sm font-bold'>{items?.ageGroup || '-'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Batch ID
                                    </span>
                                    <span className='text-sm font-bold'>{items?.batchId || 'NA'}</span>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Dealer Reason
                                    </span>
                                    <span className='text-sm font-bold'>{items?.dealerReason || 'NA'}</span>
                                </div>
                            </div>
                        </div>

                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Order MBK Number
                                    </span>
                                    <span className='text-sm font-bold'>{items?.orderMBKNumber || 'NA'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Inquiry Number
                                    </span>
                                    <span className='text-sm font-bold'>{items?.inquiryNumber || 'NA'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Order Reference Number
                                    </span>
                                    <span className='text-sm font-bold'>{items?.orderReferenceNumber || 'NA'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Flag Status
                                    </span>
                                    <span className='text-sm font-bold'>{items?.flagStatus || 'NA'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Incoming Caller No.
                                    </span>
                                    <span className='text-sm font-bold'>{items?.incomingCallerNo || 'NA'}</span>
                                </div>
                            </div>
                        </div>

                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Medical Issues
                                    </span>
                                    <span className='text-sm font-bold capitalize text-end'>
                                        {items?.medicalIssue?.length ? items?.medicalIssue?.join(',')?.replaceAll('_', ' ') : 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Order For
                                    </span>
                                    <span className='text-sm font-bold capitalize text-end'>
                                        {items?.orderFor?.length ? items?.orderFor?.join(',')?.replaceAll('_', ' ') : 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Remark
                                    </span>
                                    <span className='text-sm font-semibold w-[70%] text-end truncate'>
                                        {items?.remark || 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Facebook
                                    </span>
                                    <span className='text-sm font-semibold'>
                                        {items?.socialMedia?.facebook || 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Instagram
                                    </span>
                                    <span className='text-sm font-semibold'>
                                        {items?.socialMedia?.instagram || 'NA'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Flow Table */}
                <div className='bg-white shadow border p-4 rounded-lg'>
                    {/* Heading */}
                    <p className='sticky top-0 border-l-[3px] border-fuchsia-600 px-2 py-1 font font-medium text-md bg-white text-fuchsia-600'>
                        Order Flow
                    </p>
                    <div className="grow overflow-auto mt-4">
                        <ATMTable
                            columns={historyColumns}
                            rows={orderHistory}
                            extraClasses="max-h-full overflow-auto max-h-[50vh]"
                        // isLoading={isTableLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderView
