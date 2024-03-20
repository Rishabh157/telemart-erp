import React from 'react'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
// import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

// |-- Types --|
type Props = {
    items: any
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'House Arrest',
        path: '/request/house-arrest',
    },
    {
        label: 'View',
    },
]

const HouseArrestView = ({ items }: Props) => {
    return (
        <div className="px-4 h-[calc(100vh-10px)] bg-white">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                {/* <div className="pt-1 ">
                    <ATMPageHeading> Order</ATMPageHeading>
                </div> */}

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

                    {/* General Infromation */}

                    <div className="grow px-3 ">
                        <div className="grid grid-cols-1">
                            <div className="grow py-8 px-3">
                                <div className=" flex col-span-2 text-lg pb-2 font-medium text-primary-main pl-2">
                                    Product Information
                                </div>

                                <div className="grid grid-cols-2 gap-3 pl-6 py-6 border border-l-2">
                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Product Name{' '}
                                        </h1>
                                        <p className=" col-span-1 text-center">
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600  col-span-1">
                                            {items?.schemeLabel === ''
                                                ? 'NA'
                                                : items?.schemeLabel}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Scheme Price{' '}
                                        </h1>
                                        <p className=" col-span-1 text-center">
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1 capitalize">
                                            {items?.schemePrice === ''
                                                ? 'NA'
                                                : items?.schemePrice}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Order No{' '}
                                        </h1>
                                        <p className=" col-span-1 text-center">
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600">
                                            {items?.orderNumber === ''
                                                ? 'NA'
                                                : items?.orderNumber}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Date Of Delivery{' '}
                                        </h1>
                                        <p className=" col-span-1 text-center">
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.dateOfDelivery === ''
                                                ? 'NA'
                                                : items?.dateOfDelivery}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Dealer Name{' '}
                                        </h1>
                                        <p className=" col-span-1 text-center">
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.dealerCode === ''
                                                ? 'NA'
                                                : items?.dealerCode}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Dealer Firm Name{' '}
                                        </h1>
                                        <p className=" col-span-1 text-center">
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.dealerFirmName === ''
                                                ? 'NA'
                                                : items?.dealerFirmName}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Resolve Date{' '}
                                        </h1>
                                        <p className=" col-span-1 text-center">
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.requestResolveDate === ''
                                                ? 'NA'
                                                : items?.requestResolveDate}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Settled Amount{' '}
                                        </h1>
                                        <p className=" col-span-1 text-center">
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.settledAmount === ''
                                                ? 'NA'
                                                : items?.settledAmount}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Settled Amount In Words{' '}
                                        </h1>
                                        <p className=" col-span-1 text-center">
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.amountInWords === ''
                                                ? 'NA'
                                                : items?.amountInWords}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grow  px-3 ">
                        <div className="grid grid-cols-2">
                            {/*  Address Information  */}
                            <div className="grow py-1 px-3">
                                <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                                    Customer Information
                                </div>
                                <div className="grid grid-cols-3 gap-3 pl-6 pr-2 py-6 border border-l-1">
                                    <h1 className="text-gray-800">
                                        Customer Name{' '}
                                    </h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.customerName === ''
                                            ? 'NA'
                                            : items?.customerName}
                                    </p>
                                    <h1 className="text-gray-800">
                                        Mobile Number{' '}
                                    </h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.customerNumber === ''
                                            ? 'NA'
                                            : items?.customerNumber}
                                    </p>
                                    <h1 className="text-gray-800">
                                        Alternate Number{' '}
                                    </h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.alternateNumber === ''
                                            ? 'NA'
                                            : items?.alternateNumber}
                                    </p>

                                    <h1 className="text-gray-800">City</h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.tehsilLable === ''
                                            ? 'NA'
                                            : items?.tehsilLable}
                                    </p>

                                    <h1 className="text-gray-800">District</h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.districtLable === ''
                                            ? 'NA'
                                            : items?.districtLable}
                                    </p>

                                    <h1 className="text-gray-800">State</h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.stateLable === ''
                                            ? 'NA'
                                            : items?.stateLable}
                                    </p>

                                    <h1 className="text-gray-800">Pincode </h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.pincodeLabel === ''
                                            ? 'NA'
                                            : items?.pincodeLabel}
                                    </p>

                                    <h1 className="text-gray-800">Address</h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.address === ''
                                            ? 'NA'
                                            : items?.address}
                                    </p>
                                </div>
                            </div>

                            {/*  Address Information  */}
                            <div className="grow py-1 px-3">
                                <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                                    Barcode
                                </div>

                                <div className="grid grid-cols-3 gap-3 pl-6 py-6 border border-l-1">
                                    <h1 className="text-gray-800">
                                        Barcode Id
                                    </h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.bankName === ''
                                            ? 'NA'
                                            : items?.bankName}
                                    </p>

                                    <h1 className="text-gray-800">Barcode</h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.accountNumber === ''
                                            ? 'NA'
                                            : items?.accountNumber}
                                    </p>

                                    <h1 className="text-gray-800">
                                        Barcode Number
                                    </h1>
                                    <p className="text-center">-</p>
                                    <p className="text-slate-600">
                                        {items?.ifscCode === ''
                                            ? 'NA'
                                            : items?.ifscCode}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Other Information  */}
                    <div className="grow px-3 py-8">
                        <div className=" text-lg pb-2 font-medium text-primary-main pl-2">
                            Remarks
                        </div>
                        <div className="grid grid-cols-3 gap-2 pl-6 py-6 border border-l-2">
                            <h1 className="text-gray-800">
                                Manager First Level Approval{' '}
                            </h1>
                            <p className="">-</p>
                            <p className="text-slate-600">
                                {items?.managerFirstRemark === ''
                                    ? 'NA'
                                    : items?.managerFirstRemark}
                            </p>
                            <h1 className="text-gray-800">Customer Care </h1>
                            <p className="">-</p>
                            <p className="text-slate-600">
                                {items?.ccRemark === ''
                                    ? 'NA'
                                    : items?.ccRemark}
                            </p>
                            <h1 className="text-gray-800">
                                Manager Second Level Approval{' '}
                            </h1>
                            <p className="">-</p>
                            <p className="text-slate-600">
                                {items?.managerSecondRemark === ''
                                    ? 'NA'
                                    : items?.managerSecondRemark}
                            </p>
                            <h1 className="text-gray-800">
                                Account Level Approval{' '}
                            </h1>
                            <p className="">-</p>
                            <p className="text-slate-600">
                                {items?.accountRemark === ''
                                    ? 'NA'
                                    : items?.accountRemark}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HouseArrestView
