import React from 'react'

type Props = {
    children?: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
    return <div className="px-4 h-[calc(100vh-55px)] ">{children}</div>
}

export default MainLayout
