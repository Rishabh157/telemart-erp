/// ==============================================
// Filename:Header.tsx
// Type: Utils Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { BsMoon, BsSun } from 'react-icons/bs'
import { FormControl, MenuItem, Select } from '@mui/material'
import { IoNotifications } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import UserProfileCard from '../UserProfileCard/UserProfileCard'
import NotificationCard from './NotificationCard/NotificationCard'
import { useGetAllCompaniesQuery } from 'src/services/CompanyServices'
import MouseOverPopover from 'src/components/utilsComponent/MouseOverPopover'
import { useUpdateCompanyByAdminMutation } from 'src/services/UserServices'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { setDeviceId, setUserData } from 'src/redux/slices/authSlice'

const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [isShowProfileCard, setIsShowProfileCard] = useState(false)
    const [isShowNotification, setIsShowNotification] = useState(false)
    const deviceIditem = localStorage.getItem('device-id') || ''

    useEffect(() => {
        dispatch(setDeviceId(deviceIditem))
    }, [deviceIditem, dispatch])
    const { userData, deviceId } = useSelector(
        (state: RootState) => state?.auth
    )
    const [isNewNotificationsAvailable, setIsNewNotificationsAvailable] =
        useState(true)
    const [company, setCompany] = useState(userData?.companyId || '')
    const color = localStorage.getItem('themeColor')
    const themeColor = color ? JSON.parse(color) : ''
    const [siteMode, setSiteMode] = useState(themeColor)
    const [companyName, setCompanyName] = useState('')
    const { data, isFetching, isLoading } = useGetAllCompaniesQuery('', {
        skip: !deviceId,
    })
    useEffect(() => {
        if (!isLoading && !isFetching) {
            if (data?.data?.status) {
                const companyName = data?.data?.find(
                    (com: any) => com?._id === company
                ).companyName
                setCompanyName(companyName)
            }
        }

        // eslint-disable-next-line
    }, [data, isLoading, isFetching])

    const [updaeCompany] = useUpdateCompanyByAdminMutation()
    // const dispatch = useDispatch()
    const handleUpdate = (companyId: string) => {
        if (!companyId) return
        const update = {
            companyId: companyId,
        }
        updaeCompany({ body: update, id: userData?.userId || '' }).then(
            (updateCompanyInfo: any) => {
                if (updateCompanyInfo?.data?.status) {
                    const {
                        _id,
                        firstName,
                        lastName,
                        email,
                        mobile,
                        userName,
                        companyId,
                        userType,
                        userRole,
                    } = updateCompanyInfo?.data?.data
                    let userData = {
                        userId: _id,
                        fullName: firstName + lastName,
                        email: email,
                        mobile: mobile,
                        userName: userName,
                        companyId: companyId,
                        role: userType,
                        userRole: userRole,
                    }
                    localStorage.setItem('userData', JSON.stringify(userData))
                    dispatch(setUserData(userData))
                    window.location.reload()
                }
            }
        )
    }

    return (
        <div
            className={`rid grid-cols-2 w-full h-full shadow-lg borde bg-white`}
        >
            {/* Right Section */}
            <div className="flex gap-4 col-start-2 justify-end items-center px-4 ">
                <div>
                    <div className="mt-1 mb-1 hover:outline-slate-200 cursor-pointer outline outline-offset-1 outline-slate-300 rounded-full ">
                        <MouseOverPopover
                            title=""
                            children={
                                <>
                                    <div
                                        onClick={() => {
                                            setSiteMode('black')

                                            localStorage.setItem(
                                                'themeColor',
                                                JSON.stringify('black')
                                            )
                                            window.location.reload()
                                        }}
                                        className={` ${
                                            siteMode === 'black' &&
                                            'text-[#dd9c4c]'
                                        } p-2 px-4 text-lg font-normal flex gap-x-2 items-center hover:bg-slate-100 cursor-pointer`}
                                    >
                                        <BsMoon /> Dark
                                    </div>
                                    <div
                                        onClick={() => {
                                            setSiteMode('white')

                                            localStorage.setItem(
                                                'themeColor',
                                                JSON.stringify('white')
                                            )
                                            window.location.reload()
                                        }}
                                        className={`${
                                            siteMode === 'white' &&
                                            'text-[#dd9c4c]'
                                        } p-2 px-4 text-lg font-normal flex gap-x-2 items-center hover:bg-slate-100 cursor-pointer`}
                                    >
                                        <BsSun /> Light
                                    </div>
                                </>
                            }
                            buttonName={
                                siteMode === 'black' ? (
                                    <BsMoon
                                        size={20}
                                        className="cursor-pointer"
                                    />
                                ) : (
                                    <BsSun
                                        size={20}
                                        className="cursor-pointer"
                                    />
                                )
                            }
                            extraClasses="p-2"
                            isbuttonName
                        />
                    </div>
                </div>

                {userData?.role === 'ADMIN' ? (
                    <FormControl sx={{ width: 150 }}>
                        <Select
                            value={company}
                            onChange={(e) => {
                                setCompany(e.target.value)
                                handleUpdate(e.target.value)
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            size="small"
                        >
                            <MenuItem value="" disabled>
                                <em>Select Company</em>
                            </MenuItem>
                            {data?.data?.map((ele: any) => {
                                return (
                                    <MenuItem key={ele._id} value={ele?._id}>
                                        {ele?.companyName}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                ) : (
                    <span>{companyName}</span>
                )}

                <button
                    onClick={() => {
                        setIsShowNotification(
                            (isShowNotification) => !isShowNotification
                        )
                        setIsNewNotificationsAvailable(false)
                    }}
                    className="hidden relative text-lg text-slate-700 transition-all duration-[800ms] hover:bg-slate-200 p-3 rounded-full"
                >
                    <IoNotifications className="" />
                    {isNewNotificationsAvailable ? (
                        <span className="flex h-[7px] w-[7px] absolute top-[9px] right-[10px]">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-100"></span>
                            <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-red-600"></span>
                        </span>
                    ) : null}
                </button>

                <button
                    onClick={() =>
                        setIsShowProfileCard(
                            (isShowProfileCard) => !isShowProfileCard
                        )
                    }
                    className="flex gap-5"
                >
                    <div className="h-[35px] w-[35px] flex justify-center items-center font-bold bg-primary-main text-white  rounded-full">
                        {!(userData === null)
                            ? userData?.fullName[0].toUpperCase()
                            : ''}
                    </div>

                    {/* <div className='flex flex-col gap-1 justify-start items-start' >
                        <div className='text-primary-main text-[13px]' > Administrator </div>
                        <div className='flex gap-1 items-center font-bold text-slate-500 text-sm' > Himanshu Jain  <BiChevronDown className='text-lg font-bold' />  </div>

                    </div> */}
                </button>
                {isShowProfileCard && (
                    <UserProfileCard
                        onClickAway={() => setIsShowProfileCard(false)}
                    />
                )}

                {isShowNotification && (
                    <NotificationCard
                        onClickAway={() => setIsShowNotification(false)}
                    />
                )}
            </div>
        </div>
    )
}
export default Header
