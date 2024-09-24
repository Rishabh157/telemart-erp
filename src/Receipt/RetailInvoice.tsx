// import React from 'react'
import moment from 'moment'
import { OrderInvoiceAndLabelListResponse } from 'src/models/Order.model'
import { useBarcode } from '@createnextapp/react-barcode'
import { NumberToWordsConverter } from 'src/utils/numberToEnglishWord'


const tableHead = 'border-r border-black p-2 text-start border-l'
const tableCell = 'border-r border-black p-2 text-center border-l'

const RetailInvoice = ({ items }: { items: OrderInvoiceAndLabelListResponse }) => {

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

    return (
        <div className="bg-white p-4 text-sm">
            <div className="grid grid-cols-12 py-6 items-center border-b border-gray-400 gap-x-8">
                <div className='col-span-4'>
                    <img
                        src={items?.companyDetails?.companyLogo ? items?.companyDetails?.companyLogo : "/logo.jpg"}
                        className="h-20 w-full"
                        alt={items?.companyDetails?.companyName + ' logo'}
                    />
                </div>

                <div className="flex flex-col font-medium col-span-8">
                    <p className="text-2xl font-bold text-center uppercase">{items?.companyDetails?.companyName}</p>
                    <span className='font-semibold text-wrap'>
                        {items?.companyAddress || items?.companyDetails?.address}
                    </span>

                    <div className="flex flex-col items-center font-semibold">
                        <span> Phone : {items?.companyDetails?.phoneNo} </span>
                        <span> GSTIN : {items?.companyDetails?.gstNo} </span>
                    </div>

                </div>
            </div>


            <div>
                <p className="text-center font-extrabold py-2 text-[18px] border-b border-black">
                    INVOICE
                </p>

                <div className="grid grid-cols-12 gap-4 border-b border-black">

                    <div className="col-span-5 flex flex-col border-r border-black py-2 pr-4">
                        <span className="underline font-semibold">
                            NAME & ADDRESS OF CUSTOMER:
                        </span>

                        <span className='py-2 font-bold'>{items?.customerName}</span>

                        <span className="font-medium text-wrap">
                            {(items?.houseNumber && items?.streetNumber && items?.landmark) ?
                                items?.houseNumber + ' ,, ' + items?.streetNumber + ' ,, ' + items?.landmark :
                                items?.autoFillingShippingAddress}
                            <div className='capitalize'>
                                <span className='font-bold'> CITY </span> : {items?.districtLabel}
                                <span className='font-bold'> STATE </span> : {items?.stateLabel}
                                <span className='font-bold'> PIN </span> : {items?.pincodeLabel} <br />
                                <span className='font-bold'> MOBILE </span> : {items?.mobileNo}
                            </div>
                        </span>
                    </div>

                    <div className="col-span-7 flex flex-col font-semibold">

                        <div className="flex justify-between">
                            <span>Order No : {items?.orderNumber}</span>
                            <span>Invoice Date : {items?.orderInvoiceDate ? moment(items?.orderInvoiceDate).format('DD/MM/YYYY') : '-'}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Invoice No : {items?.orderInvoice}</span>
                            <span>Mode of Payment : {items?.paymentMode}</span>
                        </div>

                        <div className="flex flex-col items-center justify-center my-2">
                            <div className="w-[300px] h-[60px]">
                                <Barcode value={items?.awbNumber} />
                            </div>
                            <span>{items?.awbNumber}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="font-bold text-[20px] border-b border-black py-2">
                        COD FOR Rs : {items?.totalAmount?.toFixed(2)}
                    </p>
                </div>


                <table>
                    <thead className="border-[0px] border-black">
                        <tr>
                            <th className={tableHead}>S.NO</th>
                            <th className={tableHead}>ITEM DESCRIPTION</th>
                            <th className={tableHead}>HSN CODE</th>
                            <th className={tableHead}>QTY</th>
                            <th className={tableHead}>PRICE</th>
                            <th className={tableHead}>DISC. </th>
                            <th className={tableHead}>DEL. CHGS</th>
                            <th className={tableHead}>TAXABLE VALUE</th>
                            <th className={tableHead}>S-GST</th>
                            <th className={tableHead}>C-GST</th>
                            <th className={tableHead}>I-GST</th>
                            <th className={tableHead}>CESS</th>
                            <th className={tableHead}>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody className="border-b-[0px] border-black">
                        {items?.schemeProducts?.map((ele, index) => (
                            <tr key={ele?.productGroupId}>
                                <td className={tableCell}>{(index + 1)}</td>
                                <td className={tableCell}>
                                    {ele?.productGroupName}
                                </td>
                                <td className={tableCell}>{items?.hsnCode}</td>
                                <td className={tableCell}>
                                    {ele?.productQuantity}
                                </td>
                                <td className={tableCell}> {items?.price}</td>
                                <td className={tableCell}>{Number(0)?.toFixed(2)}</td>
                                <td className={tableCell}>{Number(0)?.toFixed(2)}</td>
                                <td className={tableCell}>---</td>
                                <td className={tableCell}>
                                    {ele?.sgst?.toFixed(2)}
                                    <br />
                                    <span>&#64;{ele?.sgst?.toFixed(2)}&#37;</span>
                                </td>
                                <td className={tableCell}>
                                    {ele?.cgst?.toFixed(2)}
                                    <br />
                                    <span>&#64;{ele?.sgst?.toFixed(2)}&#37;</span>
                                </td>
                                <td className={tableCell}>
                                    {ele?.igst?.toFixed(2)}
                                    <br />
                                    <span>&#64;{ele?.sgst?.toFixed(2)}&#37;</span>
                                </td>
                                <td className={tableCell}>
                                    {ele?.utgst?.toFixed(2)}
                                    <br />
                                    <span>&#64;{ele?.sgst?.toFixed(2)}&#37;</span>
                                </td>
                                <td className={tableCell}>
                                    {items?.totalAmount}
                                </td>
                            </tr>
                        ))}

                        <tr className="border-black border-l border-t py-1">
                            <td colSpan={2} className={tableCell}>
                                TOTAL
                            </td>
                            <td className={tableCell}></td>
                            <td className={tableCell}>1</td>
                            <td className={tableCell}>2232.14</td>
                            <td className={tableCell}>0</td>
                            <td className={tableCell}>0.00</td>
                            <td className={tableCell}>2232.14</td>
                            <td className={tableCell}>0.00 %</td>
                            <td className={tableCell}>0.00 %</td>
                            <td className={tableCell}>267.86 %</td>
                            <td className={tableCell}>0.00 %</td>
                            <td className={tableCell}>2500.00 </td>
                        </tr>
                    </tbody>
                </table>


                <div className="border-b border-black">
                    <p className="font-extrabold uppercase text-[16px] border-t border-black py-1">
                        AMOUNT IN WORDS : RUPEES {NumberToWordsConverter.convert(items?.totalAmount)} ONLY.
                    </p>

                    <div className="mt-1 flex flex-col w-10/12">
                        <span>Sold By:-</span>
                        <span className='uppercase font-semibold'>
                            {items?.companyDetails?.companyName}
                        </span>
                        <span>If undelivered then return to :</span>
                        <span className='uppercase font-semibold'>
                            {items?.companyDetails?.companyName}
                        </span>
                        <span className='text-wrap'>
                            {items?.warehouseBillingInfo?.address}
                        </span>
                        <span className='font-semibold capitalize'>
                            {items?.warehouseBillingInfo?.stateLable} ,
                            {items?.warehouseBillingInfo?.countryLable}-{items?.warehouseBillingInfo?.pincodeLable}</span>
                        <span className='font-semibold'>GSTIN No : {items?.warehouseBillingInfo?.gstNumber}</span>
                        <span>
                            For Complaint & Telephonic Demonstration
                            <span className='font-semibold'> +91{items?.warehouseBillingInfo?.phone} </span>
                        </span>

                        <p className="text-center font-extrabold text-[17px] py-1">
                            THIS IS A COMPUTER GENERATED INVOICE AND DOES NOT
                            REQUIRE SIGNATURE
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-center my-2">
                    <span className="underline font-extrabold text-center">
                        Customer Self Declaration
                    </span>
                    <span className="font-extrabold mt-4 text-center">
                        To Whomsoever It May Concern
                    </span>

                    <span className="text-center">
                        I/We hereby certify that my/our Registration Certificate
                        under the MP GST Act. is in force on the date on which
                        the sale of the goods specified in this bill/cash memo
                        is made by me/us and that the trasaction of sale covered
                        by this bill/cash memo has been effected by me/us in the
                        regular course of my/our business.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RetailInvoice
