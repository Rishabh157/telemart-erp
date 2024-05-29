// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// |-- External Dependencies --|

// |-- Internal Dependencies --|
import UserAccess from './UserAcess'
import { useDispatch, useSelector } from 'react-redux'
import {
    useAddUserAccessMutation,
    useGetUserAccessQuery,
    // useIsUserExistsQuery,
} from 'src/services/useraccess/UserAccessServices'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { setUserAccess } from 'src/redux/slices/access/userAcessSlice'

const UserAccessWrapper = () => {
    const [apiStatus, setApiStatus] = useState(false)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const dept = queryParams.get('dept')
    const userRole = queryParams.get('userRole')
    const userId = queryParams.get('userId')
    const dispatch = useDispatch()
    const [addUserAccess] = useAddUserAccessMutation()

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

    const { userAccessItems } = useSelector(
        (state: RootState) => state.userAccess
    )

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
                        showToast('success', 'User Access successfully!')
                        // navigate(`/configurations/user-access`, {
                        //     state: {
                        //         dept: dept,
                        //         userRole: userRole,
                        //         userId: userId,
                        //     },
                        // })
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
                dispatch(setUserAccess(data?.data?.module))
            } else {
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
