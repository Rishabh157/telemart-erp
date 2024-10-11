import React from 'react';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery';
import { useGetWarehouseTransferInvoiceDetailsQuery } from 'src/services/WarehouseTransferService';
import moment from 'moment';
import { NumberToWordsConverter } from 'src/utils/numberToEnglishWord';
import { useBarcode } from '@createnextapp/react-barcode'

const tableHead = 'border-r border-slate-900 py-1'
const tableCell = 'border-r border-slate-900 p-[5px] text-center capitalize'


type WarehouseData = {
    _id: string;
    wareHouseName: string;
    email: string;
    billingAddress: {
        phone: string;
        maskedPhoneNo: string;
        address: string;
        countryId: string;
        stateId: string;
        districtId: string;
        pincodeId: string;
        gstNumber: string;
        gstCertificate?: string;
        _id: string;
        countryName: string;
        stateName: string;
        isUnion: boolean;
        districtName: string;
        pincodeName: string;
        panNumber?: string | null;
    };
};

type ProductSalesOrder = {
    productGroupId: string;
    rate: number;
    quantity: number;
    _id: string;
    dealerSalePrice: number;
    gst: number;
    cgst: number;
    sgst: number;
    igst: number;
    utgst: number;
    productGroupLabel: string;
    productGroupCode: string;
    productSubCategory: string;
    hsnCode: string;
};

type WarehouseTransferInvoiceTypes = {
    _id: string;
    toWarehouseData: WarehouseData;
    fromWarehouseData: WarehouseData;
    companyDetails: {
        _id: string;
        companyName: string;
        companyCode: string;
        websiteUrl: string;
        gstNo: string;
        address: string;
        phoneNo: string;
        maskedPhoneNo: string;
        bankDetails: {
            bankName: string;
            branchName: string;
            accountHolderName: string;
            accountNumber: number;
            ifscNumber: string;
            accountType: string;
            _id: string;
        }[];
        isDeleted: boolean;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        companyLogo: string;
        panNumber: string;
    };
    invoiceDate: Date | null;
    invoiceNumber: string;
    productSalesOrder: ProductSalesOrder[];
};
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

const WarehouseTransferInvoice = () => {

    const params = useParams()
    const wtwNumber = params?.id

    const { items, isFetching } = useGetDataByIdCustomQuery<WarehouseTransferInvoiceTypes>({
        useEndPointHook: useGetWarehouseTransferInvoiceDetailsQuery(wtwNumber || '', {
            skip: !wtwNumber,
        }),
    })

    // Barcode Print
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


    let totalFigure = {
        quantity: 0,
        taxableAmount: 0,
        tSGST: 0,
        tCGST: 0,
        tIGST: 0,
        tUGST: 0,
        totalAmount: 0
    }

    const calculatedValue = (increasedValue: number, percentage: number) => {
        return increasedValue / (1 + percentage / 100);
    };

    const getReverseCalculation = (product: any): TaxCalculation => {
        const companyStateId = items?.fromWarehouseData?.billingAddress?.stateId;
        const warehouseStateId = items?.toWarehouseData?.billingAddress?.stateId;
        const warehouseStateIsUnion = items?.toWarehouseData?.billingAddress?.isUnion;

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
        <>

            {isFetching && (
                <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                    <CircularProgress />
                </div>
            )}

            <div className="text-[12px] bg-white p-2">
                <div className="mx-auto my-auto">
                    <div className="border border-black py-2">
                        <p className="text-center text-base font-extrabold uppercase ">
                            {items?.companyDetails?.companyName}
                        </p>
                        <p className="capitalize text-center mt-1 font-semibold">
                            {items?.companyDetails?.address}
                        </p>
                        <p className="text-center font-semibold mt-2">
                            Tax Invoice
                        </p>
                        <div className="flex justify-between">
                            <div className="pl-5 font-semibold">
                                <div className="flex gap-10">
                                    <p className="">Invoice no :</p>
                                    <p>
                                        {items?.invoiceNumber}
                                    </p>
                                </div>
                                <div className="flex gap-14">
                                    <p>DC date :</p>
                                    <p> {items?.invoiceDate ? moment(new Date(items?.invoiceDate)).format("DD-MMMM-YYYY") : '-'}</p>
                                </div>
                            </div>
                            <div className="mr-[70px] mt-4">
                                <div className="flex flex-col items-center justify-center my-2">
                                    <div className="w-[300px] h-[60px]">
                                        <Barcode value={items?.invoiceNumber || (Math.round(Math.random() * Math.pow(10, 5)))?.toString()} />
                                    </div>
                                    <span>{items?.invoiceNumber}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-8 text-[15px] ml-5 mt-3">
                            <p className="font-bold">MODE OF TRANSFER</p>
                            <p className="font-bold">: GOOD TO GOOD</p>
                        </div>

                        <div className=" flex gap-10 ml-5 mt-1 text-[14px]">
                            <div >
                                <p className="font-semibold text-[11px] ">
                                    Ship From Good Warehouse
                                </p>
                                <p className="font-bold underline mt-2">
                                    Ship From (Warehouse Address) :{' '}
                                </p>
                                <p className="font-extrabold uppercase mt-1">
                                    {items?.companyDetails?.companyName}
                                </p>
                                <p className='capitalize'>
                                    {items?.fromWarehouseData?.billingAddress?.address || '-'}
                                </p>
                                <p>GST NO. : {items?.fromWarehouseData?.billingAddress?.gstNumber || '-'}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-[11px]">
                                    Ship To Good Warehouse
                                </p>
                                <p className="font-bold underline mt-2">
                                    Ship To :{' '}
                                </p>
                                <p className="font-extrabold uppercase mt-1">
                                    {items?.companyDetails?.companyName}
                                </p>
                                <p className='capitalize'>
                                    {items?.toWarehouseData?.billingAddress?.address || '-'}
                                </p>
                                <p>GST NO. :  {items?.toWarehouseData?.billingAddress?.gstNumber || '-'}</p>
                            </div>
                        </div>

                        <table width="100%" className=" mt-6">
                            <thead className="border-y border-slate-900">
                                <tr>
                                    <th className={tableHead}>S.No</th>
                                    <th className={tableHead}>Product Code</th>
                                    <th className={tableHead}>Product Name</th>
                                    <th className={tableHead}>HSN Code</th>
                                    <th className={tableHead}>Qty</th>
                                    <th className={tableHead}>
                                        Rate/ <br /> TotalUnit
                                    </th>
                                    <th className={tableHead}>TAXABLE VALUE</th>

                                    <th className={tableHead}>S-GST</th>
                                    <th className={tableHead}>C-GST</th>
                                    <th className={tableHead}>I-GST</th>
                                    <th className={tableHead}>U-GST</th>
                                    <th className="text-center w-[100px]">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items?.productSalesOrder?.map((ele, index) => {

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
                                        <tr key={ele?._id}>
                                            <td className={tableCell}>{(index + 1)}</td>
                                            <td className={tableCell}>{ele?.productGroupCode}</td>
                                            <td className={tableCell}>
                                                {ele?.productGroupLabel}
                                            </td>
                                            <td className={tableCell}>{ele?.hsnCode}</td>
                                            <td className={tableCell}>{ele?.quantity}</td>
                                            <td className={tableCell}> {actualValue.toFixed(2)}</td>
                                            <td className={tableCell}>  {(actualValue * ele?.quantity).toFixed(2)} </td>
                                            <td className={tableCell}>
                                                {(sgstValue * ele?.quantity).toFixed(2)}<br />
                                                {sgstPer}%
                                            </td>
                                            <td className={tableCell}>
                                                {(cgstValue * ele?.quantity).toFixed(2)}<br />
                                                {cgstPer}%
                                            </td>
                                            <td className={tableCell}>
                                                {(igstValue * ele?.quantity).toFixed(2)}<br />
                                                {igstPer}%
                                            </td>
                                            <td className={tableCell}>
                                                {(utgstValue * ele?.quantity).toFixed(2)}<br />
                                                {utgstPer}%
                                            </td>
                                            <td className="text-center">{(ele?.quantity * totalAmount).toFixed(2)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="flex py-1 justify-between px-8 border-y border-slate-900 ">
                            <p className="font-bold">Total</p>
                            <p className="font-bold">
                                {totalFigure?.totalAmount?.toFixed(2) || '0.00'}
                            </p>
                        </div>
                        <div className="flex gap-20 py-1 px-4 border-b border-slate-900 ">
                            <p className="font-bold ">
                                TOTAL RUPEES (IN WORDS) :
                            </p>
                            <p className="font-bold uppercase">
                                RUPEES{' '}{NumberToWordsConverter.convert(totalFigure?.totalAmount)}{' '}ONLY .
                            </p>
                        </div>
                        <div className='ml-4'>
                            <p className="font-semibold mt-2 ">
                                *(Inclusive of all taxes.)
                            </p>
                            <p className="font-bold underline mt-3">
                                Terms & Conditions :
                            </p>
                            <p>Remarks :</p>
                            <p className="mt-1 font-bold">Prepared By</p>
                            <p className=" uppercase">
                                {items?.companyDetails?.companyName}
                            </p>
                        </div>
                        <div className="flex justify-evenly mt-10  ">
                            <p >- 09-02-2023 11:34:06 -</p>
                            <p className="mt-5 font-extrabold text-[14px]">
                                Authorized Signatory:{' '}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WarehouseTransferInvoice
