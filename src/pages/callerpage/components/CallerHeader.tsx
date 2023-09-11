import React from 'react'

interface CallerHeaderPropsTypes {
    CampaignName: string
    CallType: string
    IncomingNo: string
    CustomerName: string
    DidNumber: string
    Status?: String
}

const CallerHeader = ({
    CampaignName,
    CallType,
    IncomingNo,
    CustomerName,
    DidNumber,
    // Status,
}: CallerHeaderPropsTypes) => {
    return (
        <div className="bg-[#87527C] py-3 px-2">
            <div className="flex justify-between">
                <div className="flex justify-evenly gap-x-6">
                    <div>
                        <h3 className="text-white font-bold text-[14px]">
                            CAMPAIGN
                        </h3>
                        <div className=" bg-white text-center p-1 rounded bedge text-[#15616E] text-[14px] font-bold">
                            {CampaignName}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-extrabold text-[14px]">
                            CALL TYPE
                        </h3>
                        <div className=" bg-white p-1 text-center rounded bedge text-[#15616E] text-[14px] font-bold">
                            {CallType}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-extrabold text-[14px]">
                            INCOMING NO.
                        </h3>
                        <div className=" bg-white p-1 text-center rounded bedge text-[#15616E] text-[14px] font-bold">
                            {IncomingNo}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-extrabold text-[14px]">
                            CUSTOMER
                        </h3>
                        <div className=" bg-green-500 p-1 text-center rounded bedge text-white text-[14px] font-bold">
                            {CustomerName}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-extrabold text-[14px]">
                            DID NO
                        </h3>
                        <div className=" bg-white p-1 text-center rounded bedge text-[#15616E] text-[14px] font-bold">
                            {DidNumber}
                        </div>
                    </div>
                </div>
                <div>
                    {/* <h3 className="text-white font-extrabold text-[14px]">
                        Whatsapp
                    </h3>
                    <div className=" bg-white text-center p-1 rounded bedge text-[#15616E] text-[14px] font-bold">
                        {Status}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default CallerHeader
