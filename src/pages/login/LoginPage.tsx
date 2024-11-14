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
                                    userDepartment:
                                        res?.data?.data?.userDepartment,
                                    firstName: res?.data?.data?.firstName,
                                    lastName: res?.data?.data?.lastName,
                                    branchId: res?.data?.data?.branchId,
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
                                navigate('/welcome') // Navigating to "/welcome" after setting localStorage
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

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">

                <div className="text-center">
                    {/* <img src="/saptel-logo.png" alt="Saptel Logo" className="mx-auto w-24 h-24" /> */}
                    <img src="telemartLogo.png" alt="Saptel Logo" className="mx-auto w-auto h-24" />
                    <h2 className="mt-4 text-2xl font-semibold text-gray-700">Login</h2>
                    <p className="text-sm text-gray-500">Your Complete ERP Solution</p>
                </div>

                <form className="space-y-4">
                    <div>
                        {/* <label className="block text-gray-600">Username</label> */}
                        <ATMTextField
                            autoFocus
                            placeholder="Enter your username"
                            name=""
                            value={userName}
                            label="Username"
                            labelSize='medium'
                            labelClass='block text-gray-600'
                            className="w-full px-4 text-base py-2 outline-0 mt-1 text-gray-700 border border-gray-300 rounded-md h-[50px]"
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                        />
                        <span className="text-red-500 text-sm">
                            {!userName && errorInitiate ? 'Please enter username' : ''}
                        </span>
                        {/* <input
                            autoFocus
                            type="text"
                            className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                        /> */}
                    </div>
                    <div>
                        <label className="block text-gray-600 text-base">Password</label>
                        <div>
                            <ATMInputAdormant
                                // label="Password"
                                name=""
                                placeholder="Enter your password"
                                type={isShowPassword ? 'text' : 'password'}
                                value={password}
                                className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[50px]"
                                adormant={!isShowPassword ? <BiHide className="text-xl" /> : <BiShow className="text-xl" />}
                                adormantProps={{
                                    position: 'end',
                                    extraClasses: 'bg-white border-none',
                                    onClick: () => setIsShowPassword((isShowPassword) => !isShowPassword),
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setErrorInitiate(true)
                                        handleLogin()
                                    }
                                }}
                            />
                            <span className="text-red-500 text-sm">
                                {!password && errorInitiate ? 'Please enter password' : ''}
                            </span>
                        </div>
                    </div>

                    <span className="text-red-500 block mx-auto text-center">{apiError}</span>

                    <button
                        disabled={loginInfo?.isLoading}
                        type="button"
                        className={`w-full py-2 text-white rounded-md transition-all bg-primary-main 
                            hover:bg-primary-hover focus:outline-none ${loginInfo?.isLoading && 'bg-primary-hover opacity-80'}`}
                        onClick={() => {
                            setErrorInitiate(true)
                            handleLogin()
                        }}
                    >
                        Login
                    </button>

                    <div className="flex justify-between mt-4 text-sm text-gray-500">
                        <span className="hover:underline cursor-pointer">Forgot Password?</span>
                        <span className="hover:underline cursor-pointer">Contact Support</span>
                    </div>
                </form>
            </div>
            <footer className="absolute bottom-4 text-sm text-gray-400">
                © 2024 Saptel. All rights reserved.
            </footer>
        </div>

        // <div className="h-screen w-screen flex md:flex-row bg-white">
        //     <div className="bg-slate-400 flex-1 hidden md:block ">
        //         <div className="h-full">
        //             <img src="bg.jpg" className="h-full w-full" alt="" />
        //         </div>
        //     </div>
        //     <div className="flex flex-col h-full w-full justify-center items-center flex-1">
        //         <div >
        //             <div className="flex flex-col h-[100px] w-[250px] ">
        //                 <img src="telemartLogo.png" alt="" />
        //             </div>
        //             <div className=" text-2xl font-semibold text-center ">
        //                 Login
        //             </div>
        //             <div className="mt-5 flex flex-col gap-7">
        //                 <div >
        //                     <ATMTextField
        //                         autoFocus
        //                         name=""
        //                         value={userName}
        //                         onChange={(e) => {
        //                             setUserName(e.target.value)
        //                         }}
        //                         label="User name"
        //                         className="bg-slate-100 focus:bg-white h-[50px]"
        //                     />
        //                     <span className="text-red-500 ">
        //                         {!userName && errorInitiate
        //                             ? 'Please enter username'
        //                             : ''}
        //                     </span>
        //                 </div>
        //                 <div >
        //                     <ATMInputAdormant
        //                         name=""
        //                         type={isShowPassword ? 'text' : 'password'}
        //                         value={password}
        //                         onChange={(e) => {
        //                             setPassword(e.target.value)
        //                         }}
        //                         onKeyDown={(e) => {
        //                             if (e.key === 'Enter') {
        //                                 setErrorInitiate(true)
        //                                 handleLogin()
        //                             }
        //                         }}
        //                         label="Password"
        //                         className="bg-slate-100 focus:bg-white h-[50px]"
        //                         adormant={
        //                             !isShowPassword ? (
        //                                 <BiHide className="text-xl" />
        //                             ) : (
        //                                 <BiShow className="text-xl" />
        //                             )
        //                         }
        //                         adormantProps={{
        //                             position: 'end',
        //                             extraClasses: 'bg-white border-none',
        //                             onClick: () => {
        //                                 setIsShowPassword(
        //                                     (isShowPassword) => !isShowPassword
        //                                 )
        //                             },
        //                         }}
        //                     />
        //                     <span className="text-red-500 ">
        //                         {!password && errorInitiate
        //                             ? 'Please enter password'
        //                             : ''}
        //                     </span>
        //                 </div>
        //                 <div >
        //                     <span className="text-red-500 block mx-auto text-center">
        //                         {apiError}
        //                     </span>
        //                     <button
        //                         onClick={() => {
        //                             setErrorInitiate(true)
        //                             handleLogin()
        //                         }}
        //                         disabled={loginInfo?.isLoading}
        //                         type="button"
        //                         className={`w-full ${
        //                             loginInfo?.isLoading
        //                                 ? 'bg-slate-400'
        //                                 : 'bg-primary-main'
        //                         } text-white h-[50px] rounded-lg`}
        //                     >
        //                         Login
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default LoginPage
