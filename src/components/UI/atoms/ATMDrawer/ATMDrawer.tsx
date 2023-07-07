/// ==============================================
// Filename:ATMDrawer.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import * as React from 'react'

// |-- External Dependencies --|
import Drawer from '@mui/material/Drawer'

// |-- Types --|
type Props = {
    children: React.ReactNode
    open: boolean
    onClose: () => void
}

const ATMDrawer = ({ children, open = false, onClose }: Props) => {
    return (
        <Drawer anchor={'right'} open={open} onClose={onClose}>
            {children}
        </Drawer>
    )
}

export default ATMDrawer
