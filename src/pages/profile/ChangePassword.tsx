// ==============================================
// Filename: ChangePassword.tsx
// Type: Password Component
// Last Updated: NOVEMBER 26, 2024
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
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorInitiate, setErrorInitiate] = useState(false)
    const [apiError, setApiError] = useState('')
    const [changePassword, changePasswordInfo] = useChangePasswordMutation()
    const dispatch = useDispatch()

    const handleClick = () => {
        setErrorInitiate(true)

        if (!currentPass || !newPassword || !confirmPassword) {
            return
        }

        if (newPassword !== confirmPassword) {
            setApiError('New Password and Confirm Password do not match')
            return
        }

        changePassword({
            currentPassword: currentPass,
            newPassword,
            userId: userData.userId,
        })
            .then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Password changed successfully')
                        dispatch(setAccessToken(res?.data?.data?.token))
                        dispatch(setRefreshToken(res?.data?.data?.refreshToken))
                        localStorage.setItem('authToken', res?.data?.data.token)
                        localStorage.setItem(
                            'refreshToken',
                            res?.data?.data.refreshToken
                        )
                        setApiError('')
                        setErrorInitiate(false)
                        setCurrentPass('')
                        setNewPassword('')
                        setConfirmPassword('')
                    } else {
                        setApiError(res?.data?.message || 'Error occurred')
                    }
                } else {
                    setApiError('Something went wrong')
                }
            })
            .catch(() => {
                setApiError('Error occurred while changing password')
            })
    }

    return (
        <div className="mt-6 flex flex-col w-[40%] h-[75%] gap-4 rounded-xl">
            <div className="rounded-lg">
                <ATMTextField
                    name=""
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    label="Current Password"
                    placeholder="Enter your current password"
                />
                <span className="text-red-500">
                    {!currentPass && errorInitiate && 'Please enter current password'}
                </span>
            </div>
            <div className="rounded-lg">
                <ATMTextField
                    name=""
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    label="New Password"
                    placeholder="Enter a new password"
                />
                <span className="text-red-500">
                    {!newPassword && errorInitiate && 'Please enter a new password'}
                </span>
            </div>
            <div className="rounded-lg">
                <ATMTextField
                    name=""
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm Password"
                    placeholder="Re-enter your new password"
                />
                <span className="text-red-500">
                    {!confirmPassword && errorInitiate && 'Please confirm your password'}
                </span>
                <span className="text-red-500">
                    {newPassword !== confirmPassword && errorInitiate && 
                     'Passwords do not match'}
                </span>
            </div>
            <div>
                <span className="text-red-500 block mx-auto text-center">
                    {apiError}
                </span>
                <button
                    onClick={handleClick}
                    disabled={changePasswordInfo?.isLoading}
                    type="button"
                    className={`w-full ${
                        changePasswordInfo?.isLoading ? 'bg-slate-400' : 'bg-primary-main'
                    } text-white h-[50px] rounded-lg`}
                >
                    {changePasswordInfo?.isLoading ? 'Processing...' : 'Change Password'}
                </button>
            </div>
        </div>
    )
}

export default ChangePassword
