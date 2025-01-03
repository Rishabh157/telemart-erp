// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { ClickAwayListener } from '@mui/material'

const notications = [
    {
        date: '24 Nov 2022 03:20 PM',
        message: 'Notifications are currently under development and will be available soon.',
    },
    {
        date: '24 Nov 2022 03:20 PM',
        message: 'Notifications are currently under development and will be available soon.',
    },
    {
        date: '24 Nov 2022 03:20 PM',
        message: 'Notifications are currently under development and will be available soon.',
    },
    {
        date: '24 Nov 2022 03:20 PM',
        message: 'Notifications are currently under development and will be available soon.',
    },
    {
        date: '24 Nov 2022 03:20 PM',
        message: 'Notifications are currently under development and will be available soon.',
    },
    {
        date: '24 Nov 2022 03:20 PM',
        message: 'Notifications are currently under development and will be available soon.',
    },
]

type NotificationCardPropTypes = {
    onClickAway: () => void
}

const NotificationCard = ({ onClickAway }: NotificationCardPropTypes) => {
    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div className="absolute top-[50px] right-[70px] w-[350px] max-h-[400px] overflow-auto shadow-xl rounded animate-[fade_0.3s_ease-in-out] z-50">
                <div className=" flex flex-col gap-3 bg-white ">
                    <div className="border-b flex items-center px-2 h-[40px] sticky top-0 bg-white ">
                        <div className="text-slate-700 ">Notifications</div>
                    </div>
                    {notications.map((option, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex flex-col px-2 text-slate-500 text-xs  ${index !== notications.length - 1 &&
                                    'border-b'
                                    } border-slate-100`}
                            >
                                <div > {option.message} </div>
                                <div className="flex text-[10px] text-slate-400">
                                    <div> 03:20 PM </div>
                                </div>
                            </div>
                        )
                    })}

                    <div className="border-t flex justify-center items-center px-2 h-[45px] sticky bottom-0 bg-white ">
                        <button className="text-primary-main text-sm w-full ">
                            View All
                        </button>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default NotificationCard
