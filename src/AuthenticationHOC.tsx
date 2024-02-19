import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AccessDenied from './AccessDenied'
import { LoginPage } from './pages'
import { setCheckUserAccess } from './redux/slices/access/userAcessSlice'
import { RootState } from './redux/store'
import { useGetUserAccessQuery } from './services/useraccess/UserAccessServices'
import {
    isCheckAuthorizedModule,
    isCheckAuthorizedModuleAction,
} from './userAccess/getAuthorizedModules'

type Props = {
    component: React.ReactNode
    moduleName?: string
    actionName?: string
    isRedirect?: boolean
}

const AuthenticationHOC = ({
    component,
    moduleName = '',
    actionName = '',
    isRedirect = false,
}: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('authToken')
    const location = useLocation()
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { userData } = useSelector((state: RootState) => state.auth)
    const { data, isLoading, isFetching } = useGetUserAccessQuery(
        {
            userId: userData?.userId ? (userData?.userId as string) : null,
            userRole: userData?.userRole as string,
        },
        {
            skip: !userData?.companyId,
        }
    )
    useEffect(() => {
        // Check if there is an access token and redirect to dashboard if available
        if (accessToken) {
            navigate(
                `${location.pathname ? location.pathname : '/dashboard'}`,
                {
                    state: location?.state,
                }
            )
        } else {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, navigate, location.pathname])
    useEffect(() => {
        if (userData?.userRole === 'ADMIN') return
        // Update checkUserAccess when data is available
        if (!isLoading && !isFetching && data) {
            if (data?.data !== null) {
                dispatch(setCheckUserAccess(data?.data?.module))
            } else {
                dispatch(setCheckUserAccess([]))
            }
        }

        //eslint-disable-next-line
    }, [data, isLoading, isFetching, dispatch, userData?.userRole])

    // Determine if the user is authorized based on their role and module/action

    if (!checkUserAccess.modules.length && userData?.userRole !== 'ADMIN') {
        // Show loading spinner if user access data is not available yet
        return (
            <div className="flex justify-center  items-center w-screen h-screen bg-white">
                <CircularProgress />
            </div>
        )
    }
    const getAuthorised = () => {
        let isAuthorized = false
        if (actionName) {
            isAuthorized =
                userData?.userRole === 'ADMIN'
                    ? true
                    : (isCheckAuthorizedModuleAction(
                        checkUserAccess,
                        moduleName,
                        actionName
                    ) as boolean)
        } else {
            isAuthorized =
                userData?.userRole === 'ADMIN'
                    ? true
                    : isCheckAuthorizedModule(checkUserAccess, moduleName)
        }
        return isAuthorized
    }

    return (
        <>
            {accessToken ? (
                getAuthorised() ? (
                    <>
                        {/* {component} */}
                        {/* Pass location.state to the component if it exists, otherwise pass null */}
                        {React.cloneElement(component as React.ReactElement, {
                            location: location.state || null,
                        })}
                    </>
                ) : // isRedirect we used on actioncomponent on pageroute
                    actionName ? (
                        isRedirect ? (
                            <AccessDenied />
                        ) : null
                    ) : (
                        navigate(`/dashboard`)
                    )
            ) : (
                <LoginPage pathName={location.pathname} />
            )}
        </>
    )
}

export default AuthenticationHOC
