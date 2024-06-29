import React from 'react'
import { OrderListResponse } from 'src/models'

const RetailInvoice = ({ items }: { items: OrderListResponse }) => {
    const tableHead = 'border-r border-black p-2 text-start'
    const tableCell = 'border-r border-black p-2'

    return (
        <div className="bg-white h-screen w-full">
            <div className="py-2">
                <div className="flex justify-between py-6 items-center border-b border-black">
                    <div>
                        <img
                            src="/logo.jpg"
                            className="h-20 w-half"
                            alt="logo"
                        />
                    </div>
                    <div className="flex flex-col items-end">
                        <span> {items?.companyAddress}</span>
                        {/* <span> Indore, Madhya Pradesh, 452001</span>
                            <span>Pradesh-452001,India, </span>
                            <span>GSTIN : 23AATFT1962F1ZZ </span> */}
                    </div>
                </div>
                <div>
                    <p className="text-center font-extrabold text-[22px] border-b border-black">
                        INVOICE
                    </p>
                </div>
                <div className=" gap-4 grid grid-cols-12 border-b border-black">
                    <div className="col-span-4 flex flex-col border-r border-black">
                        <span className="underline">
                            NAME & ADDRESS OF CUSTOMER:
                        </span>
                        <span>To</span>
                        <span>{items?.customerName}</span>
                        <span>{items?.autoFillingShippingAddress}</span>
                        <span>MOBILE: {items?.mobileNo} </span>
                    </div>
                    <div className="col-span-8 flex flex-col">
                        <div className="flex justify-between">
                            <span>Order No.: {items?.orderNumber}</span>
                            {/* <span>Order No.: {items?.orderNumber}</span> */}
                        </div>
                        <div className="flex justify-between">
                            <span>Invoice No.:---------</span>
                            <span>Mode of Payment.: {items?.paymentMode}</span>
                        </div>
                        <div className="flex justify-center my-2">
                            <div >
                                <span>{items?.orderAssignedToCourier}</span>
                                <img
                                    className=" w-[300px] h-[60px]"
                                    src="https://static.vecteezy.com/system/resources/thumbnails/008/506/948/small/abstract-digital-code-scanner-barcode-template-for-social-media-payment-market-and-design-png.png"
                                    alt=""
                                />
                                <span>{items?.awbNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="font-extrabold text-[22px] border-b border-black py-1">
                        COD FOR Rs. :{items?.totalAmount}
                    </p>
                </div>

                <div className="border border-black">
                    <table width="100%" >
                        <thead className="border b">
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
                        <tbody className="border-l border-b border-l-black">
                            <tr>
                                <td className={tableCell}>1</td>
                                <td className={tableCell}>
                                    {items?.schemeName}
                                </td>
                                <td className={tableCell}>{items?.hsnCode}</td>
                                <td className={tableCell}>
                                    {' '}
                                    {items?.shcemeQuantity}
                                </td>
                                <td className={tableCell}> {items?.price}</td>
                                <td className={tableCell}>---</td>
                                <td className={tableCell}>---</td>
                                <td className={tableCell}>---</td>
                                <td className={tableCell}>---</td>
                                <td className={tableCell}>---</td>
                                <td className={tableCell}>267.86 %</td>
                                <td className={tableCell}>0.00 %</td>
                                <td className={tableCell}>
                                    {items?.totalAmount}{' '}
                                </td>
                            </tr>

                            <tr className="border-t py-1">
                                <td colSpan={2} className={tableCell}>
                                    TOTAL
                                </td>
                                {/* <td colSpan={2} className={tableCell}>
                                    </td> */}
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
                </div>

                <div className="border-b border-black">
                    <p className="font-extrabold text-[18px] border-t border-black py-1">
                        AMOUNT IN WORDS : RUPEES TWO THOUSAND FIVE HUNDRED ONLY.
                    </p>

                    <div className="mt-1 flex flex-col">
                        <span>Sold By:-</span>
                        <span>Telemart</span>
                        <span>If undelivered then return to :</span>
                        <span>Telemart</span>
                        <span>
                            Godown Address: 188 Gayatri Nagar, Palda, Near Goyal
                            Flour Mill,,Indore
                        </span>
                        <span>Madhya Pradesh,India-452020</span>
                        <span>GSTIN No:23AATFT1962F1ZZ</span>
                        <span>
                            For Complaint & Telephonic Demonstration +91
                            7770884999
                        </span>

                        <p className="text-center font-extrabold text-[18px] py-1">
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
