import moment from 'moment'
import React from 'react'
import { NumberToWordsConverter } from 'src/utils/numberToEnglishWord'
import { SalesOrderInvoiceResponse } from './DispatchedInvoiceWrapper'

type Props = {
    ref?: any
    items: SalesOrderInvoiceResponse | null
}

const DispatchedInvoiceTemplate = React.forwardRef(({ items }: Props, ref: any) => {

    let totalFigure = {
        quantity: 0,
        taxableAmount: 0,
        tSGST: 0,
        tCGST: 0,
        tIGST: 0,
        tUGST: 0,
        totalAmount: 0
    }


    interface TaxCalculation {
        totalTaxableValue: number;
        actualValue: number;
        cgstPer: number;
        sgstPer: number;
        igstPer: number;
        utgstPer: number;
        cgstValue: number;
        sgstValue: number;
        igstValue: number;
        utgstValue: number;
        totalAmount: number;
    }

    const calculatedValue = (increasedValue: number, percentage: number) => {
        return increasedValue / (1 + percentage / 100);
    };

    const getReverseCalculation = (product: any): TaxCalculation => {
        const companyStateId = items?.companyWarehouse?.billingAddress?.stateId;
        const warehouseStateId = items?.dealerWarehouse?.billingAddress?.stateId;
        const warehouseStateIsUnion = items?.dealerWarehouse?.billingAddress?.isUnion;

        const dealerSalePrice = product?.dealerSalePrice || 0; // Dealer sale price including tax
        const cgstRate = product?.cgst || 0;
        const sgstRate = product?.sgst || 0;
        const igstRate = product?.igst || 0;
        const utgstRate = product?.utgst || 0;

        let actualValue = 0;
        let totalTaxableValue = 0;
        let cgstValue = 0, sgstValue = 0, igstValue = 0, utgstValue = 0;
        let cgstPer = 0, sgstPer = 0, igstPer = 0, utgstPer = 0;

        if (companyStateId === warehouseStateId) {
            // Intrastate transaction (CGST + SGST)
            const totalTaxRate = cgstRate + sgstRate;
            actualValue = calculatedValue(dealerSalePrice, totalTaxRate);
            totalTaxableValue = dealerSalePrice - actualValue;

            cgstValue = (cgstRate / 100) * actualValue;
            sgstValue = (sgstRate / 100) * actualValue;

            cgstPer = cgstRate;
            sgstPer = sgstRate;
        } else if (warehouseStateIsUnion) {
            // Union Territory, UTGST applicable
            actualValue = calculatedValue(dealerSalePrice, utgstRate);
            totalTaxableValue = dealerSalePrice - actualValue;

            utgstValue = (utgstRate / 100) * actualValue;
            utgstPer = utgstRate;
        } else {
            // Interstate transaction, IGST applicable
            actualValue = calculatedValue(dealerSalePrice, igstRate);
            totalTaxableValue = dealerSalePrice - actualValue;

            igstValue = (igstRate / 100) * actualValue;
            igstPer = igstRate;
        }

        return {
            totalTaxableValue: Number(totalTaxableValue.toFixed(2)),
            actualValue: Number(actualValue.toFixed(2)),
            cgstPer,
            sgstPer,
            igstPer,
            utgstPer,
            cgstValue: Number(cgstValue.toFixed(2)),
            sgstValue: Number(sgstValue.toFixed(2)),
            igstValue: Number(igstValue.toFixed(2)),
            utgstValue: Number(utgstValue.toFixed(2)),
            totalAmount: dealerSalePrice
        };
    };

    return (
        <div
            ref={ref}
            className="bg-white border-[1px] border-black m-2 p-6 text-sm"
        >
            {/* Top Header With Logo */}
            <div className="grid grid-cols-12 border-b-[1px] pb-2 border-black">
                <div className="col-span-4 p-2">
                    <img src="/skyLogo.jpg"
                        className="h-[6rem] w-full object-contain"
                        alt='Saptel logo' />
                </div>
                <div className="col-span-8">
                    <h1 className="text-sm font-normal">
                        Subject to Indore Jurisdiction
                    </h1>
                    <div>
                        <h1 className="font-bold uppercase text-lg">{items?.companyDetails?.companyName}</h1>
                        <p className="capitalize text-xs font-semibold">
                            {items?.companyDetails?.address}
                        </p>
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
                                {items?.invoiceDate ? moment(items?.invoiceDate).format('DD.MM.YYYY') : ''}
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
                        {items?.companyWarehouse?.wareHouseName},{' '}
                        <span className="pl-2">({items?.companyWarehouse?.wareHouseCode})</span>
                    </h2>

                    <h2 className="text-xs capitalize text-wrap">
                        {items?.companyWarehouse?.billingAddress?.address}
                        {/* {','}{items?.companyWarehouse?.billingAddress?.dealerDistrictName}
                        {','}{items?.companyWarehouse?.billingAddress?.companyStateName}
                        {'-'}{items?.companyWarehouse?.billingAddress?.dealerPincodeName} */}
                    </h2>

                    <div>
                        <span className="font-bold text-xs">
                            Phone No.
                        </span>
                        {' '}:{' '}
                        <span className='text-xs'>
                            {items?.companyWarehouse?.billingAddress?.phone}
                        </span>
                    </div>

                    <div>
                        <span className="font-bold text-xs">GSTIN</span>
                        {' '}:{' '}
                        <span className='text-xs'>{items?.companyWarehouse?.billingAddress?.gstNumber || ''}</span>
                    </div>

                    {/* <div className='hidden'>
                        <span className="font-bold">
                            STATE CODE
                        </span>
                        {' '}:{' '}
                        <span>-</span>
                    </div> */}

                    {/* <div>
                        <span className="font-bold">PAN</span>
                        {' '}:{' '}
                        <span className="uppercase">
                            {items?.dealerWarehouse?.billingAddress?.panNumber || '-'}
                        </span>
                    </div> */}

                    <div>
                        <span className="font-bold text-xs">
                            EMAIL : {items?.companyWarehouse?.email || '-'}
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
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    SR. NO.
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    ITEM CODE NO.
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    ITEM DESCRIPTION
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    HSN CODE
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    QTY
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    RATE PER UNITS(RS.)
                                </th>
                                <th className="pb-3 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    TAXABLE VALUE
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    SGST
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    CGST
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    IGST
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    UGST
                                </th>
                                <th className="pb-3 px-1 border-r-[1px] border-b-[1px] border-l-[1px] text-[12px] border-t-none border-black">
                                    AMOUNT(RS.)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table Items Row */}

                            {items?.productSalesOrder?.map(
                                (ele, index) => {

                                    const { actualValue, totalAmount, cgstPer, cgstValue, sgstPer, sgstValue, igstPer, igstValue, utgstPer, utgstValue } = getReverseCalculation(ele)

                                    // Assuming ele is defined and has properties needed for calculations
                                    // Update totalFigure properties
                                    totalFigure.quantity += ele?.quantity || 0;  // Add quantity, defaulting to 0 if undefined
                                    totalFigure.taxableAmount += parseFloat((actualValue * (ele?.quantity || 0)).toFixed(2));  // Add taxable amount
                                    totalFigure.tSGST += parseFloat((sgstValue * (ele?.quantity || 0)).toFixed(2));  // Add SGST value
                                    totalFigure.tCGST += parseFloat((cgstValue * (ele?.quantity || 0)).toFixed(2));  // Add CGST value
                                    totalFigure.tIGST += parseFloat((igstValue * (ele?.quantity || 0)).toFixed(2));  // Add IGST value
                                    totalFigure.tUGST += parseFloat((utgstValue * (ele?.quantity || 0)).toFixed(2));  // Add UTGST value
                                    totalFigure.totalAmount += parseFloat((totalAmount * (ele?.quantity || 0)).toFixed(2));  // Update total amount

                                    return (
                                        <tr key={index}>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {index + 1}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1 uppercase">
                                                {ele?.productGroupCode}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1 capitalize">
                                                {ele?.productGroupLabel}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.hsnCode}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {ele?.quantity}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {actualValue.toFixed(2)}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {(actualValue * ele?.quantity).toFixed(2)}
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {(sgstValue * ele?.quantity).toFixed(2)}<br />
                                                {sgstPer}%
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {(cgstValue * ele?.quantity).toFixed(2)}<br />
                                                {cgstPer}%
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {(igstValue * ele?.quantity).toFixed(2)}<br />
                                                {igstPer}%
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {(utgstValue * ele?.quantity).toFixed(2)}<br />
                                                {utgstPer}%
                                            </td>
                                            <td className="border-l border-r text-[14px] border-black text-center py-1">
                                                {(ele?.quantity * totalAmount).toFixed(2)}
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
                                    {totalFigure.quantity}
                                </td>
                                <td className="text-[14px] text-center py-1" colSpan={2}>
                                    {totalFigure?.taxableAmount?.toFixed(2) || '0.00'}
                                </td>
                                <td className="text-[14px] text-center py-1">
                                    {totalFigure?.tSGST?.toFixed(2) || '0.00'}
                                </td>
                                <td className="text-[14px] text-center py-1">
                                    {totalFigure?.tCGST?.toFixed(2) || '0.00'}
                                </td>
                                <td className="text-[14px] text-center py-1">
                                    {totalFigure?.tIGST?.toFixed(2) || '0.00'}
                                </td>
                                <td className="text-[14px] text-center py-1">
                                    {totalFigure?.tUGST?.toFixed(2) || '0.00'}
                                </td>
                                <td className="text-[14px] font-bold text-center py-1">
                                    {totalFigure?.totalAmount?.toFixed(2) || '0.00'}
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
                            {' '}{NumberToWordsConverter.convert(totalFigure?.totalAmount)}{' '}ONLY
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

                    <h2 className='text-xs'>
                        {items?.companyWarehouse?.billingAddress?.address}
                        <p>
                            Contact No : {items?.companyWarehouse?.billingAddress?.phone}
                            {','} Gst No : {items?.companyWarehouse?.billingAddress?.gstNumber}
                        </p>
                    </h2>
                </div>

                <div className="col-span-6 px-2 py-2">
                    <h2 className='text-xs'>
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
                        <span className='text-xs'>
                            This is System Generated Invoice hence no
                            Signature or Stamp required.
                        </span>
                    </div>
                </div>
                <div className="col-span-4 flex justify-end">
                    <div className="col-span-6 pr-2 flex flex-col justify-between">
                        <div>
                            <span className="font-bold">
                                For {items?.companyDetails?.companyName}
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
