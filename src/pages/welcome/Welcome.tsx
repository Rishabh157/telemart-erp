import React from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

const Welcome = () => {
    return (
        <>
            <SideNavLayout>
                <div className="flex justify-center h-[calc(100vh-55px)] py-2">
                    Welcome to CRM
                </div>
            </SideNavLayout>
        </>
    )
}

export default Welcome
