import React from 'react'
import CallerButton from './CallerButton'
import { Link } from 'react-router-dom'

const CallerPageTopNav = ({ agentName = '' }: { agentName: string }) => {
    return (
        <div className="flex justify-between py-[1px]">
            <Link to="#">
                <div className="logo-img ">
                    <img
                        height={110}
                        width={110}
                        src="/septel-logo.png"
                        alt="logo"
                    />
                </div>
            </Link>
            <div className="flex gap-x-2 items-center">
                <div className="text-[#6F9EA7] text-[14px]">
                    Logged in ID : {agentName}
                </div>
                <div>
                    <CallerButton
                        text="Sales"
                        type="button"
                        onClick={() => alert('Sales...')}
                    />
                </div>
            </div>
        </div>
    )
}

export default CallerPageTopNav
