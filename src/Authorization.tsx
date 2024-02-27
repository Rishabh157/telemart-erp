// import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
// import { PermissionType, isAuthorized } from '../../utils/authorization'
import { useLocation, useNavigate } from 'react-router-dom'
// import useGetUserAccess from 'src/hooks/useGetUserAccess'
import { CircularProgress } from '@mui/material'
// import AccessDenied from '../AccessDenied'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
// import Welcome from '../Welcome'
import { useEffect } from 'react'
import AccessDenied from './AccessDenied'
import WelcomePage from './pages/welcome/WelcomePage'
import { useGetLocalStorage } from './hooks/useGetLocalStorage'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetUserAccess from './hooks/useGetUserAccess'
import { isAuthorized } from './utils/authorization'
// import { isAuthorized } from './auth'
type Props = {
    permission: keyof typeof UserModuleNameTypes
    children: any
}

const Authorization: ({ permission, children }: Props) => any = ({
    permission,
    children,
}) => {
    const location = useLocation()?.pathname?.split('/')?.[1]

    const navigate = useNavigate()
    const { authToken, userData } = useGetLocalStorage()
    useEffect(() => {
        if (!authToken) return navigate('/login')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isDataLoading, getAllPermission } = useGetUserAccess()
    if (isDataLoading) {
        return (
            <div className="flex items-center justify-center h-[100vh] w-full">
                <CircularProgress />
            </div>
        )
    }
    if (permission === 'NAV_WELCOME') {
        return (
            <>
                {' '}
                <WelcomePage />{' '}
            </>
        )
    }
    if (!getAllPermission?.length && !(userData?.userRole === 'ADMIN')) {
        return (
            <SideNavLayout>
                <AccessDenied />
            </SideNavLayout>
        )
    }
    if (isAuthorized(permission)) {
        return children
    } else if (location === 'configuration' || location === 'sales&marketing') {
        return <AccessDenied />
    } else {
        return (
            <SideNavLayout>
                <AccessDenied />
            </SideNavLayout>
        )
    }
}

export default Authorization
