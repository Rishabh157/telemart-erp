import React from 'react'

const CommerceBilling = () => {
    const tableHead = 'border-r border-slate-900 py-1 '
    const tableCell = 'border-r border-slate-900 p-[5px] text-center'
    return (
        <>
            <div className="bg-slate-500   h-[100vh]">
                <div className="bg-white   h-[100vh] mx-auto my-auto  text-[14px]">
                    <div className=" border border-black ">
                        <div className="border-b border-black px-2">
                            <div className="flex justify-between">
                                <div className="text-[25px] font-extrabold w-[800px] mt-3">
                                    Commerce Billing
                                </div>
                                <div >
                                    <p className="  ">Order No: SLDC11102PD4</p>
                                    <p >
                                        Subject To Indore Jurisdiction Commerce
                                        Billing B-1,Block- C, 2nd Floor,
                                        Navlakha Square, B.C.M City, Navlakha
                                        Madhya Pradesh, 452001, India State Code
                                        GSTIN 4398573987, PAN 375347854593
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between my-2">
                                <p>Order No: SLDC11102PD4 </p>
                                <p>Date & Time: 02-11-2023 06:06:13</p>
                            </div>
                        </div>
                        <div className="grid grid-flow-col grid-cols-12 gap-10 px-2 border-b border-slate-900 ">
                            <p className="col-span-6  py-3 ">
                                <p className=" font-extrabold text-[16px]">
                                    Student Information -
                                </p>
                                <div className="flex gap-20 mt-2">
                                    <p className="font-bold">Name:</p>
                                    <p className=" "> Himanshu Jain</p>
                                </div>
                                <div className="flex gap-10 mt-2">
                                    <p className="font-bold">Mobile Number:</p>
                                    <p className=" ">
                                        {' '}
                                        8435406185 / 9575641550
                                    </p>
                                </div>
                                <div className="flex gap-10 mt-2">
                                    <p className="font-bold">Email:</p>
                                    <p className=" ">
                                        Himanshu.Jain@Codiotic.Com
                                    </p>
                                </div>
                            </p>
                            <div className=" col-span-5 pt-1 pb-5 border-l   pl-3 border-slate-900">
                                <p className="font-extrabold text-[16px]">
                                    Delivery Address
                                </p>
                                <p className="mt-2">
                                    B-1,Block-C, 2nd Floor, Navlakha Square,
                                    B.C.M City, Navlakha,
                                </p>
                            </div>
                        </div>

                        <table width="100%">
                            <tbody>
                                <tr className="border-b border-black">
                                    <td className="w-1/3 py-2 pl-2">
                                        Course - Level
                                    </td>
                                    <td className="border-l border-black pl-2">
                                        Level
                                    </td>
                                </tr>
                                <tr className="border-b border-black">
                                    <td className="w-1/3 py-2 pl-2">
                                        Course Type
                                    </td>
                                    <td className="border-l border-black pl-2">
                                        Type
                                    </td>
                                </tr>
                                <tr className="border-b border-black">
                                    <td className="w-1/3 py-2 pl-2">
                                        Mode Name
                                    </td>
                                    <td className="border-l border-black pl-2">
                                        Name
                                    </td>
                                </tr>
                                <tr className="border-b border-black">
                                    <td className="w-1/3 py-2 pl-2">
                                        Attempt Name
                                    </td>
                                    <td className="border-l border-black pl-2">
                                        Name
                                    </td>
                                </tr>
                                <tr className="border-b border-black">
                                    <td className="w-1/3 py-2 pl-2">
                                        Faculties
                                    </td>
                                    <td className="border-l border-black pl-2">
                                        Faculties
                                    </td>
                                </tr>
                                <tr className="border-b border-black">
                                    <td className="w-1/3 py-2 pl-2 ">
                                        Subjects
                                    </td>
                                    <td className="border-l border-black pl-2">
                                        Subjects
                                    </td>
                                </tr>
                                <tr className="border-b border-black">
                                    <td className="w-1/3 py-2 pl-2">Books</td>
                                    <td className="border-l border-black pl-2">
                                        Books
                                    </td>
                                </tr>
                                <tr className="border-b border-black">
                                    <td className="w-1/3 py-2 pl-2">
                                        Delivery Mode
                                    </td>
                                    <td className="border-l border-black pl-2">
                                        Delivery Mode
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table
                            width="100%"
                            className="mt-5 border-t border-black"
                        >
                            <thead>
                                <tr className=" border-black font-normal">
                                    <th className={tableHead}>Total Fees</th>
                                    <th className={tableHead}>Amount Paid </th>
                                    <th className={`${tableHead}`}>
                                        Fee Paid Till Now
                                    </th>
                                    <th className={tableHead}>Remaining</th>
                                    <th className={`${tableHead}`}>
                                        Adjust Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-y border-black font-normal">
                                    <td className={tableCell}>5000</td>
                                    <td className={tableCell}>300 </td>
                                    <td className={tableCell}>500</td>
                                    <td className={tableCell}>500</td>
                                    <td className={tableCell}>2700</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-between  mt-5 mb-20 pl-2">
                            <p className="font-semibold text-[12px] w-1/2">
                                This Is System Generated Receipt/Invoice Hence
                                No Signature Or Stamp Is Required
                            </p>
                            <p className="text-[12px] pr-10">
                                Autorized Signatory
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommerceBilling
