import React from 'react'

const Navbar = () => {
    return (
        <div className="bg-[#87527C] py-3 px-2">
            <div className="flex justify-between">
                <div className="flex justify-evenly gap-x-6">
                    <div>
                        <h3 className="text-white font-bold text-[14px]">
                            CAMPAIGN
                        </h3>
                        <div className=" bg-white text-center p-1 rounded bedge text-[#15616E] text-[14px] font-bold">
                            DHUANDHAAR
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-extrabold text-[14px]">
                            CALL TYPE
                        </h3>
                        <div className=" bg-white p-1 text-center rounded bedge text-[#15616E] text-[14px] font-bold">
                            INBOUND
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-extrabold text-[14px]">
                            INCOMING NO.
                        </h3>
                        <div className=" bg-white p-1 text-center rounded bedge text-[#15616E] text-[14px] font-bold">
                            9988776655
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-extrabold text-[14px]">
                            CUSTOMER
                        </h3>
                        <div className=" bg-green-500 p-1 text-center rounded bedge text-white text-[14px] font-bold">
                            AJAY CHORE
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-extrabold text-[14px]">
                            DID NO
                        </h3>
                        <div className=" bg-white p-1 text-center rounded bedge text-[#15616E] text-[14px] font-bold">
                            DID NO.
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-extrabold text-[14px]">
                        TRUECALLER
                    </h3>
                    <div className=" bg-white text-center p-1 rounded bedge text-[#15616E] text-[14px] font-bold">
                        STATUS
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
