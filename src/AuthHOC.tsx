import React from 'react'

type Props = {
    Component: React.ReactNode
    moduleName?: string
}

const AuthHOC = ({ Component, moduleName = '' }: Props) => {
    let isAuthorized = true

    return <>{isAuthorized ? <>{Component}</> : <>"sdfdhjh</>}</>
}

export default AuthHOC
