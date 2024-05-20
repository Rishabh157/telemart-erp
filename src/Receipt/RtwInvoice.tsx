import React from 'react'

const RtwInvoice = () => {
    const tableHead = 'border-r border-slate-900 py-1 '
    const tableCell = 'border-r border-slate-900 p-[5px] text-center'
    return (
        <>
            <div className="bg-slate-500  h-[100vh]">
                <div className="bg-white  p-6 h-[100vh] mx-auto my-auto  text-[12px] font-bold">
                    <div className=" border border-black py-2">
                        <div className="border-b border-black">
                            <p className="text-center font-extrabold text-[14px] ">
                                GURU KRIPA TRADING COMPANY
                            </p>
                            <p className="text-center mt-1 px-20 ">
                                GYASUDDIN PUR HOUSE 233A/2A, MAHENDRA NAGAR
                                ALLAHBAD, GATI CHAURAH NR SALVI JANEAL STORE,
                                PRAYAGRAJ,Allahabad,Uttar Pradesh(9)-211011
                            </p>
                            <p className=" text-center">
                                GSTIN No.:09APMPJ6149L1Z8,
                            </p>
                            <p className=" text-center">PAN No.:APMPJ6149L</p>
                        </div>
                        <div className="grid grid-flow-col grid-cols-12 gap-10 px-2 border-b border-slate-900 ">
                            <div className=" col-span-5 pt-1 pb-5">
                                <p className="mb-2">To,</p>
                                <p className="">Telemart,</p>
                                <p className="">
                                    Godown Address: 188 Gayatri Nagar, Palda,
                                    Near Goyal Flour Mill,Indore,Madhya
                                    Pradesh(23)-452020
                                </p>
                                <p className="">Ph No.: 7770884999</p>
                                <p className="">GSTIN No. :23AATFT1962F1ZZ</p>
                            </div>
                            <p className="col-span-6 border-l border-slate-900 pl-3  mt-1 ">
                                <p className="text-center font-extrabold">
                                    Sales Return Invoice
                                </p>
                                <div className="flex gap-20 mt-2">
                                    <p className="">SRN NO</p>
                                    <p className=" font-normal">: CN10-25599</p>
                                </div>
                                <div className="flex gap-10 mt-2">
                                    <p className="">CREATED DATE</p>
                                    <p className=" font-normal">
                                        {' '}
                                        : 11-12-2023
                                    </p>
                                </div>
                                <div className="flex gap-10 mt-2">
                                    <p className="">RECEIVED DATE</p>
                                    <p className=" font-normal">:</p>
                                </div>
                                <div className="flex gap-16 mt-2">
                                    <p className="">Invoice No: </p>
                                    <p className=" font-normal">:</p>
                                </div>
                            </p>
                        </div>

                        <table width="100%">
                            <thead>
                                <tr className=" border-black">
                                    <th className={tableHead}>S.No</th>
                                    <th className={tableHead}>Product Code</th>
                                    <th className={`${tableHead} w-[250px]`}>
                                        Product Name
                                    </th>
                                    <th className={tableHead}>HSN Code</th>
                                    <th className={`${tableHead} w-[60px]`}>
                                        Qty
                                    </th>
                                    <th className={tableHead}>
                                        Rate/ <br /> TotalUnit
                                    </th>
                                    <th className={tableHead}>TAXABLE VALUE</th>
                                    <th className={tableHead}>C-GST</th>
                                    <th className={tableHead}>S-GST</th>
                                    <th className={tableHead}>I-GST</th>
                                    <th className={tableHead}>CESS</th>
                                    <th className="text-center w-[100px]">
                                        AMOUNT(RS.)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-y border-black font-normal">
                                    <td className={tableCell}>1</td>
                                    <td className={tableCell}>TBC-00 </td>
                                    <td className={tableCell}>
                                        Tribal Bamboo Capsule -DEFAULT
                                    </td>
                                    <td className={tableCell}>30049011</td>
                                    <td className={tableCell}>2</td>
                                    <td className={tableCell}>95.54</td>
                                    <td className={tableCell}> 46000.00</td>
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

                        <div className="px-2  border-b border-black">
                            <div className="flex justify-between mt-1">
                                <p className="">TOTAL RUPEES (IN FIGURES) :</p>
                                <p className=""> 6440.00</p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <p className="">ROUND OFF AMOUNT :</p>
                                <p className="">0</p>
                            </div>
                        </div>
                        <div className="pl-2  border-b border-black">
                            <div className="flex gap-20 py-2">
                                <p className="">TOTAL RUPEES (IN WORDS) :</p>
                                <p className="font-normal">
                                    {' '}
                                    RUPEES SIX THOUSAND FOUR HUNDRED FORTY ONLY
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between  py-2 mb-20 pl-2">
                            <p className="font-semibold">
                                This is System Generated Invoice hence no
                                Signature or Stamp required.
                            </p>
                            <p className="text-[14px] pr-10">
                                GURU KRIPA TRADING COMPANY
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RtwInvoice
