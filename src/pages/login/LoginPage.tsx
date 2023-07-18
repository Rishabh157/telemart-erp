/// ==============================================
// Filename:LoginPage.tsx
// Type: Login Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { BiShow, BiHide } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMInputAdormant from '../../components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant'
import ATMTextField from '../../components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { useLoginMutation } from 'src/services/UserServices'
import { showToast } from 'src/utils'

// |-- Redux --|
import {
    setAccessToken,
    setRefreshToken,
    setUserData,
} from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
// import { navigation } from 'src/navigation'

const LoginPage = ({ pathName }: any) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [apiError, setApiError] = useState('')
    const [errorInitiate, setErrorInitiate] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const [login, loginInfo] = useLoginMutation()

    const handleLogin = async () => {
        if (userName && password) {
            try {
                await login({
                    userName: userName,
                    password: password,
                })
                    .then(async (res) => {
                        if ('data' in res) {
                            if (res?.data?.status) {
                                let userData = {
                                    userId: res?.data?.data?.userId,
                                    fullName: res?.data?.data?.fullName,
                                    email: res?.data?.data?.email,
                                    mobile: res?.data?.data?.mobile,
                                    userName: res?.data?.data?.userName,
                                    companyId: res?.data?.data?.companyId,
                                    role: res?.data?.data?.userType,
                                    userRole: res?.data?.data?.userRole,
                                }
                                dispatch(setAccessToken(res?.data?.data?.token))
                                dispatch(
                                    setRefreshToken(
                                        res?.data?.data?.refreshToken
                                    )
                                )
                                dispatch(setUserData(userData))
                                localStorage.setItem(
                                    'userData',
                                    JSON.stringify(userData)
                                )
                                localStorage.setItem(
                                    'authToken',
                                    res?.data?.data?.token
                                )
                                localStorage.setItem(
                                    'refreshToken',
                                    res?.data?.data?.refreshToken
                                )

                                showToast('success', 'Login successful')
                                setTimeout(() => {
                                    // window.location.pathname = `${pathName}`
                                    navigate('/dealers') // Navigating to "/dashboard" after setting localStorage
                                }, 3000)
                            } else {
                                setApiError(res?.data?.message)
                            }
                        } else {
                            showToast(
                                'error',
                                'Something went wrong. Please try again later'
                            )
                        }
                    })
                    .catch((err) => {
                        // Handle any error that occurs during login request
                    })

            } catch (error) {
                // Handle any other errors that occur
            }
        }
    }

    return (
        <div className="h-screen w-screen flex md:flex-row bg-white">
            <div className=" bg-slate-400 flex-1  hidden md:block ">
                <div className="h-full">
                    <img src="bg.jpg" className="h-full w-full" alt="" />
                </div>
            </div>
            <div className="flex flex-col h-full w-full justify-center items-center flex-1">
                <div className="">
                    <div className="flex flex-col h-[100px] w-[250px] ">
                        <img src="telemartLogo.png" alt="" />
                    </div>
                    <div className=" text-2xl font-semibold text-center ">
                        Login
                    </div>
                    <div className="mt-5 flex flex-col gap-7">
                        <div className="">
                            <ATMTextField
                                autoFocus
                                name=""
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                }}
                                label="User name"
                                className="bg-slate-100 focus:bg-white h-[50px]"
                            />
                            <span className="text-red-500 ">
                                {!userName && errorInitiate
                                    ? 'Please enter username'
                                    : ''}
                            </span>
                        </div>
                        <div className="">
                            <ATMInputAdormant
                                name=""
                                type={isShowPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                label="Password"
                                className="bg-slate-100 focus:bg-white h-[50px]"
                                adormant={
                                    !isShowPassword ? (
                                        <BiHide className="text-xl" />
                                    ) : (
                                        <BiShow className="text-xl" />
                                    )
                                }
                                adormantProps={{
                                    position: 'end',
                                    extraClasses: 'bg-white border-none',
                                    onClick: () => {
                                        setIsShowPassword(
                                            (isShowPassword) => !isShowPassword
                                        )
                                    },
                                }}
                            />
                            <span className="text-red-500 ">
                                {!password && errorInitiate
                                    ? 'Please enter password'
                                    : ''}
                            </span>
                        </div>
                        <div className="">
                            <span className="text-red-500 block mx-auto text-center">
                                {apiError}
                            </span>
                            <button
                                onClick={() => {
                                    setErrorInitiate(true)
                                    handleLogin()
                                }}
                                disabled={loginInfo?.isLoading}
                                type="button"
                                className={`w-full ${
                                    loginInfo?.isLoading
                                        ? 'bg-slate-400'
                                        : 'bg-primary-main'
                                } text-white h-[50px] rounded-lg`}
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
