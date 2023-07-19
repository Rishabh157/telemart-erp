import React from 'react'
import CallerButton from './CallerButton'
import { Link } from 'react-router-dom'

const CallerPageTopNav = () => {
    return (
        <div className="flex justify-between py-1">
            <Link to='/'>
                <div className="logo-img ">
                    <img
                        height={130}
                        width={130}
                        src="/septel-logo.png"
                        alt="logo"
                    />
                </div>
            </Link>
            <div className="flex gap-x-2 items-center">
                <div className="text-[#6F9EA7] text-[15px]">
                    Logged in ID : Sandeep
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
