import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginPage } from './pages'
import { RootState } from './redux/store'
import { isCheckAuthorizedModule } from './userAccess/getAuthorizedModules'
// import {
//     UserModuleNameTypes,
//     UserModuleActionTypes,
// } from 'src/models/userAccess/UserAccess.model'

type Props = {
    //Component: React.ReactNode
    //moduleName?: keyof typeof UserModuleNameTypes
    //actionName?: keyof typeof UserModuleActionTypes
    component: React.ReactNode
    moduleName?: string
    actionName?: string
}

const AuthHOC = ({ component, moduleName = '' }: Props) => {
    const accessToken = localStorage.getItem('authToken')
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const location = useLocation()
    const { userData } = useSelector((state: RootState) => state.auth)


    useEffect(() => {
        if (accessToken) {
            navigate(`${pathname ? pathname : '/dashboard'}`)
        }
        // Create a new location object with updated state and search
        const updatedLocation = {
          ...location,
          state: { ...location.state },
          search: location?.search,
        };
    
        // Use the navigate function to navigate to the updated location
        navigate(updatedLocation);
        //eslint-disable-next-line
      }, [accessToken]);
  

    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    let isAuthorized =
        userData?.userRole === 'ADMIN'
            ? true
            : isCheckAuthorizedModule(checkUserAccess, moduleName)
  
    return (
        <>
            {accessToken ? (
                isAuthorized ? (
                    <>
                        {React.cloneElement(component as React.ReactElement, {
                            location: location.state || null,
                        })}
                    </>
                ) : (
                    <>
                        {/* <div className="h-[100vh] w-full flex items-center justify-center bg-white"> */}
                        {navigate(`/dashboard`)}
                        {/* </div> */}
                    </>
                )
            ) : (
                <LoginPage pathName={pathname} />
            )}
        </>
    )
}

export default AuthHOC
