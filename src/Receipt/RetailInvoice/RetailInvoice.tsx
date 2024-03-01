import React from 'react'

const RetailInvoice = () => {
    return (
        <div className="bg-white p-4">
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
                        <span>
                            {' '}
                            Regd. Office:701 Atulya IT Park, Khandwa Road, Near
                            Crystal IT Park
                        </span>
                        <span> </span>
                        <span> Indore, Madhya Pradesh, 452001</span>
                        <span>Pradesh-452001,India, </span>
                        <span>GSTIN : 23AATFT1962F1ZZ </span>
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col">
                        <span>To</span>
                        <span>PANKAJ JI</span>
                        <span>
                            ADDPOST + VILL VIRNORA NEAR BY BUS STAND PERNEM,,
                            PINCOD 403512MOB NO ,9209162825, NEAR BY COLLEGE,,,
                            CITY : NORTH GOA STATE : GOA PIN : 403512{' '}
                        </span>
                        <span>MOBILE 9209162825 </span>
                    </div>
                    <div className="flex justify-center">
                        <span className="font-bold">
                            CASH ON DELIVERY AMOUNT TO COLLECT Rs 2500.00
                        </span>
                    </div>
                </div>

                <p className="text-center font-extrabold text-[22px]">
                    Telemart
                </p>
                <p className="text-center mt-1 font-semibold text-[12px]">
                    701 Atulya IT Park, Khandwa Road, Near Crystal IT
                    Park,Indore - 452001,India
                </p>
                <p className="text-center mt-4">Tax Invoice</p>
                <div className=" flex justify-between">
                    <div className="">
                        <div className="flex gap-8">
                            <p className="font-bold">Invoice no</p>
                            <p className="font-bold">: BRA-Y23-0000024</p>
                        </div>
                        <div className="flex gap-8">
                            <p className="">DC CODE .</p>
                            <p className="font-semibold">: TTEL-1-4627</p>
                        </div>
                        <div className="flex gap-14">
                            <p className="text-[14px]">DC Date</p>
                            <p className="text-[14px]">: 09-February-2023</p>
                        </div>
                    </div>
                    <div className="mr-[70px]">
                        <img
                            className=" w-[300px] h-[60px]"
                            src="https://static.vecteezy.com/system/resources/thumbnails/008/506/948/small/abstract-digital-code-scanner-barcode-template-for-social-media-payment-market-and-design-png.png"
                            alt=""
                        />
                        <p className="font-bold text-center">TTEL-1-4627</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RetailInvoice
