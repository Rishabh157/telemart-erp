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
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('authToken')
    const location = useLocation()

    useEffect(() => {
        // Check if there is an access token and redirect to dashboard if available
        if (accessToken) {
            navigate(`${location.pathname ? location.pathname : '/dashboard'}`)
        }
    }, [accessToken, navigate, location.pathname])

    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { userData } = useSelector((state: RootState) => state.auth)

    const { data, isLoading, isFetching } = useGetUserAccessQuery({
        userId: userData?.userId ? (userData?.userId as string) : null,
        userRole: userData?.userRole as string,
    })

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
        return () => {
            if (location?.state !== null)
                navigate(`${location.pathname}`, {
                    state: location?.state,
                })
        }
        //eslint-disable-next-line
    }, [data, isLoading, isFetching, dispatch, userData?.userRole])
    useEffect(() => {
        return () => {
            if (location?.state !== null)
                navigate(`${location.pathname}`, {
                    state: location?.state,
                })
        }
        //eslint-disable-next-line
    }, [location])

    // Determine if the user is authorized based on their role and module/action
    let isAuthorized =
        userData?.userRole === 'ADMIN'
            ? true
            : isCheckAuthorizedModuleAction(
                  checkUserAccess,
                  moduleName,
                  actionName
              )

    if (!checkUserAccess.modules.length && userData?.userRole !== 'ADMIN') {
        // Show loading spinner if user access data is not available yet
        return (
            <div className="flex justify-center  items-center w-screen h-screen bg-white">
                <CircularProgress />
            </div>
        )
    }

    return (
        <>
            {accessToken ? (
                isAuthorized ? (
                    <>
                        {/* Pass location.state to the component if it exists, otherwise pass null */}
                        {React.cloneElement(component as React.ReactElement, {
                            location: location.state || null,
                        })}
                    </>
                ) : isRedirect ? (
                    <AccessDenied />
                ) : null
            ) : (
                <LoginPage pathName={location.pathname} />
            )}
        </>
    )
}

export default ActionAuthHOC
