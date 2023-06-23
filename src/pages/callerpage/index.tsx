import React from 'react'
import { TbBrandNetflix } from 'react-icons/tb'
import CallerButton from './components/CallerButton'

const index = () => {
    return (
        <div className="bg-white px-4">
            <div className="flex justify-between py-4">
                <div className="logo-img">
                    <TbBrandNetflix size={40} color="red" />
                </div>
                <div className="flex gap-x-2 items-center">
                    <div className="text-[#6F9EA7] text-[15px]">
                        Logged in ID : Sandeep
                    </div>
                    <div>
                        <CallerButton text="Sales" type="button" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index
