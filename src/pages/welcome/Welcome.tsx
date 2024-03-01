import React from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

const Welcome = () => {
    return (
        <>
            <SideNavLayout>
                <div className="flex justify-center w-full h-[100vh] py-2">
                    Welcome to CRM
                </div>
            </SideNavLayout>
        </>
    )
}

export default Welcome
