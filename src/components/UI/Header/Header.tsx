import React, { useState } from 'react'
import { MdOutlineMenuBook } from 'react-icons/md'
import { RiMenuLine } from 'react-icons/ri'
import { IoNotificationsOutline } from 'react-icons/io5'
import { BiChevronDown } from 'react-icons/bi'
import UserProfileCard from '../UserProfileCard/UserProfileCard'
import NotificationCard from './NotificationCard/NotificationCard'

interface HeaderPropTypes {
    setIsShowSideNav: (value: boolean) => void;
    isShowSideNav: boolean;
}

const Header = ({
    setIsShowSideNav,
    isShowSideNav
}: HeaderPropTypes
) => {

    const [isShowProfileCard, setIsShowProfileCard] = useState(false);
    const [isShowNotification, setIsShowNotification] = useState(false);
    const [isNewNotificationsAvailable, setIsNewNotificationsAvailable] = useState(true);



    return (
        <div className='grid grid-cols-2 w-full h-full shadow-lg border ' >

            {/* Left Section */}
            <div className='flex gap-6 items-center w-[270px] justify-between px-5  '>
                <div className="flex items-center gap-3 text-2xl text-primary-main">
                    <MdOutlineMenuBook />  Logo
                </div>
                <div
                    onClick={() => { setIsShowSideNav(!isShowSideNav) }}
                    className='cursor-pointer'
                >
                    <RiMenuLine className='text-2xl text-slate-500' />
                </div>
            </div>

            {/* Right Section */}
            <div className='flex gap-4 justify-end items-center px-4 ' >

                <button
                    onClick={() => { setIsShowNotification(isShowNotification => !isShowNotification); setIsNewNotificationsAvailable(false) }}
                    className='relative text-xl transition-all duration-[800ms] hover:bg-slate-200 p-3 rounded-full' >
                    <IoNotificationsOutline className='font-bold' />
                    {
                        isNewNotificationsAvailable ?
                            (

                                <span className="flex h-[7px] w-[7px] absolute top-[9px] right-[10px]">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-100"></span>
                                    <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-red-600"></span>
                                </span>
                            )
                            :
                            null
                    }
                </button>

                <button
                    onClick={() => setIsShowProfileCard(isShowProfileCard => !isShowProfileCard)}
                    className='flex gap-5'
                >
                    <div className='h-[43px] w-[43px] flex justify-center items-center font-bold bg-primary-main text-white  rounded-full' >
                        H
                    </div>

                    <div className='flex flex-col gap-1 justify-start items-start' >
                        <div className='text-primary-main text-[13px]' > Administrator </div>
                        <div className='flex gap-1 items-center font-bold text-slate-500 text-sm' > Himanshu Jain  <BiChevronDown className='text-lg font-bold' />  </div>

                    </div>
                </button>
                {
                    isShowProfileCard &&
                    <UserProfileCard onClickAway={() => setIsShowProfileCard(false)} />
                }

                {
                    isShowNotification &&
                    <NotificationCard onClickAway={() => setIsShowNotification(false)} />
                }

            </div>


        </div>
    )
}

export default Header