import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from './redux/store'
import { isCheckAuthorizedModuleAction } from './userAccess/getAuthorizedModules'
import {UserModuleNameTypes, UserModuleActionTypes} from 'src/models/userAccess/UserAccess.model'

type Props = {
    Component: React.ReactNode
    moduleName?: keyof typeof UserModuleNameTypes
    actionName?: keyof typeof UserModuleActionTypes
    isRedirect?: boolean
}

const ActionAuthHOC = ({
    Component,
    moduleName = '',
    actionName = '',
    isRedirect = false,
}: Props) => {
    const navigate = useNavigate()
    // console.log(actionName, 'actionNameactionNameactionNameactionName')
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
            {isAuthorized ? (
                <>{Component}</>
            ) : isRedirect ? (
                navigate('/dashboard')
            ) : null}
        </>
    )
}

export default ActionAuthHOC
