import React from 'react'
import CallerButton from './CallerButton'

const CallerPageTopNav = ({ agentName = '' }: { agentName: string }) => {
    return (
        <div className="flex justify-between py-[1px]">
            <div>
                <img
                    height={110}
                    width={110}
                    src="/septel-logo.png"
                    alt="logo"
                />
            </div>
            <div className="flex gap-x-2 items-center">
                <div className="text-[#6F9EA7] text-[14px]">
                    Logged in ID : {agentName}
                </div>
                <div>
                    <CallerButton
                        // disabled
                        text="Sales"
                        type="button"
                        onClick={() => alert(`${agentName} is on the call.....`)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CallerPageTopNav
