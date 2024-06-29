import React from 'react'

const WHInvoice = () => {
    const tableHead = 'border-r border-slate-900 py-1'
    const tableCell = 'border-r border-slate-900 p-[5px] text-center'
    return (
        <>
            <div className="bg-slate-500 py-10">
                <div className="bg-white  p-6 w-[940px] mx-auto my-auto text-[12px]">
                    <div className=" border border-black py-2">
                        <p className="text-center font-extrabold text-[16px] ">
                            Telemart
                        </p>
                        <p className="text-center mt-1 font-semibold ">
                            701 Atulya IT Park, Khandwa Road, Near Crystal IT
                            Park,Indore - 452001,India
                        </p>
                        <p className="text-center mt-4">Tax Invoice</p>
                        <div className=" flex justify-between">
                            <div className=" ml-5">
                                <div className="flex gap-10">
                                    <p className="font-bold">Invoice no</p>
                                    <p className="font-bold">
                                        : BRA-Y23-0000024
                                    </p>
                                </div>
                                <div className="flex gap-11">
                                    <p >DC CODE .</p>
                                    <p className="font-semibold">
                                        : TTEL-1-4627
                                    </p>
                                </div>
                                <div className="flex gap-14">
                                    <p >DC Date</p>
                                    <p >: 09-February-2023</p>
                                </div>
                            </div>
                            <div className="mr-[70px] mt-4">
                                <img
                                    className=" w-[300px] h-[60px]"
                                    src="https://static.vecteezy.com/system/resources/thumbnails/008/506/948/small/abstract-digital-code-scanner-barcode-template-for-social-media-payment-market-and-design-png.png"
                                    alt=""
                                />
                                <p className="font-bold text-center mt-1">
                                    TTEL-1-4627
                                </p>
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
                                <p className="font-extrabold mt-1">Telemart</p>
                                <p >
                                    Godown Address: 188 Gayatri Nagar, Palda,
                                    Near Goyal Flour Mill, Indore -452020,Madhya
                                    Pradesh
                                </p>
                                <p >STATE CODE :23</p>
                                <p >GST NO. : 23AATFT1962F1ZZ</p>
                            </div>
                            <div >
                                <p className="font-semibold text-[11px]">
                                    Ship To Good Warehouse
                                </p>
                                <p className="font-bold underline mt-2">
                                    Ship To :{' '}
                                </p>
                                <p className="font-extrabold mt-1">Telemart</p>
                                <p >
                                    MUNICIPAL NO. 1-11-251/4/B, 5TH FLOOR,
                                    TIRUMALA HEIGHTS, Hyderabad, TS, 500016
                                    Hyderabad -500016,Telangana
                                </p>
                                <p >STATE CODE :36</p>
                                <p >GST NO. : 36AATFT1962F1ZS</p>
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
                                    <th className={tableHead}>C-GST</th>
                                    <th className={tableHead}>S-GST</th>
                                    <th className={tableHead}>I-GST</th>
                                    <th className={tableHead}>CESS</th>
                                    <th className="text-center w-[100px]">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCell}>1</td>
                                    <td className={tableCell}>TBC-00 </td>
                                    <td className={tableCell}>
                                        Tribal Bamboo Capsule -DEFAULT
                                    </td>
                                    <td className={tableCell}>30049011</td>
                                    <td className={tableCell}>2</td>
                                    <td className={tableCell}>95.54</td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className="text-center">214.00</td>
                                </tr>
                                <tr>
                                    <td className={tableCell}>2</td>
                                    <td className={tableCell}>TBC-00 </td>
                                    <td className={tableCell}>
                                        Tribal Bamboo Capsule -DEFAULT
                                    </td>
                                    <td className={tableCell}>30049011</td>
                                    <td className={tableCell}>2</td>
                                    <td className={tableCell}>95.54</td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className="text-center">214.00</td>
                                </tr>
                                <tr>
                                    <td className={tableCell}>3</td>
                                    <td className={tableCell}>TBC-00 </td>
                                    <td className={tableCell}>
                                        Tribal Bamboo Capsule -DEFAULT
                                    </td>
                                    <td className={tableCell}>30049011</td>
                                    <td className={tableCell}>2</td>
                                    <td className={tableCell}>95.54</td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className="text-center">214.00</td>
                                </tr>
                                <tr>
                                    <td className={tableCell}>4</td>
                                    <td className={tableCell}>TBC-00 </td>
                                    <td className={tableCell}>
                                        Tribal Bamboo Capsule -DEFAULT
                                    </td>
                                    <td className={tableCell}>30049011</td>
                                    <td className={tableCell}>2</td>
                                    <td className={tableCell}>95.54</td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className="text-center ">214.00</td>
                                </tr>
                                <tr>
                                    <td className={tableCell}>5</td>
                                    <td className={tableCell}>TBC-00 </td>
                                    <td className={tableCell}>
                                        Tribal Bamboo Capsule -DEFAULT
                                    </td>
                                    <td className={tableCell}>30049011</td>
                                    <td className={tableCell}>2</td>
                                    <td className={tableCell}>95.54</td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className={tableCell}>
                                        0.00 <br />
                                        @0.00
                                    </td>
                                    <td className="text-center">214.00</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex py-1 justify-between px-8 border-y border-slate-900 ">
                            <p className="font-bold">Total</p>
                            <p className="font-bold">2555.66</p>
                        </div>
                        <div className="flex gap-20 py-1 px-4 border-b border-slate-900 ">
                            <p className="font-bold ">
                                TOTAL RUPEES (IN WORDS) :
                            </p>
                            <p className="font-bold">
                                RUPEES TWO THOUSAND FIVE HUNDRED FIFTY-FIVE AND
                                SIX SIX ONLY .
                            </p>
                        </div>
                        <p className="font-semibold  ml-4 mt-2 ">
                            *(Inclusive of all taxes.)
                        </p>
                        <p className=" font-bold underline ml-4 mt-3 ">
                            Terms & Conditions :
                        </p>
                        <p className="ml-4 ">Remarks :</p>

                        <div className=" border border-slate-900 bg-zinc-500 mx-4 mt-10 py-1">
                            <p className="font-bold ml-[220px]">Prepared By</p>
                        </div>
                        <p className="ml-[240px] mt-2 ">TELEMART</p>
                        <div className="flex justify-evenly mt-10  ">
                            <p >09-02-2023 11:34:06</p>
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

export default WHInvoice
