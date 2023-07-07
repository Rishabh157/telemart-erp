/// ==============================================
// Filename:MainLayout.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Types --|
type Props = {
    children?: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
    return <div className="px-4 h-[calc(100vh-55px)] ">{children}</div>
}

export default MainLayout
