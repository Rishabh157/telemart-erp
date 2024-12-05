import moment from 'moment'
import React from 'react'
import { OrderInvoiceAndLabelListResponse } from 'src/models/Order.model'
import { useBarcode } from '@createnextapp/react-barcode'

const RetailILabel = ({
    items,
}: {
    items: OrderInvoiceAndLabelListResponse
}) => {
    function Barcode({ value }: { value: string }) {
        const { inputRef } = useBarcode({
            value,
            options: {
                displayValue: false,
                background: '#ffffff',
            },
        })
        return <canvas ref={inputRef} className="h-full w-full" />
    }

    return (
        <div className="bg-white p-4 py-2 text-sm h-auto">
            <div className="grid grid-cols-12 py-6 items-center border-b border-gray-400 gap-x-8">
                <div className="col-span-4">
                    <img
                        src={
                            items?.companyDetails?.companyLogo
                                ? items?.companyDetails?.companyLogo
                                : '/logo.jpg'
                        }
                        className="h-20 w-full"
                        alt={items?.companyDetails?.companyName + ' logo'}
                    />
                </div>

                <div className="flex flex-col font-medium col-span-8">
                    <p className="text-2xl font-bold text-center uppercase">
                        {items?.companyDetails?.companyName}
                    </p>
                    <span className="font-semibold text-wrap">
                        {items?.companyAddress ||
                            items?.companyDetails?.address}
                    </span>

                    <div className="flex flex-col items-center font-semibold">
                        <span> Phone : {items?.companyDetails?.phoneNo} </span>
                        <span> GSTIN : {items?.companyDetails?.gstNo} </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-4 border-b-[1px] border-gray-400">
                <div className="flex flex-col border-r-[1px] border-gray-400 pr-10 pb-10">
                    <span className="font-semibold">To</span>
                    <span className="font-medium">{items?.customerName}</span>
                    <span className="font-medium text-wrap">
                        {items?.houseNumber &&
                        items?.streetNumber &&
                        items?.landmark
                            ? items?.houseNumber +
                              ' ,, ' +
                              items?.streetNumber +
                              ' ,, ' +
                              items?.landmark
                            : items?.autoFillingShippingAddress}
                        <div className="capitalize">
                            <span className="font-bold"> CITY </span> :{' '}
                            {items?.districtLabel}
                            <span className="font-bold"> STATE </span> :{' '}
                            {items?.stateLabel}
                            <span className="font-bold"> PIN </span> :{' '}
                            {items?.pincodeLabel} <br />
                            <span className="font-bold"> MOBILE </span> :{' '}
                            {items?.mobileNo}
                        </div>
                    </span>
                </div>
                <div className="text-wrap text-lg font-semibold p-2">
                    <span> CASH ON DELIVERY AMOUNT TO COLLECT</span>
                    <p></p>
                    <span>Rs {items?.totalAmount?.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex gap-4 border-b-[1px] border-gray-400 ">
                <div className="flex flex-col justify-between border-r-[1px] border-gray-400 pr-10">
                    <div>
                        <div className="flex gap-x-8">
                            <span className="font-semibold">Invoice No:</span>
                            <span className="font-semibold">
                                {items?.orderInvoice || ' --RI-Y24-0216617--'}
                            </span>
                        </div>
                        <div className="flex gap-x-5 mt-2">
                            <span className="font-semibold">Invoice Date:</span>
                            <span className="font-semibold">
                                {items?.orderInvoiceDate
                                    ? moment(items?.orderInvoiceDate).format(
                                          'DD MMM YYYY'
                                      )
                                    : '-'}
                            </span>
                        </div>
                    </div>
                    <span className="font-bold text-md">CASH ON DELIVERY</span>
                </div>

                <div className="flex justify-center items-center ml-32">
                    <div className="text-center">
                        <span className="font-bold text-md">
                            {items?.orderAssignedToCourier}
                        </span>
                        <span className="pl-32 text-md font-bold">
                            {items?.secondaryCourierPartner}
                        </span>

                        <div className="w-[300px] h-[60px] mt-1">
                            <Barcode value={items?.awbNumber} />
                        </div>

                        <p className="font-bold text-center text-md mt-1">
                            AWB No. : {items?.awbNumber}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 border-b-[1px] border-black">
                <div className="col-span-12">
                    <table className="border-none w-[100%]">
                        {/* table head */}
                        <thead>
                            <tr>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    VSKU
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    ITEM DESCRIPTION
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    QTY
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    PRICE/UNIT
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    DISCOUNT
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    SHIPPING CHARGES
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    COLLECT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    {items?.schemeCode}
                                </td>
                                <td className="font-semibold text-wrap border-l border-r text-[14px] border-black text-center py-1">
                                    {items?.schemeName}
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    {items?.shcemeQuantity}
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    {items?.price?.toFixed(2)}
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    {Number(0).toFixed(2)}
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    {items?.deliveryCharges?.toFixed(2)}
                                </td>
                                <td className="font-semibold border-l border-r text-[14px] border-black text-center py-1">
                                    Rs. {items?.totalAmount?.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-between gap-4 border-t-[1px] border-b-[1px] border-gray-400 ">
                        <div className="flex justify-between items-end border-r-[1px] border-gray-400 w-1/2">
                            <div>
                                <span className="font-bold text-md">
                                    Total Pieces :{' '}
                                </span>
                                <span className="font-bold text-md">
                                    {items?.shcemeQuantity}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center w-full">
                            <div className="text-center">
                                <div className="w-[300px] h-[60px] mt-2">
                                    <Barcode
                                        value={items?.orderNumber?.toString()}
                                    />
                                </div>
                                <span className="font-bold text-start text-md mt-1">
                                    Order No. : {items?.orderNumber}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-4 border-t-[1px] border-b-[1px] border-gray-400 ">
                        <div className="flex flex-col ">
                            <span>If undelivered then return to :</span>
                            <span className="font-semibold uppercase w-10/12">
                                {items?.companyDetails?.companyName}
                            </span>
                            <span className="text-wrap">
                                {items?.warehouseBillingInfo?.address}
                            </span>
                            <span className="font-semibold capitalize">
                                {items?.warehouseBillingInfo?.stateLable} ,
                                {items?.warehouseBillingInfo?.countryLable}-
                                {items?.warehouseBillingInfo?.pincodeLable}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RetailILabel
