import React from 'react'
import ATMInputAdormant from '../../components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant'
import ATMTextField from '../../components/UI/atoms/formFields/ATMTextField/ATMTextField'
import loginImg from 'src/assets/images/login.jpeg'
import { BiShow, BiHide } from 'react-icons/bi'
import { RiGoogleFill } from 'react-icons/ri'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {

    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate()


    return (
        <div className='w-screen h-screen bg-slate-100 flex justify-center items-center' >
            <div className='w-[50%] h-[75%] bg-white rounded-xl grid grid-cols-2 overflow-hidden' >
                <div className='h-full' >
                    <img
                        src={loginImg}
                        alt=""
                        className='h-full'
                    />
                </div>

                <div className='h-full px-10 py-14' >
                    <div className='text-2xl font-semibold ' > Login </div>

                    <div className='mt-6 flex flex-col gap-7'>

                        <div className='' >
                            <ATMTextField
                                name=""
                                value="codiotic.test01"
                                onChange={() => { }}
                                label="User name"
                                className='bg-slate-100 focus:bg-white h-[50px]'
                            />
                        </div>

                        <div className='' >
                            <ATMInputAdormant
                                name=""
                                type={isShowPassword ? 'text' : 'password'}
                                value="Password1!"
                                onChange={() => { }}
                                label="Password"
                                className='bg-slate-100 focus:bg-white h-[50px]'
                                adormant={isShowPassword ? <BiHide className='text-xl' /> : <BiShow className='text-xl' />}
                                adormantProps={
                                    {
                                        position: 'end',
                                        extraClasses: 'bg-white border-none',
                                        onClick: () => { setIsShowPassword(isShowPassword => !isShowPassword) }
                                    }
                                }
                            />
                        </div>

                        <div className=''>
                            <button
                            onClick={()=> {navigate('orders')}}
                                type='button'
                                className='w-full bg-primary-main text-white h-[50px] rounded-lg'
                            >
                                Login
                            </button>
                        </div>

                     


                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage
