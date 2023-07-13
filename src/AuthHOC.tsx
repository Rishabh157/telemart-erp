import React from 'react'
import { useSelector } from 'react-redux'
import PageNotFound from './PageNotFound'
import { RootState } from './redux/store'
import { isCheckAuthorizedModule } from './userAccess/getAuthorizedModules'

type Props = {
    Component: React.ReactNode
    moduleName?: string
    actionName?: string
}

const AuthHOC = ({ Component, moduleName = '' }: Props) => {
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    let isAuthorized = isCheckAuthorizedModule(checkUserAccess, moduleName)

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
