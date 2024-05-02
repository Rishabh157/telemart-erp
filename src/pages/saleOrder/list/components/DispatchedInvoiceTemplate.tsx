import React from 'react'
import logoImage from '../../../../assets/images/telemartLogo-print.png'
import { SalesOrderInvoiceResponse } from './DispatchedInvoiceWrapper'
import moment from 'moment'
import { NumberToWordsConverter } from 'src/utils/numberToEnglishWord'

type Props = {
    ref?: any
    invoice: SalesOrderInvoiceResponse | null
}

const DispatchedInvoiceTemplate = React.forwardRef(
    ({ invoice }: Props, ref: any) => {
        let TOTAL_QUANTITY: number = 0
        let TOTAL_RATE_PER_UNIT: number = 0
        let TOTAL_AMOUNT: number = 0

        return (
            <div
                ref={ref}
                className="bg-white border-[1px] border-black m-4 p-2"
            >
                {/* Top Header With Logo */}
                <div className="grid grid-cols-12 border-b-[1px] pb-2 border-black">
                    <div className="col-span-5 px-2 py-2">
                        <img
                            src={logoImage}
                            alt="telemart-logo"
                            className="h-[80px]"
                        />
                    </div>
                    <div className="col-span-7">
                        <h1 className="text-[15px]">
                            Subject to Indore Jurisdiction HELLO
                        </h1>
                        <div>
                            <h1 className="font-bold">Telemart</h1>
                            <p className="text-[13px]">
                                H.O.:701 Atulya IT Park, Khandwa Road, Near
                                Crystal IT Park,Indore,Madhya
                            </p>
                            <p className="text-[13px]">
                                Pradesh,Pin Code:452001,India
                            </p>
                            <p className="text-[12px]">STATE CODE:(23)</p>
                            <p className="text-[12px]">
                                GSTIN 23AATFT1962F1ZZ: PAN :AATFT1962F
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 py-1 border-b-[1px] border-black">
                    <div className="col-span-12 flex justify-center">
                        <h2 className="font-bold text-[13px]">TAX INVOICE</h2>
                    </div>

                    <div className="col-span-8 flex justify-between">
                        <div className="grid grid-cols-12 gap-x-8">
                            <div className="col-span-6 pl-2">
                                <div>
                                    <span className="font-bold text-[13px]">
                                        INVOICE NO
                                    </span>
                                    <span className="mx-2">:</span>
                                    <span className="text-[13px]">
                                        Tel-Y24-0002012
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-6 pl-2">
                                <div>
                                    <span className="font-bold text-[13px]">
                                        CUSTOMER PO NO.
                                    </span>
                                    <span className="mx-2">:</span>
                                    <span className="text-[13px]">
                                        {invoice?.soNumber}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 flex justify-center">
                        <div className="col-span-6 pl-2">
                            <div>
                                <span className="font-bold text-[13px]">
                                    DATE
                                </span>
                                <span className="mx-2">:</span>
                                <span className="text-[13px]">
                                    {moment(invoice?.createdAt).format(
                                        'DD.MM.YYYY'
                                    )}
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
                        <h2 className="font-bold text-[12px] underline">
                            Billing Address:
                        </h2>

                        <h2 className="font-bold text-[13px] uppercase">
                            {invoice?.companyWarehouseLabel},{' '}
                            <span className="ml-4">(UP/MRT/MJ)</span>
                        </h2>

                        <h2 className="text-[13px] capitalize">
                            {invoice?.companyWarehouseBillingAddress?.address} -
                            {invoice?.companyDistrictName} {'-'}
                            {invoice?.companyPincodeName} MOB NO-
                            {invoice?.companyWarehouseBillingAddress?.phone}
                        </h2>

                        <div>
                            <span className="font-bold text-[13px]">
                                Phone No.
                            </span>
                            <span className="px-2">:</span>
                            <span className="text-[13px]">
                                {invoice?.companyWarehouseBillingAddress?.phone}
                            </span>
                        </div>

                        <div>
                            <span className="font-bold text-[13px]">GSTIN</span>
                            <span className="px-2">:</span>
                            <span className="text-[13px]">-</span>
                        </div>

                        <div>
                            <span className="font-bold text-[13px]">
                                STATE CODE
                            </span>
                            <span className="px-2">:</span>
                            <span className="text-[13px]">-</span>
                        </div>

                        <div>
                            <span className="font-bold text-[13px]">PAN</span>
                            <span className="px-2">:</span>
                            <span className="text-[13px]">-</span>
                        </div>

                        <div>
                            <span className="font-bold text-[13px]">
                                EMAIL : {invoice?.companyEmail || '-'}
                            </span>
                        </div>
                    </div>
                    <div className="col-span-6 px-2 py-2">
                        <h2 className="font-bold text-[12px] underline">
                            Delivery Address
                        </h2>

                        <h2 className="text-[13px] capitalize">
                            {invoice?.warehouseBillingAddress?.address} -
                            {invoice?.dealerPincodeName} MOB NO-
                            {invoice?.warehouseBillingAddress?.phone}
                        </h2>

                        <div>
                            <span className="text-[13px] capitalize">
                                {invoice?.dealerStateName}
                            </span>
                            <span className="px-1">-</span>
                            <span className="text-[13px]">
                                {invoice?.dealerPincodeName} , Ph:-{' '}
                                {invoice?.warehouseBillingAddress?.phone}
                            </span>
                        </div>
                        <div>
                            <span className="font-bold text-[13px]">EMAIL</span>
                            <span className="px-1">:</span>
                            <span className="text-[13px]">
                                {invoice?.warehouseEmail || '-'}
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
                                {invoice?.productSalesOrder?.map(
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
                                                    362325 -
                                                </td>
                                                <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                    Product A -
                                                </td>
                                                <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                    1214 -
                                                </td>
                                                <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                    {ele?.quantity}
                                                </td>
                                                <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                    {ele?.rate?.toFixed(2)}
                                                </td>
                                                <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                    50.00 -
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
                                                    0.25 -
                                                </td>
                                                <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                    {ele?.quantity * ele?.rate}
                                                    .00
                                                </td>
                                            </tr>
                                        )
                                    }
                                )}
                                {/* <tr>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        2
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        12345
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        Product B
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        1234
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        5
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        10.00
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        50.00
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        5.00
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        5.00
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        2.50
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        0.25
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        52.75
                                    </td>
                                </tr> */}

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
                                        0
                                    </td>
                                    <td className="text-[14px] text-center py-1">
                                        0
                                    </td>
                                    <td className="text-[14px] text-center py-1">
                                        0
                                    </td>
                                    <td className="text-[14px] text-center py-1">
                                        0
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
                            <span>
                                {/* RUPEES ONE LAKHS TWENTY-FIVE THOUSAND FOUR
                                HUNDRED FORTY ONLY */}
                                RUPEE{' '}
                                {NumberToWordsConverter.convert(TOTAL_AMOUNT)}{' '}
                                ONLY
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Godown Information  */}
                <div className="grid grid-cols-12 border-b-[1px] border-black">
                    <div className="col-span-6 px-2 py-2 border-r-[1px] border-black">
                        <h2 className="font-bold text-[13px] mb-2">
                            GODOWN: Telemart
                        </h2>

                        <h2 className="text-[12px]">
                            Godown Address: 188 Gayatri Nagar, Palda, Near Goyal
                            Flour Mill,,Indore,Madhya Pradesh(23)-452020 Contact
                            No:7770884999,Gst No:23AATFT1962F1ZZ
                        </h2>
                    </div>

                    <div className="col-span-6 px-2 py-2">
                        <h2 className="text-[12px]">
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
                            <span className="text-[13px]">
                                This is System Generated Invoice hence no
                                Signature or Stamp required.
                            </span>
                        </div>
                    </div>
                    <div className="col-span-4 flex justify-end">
                        <div className="col-span-6 pr-2 flex flex-col justify-between">
                            <div>
                                <span className="font-bold text-[13px]">
                                    For Telemart
                                </span>
                            </div>
                            <div>
                                <span className="font-bold text-[13px]">
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
