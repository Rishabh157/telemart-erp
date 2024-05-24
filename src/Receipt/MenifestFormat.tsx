import React from 'react'

const MenifestFormat = () => {
    const tableHead = 'border-r border-slate-900 py-1 '
    const tableCell = 'border-r border-slate-900 p-[5px] text-center'
    return (
        <div className="bg-white h-[100vh] mx-auto my-auto text-[14px] p-4">
            <div className="border border-black">
                <div className="flex justify-between p-4">
                    <div>
                        <div>
                            <span className="font-semibold px-4">
                                Company name
                            </span>
                            : Saptel
                        </div>
                        <div>
                            <span className="font-semibold px-4">
                                Total quantity
                            </span>
                            : 25
                        </div>
                        <div>
                            <span className="font-semibold px-4">
                                Service Provider Name
                            </span>
                            : (order alloted parter name)
                        </div>
                    </div>
                    <div>
                        <span className="font-semibold">Date</span>: 30-07-2024
                    </div>
                </div>

                <table width="100%" className="mt-5 border-t border-black">
                    <thead>
                        <tr className=" border-black font-normal">
                            <th className={tableHead}>Product Name</th>
                            <th className={tableHead}>AWB Number</th>
                            <th className={`${tableHead}`}>Order Number</th>
                            <th className={tableHead}>Product Quantity</th>
                            <th className={`${tableHead}`}>
                                Primary/Secondary Courier Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-y border-black font-normal">
                            <td className={tableCell}>Scheme Name</td>
                            <td className={tableCell}>3498723578213</td>
                            <td className={tableCell}>2</td>
                            <td className={tableCell}>10</td>
                            <td className={tableCell}>MERCKS</td>
                        </tr>
                        <tr className="border-y border-black font-normal">
                            <td className={tableCell}>Scheme Name</td>
                            <td className={tableCell}>3498723578213</td>
                            <td className={tableCell}>2</td>
                            <td className={tableCell}>10</td>
                            <td className={tableCell}>MERCKS</td>
                        </tr>
                        <tr className="border-y border-black font-normal">
                            <td className={tableCell}>Scheme Name</td>
                            <td className={tableCell}>3498723578213</td>
                            <td className={tableCell}>2</td>
                            <td className={tableCell}>10</td>
                            <td className={tableCell}>MERCKS</td>
                        </tr>
                        <tr className="border-y border-black font-normal">
                            <td className={tableCell}>Scheme Name</td>
                            <td className={tableCell}>3498723578213</td>
                            <td className={tableCell}>2</td>
                            <td className={tableCell}>10</td>
                            <td className={tableCell}>MERCKS</td>
                        </tr>
                        <tr className="border-y border-black font-normal">
                            <td className={tableCell}>Scheme Name</td>
                            <td className={tableCell}>3498723578213</td>
                            <td className={tableCell}>2</td>
                            <td className={tableCell}>10</td>
                            <td className={tableCell}>MERCKS</td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-between  mt-5 mb-20 pl-2">
                    <p className="font-semibold text-[12px] w-1/2">
                        This Is System Generated Receipt/Invoice Hence No
                        Signature Or Stamp Is Required
                    </p>
                    <p className="text-[12px] pr-10">Autorized Signatory</p>
                </div>
            </div>
        </div>
    )
}

export default MenifestFormat
