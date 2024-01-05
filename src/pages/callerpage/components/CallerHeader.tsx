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
            <div className="flex justify-between gap-x-6 ">
                <div className="w-full">
                    <h3 className="text-white font-semibold text-xs">
                        CAMPAIGN
                    </h3>
                    <div className="bg-white text-center p-1 rounded bedge text-[#15616E] font-semibold text-xs">
                        {CampaignName}
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="text-white font-semibold text-xs">
                        CALL TYPE
                    </h3>
                    <div className="bg-white p-1 text-center rounded bedge text-[#15616E] font-semibold text-xs">
                        {CallType}
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="text-white font-semibold text-xs">
                        INCOMING NO.
                    </h3>
                    <div className="bg-white p-1 text-center rounded bedge text-[#15616E] font-semibold text-xs">
                        {IncomingNo}
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="text-white font-semibold text-xs">
                        CUSTOMER
                    </h3>
                    <div className=" bg-green-500 p-1 text-center rounded bedge text-white font-semibold text-xs">
                        <span className="opacity-0">
                            {CustomerName || 'hello'}
                        </span>
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="text-white font-semibold text-xs">DID NO</h3>
                    <div className=" bg-white p-1 text-center rounded bedge text-[#15616E] font-semibold text-xs">
                        {DidNumber}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallerHeader
