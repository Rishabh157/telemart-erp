/* eslint-disable @typescript-eslint/no-unused-vars */
/// ==============================================
// Filename:UserAccessWrapper.tsx
// Type: Access Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react' //  { useState, useEffect } // ,
import { useLocation, useNavigate } from 'react-router-dom'

// |-- External Dependencies --|

// |-- Internal Dependencies --|
import UserAccess from './UserAcess'
import { useDispatch, useSelector } from 'react-redux'
import {
    useAddUserAccessMutation,
    useGetUserAccessQuery,
    useIsUserExistsQuery,
    useUpdateUserAccessByUserIdMutation,
    useUpdateUserAccessMutation,
} from 'src/services/useraccess/UserAccessServices'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { setUserAccess } from 'src/redux/slices/access/userAcessSlice'

const UserAccessWrapper = () => {
    const [apiStatus, setApiStatus] = useState(false)
    const { state } = useLocation()
    const { dept, userRole } = state
    const userId = state?.userId
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [buttonValue, setButtonValue] = useState('save')
    const [isUserExists, setIsUserIxists] = useState(false)
    const [addUserAccess] = useAddUserAccessMutation()
    const [updateUserAccess] = useUpdateUserAccessMutation()
    const [updateByUserId] = useUpdateUserAccessByUserIdMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { data, isLoading, isFetching } = useGetUserAccessQuery(
        {
            userId: userId ? (userId as string) : null,
            userRole: userRole as string,
        },
        {
            skip: !userData?.companyId,
        }
    )

    // iue => if user exists
    const {
        data: iueData,
        isLoading: iueIsLoading,
        isFetching: iueIsFetching,
    } = useIsUserExistsQuery(userId, { skip: !userId })
    const { userAccessItems } = useSelector(
        (state: RootState) => state.userAccess
    )

    useEffect(() => {
        if (iueData?.data) {
            setIsUserIxists(iueData?.data)
        }
    }, [iueData, iueIsLoading, iueIsFetching])

    const handleUserAccessSubmit = () => {
        setApiStatus(true)
        setTimeout(() => {
            addUserAccess({
                userId: userId ? userId : null,
                departmentId: dept,
                departmentName: dept,
                userRoleId: userRole,
                userRoleName: userRole || '',
                module: [...userAccessItems.modules],
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        setButtonValue('update')
                        showToast('success', 'User Access successfully!')
                        navigate(`/configurations/user-access`, {
                            state: {
                                dept: dept,
                                userRole: userRole,
                                userId: userId,
                            },
                        })
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    useEffect(() => {
        if (!isLoading && !isFetching && data) {
            if (data?.data) {
                setButtonValue('update')
                dispatch(setUserAccess(data?.data?.module))
            } else {
                setButtonValue('save')
                dispatch(setUserAccess([]))
            }
        }

        // eslint-disable-next-line
    }, [data, isLoading, isFetching])

    return (
        <UserAccess
            department={(dept as string) || ''}
            userRole={(userRole as string) || ''}
            handleUserAccessSubmit={handleUserAccessSubmit}
            apiStatus={apiStatus}
        />
    )
}
export default UserAccessWrapper
