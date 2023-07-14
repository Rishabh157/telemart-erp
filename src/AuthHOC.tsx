import React from 'react'
import { useSelector } from 'react-redux'
import PageNotFound from './PageNotFound'
import { RootState } from './redux/store'
import { isCheckAuthorizedModule } from './userAccess/getAuthorizedModules'
import {
    UserModuleNameTypes,
    UserModuleActionTypes,
} from 'src/models/userAccess/UserAccess.model'

type Props = {
    Component: React.ReactNode
    moduleName?: keyof typeof UserModuleNameTypes
    actionName?: keyof typeof UserModuleActionTypes
}

const AuthHOC = ({ Component, moduleName = '' }: Props) => {
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
                <>{Component}</>
            ) : (
                <>
                    <PageNotFound />
                </>
            )}
        </>
    )
}

export default AuthHOC
