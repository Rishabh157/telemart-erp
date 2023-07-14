import { CircularProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
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
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { userData } = useSelector((state: RootState) => state.auth)
    let isAuthorized =
        userData?.userRole === 'ADMIN'
            ? true
            : isCheckAuthorizedModule(checkUserAccess, moduleName)

    return (
        <>
            {isAuthorized ? (
                <>{component}</>
            ) : (
                <>
                <div className='h-[100vh] w-full flex items-center justify-center bg-white'>

                    <CircularProgress />
                </div>
                </>
            )}
        </>
    )
}

export default AuthHOC
