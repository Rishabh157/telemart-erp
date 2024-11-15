/// ==============================================
// Filename:ATMPageHeading.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { ReactNode } from 'react'

// |-- types --|
type Props = {
    children: ReactNode
}

const ATMPageHeading = ({ children }: Props) => {
    return (
        <span className="text-lg font-semibold text-slate-600">{children}</span>
    )
}

export default ATMPageHeading
