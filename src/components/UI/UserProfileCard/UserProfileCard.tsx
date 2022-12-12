import { ClickAwayListener } from '@mui/material';
import React from 'react'
import { BsPerson } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

type UserProfileCardPropTypes = {
    onClickAway: () => void;
}

const UserProfileCard = ({
    onClickAway
}: UserProfileCardPropTypes
) => {

    // Options 
    const profileOptions = [
        {
            label: 'View Profile',
            icon: BsPerson
        },
        {
            label: 'Account Settings',
            icon: IoSettingsOutline
        }
    ]

    const navigate = useNavigate()

    return (
        <ClickAwayListener
            onClickAway={onClickAway}
        >

            <div className='absolute top-[70px] rigth-[20px] w-[290px] shadow-lg rounded animate-[fade_0.5s_ease-in-out] z-50  ' >
                <div className='flex gap-5 items-center  bg-slate-50 h-[70px] px-8 border-b border-slate-300' >
                    <div className='w-[43px] h-[43px] flex justify-center items-center bg-primary-main rounded-full text-white ' >
                        H
                    </div>

                    <div className='' >
                        <div className='text-slate-700' > Himanshu Jain </div>
                        <div className='text-sm text-slate-500' > himanshu@gmail.com </div>

                    </div>
                </div>

                <div className=' flex flex-col gap-3 px-7 py-5 bg-white ' >
                    {
                        profileOptions.map((option, index) => {
                            return (
                                <div key={index} className='flex gap-3  text-slate-500 hover:text-primary-main cursor-pointer items-center' >
                                    <option.icon className='text-xl' />
                                    <div className='' > {option.label} </div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className='border-t border-slate-300 px-7 py-3 bg-white'>
                    <div className='flex gap-3  text-slate-500 items-center hover:text-primary-main cursor-pointer' >
                        <MdOutlineLogout className='text-xl' />
                        <div className='' onClick={() => { navigate('/') }} > Sign out </div>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default UserProfileCard
