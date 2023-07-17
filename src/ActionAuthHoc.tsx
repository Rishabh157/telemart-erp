import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginPage } from './pages'
import { RootState } from './redux/store'
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

    const navigation = useNavigate()
    const { pathname } = useLocation()
    useEffect(() => {
        if (accessToken) {
            navigation(`${pathname ? pathname : '/dashboard'}`)
        }
    }, [accessToken, navigation, pathname])
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { userData } = useSelector((state: RootState) => state.auth)
    let isAuthorized =
        userData?.userRole === 'ADMIN'
            ? true
            : isCheckAuthorizedModuleAction(
                  checkUserAccess,
                  moduleName,
                  actionName
              )

    return (
        <>
            {accessToken ? (
                isAuthorized ? (
                    <>{component}</>
                ) : isRedirect ? (
                    navigate('/dashboard')
                ) : null
            ) : (
                <LoginPage pathName={pathname} />
            )}
        </>
    )
}

export default ActionAuthHOC
