/// ==============================================
// Filename:ProfileDetails.tsx
// Type: Profile Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

const ProfileDetails = () => {
    const { userData } = useSelector((state: any) => state.auth)
    const { email, fullName, mobile, userName } = userData

    return (
        <div className="mt-3 h-100  ">
            <div className="grid justify-items-start pl-5 p-4 border-2 grid-cols-3">
                <div>Username </div>
                <div>: </div>
                <div>{userName}</div>
            </div>
            <div className="grid justify-items-start pl-5 p-4 border-2 grid-cols-3">
                <div>FullName </div>
                <div>: </div>
                <div>{fullName}</div>
            </div>
            <div className="grid justify-items-start pl-5 p-4 border-2 grid-cols-3">
                <div>Mobile Number </div>
                <div>: </div>
                <div>{mobile}</div>
            </div>
            <div className="grid justify-items-start pl-5 p-4 border-2 grid-cols-3">
                <div>Email </div>
                <div>: </div>
                <div>{email}</div>
            </div>
        </div>
    )
}

export default ProfileDetails
