import React from 'react'

const VenderInvoice = () => {
  return (
    <>
      <div className=''>
        <div className='bg-white border-2 border-slate-950 m-10'>
          <div className='flex justify-around'>
            <p className='text-2xl font-bold'>Debit Note</p>
            <p className='font-bold'>e-Invoice</p>
          </div>

          <div className='  flex justify-around px-20'>
            <div>
              <div className='flex gap-16'>
                <p>IRN</p> <span className='font-bold'>:951acda43075f4565e642543414fe9b103688f0d7646-
                  1eb34cf75e30aa1f0aca
                </span>
              </div>
              <div className='flex gap-8'>
                <p>Ack No</p> <span className='font-bold'>:162315148710368
                </span>
              </div>
              <div className='flex gap-4'>
                <p>Ack Date</p> <span className='font-bold'>:7-oct-23
                </span>
              </div>

            </div>

            <div className='bg-black w-20 h-20 '>
            </div>
          </div>

          <div className=' border-slate-900  grid grid-cols-2'>

            <div className=' border-r-2 border-t-2 border-slate-900  '>
              <div className='' >
                <p className='font-bold text-xl'>Telemart</p>
                <p>
                  H.O. 701, Atulya IT Park, Khandwa Road, Indore
                  Godown: 188 Palda, Gayatri Nagar, Indore
                  GSTIN/UIN: 23AATFT1962F1ZZ
                  State Name : Madhya Pradesh, Code : 23
                  E-Mail : accounts@telemartone.com

                </p>
              </div>
              <div className='border-t-2 border-slate-900 '>
                <p>Consignee (Ship to)</p>
                <p className='font-bold text-xl'>A K Enterprises</p>
                <p>

                  FLAT NO F-1, A WING, MOUNI VIHAR APARTMENT
                  TAKALA CHOWK KOLHAPUR, RAJARAMPURI , KOLHAPUR
                </p>
              </div>

              <div className='border-t-2 border-slate-900 '>
                <p>Buyer (Bill to)</p>
                <p className='font-bold text-xl'>A K Enterprises</p>
                <p>FLAT NO F-1, A WING, MOUNI VIHAR APARTMENT
                  TAKALA CHOWK KOLHAPUR, RAJARAMPURI , KOLHAPUR
                  GSTIN/UIN : 27BGTPJ2882F1ZY
                  State Name : Maharashtra, Code : 27</p>
              </div>
            </div>

            <div  >
              <div className='grid grid-cols-2 border-t-2 border-slate-950'>
                <div className='border-b-2 border-r-2 border-slate-900  px-5  '>Debit Note No.<p className='font-bold '>DN/fy24/895</p></div>
                <div className='border-b-2 border-slate-900  px-5  '>Debit Note No.<p className='font-bold '>DN/fy24/895</p></div>
                <div className='border-b-2 border-r-2 border-slate-900  px-5  '>Debit Note No.<p className='font-bold '>DN/fy24/895</p></div>
                <div className='border-b-2 border-slate-900  px-5  '>Debit Note No.<p className='font-bold '>DN/fy24/895</p></div>
                <div className='border-b-2 border-r-2 border-slate-900  px-5  '>Debit Note No.<p className='font-bold '>DN/fy24/895</p></div>
                <div className='border-b-2  border-slate-900  px-5  '>Debit Note No.<p className='font-bold '>DN/fy24/895</p></div>
                <div className='border-b-2 border-r-2 border-slate-900  px-5  '>Debit Note No.<p className='font-bold '>DN/fy24/895</p></div>
                <div className='border-b-2 border-slate-900  px-5  '>Debit Note No.<p className='font-bold '>DN/fy24/895</p></div>
                <div className='px-5'>Debit Note No.<p className='font-bold '>DN/fy24/895</p></div>
              </div>

            </div>
          </div>

          <div className=' border-slate-900  table-right'>
            <div>
              <table width='100%' className='text-center'>
                <thead className='border-t-2 border-b-2 border-slate-900'>
                  <tr>
                    <th>S.No</th>
                    <th >Description of Goods</th>
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
                    <td className='font-bold'>Dhuan Dhaar -DEFAULT</td>
                    <td>30049011 </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='font-bold'>178.57</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td className='font-bold'>Tribal Slimming Oil - Default </td>
                    <td>30049011 </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='font-bold'>4,282.14</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='font-bold border-t-2 border-slate-750'>4,460.71</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td className='font-bold'>I-GST Payable 12.00% </td>
                    <td></td>
                    <td></td>
                    <td>12</td>
                    <td>%</td>
                    <td className='font-bold '>535.29</td>
                  </tr>

                  <tr className='border-t-2 border-b-2 border-slate-900'>
                    <td></td>
                    <td className='font-bold'>Total </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='font-bold '> 4,996.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex justify-between'>
              <p>
                Amount Chargeable (in words)
              </p>
              <p>
                E. & O.E
              </p>
            </div>

            <div className='grid grid-cols-2'>

              <div>
                <p className='font-bold'>
                  INR Four Thousand Nine Hundred Ninety Six
                  Only
                </p>
              </div>

              <div>
                <p>Company’s Bank Details</p>
                <div>
                  <div className='flex gap-20'>
                    <p>Bank Name</p> <span className='font-bold'>:Axis Bank Ltd
                    </span>
                  </div>
                  <div className='flex gap-28'>
                    <p>A/c No</p> <span className='font-bold'>:922020036365994
                    </span>
                  </div>
                  <div className='flex gap-6'>
                    <p>Branch & IFS Code</p> <span className='font-bold'>:Pipliyahana Branch, Indore & UTIB0001934
                    </span>
                  </div>

                </div>
                <div className='border-l-2 border-t-2  border-slate-950'>
                  <p className='font-bold text-end p-3'>for Telemart</p>
                  <p className='text-end p-3'>Authorised Signatory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default VenderInvoice