import React from 'react'
import { SalesOrderInvoiceResponse } from './DispatchedInvoiceWrapper'
import moment from 'moment'
import { NumberToWordsConverter } from 'src/utils/numberToEnglishWord'

type Props = {
    ref?: any
    items: SalesOrderInvoiceResponse | null
}

const DispatchedInvoiceTemplate = React.forwardRef(({ items }: Props, ref: any) => {

    let TOTAL_QUANTITY: number = 0
    let TOTAL_RATE_PER_UNIT: number = 0
    let TOTAL_AMOUNT: number = 0

    return (
        <div
            ref={ref}
            className="bg-white border-[1px] border-black m-2 p-2 text-sm"
        >
            {/* Top Header With Logo */}
            <div className="grid grid-cols-12 border-b-[1px] border-black">
                <div className="col-span-4 p-2">
                    <img
                        src={items?.companyDetails?.companyLogo ? items?.companyDetails?.companyLogo : "/logo.jpg"}
                        className="h-auto w-full object-contain"
                        alt={items?.companyDetails?.companyName + ' logo'}
                    />
                </div>
                <div className="col-span-8">
                    <h1 className="text-sm font-normal">
                        Subject to Indore Jurisdiction
                    </h1>
                    <div>
                        <h1 className="font-bold uppercase text-lg">{items?.companyDetails?.companyName}</h1>
                        <p className="capitalize text-sm font-semibold">
                            {items?.companyDetails?.address}
                        </p>
                        {/* <p className="text-[13px]">
                            Pradesh,Pin Code:452001,India
                        </p>
                        <p className="text-xs">STATE CODE:(23)</p> */}
                        <p className="text-xs">
                            GSTIN : {items?.companyDetails?.gstNo}, PAN : {items?.companyDetails?.panNumber}
                        </p>
                    </div>
                </div>
            </div>

            <div className='border-b border-black'>
                <h2 className="text-center font-bold">TAX INVOICE</h2>
                <div className='grid grid-cols-12 py-1'>
                    <div className='col-span-8 flex justify-between gap-x-2'>
                        <div className='w-2/3'>
                            <span className="font-bold ">
                                INVOICE NO
                            </span>
                            {' '}:{' '}
                            <span>
                                {items?.invoiceNumber}
                            </span>
                        </div>
                        <div className="w-1/3">
                            <span className="font-bold">
                                CUSTOMER PO NO
                            </span>
                            {' '}:{' '}
                            <span>
                                {items?.soNumber}
                            </span>
                        </div>
                    </div>

                    <div className='col-span-4 flex justify-center'>
                        <div>
                            <span className="font-bold text-[13px]">
                                DATE
                            </span>
                            {' '}:{' '}
                            <span className="text-[13px]">
                                {moment(items?.invoiceDate).format('DD.MM.YYYY')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>



            {/*  Buyer information  */}
            <div className="grid grid-cols-12 py-1 border-b-[1px] border-black">
                <div className="col-span-12 px-2">
                    <h2 className="font-bold text-[12px]">
                        Buyer information
                    </h2>
                </div>
            </div>
            {/* Buyer information Table  */}
            <div className="grid grid-cols-12 border-b-[1px] border-black">
                <div className="col-span-6 px-2 py-2 border-r-[1px] border-black">
                    <h2 className="font-bold text-xs underline">
                        Billing Address:
                    </h2>

                    <h2 className="font-bold text-xs capitalize">
                        {items?.dealerWarehouse?.wareHouseName},{' '}
                        <span className="pl-2">({items?.dealerWarehouse?.wareHouseCode})</span>
                    </h2>

                    <h2 className="text-xs capitalize text-wrap">
                        {items?.dealerWarehouse?.billingAddress?.address}
                        {' '} +91{items?.dealerWarehouse?.billingAddress?.phone}
                        {','}{items?.dealerWarehouse?.billingAddress?.dealerDistrictName}
                        {','}{items?.dealerWarehouse?.billingAddress?.dealerStateName}
                        {'-'}{items?.dealerWarehouse?.billingAddress?.dealerPincodeName}
                    </h2>

                    <div>
                        <span className="font-bold">
                            Phone No.
                        </span>
                        {' '}:{' '}
                        <span>
                            {items?.dealerWarehouse?.billingAddress?.phone}
                        </span>
                    </div>

                    <div>
                        <span className="font-bold">GSTIN</span>
                        {' '}:{' '}
                        <span>{items?.dealerWarehouse?.billingAddress?.gstNumber || '-'}</span>
                    </div>

                    <div>
                        <span className="font-bold">
                            STATE CODE
                        </span>
                        {' '}:{' '}
                        <span>-</span>
                    </div>

                    <div>
                        <span className="font-bold">PAN</span>
                        {' '}:{' '}
                        <span className="uppercase">
                            {items?.dealerWarehouse?.billingAddress?.panNumber || '-'}
                        </span>
                    </div>

                    <div>
                        <span className="font-bold">
                            EMAIL : {items?.dealerWarehouse?.email || '-'}
                        </span>
                    </div>
                </div>
                <div className="col-span-6 px-2 py-2">
                    <h2 className="font-bold text-xs underline">
                        Delivery Address
                    </h2>

                    <h2 className="capitalize text-xs text-wrap">
                        {items?.dealerWarehouse?.billingAddress?.address}
                        <br />
                        {items?.dealerWarehouse?.billingAddress?.dealerDistrictName}
                        {', '}{items?.dealerWarehouse?.billingAddress?.dealerStateName}
                        {' - '}{items?.dealerWarehouse?.billingAddress?.dealerPincodeName}
                        {', '} Ph:-{items?.dealerWarehouse?.billingAddress?.phone}
                    </h2>
                    <div>
                        <span className="font-bold">EMAIL</span>
                        {' '}:{' '}
                        <span>
                            {items?.dealerWarehouse?.email || '-'}
                        </span>
                    </div>
                </div>
            </div>

            {/* TEX Table */}
            <div className="grid grid-cols-12 border-b-[1px] border-black">
                <div className="col-span-12">
                    <table className="border-none w-[100%]">
                        {/* table head */}
                        <thead>
                            <tr>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    SR. NO.
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    ITEM CODE NO.
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    ITEM DESCRIPTION
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    HSN CODE
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    QTY
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    RATE PER UNITS(RS.)
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    TAXABLE VALUE
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    S-GST
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    C-GST
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    I-GST
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    CESS
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[14px] border-t-none border-black">
                                    AMOUNT(RS.)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table Items Row */}
                            {items?.productSalesOrder?.map(
                                (ele, index) => {
                                    TOTAL_QUANTITY += ele?.quantity
                                    TOTAL_RATE_PER_UNIT += ele?.rate
                                    TOTAL_AMOUNT += ele?.rate
                                    return (
                                        <tr key={index}>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {index + 1}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                - 362325 -
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.productGroupLabel}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.hsnCode}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.quantity}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.rate?.toFixed(2)}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                - 50.00 -
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.sgst?.toFixed(2)}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.cgst?.toFixed(2)}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.igst?.toFixed(2)}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.utgst?.toFixed(2)}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {(ele?.quantity * ele?.rate)?.toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                }
                            )}

                            {/* TOTAL AMOUNT SECTION ROW WITH SPAN DIVIDED  */}
                            <tr className="border-t-[1px] border-black">
                                <td
                                    className="font-bold text-[12px] px-2"
                                    colSpan={4}
                                >
                                    TOTAL RUPEES (IN FIGURES) :
                                </td>
                                <td
                                    className="text-[14px] font-bold text-center py-1"
                                    colSpan={1}
                                >
                                    {TOTAL_QUANTITY}
                                </td>
                                <td
                                    className=" text-[14px] text-center py-1"
                                    colSpan={2}
                                >
                                    {TOTAL_RATE_PER_UNIT?.toFixed(2)}
                                </td>
                                <td className="text-[14px] text-center py-1">
                                    - 0 -
                                </td>
                                <td className="text-[14px] text-center py-1">
                                    - 0 -
                                </td>
                                <td className="text-[14px] text-center py-1">
                                    - 0 -
                                </td>
                                <td className="text-[14px] text-center py-1">
                                    - 0 -
                                </td>
                                <td className="text-[14px] font-bold text-center py-1">
                                    {TOTAL_AMOUNT?.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/*  Buyer information  */}
            <div className="grid grid-cols-12 py-1 border-b-[1px] border-black">
                <div className="col-span-12 px-2">
                    <h2 className="font-bold text-[12px]">
                        <span>TOTAL RUPEES (IN WORDS) </span>
                        <span className="pr-4 pl-1"> : </span>
                        <span className='uppercase'>
                            RUPEE{' '}{NumberToWordsConverter.convert(TOTAL_AMOUNT)}{' '}ONLY
                        </span>
                    </h2>
                </div>
            </div>

            {/* Godown Information  */}
            <div className="grid grid-cols-12 border-b-[1px] border-black">
                <div className="col-span-6 px-2 py-2 border-r-[1px] border-black">
                    <h2 className="font-bold mb-2">
                        GODOWN: {items?.companyDetails?.companyName}
                    </h2>

                    <h2>
                        {items?.companyWarehouse?.billingAddress?.address}
                        <p>
                            Contact No : {items?.companyWarehouse?.billingAddress?.phone}
                            {','} Gst No : {items?.companyWarehouse?.billingAddress?.gstNumber}
                        </p>
                    </h2>
                </div>

                <div className="col-span-6 px-2 py-2">
                    <h2>
                        I/We hereby declare that my/our Registration
                        Certificate under the GST act is in force on the
                        date on which the sale of the goods specified in
                        this bill/cash memo is made by me/us and that the
                        transaction of sale covered by this bill/cash memo
                        has been affected by me/us in the regular course of
                        my/our business.
                    </h2>
                </div>
            </div>

            {/* last table */}
            <div className="grid grid-cols-12 py-1 h-28">
                <div className="col-span-8 pl-2 flex justify-between">
                    <div>
                        <span>
                            This is System Generated Invoice hence no
                            Signature or Stamp required.
                        </span>
                    </div>
                </div>
                <div className="col-span-4 flex justify-end">
                    <div className="col-span-6 pr-2 flex flex-col justify-between">
                        <div>
                            <span className="font-bold">
                                For Telemart
                            </span>
                        </div>
                        <div>
                            <span className="font-bold">
                                Authorized Signatory
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
)

export default DispatchedInvoiceTemplate
