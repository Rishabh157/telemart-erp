/// ==============================================
// Filename:UserAccessWrapper.tsx
// Type: Access Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react' //  { useState, useEffect } // ,
import { useLocation, useNavigate } from 'react-router-dom'

import ConfigurationLayout from '../configuration/ConfigurationLayout'

// |-- External Dependencies --|

// |-- Internal Dependencies --|
import UserAccess from './UserAcess'
import { useDispatch, useSelector } from 'react-redux'
import {
    useAddUserAccessMutation,
    useGetUserAccessQuery,
    useUpdateUserAccessMutation,
} from 'src/services/useraccess/UserAccessServices'
import { RootState } from 'src/redux/store'
import { showToast } from 'src/utils'
import { setUserAccess } from 'src/redux/slices/access/userAcessSlice'
const UserAccessWrapper = () => {
    const [apiStatus, setApiStatus] = useState(false)
    const { state } = useLocation()
    const { dept, userRole } = state
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [buttonValue, setButtonValue] = useState('save')


    const [addUserAccess] = useAddUserAccessMutation()
    const [updateUserAccess] = useUpdateUserAccessMutation()
    const { data, isLoading, isFetching } = useGetUserAccessQuery(
        { userRole: userRole as string },
        {
            skip: !userRole,
        }
    )
    const { userAccessItems } = useSelector(
        (state: RootState) => state.userAccess
    )

    const handleUserAccessSubmit = () => {
        setApiStatus(true)
        setTimeout(() => {
            if (buttonValue === 'save') {
                addUserAccess({
                    departmentId: dept,
                    departmentName: dept,
                    userRoleId: userRole,
                    userRoleName: userRole || '',
                    module: [...userAccessItems.modules],
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'User Access successfully!')
                            navigate(`/configurations/user-access`, {
                                state: {
                                    dept: dept,
                                    userRole: userRole,
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
            } else {
                updateUserAccess({
                    body: {
                        departmentId: dept,
                        departmentName: dept,
                        userRoleId: userRole,
                        userRoleName: userRole || '',
                        module: [...userAccessItems.modules],
                    },
                    userRole: userRole,
                }).then((res) => {
                    if ('data' in res) {
                        if (res?.data?.status) {
                            showToast('success', 'User Access successfully!')
                            navigate(`/configurations/user-access`, {
                                state: {
                                    dept: dept,
                                    userRole: userRole,
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
            }
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
        <ConfigurationLayout>
            <UserAccess
                department={(dept as string) || ''}
                userRole={(userRole as string) || ''}
                handleUserAccessSubmit={handleUserAccessSubmit}
                apiStatus={apiStatus}
            />
        </ConfigurationLayout>
    )
}
export default UserAccessWrapper
