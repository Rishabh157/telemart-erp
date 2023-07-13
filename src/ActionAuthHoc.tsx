import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from './redux/store'
import { isCheckAuthorizedModuleAction } from './userAccess/getAuthorizedModules'

type Props = {
    Component: React.ReactNode
    moduleName?: string
    actionName?: string
    isRedirect?:boolean
}

const ActionAuthHOC = ({
    Component,
    moduleName = '',
    actionName = '',
    isRedirect=false
}: Props) => {
  const navigate=useNavigate()

    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    let isAuthorized = isCheckAuthorizedModuleAction(
        checkUserAccess,
        moduleName,
        actionName
    )

    return <>{isAuthorized ? <>{Component}</> : isRedirect? navigate('/dashboard') : null}</>
}

export default ActionAuthHOC
