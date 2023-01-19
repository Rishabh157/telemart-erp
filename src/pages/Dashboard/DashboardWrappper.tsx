import React from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import Dashboard from './Dashboard'

type Props = {}

const DashboardWrappper = (props: Props) => {
  return (
    <>
    <SideNavLayout>
        <Dashboard/>
    </SideNavLayout>
    </>
  )
}

export default DashboardWrappper