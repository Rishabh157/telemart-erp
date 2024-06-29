/// ==============================================
// Filename:ChangePassword.tsx
// Type: Password Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { setAccessToken, setRefreshToken } from 'src/redux/slices/authSlice'
import { useChangePasswordMutation } from 'src/services/UserServices'
import { showToast } from 'src/utils'

const ChangePassword = () => {
    const { userData } = useSelector((state: any) => state.auth)
    const [currentPass, setCurrentPass] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errorInitiate, setErrorInitiate] = useState(false)
    const [apiError, setApiError] = useState('')
    const [changePassWord, changePasswordInfo] = useChangePasswordMutation()
    const dispatch = useDispatch()
    const handleClick = () => {
        if (currentPass && newPassword) {
            changePassWord({
                currentPassword: currentPass,
                newPassword: newPassword,
                userId: userData.userId,
            })
                .then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast(
                                'success',
                                'Password Changed successfully'
                            )
                            dispatch(setAccessToken(res?.data?.data?.token))
                            dispatch(
                                setRefreshToken(res?.data?.data?.refreshToken)
                            )
                            localStorage.setItem(
                                'authToken',
                                res?.data?.data.token
                            )
                            localStorage.setItem(
                                'refreshToken',
                                res?.data?.data.refreshToken
                            )
                            setApiError('')
                        } else {
                            setApiError(res?.data?.message)
                        }
                    } else {
                        setApiError('Something went wrong')
                    }
                })
                .catch((err) => {})
        }
    }
    return (
        <div className="mt-6 flex flex-col w-[40%] h-[75%] gap-7 rounded-xl">
            <div className="rounded-lg">
                <ATMTextField
                    name=""
                    value={currentPass}
                    onChange={(e) => {
                        setCurrentPass(e.target.value)
                    }}
                    label="Current Password"
                    className="bg-slate-100 focus:bg-white h-[50px]"
                />
                <span className="text-red-500 ">
                    {!currentPass && errorInitiate
                        ? 'Please enter current password'
                        : ''}
                </span>
            </div>
            <div className="rounded-lg">
                <ATMTextField
                    name=""
                    value={newPassword}
                    onChange={(e) => {
                        setNewPassword(e.target.value)
                    }}
                    label="New Password"
                    className="bg-slate-100 focus:bg-white h-[50px]"
                />
                <span className="text-red-500 ">
                    {!newPassword && errorInitiate
                        ? 'Please enter new password'
                        : ''}
                </span>
            </div>
            <div >
                <span className="text-red-500 block mx-auto text-center">
                    {apiError}
                </span>
                <button
                    onClick={() => {
                        handleClick()
                        setErrorInitiate(true)
                    }}
                    disabled={changePasswordInfo?.isLoading}
                    type="button"
                    className={`w-full ${
                        false ? 'bg-slate-400' : 'bg-primary-main'
                    } text-white h-[50px] rounded-lg`}
                >
                    Change Password
                </button>
            </div>
        </div>
    )
}

export default ChangePassword
