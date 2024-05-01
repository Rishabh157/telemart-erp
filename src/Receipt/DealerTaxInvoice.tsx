import React from 'react'

export const DealerTaxInvoice = () => {
  const tableHead = 'border-r border-slate-900 py-1 '
  const tableCell = 'border-r border-slate-900 p-[5px] text-center'
  return (
    <>
      <div className='bg-slate-500 py-10'>
        <div className="bg-white  p-6 w-[940px] mx-auto my-auto text-[12px] font-medium">
          <div className="border border-black py-2">
            <div className="flex ">
              <div className="ml-2">
                <img className='h-[80px]' src="https://media.licdn.com/dms/image/D4D16AQFi9oUf78FdGQ/profile-displaybackgroundimage-shrink_200_800/0/1682586006421?e=2147483647&v=beta&t=ZZDx5BSzWuGLKUl1FtvC50T1QJ-rpqEGSRaNjGkDoG0" alt="" />
              </div>
              <div className="">
                <p className="">Subject to Indore Jurisdiction</p>
                <p className="font-bold text-[16px]">Telemart</p>
                <p className="">
                  H.O.:701 Atulya IT Park, Khandwa Road, Near Crystal IT Park,Indore,Madhya
                  Pradesh,Pin Code:452001,India
                </p>
                <p className="text-[10px]">STATE CODE :36</p>
                <p className="text-[10px]">GSTIN 23AATFT1962F1ZZ: PAN :AATFT1962F</p>
               
              </div>
            </div>
            <div className=" border-y border-black mt-1 pt-1">
              <p className="text-center font-extrabold">TAX INVOICE</p>
              <div className=" flex justify-between mr-4 mt-1">
                <div className="flex gap-5">
                  <div className="flex gap-5">
                    <p className="font-bold">Invoice no</p>
                    <p className="">:  HYD-Y24-0001601</p>
                  </div>
                  <div className="flex gap-5">
                    <p className="font-bold">CUSTOMER PO NO </p>
                    <p className="">: 14129</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <p className="font-bold">Date</p>
                  <p className="">: 05.02.2024</p>
                </div>
              </div>
            </div>
            <div className="border-b  border-black  py-1 font-extrabold pl-3 ">Buyer information</div>
            <div className="flex gap-16 pl-2 ">
              <div className="pb-6">
                <p className="font-extrabold underline">Billing Address:</p>
                <p className="font-extrabold">Bhavishya agencies, (TS/WAR/SR)</p>
                <p className="">3-7-155 Gudibandal kumarpalli,Warangal,Telangana-506001</p>
                <div className="flex gap-1">
                  <p className="font-bold">Phone No.</p>
                  <p className="">: 7093142867</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-bold">GSTIN </p>
                  <p className="">: URP</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-bold">STATE CODE.</p>
                  <p className="">: 36</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-bold">PAN</p>
                  <p className="">: EDLPK2681D</p>
                </div>
                <a href="mailto:sravanthi101293@gmail.com" className='font-bold'>EMAIL:sravanthi101293@gmail.com</a>
              </div>
              <div className="border-l border-black pl-2">
                <p className="font-extrabold underline">Delivery Address::</p>
                <p className="">3-7-155 Gudibandal kumarpalli ,</p>
                <p className="">Warangal ,</p>
                <p className="">Telangana - 506001 , Ph:- 7093142867</p>
                <a href="mailto:sravanthi101293@gmail.com" className='font-bold'>EMAIL:sravanthi101293@gmail.com</a>
              </div>
            </div>

            <table width='100%'>
              <thead className='border-y border-slate-900'>
                <tr>
                  <th className={tableHead}>S.No</th>
                  <th className={tableHead}>Product Code</th>
                  <th className={`${tableHead} w-[250px]`}>Product Name</th>
                  <th className={tableHead}>HSN Code</th>
                  <th className={`${tableHead} w-[60px]`}>Qty</th>
                  <th className={tableHead}>Rate/ <br /> TotalUnit</th>
                  <th className={tableHead}>TAXABLE VALUE</th>
                  <th className={tableHead}>C-GST</th>
                  <th className={tableHead}>S-GST</th>
                  <th className={tableHead}>I-GST</th>
                  <th className={tableHead}>CESS</th>
                  <th className='text-center w-[100px]'>AMOUNT(RS.)</th>


                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tableCell}>1</td>
                  <td className={tableCell}>TBC-00 </td>
                  <td className={tableCell}>Tribal Bamboo Capsule -DEFAULT</td>
                  <td className={tableCell}>30049011</td>
                  <td className={tableCell}>2</td>
                  <td className={tableCell}>95.54</td>
                  <td className={tableCell}> 46000.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className='text-center'>214.00</td>
                </tr>
                <tr>
                  <td className={tableCell}>2</td>
                  <td className={tableCell}>TBC-00 </td>
                  <td className={tableCell}>Tribal Bamboo Capsule -DEFAULT</td>
                  <td className={tableCell}>30049011</td>
                  <td className={tableCell}>2</td>
                  <td className={tableCell}>95.54</td>
                  <td className={tableCell}> 46000.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className='text-center'>214.00</td>
                </tr>
                <tr>
                  <td className={tableCell}>3</td>
                  <td className={tableCell}>TBC-00 </td>
                  <td className={tableCell}>Tribal Bamboo Capsule -DEFAULT</td>
                  <td className={tableCell}>30049011</td>
                  <td className={tableCell}>2</td>
                  <td className={tableCell}>95.54</td>
                  <td className={tableCell}> 46000.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className='text-center'>214.00</td>
                </tr>
                <tr>
                  <td className={tableCell}>4</td>
                  <td className={tableCell}>TBC-00 </td>
                  <td className={tableCell}>Tribal Bamboo Capsule -DEFAULT</td>
                  <td className={tableCell}>30049011</td>
                  <td className={tableCell}>2</td>
                  <td className={tableCell}>95.54</td>
                  <td className={tableCell}> 46000.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className='text-center '>214.00</td>
                </tr>
                <tr>
                  <td className={tableCell}>5</td>
                  <td className={tableCell}>TBC-00 </td>
                  <td className={tableCell}>Tribal Bamboo Capsule -DEFAULT</td>
                  <td className={tableCell}>30049011</td>
                  <td className={tableCell}>2</td>
                  <td className={tableCell}>95.54</td>
                  <td className={tableCell}> 46000.00</td>
                  <td className={tableCell}>2760.00 <br />@0.00</td>
                  <td className={tableCell}>2760.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className={tableCell}>0.00 <br />@0.00</td>
                  <td className='text-center'>214.00</td>
                </tr>
              </tbody>
            </table>
            <div className="grid py-1 grid-cols-12 px-2 border-y border-slate-900 ">
              <p className="font-bold col-span-5">TOTAL RUPEES (IN FIGURES) :</p>
              <div className="col.span-7 flex gap-4">
                <p className="ml-10"> 44</p>
                <p className="ml-16"> 90437.50</p>
                <p className=""> 5426.25</p>
                <p className=""> 5426.25</p>
                <p className=""> 0.00</p>
                <p className=""> 0.00</p>
                <p className="font-bold ml-3">2555.66</p>
              </div>
            </div>
            <div className="flex gap-20 py-1 px-2 border-b border-slate-900 ">
              <p className="font-bold ">TOTAL RUPEES (IN WORDS) :</p>
              <p className="font-bold">RUPEES TWO THOUSAND FIVE HUNDRED FIFTY-FIVE AND SIX SIX ONLY .</p>
            </div>

            <div className="grid grid-flow-col grid-cols-12 gap-10 px-2 border-b border-slate-900">
              <div className=" col-span-5 mt-1 pb-5">
                <p className="font-bold mb-2">GODOWN: HYDERABAD tmhyd</p>
                <p className="">MUNICIPAL NO. 1-11-251/4/B, 5TH FLOOR, TIRUMALA
                  HEIGHTS, Hyderabad, TS,
                  500016,Hyderabad,Telangana(36)-500016</p>
                <p className="">Contact No:7770884999,Gst No:36AATFT1962F1ZS</p>
              </div>
              <p className="col-span-6 border-l border-slate-900 pl-3  mt-1 ">
                I/We hereby declare that my/our Registration Certificate under the GST act
                is in force on the date on which the sale of the goods specified in this
                bill/cash memo is made by me/us and that the transaction of sale covered
                by this bill/cash memo has been affected by me/us in the regular course of
                my/our business.
              </p>
            </div>

            <div className="flex justify-between px-2 mt-1">
              <p className="font-bold">This is System Generated Invoice hence no Signature or Stamp required.</p>
              <p className="font-bold">For Telemart</p>
            </div>

            <p className="font-bold text-[14] text-right mt-20">Authorized Signatory</p>


          </div>

        </div>
      </div>
    </>
  )
}
