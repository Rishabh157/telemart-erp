// |-- Internal Dependencies --|
// import ATMBreadCrumbs, {
//     BreadcrumbType,
// } from '../../../components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from '../../../components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { CircularProgress } from '@mui/material'
import { IoLocationSharp } from "react-icons/io5";
import moment from 'moment'


type Address = {
    phone: string;
    maskedPhoneNo: string;
    address: string;
    countryId: string;
    stateId: string;
    districtId: string;
    pincodeId: string;
    gstNumber: string;
    gstCertificate: string;
    _id: string;
};

type ProductSalesOrder = {
    productGroupId: string;
    rate: number;
    quantity: number;
    _id: string;
    groupName: string;
};

export type SaleOrderListResponseTypes = {
    _id: string;
    soNumber: string;
    dealerId: string;
    dealerWareHouseId: string;
    companyWareHouseId: string;
    dhApprovedById: string | null;
    dhApproved: string | null;
    dhApprovedActionBy: string;
    dhApprovedAt: string;
    accApprovedById: string | null;
    accApproved: string | null;
    accApprovedActionBy: string;
    accApprovedAt: string;
    createdById: string;
    branchId: string;
    productSalesOrder: ProductSalesOrder;
    status: string;
    expectedDeliveryDate: string;
    invoice: string;
    invoiceDate: string;
    invoiceNumber: string;
    transportnameId: string;
    transportName: string;
    transporterGST: string;
    mode: string;
    distance: string;
    vehicleNumber: string;
    vehicleType: string;
    transportDocNo: string;
    documnetDate: string;
    roadPermitNumber: string;
    totalWeight: number | null;
    totalPackages: number | null;
    fileUrl: string;
    companyId: string;
    isDeleted: boolean;
    isActive: boolean;
    __v: number;
    createdAt: string;
    updatedAt: string;
    dealerLabel: string;
    companyWarehouseLabel: string;
    companyWarehouseBillingAddress: Address;
    warehouseLabel: string;
    warehouseBillingAddress: Address;
};



// |-- Types --|
type Props = {
    items: SaleOrderListResponseTypes[]
    isLoading: boolean
}

// Breadcrumbs
// const breadcrumbs: BreadcrumbType[] = [
//     {
//         label: 'Sale Order',
//         path: '/sale-order',
//     },
//     {
//         label: 'View Sale Order',
//     },
// ]


const SaleOrderView = ({ items, isLoading }: Props) => {


    const item: SaleOrderListResponseTypes = items?.[0]

    // Combine the all request into one
    const requestProducts = items?.map((ele: SaleOrderListResponseTypes) => ele?.productSalesOrder);

    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white text-sm">

            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center z-10 bg-slate-100 opacity-50">
                    <CircularProgress />
                </div>
            )}

            <div className="p-4 flex flex-col gap-2  ">

                {/* Page Heading */}
                <div className="pt-1 ">
                    <ATMPageHeading>All Sale Order Details</ATMPageHeading>
                </div>


                {/* From To Details */}
                <div className='grid grid-cols-3 gap-x-4'>

                    <div className='p-4 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] border-fuchsia-600 px-2 py-1 font font-medium text-md bg-white text-fuchsia-600'>
                            General Information
                        </p>

                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        SO Number
                                    </span>
                                    <span className='text-sm text-primary-main font-semibold'># {item?.soNumber}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Current Status
                                    </span>
                                    <span className='text-sm font-bold uppercase px-2 py-1 bg-green-500 rounded text-white'>{item?.status?.replaceAll('_', ' ')}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Expc Delivery Date
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.expectedDeliveryDate}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Request Create Date
                                    </span>
                                    <span className='text-sm font-bold capitalize'>
                                        {moment(item?.createdAt).format('D/MM/YYYY, hh:mm:ss A')}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Last Request Update Date
                                    </span>
                                    <span className='text-sm font-bold capitalize'>
                                        {moment(item?.updatedAt).format('D/MM/YYYY, hh:mm:ss A')}
                                    </span>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Invoice
                                    </span>
                                    <span className='text-sm font-semibold'>
                                        {item?.invoice ?
                                            <a className='text-primary-main hover:underline'
                                                href={`${item?.invoice}`}
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
                                        Invoice Date
                                    </span>
                                    <span className='text-sm font-bold capitalize'>
                                        {item?.invoiceDate ? moment(item?.invoiceDate).format('D/MM/YYYY, hh:mm:ss A') : 'NA'}
                                    </span>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Invoice Number
                                    </span>
                                    <span className='text-sm font-bold capitalize'>
                                        {item?.invoiceNumber || 'NA'}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className='p-4 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] border-fuchsia-600 px-2 py-1 font font-medium text-md bg-white text-fuchsia-600'>
                            Approvals
                        </p>

                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium '>
                                        Dh Approved Action
                                    </span>
                                    <span className='text-sm font-bold uppercase px-2 py-1 bg-green-500 rounded text-white'>
                                        {item?.dhApproved === null ? 'PENDING' : item?.dhApproved ? 'APPROVED' : 'REJECTED'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium '>
                                        Dh Approved By
                                    </span>
                                    <span className=' font-semibold capitalize'>{item?.dhApprovedActionBy || 'NA'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Dh Approved Date
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.dhApprovedAt ? item?.dhApprovedAt : 'NA'}
                                    </span>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium '>
                                        Acc Approved Action
                                    </span>
                                    <span className='text-sm font-bold uppercase px-2 py-1 bg-green-500 rounded text-white'>
                                        {item?.accApproved === null ? 'PENDING' : item?.accApproved ? 'APPROVED' : 'REJECTED'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium '>
                                        Acc Approved By
                                    </span>
                                    <span className=' font-semibold capitalize'>{item?.accApprovedActionBy || 'NA'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Acc Approved Date
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.accApprovedAt ? item?.accApprovedAt : 'NA'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] border-fuchsia-600 px-2 py-1 font font-medium text-md bg-white text-fuchsia-600'>
                            Transport Details
                        </p>

                        <div className='xl:col-span-4 md:col-span-6 xs:col-span-12 md:py-4'>
                            <div className='flex flex-col gap-4 px-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium '>
                                        Transport name
                                    </span>
                                    <span className='font-semibold capitalize'>{item?.transportName || 'NA'}</span>

                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium '>
                                        Transporter GST
                                    </span>
                                    <span className='font-semibold capitalize'>{item?.transporterGST || 'NA'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Mode
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.mode ? item?.mode : 'NA'}
                                    </span>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium '>
                                        Distance in (km.)
                                    </span>
                                    <span className=' font-semibold capitalize'>{item?.distance || 'NA'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium '>
                                        Vehicle no.
                                    </span>
                                    <span className=' font-semibold capitalize'>{item?.vehicleNumber || 'NA'}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Vehicle type
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.vehicleType || 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Transport document no.
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.transportDocNo || 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Document Date
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.documnetDate ? moment(item?.createdAt).format('D/MM/YYYY, hh:mm:ss A') : 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Total weight in (gm.)
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.totalWeight || 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Road permit no.
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.roadPermitNumber || 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Total packages
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.totalPackages || 'NA'}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-neutral font-medium text-sm'>
                                        Image
                                    </span>
                                    <span className='text-sm font-bold'>
                                        {item?.fileUrl ?
                                            <a className='text-primary-main hover:underline'
                                                href={`${item?.fileUrl}`}
                                                target='_blank'
                                                rel="noreferrer"
                                            >
                                                View
                                            </a> : 'NA'
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                {/* From To Details */}
                <div className='grid grid-cols-3'>
                    <div className='p-4 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] text-md border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Warehouse Details <IoLocationSharp size={22} className='inline text-indigo-600' />
                        </p>

                        <div className='flex flex-col gap-4 px-3 py-4'>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium '>
                                    Warehouse Name
                                </span>
                                <span className=' capitalize font-semibold'>
                                    {item?.companyWarehouseLabel}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium '>
                                    Phone
                                </span>
                                <span className=' capitalize font-semibold'>
                                    {item?.companyWarehouseBillingAddress?.phone || 'NA'}
                                </span>
                            </div>

                            <div className="capitalize mt-4 text-xs">
                                {item?.companyWarehouseBillingAddress?.address}
                            </div>
                        </div>
                    </div>

                    <div className='p-4 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Dealer Details <IoLocationSharp size={22} className='inline text-indigo-600' />
                        </p>

                        <div className='flex flex-col gap-4 px-3 py-4'>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium '>
                                    Dealer
                                </span>
                                <span className=' capitalize font-semibold'>
                                    {item?.dealerLabel}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium '>
                                    Dealer Warehouse
                                </span>
                                <span className=' capitalize font-semibold'>
                                    {item?.warehouseLabel}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-neutral font-medium '>
                                    Phone
                                </span>
                                <span className=' capitalize font-semibold'>
                                    {item?.warehouseBillingAddress?.phone || 'NA'}
                                </span>
                            </div>

                            <div className="capitalize mt-4 text-xs">
                                {item?.warehouseBillingAddress?.address}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards Tabs */}
                <div className="grid grid-cols-1 gap-6">
                    {/*  Address */}
                    {/* <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Address
                        </p>

                    </div> */}

                    <div className='p-4 xl:col-span-4 md:col-span-6 xs:col-span-12 shadow mt-3 bg-white rounded-lg'>
                        <p className='border-l-[3px] border-indigo-600 px-2 py-1 font font-medium text-md bg-white text-indigo-600'>
                            Products & Price Details
                        </p>

                        <table className="border-none w-[100%] mt-5">
                            <thead>
                                <tr className='text-xs font-semibold'>
                                    <th className="py-3 border-slate-300 border-[1px]">
                                        No.
                                    </th>
                                    <th className="py-3 border-slate-300 border-[1px]">
                                        Product Name
                                    </th>
                                    <th className="py-3 border-slate-300 border-[1px]">
                                        Rate
                                    </th>
                                    <th className="py-3 border-slate-300 border-[1px]">
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestProducts?.map((ele, index) => {
                                    return (
                                        <tr key={ele?._id} className='text-xs text-center odd:hover:bg-blue-100'>
                                            <td className="py-3 border-[1px] border- border-slate-300">
                                                {index + 1}
                                            </td>
                                            <td className="py-3 border-[1px] border-slate-300 capitalize">
                                                {ele?.groupName}
                                            </td>
                                            <td className="py-3 border-[1px] border-slate-300">
                                                {ele?.rate?.toFixed(2)}
                                            </td>
                                            <td className="py-3 border-[1px] border-slate-300">
                                                {ele?.quantity}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div >
    )
}

export default SaleOrderView
