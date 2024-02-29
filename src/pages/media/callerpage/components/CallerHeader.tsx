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
}: // Status,
CallerHeaderPropsTypes) => {
    return (
        <div className="bg-[#87527C] py-1 px-2">
            <div className="flex justify-between gap-x-2 ">
                <div className="w-full">
                    <h3 className="text-white font-semibold text-[10px]">
                        CAMPAIGN
                    </h3>
                    <div className="bg-white text-center p-1 rounded bedge text-[#15616E] font-semibold text-[10px]">
                        {CampaignName}
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="text-white font-semibold text-[10px]">
                        CALL TYPE
                    </h3>
                    <div className="bg-white p-1 text-center rounded bedge text-[#15616E] font-semibold text-[10px]">
                        {CallType}
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="text-white font-semibold text-[10px]">
                        INCOMING NO.
                    </h3>
                    <div className="bg-white p-1 text-center rounded bedge text-[#15616E] font-semibold text-[10px]">
                        {IncomingNo}
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="text-white font-semibold text-[10px]">
                        CUSTOMER
                    </h3>
                    <div className=" bg-green-500 p-1 text-center rounded bedge text-white font-semibold text-[10px]">
                        <span className="opacity-0">
                            {CustomerName || 'hello'}
                        </span>
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="text-white font-semibold text-[10px]">DID NO</h3>
                    <div className=" bg-white p-1 text-center rounded bedge text-[#15616E] font-semibold text-[10px]">
                        {DidNumber}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallerHeader
