// |-- Built-in Dependencies --|
import React, { useState, useEffect, useContext } from 'react'

// |-- External Dependencies --|
import { BsMoon, BsSun } from 'react-icons/bs'
import { FormControl, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegBuilding } from 'react-icons/fa'

// |-- Internal Dependencies --|
import UserProfileCard from '../UserProfileCard/UserProfileCard'
import { useGetAllCompaniesQuery } from 'src/services/CompanyServices'
import MouseOverPopover from 'src/components/utilsComponent/MouseOverPopover'
import { useUpdateCompanyByAdminMutation } from 'src/services/UserServices'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { setDeviceId, setUserData } from 'src/redux/slices/authSlice'
import { ThemeContext } from 'src/App'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

const Header = () => {
    const [isShowProfileCard, setIsShowProfileCard] = useState(false)

    const { theme, toggleTheme } = useContext(ThemeContext)
    const dispatch = useDispatch<AppDispatch>()
    const [updaeCompany] = useUpdateCompanyByAdminMutation()
    const { deviceId } = useGetLocalStorage()

    useEffect(() => {
        dispatch(setDeviceId(deviceId))
    }, [deviceId, dispatch])

    const { userData } = useSelector((state: RootState) => state?.auth)

    const [company, setCompany] = useState(userData?.companyId || '')

    const [companyName, setCompanyName] = useState('')

    const {
        items: data,
        isLoading,
        isFetching,
    } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetAllCompaniesQuery('', {
            skip: !userData?.companyId,
        }),
    })

    useEffect(() => {
        if (!isLoading && !isFetching) {
            const companyName = data?.find(
                (com: any) => com?._id === company
            ).companyName
            setCompanyName(companyName)
        }
        // eslint-disable-next-line
    }, [data, isLoading, isFetching])

    // const dispatch = useDispatch()
    const handleUpdate = (companyId: string) => {
        if (!companyId) return
        const update = {
            companyId: companyId,
        }
        updaeCompany({ id: userData?.userId || '', body: update }).then(
            (updateCompanyInfo: any) => {
                if (updateCompanyInfo?.data?.status) {
                    const {
                        userId,
                        firstName,
                        lastName,
                        email,
                        mobile,
                        userName,
                        companyId,
                        userType,
                        userRole,
                        branchId,
                        token,
                        refreshToken,
                    } = updateCompanyInfo?.data?.data
                    let userData = {
                        userId: userId,
                        fullName: firstName + lastName,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mobile: mobile,
                        userName: userName,
                        companyId: companyId,
                        role: userType,
                        userRole: userRole,
                        branchId: branchId,
                    }
                    localStorage.setItem('userData', JSON.stringify(userData))
                    localStorage.setItem('authToken', token)
                    localStorage.setItem('refreshToken', refreshToken)
                    dispatch(setUserData(userData))
                    window.location.href = '/dashboard'
                }
            }
        )
    }

    return (
        <div className="grid grid-cols-2 w-full h-full shadow-lg border bg-white">
            {/* Right Section */}
            <div className="flex gap-4 col-start-2 justify-end items-center px-4 rounded-full ">
                <MouseOverPopover
                    title=""
                    children={
                        <>
                            <div
                                onClick={toggleTheme}
                                className={`${
                                    theme === 'black' ? 'text-[#dd9c4c]' : ''
                                } p-1 px-2 text-sm font-normal flex gap-x-2 items-center hover:bg-slate-100 cursor-pointer`}
                            >
                                <BsMoon /> Dark
                            </div>
                            <div
                                onClick={toggleTheme}
                                className={`${
                                    theme === 'white' ? 'text-[#dd9c4c]' : ''
                                } p-1 px-2 text-sm font-normal flex gap-x-2 items-center hover:bg-slate-100 cursor-pointer`}
                            >
                                <BsSun /> Light
                            </div>
                        </>
                    }
                    buttonName={
                        theme === 'black' ? (
                            <BsMoon size={16} className="cursor-pointer" />
                        ) : (
                            <BsSun size={16} className="cursor-pointer" />
                        )
                    }
                    extraClasses="p-1"
                    isbuttonName
                />

                {userData?.userRole === 'ADMIN' ? (
                    <FormControl sx={{ width: 150, height: 30 }}>
                        <Select
                            value={company}
                            onChange={(e) => {
                                setCompany(e.target.value)
                                handleUpdate(e.target.value)
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select Company' }}
                            size="small"
                            sx={{ height: 30 }}
                        >
                            <MenuItem value="" disabled>
                                <em>Select Company</em>
                            </MenuItem>
                            {data?.map((ele: any) => (
                                <MenuItem key={ele._id} value={ele._id}>
                                    {ele.companyName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    <span className="rounded px-2 py-2 text-black font-normal border-[1px] border-gray-300 flex gap-x-4 items-center capitalize">
                        <FaRegBuilding size={20} color="#4d3838" />
                        {companyName}
                    </span>
                )}

                {/* <button
                    onClick={() => setIsShowNotification((prev) => !prev)}
                    className="relative text-lg text-slate-700 transition-all duration-800 hover:bg-slate-200 p-3 rounded-full"
                    aria-label="Toggle Notifications"
                >
                    {/* <IoNotifications /> */}
                {/* {isNewNotificationsAvailable && (
                        <span className="flex h-2 w-2 absolute top-2 right-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                    )} */}
                {/* </button>  */}

                <button
                    onClick={() => setIsShowProfileCard((prev) => !prev)}
                    className="flex gap-5"
                    aria-label="Toggle Profile Card"
                >
                    <div className="h-8 w-8 flex justify-center items-center font-bold bg-primary-main text-white rounded-full">
                        {userData?.fullName[0].toUpperCase()}
                    </div>
                </button>
                {isShowProfileCard && (
                    <UserProfileCard
                        onClickAway={() => setIsShowProfileCard(false)}
                    />
                )}
                {/* {isShowNotification && (
                    <NotificationCard
                        onClickAway={() => setIsShowNotification(false)}
                    />
                )} */}
            </div>
        </div>
    )
}
export default Header
