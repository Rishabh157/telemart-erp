import React from 'react'

const VenderInvoice = () => {
    return (
        <>
            <div className="bg-slate-500 py-10">
                <div className="bg-white  p-6   w-[940px] mx-auto my-auto">
                    <div className="flex justify-end items-center gap-60 pt-2 pr-20">
                        <p className="text-xl font-extrabold text-slate-700">
                            Debit Note
                        </p>
                        <p className="font-bold">e-Invoice</p>
                    </div>

                    <div className="  flex justify-between px-2 mb-2  items-end">
                        <div>
                            <div className="flex gap-16">
                                <p>IRN</p>{' '}
                                <span className="font-bold">
                                    :
                                    951acda43075f4565e642543414fe9b103688f0d7646-
                                    1eb34cf75e30aa1f0aca
                                </span>
                            </div>
                            <div className="flex gap-10">
                                <p>Ack No</p>{' '}
                                <span className="font-bold">
                                    : 162315148710368
                                </span>
                            </div>
                            <div className="flex gap-7">
                                <p>Ack Date</p>{' '}
                                <span className="font-bold">: 7-oct-23</span>
                            </div>
                        </div>
                        <div className="">
                            <img
                                className="w-44 h-40"
                                src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png"
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="border-2 border-t-0 border-slate-900">
                        <div className=" grid grid-cols-2">
                            <div className=" border-r-2 border-t-2 border-slate-900  ">
                                <div className="p-1">
                                    <p className="font-bold text-lg">
                                        Telemart
                                    </p>
                                    <p>
                                        H.O. 701, Atulya IT Park, Khandwa Road,
                                        Indore Godown: 188 Palda, Gayatri Nagar,
                                        Indore GSTIN/UIN: 23AATFT1962F1ZZ State
                                        Name : Madhya Pradesh, Code : 23 E-Mail
                                        : accounts@telemartone.com
                                    </p>
                                </div>
                                <div className="border-t-2 border-slate-900 p-1 ">
                                    <p>Consignee (Ship to)</p>
                                    <p className="font-bold text-lg">
                                        A K Enterprises
                                    </p>
                                    <p>
                                        FLAT NO F-1, A WING, MOUNI VIHAR
                                        APARTMENT TAKALA CHOWK KOLHAPUR,
                                        RAJARAMPURI , KOLHAPUR
                                    </p>
                                </div>

                                <div className="border-t-2 border-slate-900 p-1 ">
                                    <p>Buyer (Bill to)</p>
                                    <p className="font-bold text-lg">
                                        A K Enterprises
                                    </p>
                                    <p>
                                        FLAT NO F-1, A WING, MOUNI VIHAR
                                        APARTMENT TAKALA CHOWK KOLHAPUR,
                                        RAJARAMPURI , KOLHAPUR GSTIN/UIN :
                                        27BGTPJ2882F1ZY State Name :
                                        Maharashtra, Code : 27
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="grid grid-cols-2 border-t-2 border-slate-950">
                                    <div className="border-b-2 border-r-2 border-slate-900  px-2  ">
                                        Debit Note No.
                                        <p className="font-bold ">
                                            DN/fy24/895
                                        </p>
                                    </div>
                                    <div className="border-b-2 border-slate-900  px-2  ">
                                        Dated
                                        <p className="font-bold ">30-Sep-23</p>
                                    </div>
                                    <div className="border-b-2 border-r-2 border-slate-900  px-2 h-9 ">
                                        <p className="font-bold "></p>
                                    </div>
                                    <div className="border-b-2 border-slate-900  px-2  ">
                                        Mode/Terms of Payment
                                        <p className="font-bold "></p>
                                    </div>
                                    <div className="border-b-2 border-r-2 border-slate-900  px-2  ">
                                        Original Invoice No. & Date
                                        <p className="font-bold ">
                                            DN/FY24/895 dt. 30-Sep-23
                                        </p>
                                    </div>
                                    <div className="border-b-2 border-slate-900  px-2  ">
                                        Other References
                                    </div>
                                    <div className="border-b-2 border-r-2 border-slate-900  px-2  ">
                                        Buyer’s Order No.
                                    </div>
                                    <div className="border-b-2  border-slate-900  px-2 h-9 ">
                                        Dated
                                    </div>
                                    <div className="border-b-2 border-r-2 border-slate-900  px-2  ">
                                        Dispatch Doc No..
                                        <p className="font-bold ">
                                            DN/fy24/895
                                        </p>
                                    </div>
                                    <div className="border-b-2  border-slate-900  px-2 h-9 "></div>
                                    <div className="border-b-2 border-r-2 border-slate-900  px-2 h-9 ">
                                        Dispatched through
                                    </div>
                                    <div className="border-b-2  border-slate-900  px-2  ">
                                        Destination
                                    </div>
                                    <div className=" border-slate-900  px-2  ">
                                        Terms of Delivery
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" border-slate-900  table-right">
                            <div>
                                <table width="100%" className="text-center">
                                    <thead className="border-t-2 border-b-2 border-slate-900">
                                        <tr>
                                            <th>S.No</th>
                                            <th>Description of Goods</th>
                                            <th>HSN/SAC </th>
                                            <th>Quantity</th>
                                            <th>Rate</th>
                                            <th>per</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td className="font-bold">
                                                Dhuan Dhaar -DEFAULT
                                            </td>
                                            <td>30049011 </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="font-bold">
                                                178.57
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>2</td>
                                            <td className="font-bold">
                                                Tribal Slimming Oil - Default{' '}
                                            </td>
                                            <td>30049011 </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="font-bold">
                                                4,282.14
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="font-bold border-t-2 border-slate-850">
                                                4,460.71
                                            </td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td className="font-bold">
                                                I-GST Payable 12.00%{' '}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td>12</td>
                                            <td>%</td>
                                            <td className="font-bold ">
                                                535.29
                                            </td>
                                        </tr>

                                        <tr className="border-t-2 border-b-2 border-slate-900 ">
                                            <td></td>
                                            <td className="font-bold text-end pr-1">
                                                Total{' '}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="font-bold  ">
                                                {' '}
                                                4,996.00
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between px-3">
                                <p>Amount Chargeable (in words)</p>
                                <p>E. & O.E</p>
                            </div>

                            <div className="grid grid-cols-2">
                                <div>
                                    <p className=" font-bold text-[15px] px-3">
                                        INR Four Thousand Nine Hundred Ninety
                                        Six Only
                                    </p>
                                </div>

                                <div>
                                    <p>Company’s Bank Details</p>
                                    <div className="pr-1">
                                        <div className="flex gap-14">
                                            <p>Bank Name</p>{' '}
                                            <span className="font-bold">
                                                : Axis Bank Ltd
                                            </span>
                                        </div>
                                        <div className="flex gap-20">
                                            <p>A/c No</p>{' '}
                                            <span className="font-bold">
                                                : 922020036365994
                                            </span>
                                        </div>
                                        <div className="flex gap-3">
                                            <p>Branch & IFS Code</p>{' '}
                                            <span className="font-bold">
                                                : Pipliyahana Branch, Indore &
                                                UTIB0001934
                                            </span>
                                        </div>
                                    </div>
                                    <div className="border-l-2 border-t-2  border-slate-950">
                                        <p className="font-bold text-end p-3">
                                            for Telemart
                                        </p>
                                        <p className="text-end p-3">
                                            Authorised Signatory
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center py-2">
                        <p>This is a Computer Generated Document</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VenderInvoice
