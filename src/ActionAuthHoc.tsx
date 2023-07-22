import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AccessDenied from './AccessDenied'
import { LoginPage } from './pages'
import { setCheckUserAccess } from './redux/slices/access/userAcessSlice'
import { RootState } from './redux/store'
import { useGetUserAccessQuery } from './services/useraccess/UserAccessServices'
import { isCheckAuthorizedModuleAction } from './userAccess/getAuthorizedModules'
// import {
//     UserModuleNameTypes,
//     UserModuleActionTypes,
// } from 'src/models/userAccess/UserAccess.model'

type Props = {
    component: React.ReactNode
    moduleName?: string
    actionName?: string
    isRedirect?: boolean
}

const ActionAuthHOC = ({
    component,
    moduleName = '',
    actionName = '',
    isRedirect = false,
}: Props) => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('authToken')

    // const navigate = useNavigate()
    const { pathname } = useLocation()
    useEffect(() => {
        if (accessToken) {
            navigate(`${pathname ? pathname : '/dashboard'}`)
        }
    }, [accessToken, navigate, pathname])
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { userData } = useSelector((state: RootState) => state.auth)

    const { data, isLoading, isFetching } = useGetUserAccessQuery({
        userId: userData?.userId ? (userData?.userId as string) : null,
        userRole: userData?.userRole as string,
    })
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isLoading && !isFetching && data) {
            if (data?.data !== null) {
                dispatch(setCheckUserAccess(data?.data?.module))
            } else {
                dispatch(setCheckUserAccess([]))
            }
        }

        // eslint-disable-next-line
    }, [data, isLoading, isFetching])
    let isAuthorized =
        userData?.userRole === 'ADMIN'
            ? true
            : isCheckAuthorizedModuleAction(
                  checkUserAccess,
                  moduleName,
                  actionName
              )
    if (!checkUserAccess.modules.length && userData?.userRole !== 'ADMIN')
        return (
            <div className="flex justify-center  items-center w-screen h-screen bg-white">
                <CircularProgress />
            </div>
        )

    return (
        <>
            {accessToken ? (
                isAuthorized ? (
                    <>{component}</>
                ) : isRedirect ? (
                    <AccessDenied/>
                ) : null
            ) : (
                <LoginPage pathName={pathname} />
            )}
        </>
    )
}

export default ActionAuthHOC
