import React from 'react'
import logoImage from '../../../../../assets/images/telemartLogo-print.png'

const DispatchedInvoice = () => {
    return (
        <div className="h-[100vh] bg-white px-10 py-2">
            <div className="border-[1px] border-black py-2">
                {/* Top Header With Logo */}
                <div className="grid grid-cols-12 border-b-[1px] border-black">
                    <div className="col-span-4 px-2 py-2">
                        <img
                            src={logoImage}
                            alt="telemart-logo"
                            className="h-[100px]"
                        />
                    </div>
                    <div className="col-span-7">
                        <h1 className="text-[15px]">
                            Subject to Indore Jurisdiction
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
                                    <span className="text-[13px]">8896</span>
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
                                <span className="text-[13px]">11.07.2023</span>
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

                        <h2 className="font-bold text-[13px]">
                            SHREE MAHAKAL ENTERPRISES,{' '}
                            <span className="ml-4">(UP/MRT/MJ)</span>
                        </h2>

                        <h2 className="text-[13px]">
                            OLD HNO-680 NEW 438 SHIV SHAKYI NAGAR DELHI ROAD
                            MEERUT -250002 MOB NO-7053315228,Meerut , <br />
                            Uttar Pradesh-250002{' '}
                        </h2>

                        <div>
                            <span className="font-bold text-[13px]">
                                Phone No.
                            </span>
                            <span className="px-2">:</span>
                            <span className="text-[13px]">7053315228</span>
                        </div>

                        <div>
                            <span className="font-bold text-[13px]">
                                GSTIN{' '}
                            </span>
                            <span className="px-2">:</span>
                            <span className="text-[13px]">7053315228</span>
                        </div>

                        <div>
                            <span className="font-bold text-[13px]">
                                STATE CODE
                            </span>
                            <span className="px-2">:</span>
                            <span className="text-[13px]">7053315228</span>
                        </div>

                        <div>
                            <span className="font-bold text-[13px]">PAN</span>
                            <span className="px-2">:</span>
                            <span className="text-[13px]">7053315228</span>
                        </div>

                        <div>
                            <span className="font-bold text-[13px]">
                                EMAIL:ABC@GAMIL.COM
                            </span>
                        </div>
                    </div>
                    <div className="col-span-6 px-2 py-2">
                        <h2 className="font-bold text-[12px] underline">
                            Delivery Address
                        </h2>

                        <h2 className="text-[13px]">
                            OLD HNO-680 NEW 438 SHIV SHAKYI NAGAR DELHI ROAD
                            MEERUT -250002 MOB NO-7053315228
                        </h2>

                        <div>
                            <span className="text-[13px]">Uttar Pradesh</span>
                            <span className="px-1">-</span>
                            <span className="text-[13px]">
                                250002 , Ph:- 7053315228
                            </span>
                        </div>
                        <div>
                            <span className="font-bold text-[13px]">EMAIL</span>
                            <span className="px-1">:</span>
                            <span className="text-[13px]">abc@gmail.com</span>
                        </div>
                    </div>
                </div>

                {/* TEX Table */}

                <div className="grid grid-cols-12 border-b-[1px] border-black">
                    <div className="col-span-12 ">
                        <table className="border-collapse border border-black w-[100%]">
                            <thead>
                                <tr>
                                    <th className="border text-[14px] border-black">
                                        SR. NO.
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        ITEM CODE NO.
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        SR. NO.
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        ITEM DESCRIPTION
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        HSN CODE
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        QTY
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        RATE PER UNITS(RS.)
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        TAXABLE VALUE
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        S-GST
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        C-GST
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        I-GST
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        CESS
                                    </th>
                                    <th className="border text-[14px] border-black">
                                        AMOUNT(RS.)
                                    </th>
                                </tr>
                            </thead>
                            {/* table body */}
                            <tbody>
                                <tr>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        1
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        12345
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        A001
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        Product A
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
                                </tr>
                                <tr>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        2
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        12345
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        A001
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        Product A
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
                                </tr>
                                <tr>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        3
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        12345
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        A001
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        Product A
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
                                </tr>
                                <tr>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        4
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        12345
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        A001
                                    </td>
                                    <td className="border-l border-r text-[14px] border-black text-center py-1">
                                        Product A
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
                                RUPEES ONE LAKHS TWENTY-FIVE THOUSAND FOUR
                                HUNDRED FORTY ONLY
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
                    <div className="col-span-6 pl-2 flex justify-between">
                        <div>
                            <span className="text-[13px]">
                                This is System Generated Invoice hence no
                                Signature or Stamp required.
                            </span>
                        </div>
                    </div>
                    <div className="col-span-6 flex justify-end">
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
        </div>
    )
}

export default DispatchedInvoice
