/// ==============================================
// Filename:ProfileWrapper.tsx
// Type: Profile Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { MdOutbond } from 'react-icons/md'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import Profile from './Profile'
import { Tabs } from '../outwardRequest/list/OutwardRequestListingWrapper'

// |-- Types --|
type Props = {}
const tabs: Tabs[] = [
    {
        label: 'My Profile',
        icon: MdOutbond,
    },
    {
        label: 'Change Password',
        icon: MdOutbond,
    },
]
const ProfileWrappper = (props: Props) => {
    return (
        <>
            <SideNavLayout>
                <Profile tabs={tabs} />
            </SideNavLayout>
        </>
    )
}

export default ProfileWrappper
