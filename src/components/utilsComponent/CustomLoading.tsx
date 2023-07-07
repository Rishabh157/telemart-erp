/// ==============================================
// Filename:CustomLoading.tsx
// Type: Utils Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

type Props = {}

const CustomLoading = (props: Props) => {
    return (
        <div className="w-[100%] h-[100vh] flex justify-center fixed z-1 mt-72">
            <div className="w-[34px] h-[34px] border border-spacing-8 border-cyan-600 rounded animate-spin "></div>
        </div>
    )
}

export default CustomLoading
